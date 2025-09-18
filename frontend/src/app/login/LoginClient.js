"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "./login.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;

export default function LoginClient() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [userId, setUserId] = useState(null);

  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  
const searchParams = useSearchParams();
const redirectUrl = searchParams.get("redirect"); // e.g. ?redirect=/hosting/vehicles
  const [resendLoading, setResendLoading] = useState(false);

  // resend cooldown (in seconds)
  const RESEND_COOLDOWN = 10;
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.otpRequired) {
        setOtpStep(true);
        setUserId(data.userId ?? null);
        setInfo("OTP sent to your email.");
        startCooldown();
        return;
      }

      document.cookie = `authToken=${data.token}; path=/`;
      document.cookie = `authUser=${JSON.stringify(data.user)}; path=/`;

      window.location.href = redirectUrl || "/dashboard";
    
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/sign-in-verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      alert("OTP Verified Successfully. Please login again.");
      setOtpStep(false);
      setForm({ email: "", password: "" });
      setOtp("");
      setInfo(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const onResendOtp = async () => {
    setError(null);
    setInfo(null);

    const email = form.email.trim();
    if (!email) {
      setError("Enter your email on the login screen first.");
      return;
    }
    if (cooldown > 0 || resendLoading) return;

    try {
      setResendLoading(true);
      const res = await fetch(`${API_BASE_URL}/verify-resendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");

      setInfo("A new OTP has been sent to your email.");
      startCooldown();
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
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
          {info && <div className="rohuserlogn_info">{info}</div>}

          {!otpStep ? (
            <form className="rohuserlogn_form" onSubmit={onSubmit} noValidate>
              <div className="rohuserlogn_field">
                <label htmlFor="email" className="rohuserlogn_label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="you@example.com"
                  className="rohuserlogn_input"
                  value={form.email}
                  onChange={onChange}
                />
              </div>

              <div className="rohuserlogn_field">
                <label htmlFor="password" className="rohuserlogn_label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="At least 8 characters"
                  className="rohuserlogn_input"
                  value={form.password}
                  onChange={onChange}
                />
              </div>

              <button type="submit" className="rohuserlogn_btn" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <p className="rohuserlogn_footer">
                Don’t have an account?{" "}
                <Link href="/register" className="rohuserlogn_link">Create one</Link>
              </p>
            </form>
          ) : (
            <form onSubmit={onOtpSubmit} className="rohuserlogn_form">
              <div className="rohuserlogn_field">
                <label className="rohuserlogn_label">Enter OTP</label>
                <input
                  type="text"
                  maxLength="6"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="rohuserlogn_input"
                  placeholder="6-digit OTP"
                />
              </div>

              <button type="submit" className="rohuserlogn_btn">Verify OTP</button>

              <div className="rohuserlogn_resendRow">
                <button
                  type="button"
                  className="rohuserlogn_linkbtn"
                  onClick={onResendOtp}
                  disabled={resendLoading || cooldown > 0}
                  aria-disabled={resendLoading || cooldown > 0}
                >
                  {resendLoading
                    ? "Sending..."
                    : cooldown > 0
                    ? `Resend OTP in ${cooldown}s`
                    : "Resend OTP"}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>

      <style jsx>{`
        .rohuserlogn_info {
          margin: 12px 0;
          padding: 10px 12px;
          border-radius: 8px;
          background: #e8fff1;
          color: #0b7a3b;
          font-size: 14px;
        }
        .rohuserlogn_resendRow {
          margin-top: 12px;
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .rohuserlogn_linkbtn {
          background: transparent;
          border: none;
          padding: 0;
          font: inherit;
          color: #2f6fef;
          cursor: pointer;
          text-decoration: underline;
        }
        .rohuserlogn_linkbtn[aria-disabled="true"] {
          color: #93a0b5;
          cursor: not-allowed;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
