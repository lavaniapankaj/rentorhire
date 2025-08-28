"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_USER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.otpRequired) {
        setOtpStep(true);
        setUserId(data.userId);
        return;
      }

      // localStorage.setItem("token", data.token);
      document.cookie = `authToken=${data.token}; path=/`;
      document.cookie = `authUser=${JSON.stringify(data.user)}; path=/`;
      router.push("/dashboard"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_USER_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      alert("OTP Verified Successfully. Please login again.");
      setOtpStep(false);
      setForm({ email: "", password: "" });
      setOtp("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <main className="rohuserlogn_wrap">
        <section className="rohuserlogn_card">
          <h1 className="rohuserlogn_title">
            {otpStep ? "Verify OTP" : "Log in to your account"}
          </h1>
          <p className="rohuserlogn_subtitle">
            {otpStep ? "Enter the 6-digit OTP sent to your email" : "Welcome back — let’s get you signed in."}
          </p>

          {error && <div className="rohuserlogn_alert">{error}</div>}

          {!otpStep ? (
            <form className="rohuserlogn_form" onSubmit={onSubmit} noValidate>
              <div className="rohuserlogn_field">
                <label htmlFor="email" className="rohuserlogn_label"> Email </label>
                <input id="email" name="email" type="email" autoComplete="username" placeholder="you@example.com" className="rohuserlogn_input" value={form.email} onChange={onChange}/>
              </div>

              <div className="rohuserlogn_field">
                <label htmlFor="password" className="rohuserlogn_label"> Password </label>
                <input id="password" name="password" type="password" autoComplete="current-password" placeholder="At least 8 characters" className="rohuserlogn_input" value={form.password} onChange={onChange}/>
              </div>

              <button type="submit" className="rohuserlogn_btn" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <p className="rohuserlogn_footer">
                Don’t have an account?{" "}
                <Link href="/register" className="rohuserlogn_link">
                  Create one
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={onOtpSubmit} className="rohuserlogn_form">
              <div className="rohuserlogn_field">
                <label className="rohuserlogn_label">Enter OTP</label>
                <input type="text" maxLength="6" value={otp} onChange={(e) => setOtp(e.target.value)} className="rohuserlogn_input" placeholder="6-digit OTP"/>
              </div>
              <button type="submit" className="rohuserlogn_btn"> Verify OTP </button>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
