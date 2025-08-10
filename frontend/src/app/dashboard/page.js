"use client";
import { useEffect, useState } from "react";
import Header from "../main/header";
import Footer from "../main/footer";

export default function DashboardPage() {
  const [tab, setTab] = useState("details");
  const [recent, setRecent] = useState([]);

  // Dummy user – yahan apne auth/user API se replace kar lena
  const user = {
    firstName: "Ravi",
    lastName: "Kumar",
    email: "ravi@example.com",
    phone: "+91 98765 43210",
    joined: "2024-06-12",
  };

  useEffect(() => {
    // localStorage me 'recentlyViewed' = [{id, type, title, location, pricePerDay}] expect karte hain
    try {
      const raw = localStorage.getItem("recentlyViewed");
      if (raw) {
        setRecent(JSON.parse(raw));
      } else {
        // Demo data (fallback)
        setRecent([
          { id: "car-12", type: "Car", title: "Hyundai Creta (AT)", location: "Gurugram", pricePerDay: 3200 },
          { id: "bike-07", type: "Bike", title: "Royal Enfield Classic 350", location: "Pune", pricePerDay: 1200 },
          { id: "cam-03", type: "Camera", title: "Sony A7 III + 28-70mm", location: "Delhi", pricePerDay: 1800 },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <Header />

      <main style={styles.wrap}>
        <h1 style={styles.h1}>Dashboard</h1>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            onClick={() => setTab("details")}
            style={{ ...styles.tabBtn, ...(tab === "details" ? styles.tabActive : {}) }}
          >
            User Details
          </button>
          <button
            onClick={() => setTab("recent")}
            style={{ ...styles.tabBtn, ...(tab === "recent" ? styles.tabActive : {}) }}
          >
            Recently Viewed
          </button>
        </div>

        {/* Panels */}
        {tab === "details" ? (
          <section style={styles.panel}>
            <div style={styles.infoRow}>
              <span style={styles.key}>Name</span>
              <span style={styles.val}>{user.firstName} {user.lastName}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.key}>Email</span>
              <span style={styles.val}>{user.email}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.key}>Phone</span>
              <span style={styles.val}>{user.phone}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.key}>Joined</span>
              <span style={styles.val}>{user.joined}</span>
            </div>
          </section>
        ) : (
          <section style={styles.panel}>
            {recent.length === 0 ? (
              <p style={{ margin: 0, color: "#64748b" }}>No items viewed yet.</p>
            ) : (
              <div style={styles.cardGrid}>
                {recent.map((item) => (
                  <article key={item.id} style={styles.card}>
                    <div style={styles.cardHead}>
                      <span style={styles.badge}>{item.type}</span>
                      <strong style={{ fontSize: 16 }}>{item.title}</strong>
                    </div>
                    <div style={styles.metaRow}>
                      <span style={styles.meta}>📍 {item.location}</span>
                      {"pricePerDay" in item && (
                        <span style={styles.price}>₹{item.pricePerDay}/day</span>
                      )}
                    </div>
                    <div style={styles.cardCtas}>
                      {/* Abhi navigation nahin — placeholders */}
                      <a href="#" style={styles.btnPrimarySm}>View</a>
                      <a href="#" style={styles.btnGhostSm}>Remove</a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

const styles = {
  wrap: {
    maxWidth: 960,
    margin: "30px auto",
    padding: "0 16px 40px",
  },
  h1: { margin: "0 0 14px", fontSize: 28 },

    tabs: {
    display: "flex",
    gap: 8,
    borderBottom: "1px solid #e5e7eb",
    marginBottom: 16,
    },
    tabBtn: {
    background: "transparent",
    border: "none",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 600,
    color: "#334155",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "transparent", // default
    },
    tabActive: { 
    borderBottomColor: "#2563eb", 
    color: "#111827" 
    },

  panel: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
  },

  infoRow: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    padding: "10px 0",
    borderBottom: "1px dashed #e5e7eb",
  },
  key: { color: "#64748b", fontWeight: 600 },
  val: { color: "#0f172a" },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 12,
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 14,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  cardHead: { display: "flex", flexDirection: "column", gap: 6 },
  badge: {
    alignSelf: "flex-start",
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 999,
    background: "#f1f5f9",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#475569",
    fontSize: 14,
  },
  meta: { },
  price: { fontWeight: 700, color: "#0f172a" },

  cardCtas: { display: "flex", gap: 8 },
  btnPrimarySm: {
    padding: "8px 12px",
    background: "#0ea5e9",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 14,
  },
  btnGhostSm: {
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    color: "#0f172a",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    background: "#fff",
  },
};
