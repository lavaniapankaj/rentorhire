"use client";
import Header from "../main/header";
import Footer from "../main/footer";
import { useRef, useState } from "react";
import "./register.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const userNameRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setFieldErrors((fe) => ({ ...fe, [name]: "" }));
    setFormError("");
  };

  const validate = () => {
    const fe = {};
    if (!form.userName) fe.userName = "Username is required.";
    if (!form.firstName) fe.firstName = "First name is required.";
    if (!form.lastName) fe.lastName = "Last name is required.";
    if (!form.email) fe.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) fe.email = "Enter a valid email.";
    if (!form.phone) fe.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) fe.phone = "Enter 10-digit number.";
    if (!form.password) fe.password = "Password is required.";
    else if (form.password.length < 8) fe.password = "Password must be at least 8 characters.";
    return fe;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});

    const fe = validate();
    if (Object.keys(fe).length) {
      setFieldErrors(fe);
      setFormError("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.userName,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      let data = {};
      try { data = await res.json(); } catch {}

      const statusCodeNum = Number(data?.statusCode);
      const appError =
        data?.status === false ||
        (Number.isFinite(statusCodeNum) && statusCodeNum >= 400);

      if (!res.ok || appError) {
        const msg = data?.message || "Signup failed";
        if (/user\s*name.*exists/i.test(msg)) {
          setFieldErrors({ userName: "User name already exists." });
          userNameRef.current?.focus();
        } else {
          setFormError(msg);
        }
        return;
      }

      alert("User register successfully");
      setForm({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      setFormError(err?.message || "Something went wrong");
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

          {formError ? <p className="rohuserres_errorTop">{formError}</p> : null}

          <form onSubmit={handleSubmit} className="rohuserres_form" noValidate>
            {/* Username */}
            <div className="rohuserres_fieldCol">
              <label className="rohuserres_label">Username</label>
              <input
                ref={userNameRef}
                className={`rohuserres_input ${fieldErrors.userName ? "rohuserres_input--invalid" : ""}`}
                type="text"
                name="userName"
                placeholder="Username"
                value={form.userName}
                onChange={handleChange}
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
                  className={`rohuserres_input ${fieldErrors.firstName ? "rohuserres_input--invalid" : ""}`}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
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
                  className={`rohuserres_input ${fieldErrors.lastName ? "rohuserres_input--invalid" : ""}`}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
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
                className={`rohuserres_input ${fieldErrors.email ? "rohuserres_input--invalid" : ""}`}
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
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
                className={`rohuserres_input ${fieldErrors.phone ? "rohuserres_input--invalid" : ""}`}
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
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
                className={`rohuserres_input ${fieldErrors.password ? "rohuserres_input--invalid" : ""}`}
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
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

            {/* Submit */}
            <button
              type="submit"
              className="rohuserres_btn"
              disabled={loading}
              aria-busy={loading ? "true" : "false"}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
