"use client";
import { useEffect, useState } from "react";
import Header from "../main/header";
import Footer from "../main/footer";

export default function DashboardPage() {
  const [tab, setTab] = useState("details");
  const [recent, setRecent] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address_1: "" || "",
    landmark: "" || "",
    state: "" || "",
    city: "" || "",
    pincode: "" || "",
  });

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const authUserData = getCookie("authUser");
    const parsedAuthUserData = authUserData ? JSON.parse(authUserData) : null;

    if (parsedAuthUserData?.id) {
      fetchUserDetails(parsedAuthUserData.id);
    } else {
      console.warn("No user data found in cookies");
    }

    try {
      const raw = localStorage.getItem("recentlyViewed");
      if (raw) {
        setRecent(JSON.parse(raw));
      } else {
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

  async function fetchUserDetails(userId) {
    try {
      const res = await fetch("http://localhost:8080/user/userdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!res.ok) throw new Error("Failed to fetch user details");

      const data = await res.json();
      setUser(data);
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        address_1: data.address_1 || "",
        landmark: data.landmark || "",
        state: data.state || "",
        city: data.city || "",
        pincode: data.pincode || ""
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateProfile() {
    try {
      const res = await fetch("http://localhost:8080/user/edituserdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.user_id,
          ...formData
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile updated successfully!");
        setShowModal(false);
        fetchUserDetails(user.user_id);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <>
      <Header />

      <main style={styles.wrap}>
        <h1 style={styles.h1}>Dashboard</h1>

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

        {tab === "details" ? (
          <section style={styles.panel}>
            {user ? (
              <>
                <div style={styles.infoRow}><span style={styles.key}>Name</span><span style={styles.val}>{user.first_name} {user.last_name}</span></div>
                <div style={styles.infoRow}><span style={styles.key}>Email</span><span style={styles.val}>{user.email}</span></div>
                <div style={styles.infoRow}><span style={styles.key}>Phone</span><span style={styles.val}>{user.phone_number}</span></div>
                <div style={styles.infoRow}><span style={styles.key}>Address</span><span style={styles.val}>{user.address_1}</span></div>
                <div style={styles.infoRow}><span style={styles.key}>Landmark</span><span style={styles.val}>{user.landmark}</span></div>
                <div style={styles.infoRow}><span style={styles.key}>City</span><span style={styles.val}>{user.city}</span></div>
                <div style={styles.infoRow}><span style={styles.key}>State</span><span style={styles.val}>{user.state}</span></div>
                <div style={styles.infoRow}><span style={styles.key}>Pincode</span><span style={styles.val}>{user.pincode}</span></div>

                <button onClick={() => setShowModal(true)} style={styles.btnPrimary}>Edit Profile</button>
              </>
            ) : (
              <p>Loading user details...</p>
            )}
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

      {showModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h2>Edit Profile</h2>

            <input placeholder="First Name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} style={styles.input} />
            <input placeholder="Last Name" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} style={styles.input} />
            <input placeholder="Email" value={formData.email} readOnly style={{ ...styles.input, backgroundColor: "#f1f5f9", color: "#6b7280" }} />
            <input placeholder="Phone Number" value={formData.phone_number} maxLength={10} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value.replace(/\D/g, "") })} style={styles.input} />
            <input placeholder="Address Line 1" value={formData.address_1} onChange={(e) => setFormData({ ...formData, address_1: e.target.value })} style={styles.input} />
            <input placeholder="Landmark" value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} style={styles.input} />
            <input placeholder="State" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} style={styles.input} />
            <input placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} style={styles.input} />
            <input placeholder="Pincode" value={formData.pincode} maxLength={6} onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })} style={styles.input} />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: 20 }}>
              <button onClick={() => setShowModal(false)} style={styles.btnGhostSm}>Cancel</button>
              <button onClick={handleUpdateProfile} style={styles.btnPrimarySm}>Save</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

const styles = {
  wrap: { padding: 30, maxWidth: 800, margin: "0 auto" },
  h1: { fontSize: 28, marginBottom: 30 },
  tabs: { display: "flex", gap: "1rem", marginBottom: 30 },
  tabBtn: {
    padding: "10px 20px", background: "#e2e8f0",
    border: "none", borderRadius: 8, cursor: "pointer"
  },
  tabActive: { background: "#1e40af", color: "#fff" },
  panel: { padding: 20, border: "1px solid #e5e7eb", borderRadius: 10 },
  infoRow: {
    display: "flex", justifyContent: "space-between",
    padding: "8px 0", borderBottom: "1px solid #f1f1f1"
  },
  key: { color: "#6b7280" },
  val: { fontWeight: "bold" },
  btnPrimary: {
    marginTop: 20, background: "#2563eb",
    color: "#fff", padding: "10px 20px",
    borderRadius: 8, border: "none", cursor: "pointer"
  },
  cardGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  card: { padding: 20, border: "1px solid #ddd", borderRadius: 10 },
  cardHead: { marginBottom: 10 },
  badge: {
    fontSize: 12, background: "#e0e7ff",
    color: "#3730a3", padding: "2px 8px",
    borderRadius: 6, marginRight: 6
  },
  metaRow: { display: "flex", justifyContent: "space-between", marginTop: 10 },
  meta: { fontSize: 14, color: "#475569" },
  price: { fontWeight: "bold", color: "#1e3a8a" },
  cardCtas: { marginTop: 10, display: "flex", gap: "0.5rem" },
  btnPrimarySm: {
    background: "#2563eb", color: "#fff",
    padding: "6px 12px", fontSize: 14,
    borderRadius: 6, border: "none", cursor: "pointer"
  },
  btnGhostSm: {
    background: "#f1f5f9", color: "#1e293b",
    padding: "6px 12px", fontSize: 14,
    borderRadius: 6, border: "none", cursor: "pointer"
  },
  modalBackdrop: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff", padding: 30,
    borderRadius: 12, width: 400,
    boxShadow: "0 0 20px rgba(0,0,0,0.2)"
  },
  input: {
    width: "100%", padding: "10px", marginBottom: "10px",
    borderRadius: 6, border: "1px solid #ccc", fontSize: 14
  }
};
