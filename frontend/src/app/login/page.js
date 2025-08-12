"use client";

import { useState } from "react";
import Header from "../main/header";
import Footer from "../main/footer";
import Link from "next/link";
import { useRouter } from "next/navigation"; // redirect to another page
import "./login.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
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

      const res = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type") || "";
      let data = null;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Unexpected response: ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      console.log("Login Success:", data);

      // Token save
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="rohuserlogn_wrap">
        <section className="rohuserlogn_card">
          <h1 className="rohuserlogn_title">Log in to your account</h1>
          <p className="rohuserlogn_subtitle">
            Welcome back — let’s get you signed in.
          </p>

          {error && <div className="rohuserlogn_alert">{error}</div>}

          <form className="rohuserlogn_form" onSubmit={onSubmit} noValidate>
            <div className="rohuserlogn_field">
              <label htmlFor="email" className="rohuserlogn_label">
                Email
              </label>
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
              <div className="rohuserlogn_labelrow">
                <label htmlFor="password" className="rohuserlogn_label">
                  Password
                </label>
                <button
                  type="button"
                  className="rohuserlogn_linkbtn"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                placeholder="At least 8 characters"
                className="rohuserlogn_input"
                value={form.password}
                onChange={onChange}
              />
            </div>

            <div className="rohuserlogn_row">
              <label className="rohuserlogn_check">
                <input type="checkbox" className="rohuserlogn_checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#" className="rohuserlogn_link">
                Forgot password?
              </a>
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
        </section>
      </main>
      <Footer />
    </>
  );
}
