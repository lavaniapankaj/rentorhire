"use client";
import { useState, useEffect } from "react";
import style from "./contact.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ip, setIp] = useState("");

  /** Fetch IP address */
  useEffect(() => {
    async function fetchIP() {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIp(data.ip);
      } catch (err) {
        console.warn("IP fetch failed", err);
      }
    }
    fetchIP();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Please enter a valid email address.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit number.";
    if (!form.subject.trim()) newErrors.subject = "Please select a subject.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        ip_address: ip || "unknown",
      };

      const res = await fetch(`${API_BASE_URL}/contactinquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      alert("❌ Something went wrong, please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.roh_contact_wrapper}>
      <div className={style.roh_contact_container}>
        <h1 className={style.roh_contact_title}>Contact Us</h1>
        <p className={style.roh_contact_subtitle}>
          Have questions or need help? We’d love to hear from you.
        </p>

        {submitted ? (
          <p className={style.roh_contact_success}>
            ✅ Thank you! Your message has been sent successfully.
          </p>
        ) : (
          <form
            className={style.roh_contact_form}
            onSubmit={handleSubmit}
            noValidate
          >
            {loading && (
              <div className={style.roh_contact_overlay}>
                <div className={style.roh_contact_spinner}></div>
                <p>Sending your message...</p>
              </div>
            )}

            {/* Full Name */}
            <div className={style.roh_contact_field}>
              <label className={style.roh_contact_label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                className={`${style.roh_contact_input} ${
                  errors.name ? style.roh_contact_errorInput : ""
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className={style.roh_contact_error}>{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className={style.roh_contact_field}>
              <label className={style.roh_contact_label}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                className={`${style.roh_contact_input} ${
                  errors.email ? style.roh_contact_errorInput : ""
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className={style.roh_contact_error}>{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className={style.roh_contact_field}>
              <label className={style.roh_contact_label}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
                className={`${style.roh_contact_input} ${
                  errors.phone ? style.roh_contact_errorInput : ""
                }`}
                placeholder="9876543210"
              />
              {errors.phone && (
                <span className={style.roh_contact_error}>{errors.phone}</span>
              )}
            </div>

            {/* Subject */}
            <div className={style.roh_contact_field}>
              <label className={style.roh_contact_label}>Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                disabled={loading}
                className={`${style.roh_contact_input} ${
                  errors.subject ? style.roh_contact_errorInput : ""
                }`}
              >
                <option value="">-- Select Subject --</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Vehicle Rental Support">
                  Vehicle Rental Support
                </option>
                <option value="List My Vehicle">List My Vehicle</option>
                <option value="Payment or Billing">Payment or Billing</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Partnership / Business Inquiry">
                  Partnership / Business Inquiry
                </option>
              </select>
              {errors.subject && (
                <span className={style.roh_contact_error}>
                  {errors.subject}
                </span>
              )}
            </div>

            {/* Message */}
            <div className={style.roh_contact_field}>
              <label className={style.roh_contact_label}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                disabled={loading}
                className={`${style.roh_contact_textarea} ${
                  errors.message ? style.roh_contact_errorInput : ""
                }`}
                placeholder="Type your message..."
              ></textarea>
              {errors.message && (
                <span className={style.roh_contact_error}>
                  {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={style.roh_contact_btn}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
