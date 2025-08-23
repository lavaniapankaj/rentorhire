"use client";

import Header from "../main/header";
import Footer from "../main/footer";
import Link from "next/link";
import { useRef, useState } from "react";
import "./register.css";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080/api";

/** Helper: safe fetch + JSON */
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    headers: { Accept: "application/json", ...(options.headers || {}) },
    ...options,
  });
  const ct = res.headers.get("content-type") || "";
  let data = null;
  try {
    data = ct.includes("application/json") ? await res.json() : await res.text();
  } catch {
    // ignore parse error
  }
  return { res, data };
}

export default function RegisterPage() {
  const [step, setStep] = useState(1); // 1 = Details, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [debugOtp, setDebugOtp] = useState(""); /** for testing if backend returns OTP (can hide in prod) */

  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const userNameRef = useRef(null);
  const otpRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setFieldErrors((fe) => ({ ...fe, [name]: "" }));
    setFormError("");

    /** If any core detail changes while on Step-2, drop back to Step-1 */
    if (
      step === 2 &&
      ["userName", "email", "phone", "password", "firstName", "lastName"].includes(name)
    ) {
      setForm((f) => ({ ...f, otp: "" }));
      setDebugOtp("");
      setStep(1);
    }
  };

  const validateStep1 = () => {
    const fe = {};
    if (!form.userName.trim()) fe.userName = "Username is required.";
    if (!form.firstName.trim()) fe.firstName = "First name is required.";
    if (!form.lastName.trim()) fe.lastName = "Last name is required.";
    if (!form.email.trim()) fe.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) fe.email = "Enter a valid email.";
    if (!form.phone.trim()) fe.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      fe.phone = "Enter 10-digit number.";
    if (!form.password) fe.password = "Password is required.";
    else if (form.password.length < 8)
      fe.password = "Password must be at least 8 characters.";
    return fe;
  };

  /** Step-1 submit: check availability → signup (backend sets active=0 & authorize_code=OTP) */
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    const fe = validateStep1();
    if (Object.keys(fe).length) {
      setFieldErrors(fe);
      setFormError("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      /** 1) Pre-check availability (only username & email) */
      {
        const { res, data } = await fetchJSON(`${API_BASE}/user/checkavailability`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: form.userName, email: form.email }),
        });

        if (!res.ok || data?.status === false) {
          /** Backend may return { data: { taken: { userName: true, email: true } } } */
          const taken = data?.data?.taken || {};
          const newFE = {};
          if (taken.userName) newFE.userName = "User name already exists.";
          if (taken.email) newFE.email = "Email already exists.";
          if (Object.keys(newFE).length) {
            setFieldErrors(newFE);
            userNameRef.current?.focus();
            setFormError("Some details already exist. Please update and try again.");
            return;
          }
          console.log(data);
          /** Fallback generic */
          throw new Error(data?.message || "Could not check availability");
        }
      }

      /** 2) Signup → backend: active=0, authorize_code=OTP */
      {
        const payload = {
          userName: form.userName,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        };

        const { res, data } = await fetchJSON(`${API_BASE}/user/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok || data?.status === false) {
          /** handle duplicates by message */
          const msg = data?.message || "Signup failed";
          if (/user.?name.*exist|duplicate.*user.*name/i.test(msg)) {
            setFieldErrors({ userName: "User name already exists." });
            userNameRef.current?.focus();
          } else if (/email.*exist|duplicate.*email/i.test(msg)) {
            setFieldErrors({ email: "Email already exists." });
          } else {
            setFormError(msg);
          }
          return;
        }

        /** For testing only: if backend returns OTP in data, show it (alert or debug label) */
        const otpFromServer = data?.data?.otp;
        if (otpFromServer) {
          setDebugOtp(String(otpFromServer));
          // alert(`OTP: ${otpFromServer}`); // uncomment only for dev
        }

        setStep(2);
        setTimeout(() => otpRef.current?.focus(), 0);
      }
    } catch (err) {
      setFormError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /** Step-2 submit: verify OTP → backend sets active=1 & clears authorize_code */
  const handleVerifyAndCreate = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors((fe) => ({ ...fe, otp: "" }));

    if (!form.otp.trim()) {
      setFieldErrors((fe) => ({ ...fe, otp: "OTP is required." }));
      otpRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const { res, data } = await fetchJSON(`${API_BASE}/user/verifyotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.userName, /** verifying by username (as per your controller guidance) */
          otp: form.otp,
        }),
      });

      if (!res.ok || data?.status === false) {
        const msg = (data && data.message) || "Invalid OTP";
        setFieldErrors((fe) => ({ ...fe, otp: "Invalid OTP." }));
        setFormError(msg);
        otpRef.current?.focus();
        return;
      }

      /** Success: active=1 & authorize_code cleared */
      alert("Account verified successfully. You can now log in.");

      /** Reset form → back to Step-1 or redirect to login */
      setForm({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        otp: "",
      });
      setDebugOtp("");
      setStep(1);
    } catch (err) {
      setFormError(err?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  /** Resend OTP → backend updates authorize_code with new OTP */
  const handleResendOtp = async () => {
    setFormError("");
    setLoading(true);
    try {
      const { res, data } = await fetchJSON(`${API_BASE}/user/resendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: form.userName }),
      });

      if (!res.ok || data?.status === false) {
        throw new Error((data && data.message) || "Failed to resend OTP");
      }

      const newOtp = data?.data?.otp;
      if (newOtp) {
        setDebugOtp(String(newOtp)); // for dev/testing
        // alert(`New OTP: ${newOtp}`); // uncomment for dev
      }
    } catch (err) {
      setFormError(err?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="rohuserres_shell">
        <section className="rohuserres_card">
          <h1 className="rohuserres_title">Create your account</h1>
          <p className="rohuserres_sub">
            Rent cars, bikes, cameras and more — faster checkout next time.
          </p>

          {/* Step indicator */}
          <div className="rohuserres_steps">
            <span className={step === 1 ? "active" : ""}>1. Details</span>
            <span className={step === 2 ? "active" : ""}>2. OTP</span>
          </div>

          {formError ? <p className="rohuserres_errorTop">{formError}</p> : null}

          {step === 1 ? (
            <form onSubmit={handleStep1Submit} className="rohuserres_form" noValidate>
              {/* Username */}
              <div className="rohuserres_fieldCol">
                <label className="rohuserres_label">Username</label>
                <input
                  ref={userNameRef}
                  className={`rohuserres_input ${
                    fieldErrors.userName ? "rohuserres_input--invalid" : ""
                  }`}
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={form.userName}
                  onChange={onChange}
                  required
                  aria-invalid={!!fieldErrors.userName}
                  aria-describedby="err-userName"
                  disabled={loading}
                />
                {fieldErrors.userName && (
                  <span id="err-userName" className="rohuserres_error">
                    {fieldErrors.userName}
                  </span>
                )}
              </div>

              {/* First & Last name */}
              <div className="rohuserres_grid2">
                <div className="rohuserres_fieldCol">
                  <label className="rohuserres_label">First Name</label>
                  <input
                    className={`rohuserres_input ${
                      fieldErrors.firstName ? "rohuserres_input--invalid" : ""
                    }`}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={onChange}
                    required
                    aria-invalid={!!fieldErrors.firstName}
                    aria-describedby="err-firstName"
                    disabled={loading}
                  />
                  {fieldErrors.firstName && (
                    <span id="err-firstName" className="rohuserres_error">
                      {fieldErrors.firstName}
                    </span>
                  )}
                </div>
                <div className="rohuserres_fieldCol">
                  <label className="rohuserres_label">Last Name</label>
                  <input
                    className={`rohuserres_input ${
                      fieldErrors.lastName ? "rohuserres_input--invalid" : ""
                    }`}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={onChange}
                    required
                    aria-invalid={!!fieldErrors.lastName}
                    aria-describedby="err-lastName"
                    disabled={loading}
                  />
                  {fieldErrors.lastName && (
                    <span id="err-lastName" className="rohuserres_error">
                      {fieldErrors.lastName}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="rohuserres_fieldCol">
                <label className="rohuserres_label">Email</label>
                <input
                  className={`rohuserres_input ${
                    fieldErrors.email ? "rohuserres_input--invalid" : ""
                  }`}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange}
                  required
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby="err-email"
                  disabled={loading}
                />
                {fieldErrors.email && (
                  <span id="err-email" className="rohuserres_error">
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="rohuserres_fieldCol">
                <label className="rohuserres_label">Phone Number</label>
                <input
                  className={`rohuserres_input ${
                    fieldErrors.phone ? "rohuserres_input--invalid" : ""
                  }`}
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={onChange}
                  required
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby="err-phone"
                  disabled={loading}
                />
                {fieldErrors.phone && (
                  <span id="err-phone" className="rohuserres_error">
                    {fieldErrors.phone}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="rohuserres_fieldCol">
                <label className="rohuserres_label">Password</label>
                <input
                  className={`rohuserres_input ${
                    fieldErrors.password ? "rohuserres_input--invalid" : ""
                  }`}
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={onChange}
                  required
                  minLength={8}
                  aria-invalid={!!fieldErrors.password}
                  aria-describedby="err-password"
                  disabled={loading}
                />
                {fieldErrors.password && (
                  <span id="err-password" className="rohuserres_error">
                    {fieldErrors.password}
                  </span>
                )}
              </div>

              <button type="submit" className="rohuserres_btn" disabled={loading}>
                {loading ? "Please wait..." : "Create Account"}
              </button>

              <span className="rohuserres_loginlink">
                Already have an account? <Link href="/login">Login</Link>
              </span>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndCreate} className="rohuserres_form" noValidate>
              {/* Summary */}
              <div className="rohuserres_summary">
                <p>
                  <strong>Username:</strong> {form.userName}
                </p>
                <p>
                  <strong>Email:</strong> {form.email}
                </p>
                <button
                  type="button"
                  className="rohuserres_linkBtn"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Edit details
                </button>
              </div>

              {/* OTP Field */}
              <div className="rohuserres_fieldCol">
                <label className="rohuserres_label">Enter OTP</label>
                <input
                  ref={otpRef}
                  className={`rohuserres_input ${
                    fieldErrors.otp ? "rohuserres_input--invalid" : ""
                  }`}
                  type="text"
                  name="otp"
                  placeholder="6-digit OTP"
                  value={form.otp}
                  onChange={onChange}
                  required
                  aria-invalid={!!fieldErrors.otp}
                  aria-describedby="err-otp"
                  disabled={loading}
                  inputMode="numeric"
                />
                {fieldErrors.otp && (
                  <span id="err-otp" className="rohuserres_error">
                    {fieldErrors.otp}
                  </span>
                )}
              </div>

              {/* Dev-only helper: show OTP returned by backend for testing */}
              {debugOtp ? (
                <p className="rohuserres_note">
                  <em>Dev note:</em> OTP from server: <strong>{debugOtp}</strong>
                </p>
              ) : null}

              <div className="rohuserres_actionsRow">
                <button
                  type="button"
                  className="rohuserres_btn rohuserres_btn--ghost"
                  onClick={handleResendOtp}
                  disabled={loading}
                >
                  Resend OTP
                </button>
                <button type="submit" className="rohuserres_btn" disabled={loading}>
                  {loading ? "Verifying..." : "Verify & Create"}
                </button>
              </div>

              <span className="rohuserres_loginlink">
                Already verified? <Link href="/login">Login</Link>
              </span>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
