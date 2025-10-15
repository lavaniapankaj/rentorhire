"use client";
import { useState } from "react";
import styles from "./inquiry.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;

export default function ViewEntry({ entryId }) {
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/viewsinglecontactusentry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: entryId }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch entry");
      }

      setEntry(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className={styles.roh_admin_view_btn} onClick={handleOpen}>
        View
      </button>

      {open && (
        <div
          className={styles.roh_admin_modal_overlay}
          onClick={() => setOpen(false)}
        >
          <div
            className={styles.roh_admin_modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.roh_modal_header}>
              <h3>Contact Inquiry Details</h3>
              <button
                className={styles.roh_admin_close_btn}
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {loading ? (
              <p className={styles.roh_modal_loading}>Loading...</p>
            ) : error ? (
              <p className={styles.roh_modal_error}>{error}</p>
            ) : entry ? (
              <div className={styles.roh_modal_content}>
                <div className={styles.roh_modal_field}>
                  <strong>Name:</strong> <span>{entry.full_name}</span>
                </div>
                <div className={styles.roh_modal_field}>
                  <strong>Email:</strong> <span>{entry.email}</span>
                </div>
                <div className={styles.roh_modal_field}>
                  <strong>Phone:</strong> <span>{entry.phone}</span>
                </div>
                <div className={styles.roh_modal_field}>
                  <strong>Subject:</strong> <span>{entry.subject}</span>
                </div>

                <div className={styles.roh_modal_field}>
                  <strong>Message:</strong>
                  <p className={styles.roh_modal_message}>{entry.message}</p>
                </div>

                <div className={styles.roh_modal_field}>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      entry.email_status === "sent"
                        ? styles.status_sent
                        : styles.status_failed
                    }
                  >
                    {entry.email_status}
                  </span>
                </div>

                {/* NEW FIELDS */}
                {/* <div className={styles.roh_modal_field}>
                  <strong>To Email:</strong>{" "}
                  <span>{entry.to_email || "—"}</span>
                </div> */}
                <div className={styles.roh_modal_field}>
                  <strong>IP Address:</strong>{" "}
                  <span>{entry.ip_address || "—"}</span>
                </div>

                <div className={styles.roh_modal_field}>
                  <strong>Date:</strong> <span>{entry.created_at}</span>
                </div>
              </div>
            ) : (
              <p className={styles.roh_modal_error}>No details found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
