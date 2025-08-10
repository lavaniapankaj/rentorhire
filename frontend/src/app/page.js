"use client";
import Header from "./main/header"; 
import Footer from "./main/footer"; 
import Link from "next/link";

export default function HomePage() {
  const categories = [
    { slug: "cars", name: "Cars", icon: "🚗" },
    { slug: "bikes", name: "Bikes", icon: "🏍️" },
    { slug: "cameras", name: "Cameras", icon: "📷" },
    { slug: "tools", name: "Tools", icon: "🧰" },
  ];

  const cars = [
    {
      id: 1,
      name: "Maruti Swift (Petrol, MT)",
      pricePerDay: 1800,
      img: "/images/cars/swift.jpg",
      location: "Delhi NCR",
    },
    {
      id: 2,
      name: "Hyundai Creta (Diesel, AT)",
      pricePerDay: 3200,
      img: "/images/cars/creta.jpg",
      location: "Gurugram",
    },
    {
      id: 3,
      name: "Tata Nexon (Petrol, AMT)",
      pricePerDay: 2600,
      img: "/images/cars/nexon.jpg",
      location: "Jaipur",
    },
    {
      id: 4,
      name: "Mahindra XUV700 (Diesel, AT)",
      pricePerDay: 4200,
      img: "/images/cars/xuv700.jpg",
      location: "Pune",
    },
  ];

  const bikes = [
    {
      id: 1,
      name: "Honda Activa 6G",
      pricePerDay: 500,
      img: "/images/bikes/activa.jpg",
      location: "Jaipur",
    },
    {
      id: 2,
      name: "Royal Enfield Classic 350",
      pricePerDay: 1200,
      img: "/images/bikes/classic350.jpg",
      location: "Pune",
    },
    {
      id: 3,
      name: "Bajaj Pulsar 150",
      pricePerDay: 700,
      img: "/images/bikes/pulsar150.jpg",
      location: "Delhi",
    },
    {
      id: 4,
      name: "KTM Duke 250",
      pricePerDay: 1500,
      img: "/images/bikes/duke250.jpg",
      location: "Bengaluru",
    },
  ];

  return (
    <>
      <Header />

      <main style={styles.main}>
        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroInner}>
            <h1 style={styles.h1}>Rent On-Demand — Cars, Bikes, Cameras & More</h1>
            <p style={styles.sub}>
              Daily, weekly ya monthly rental. No deposit* options, verified listings, fast pickup.
            </p>
            <div style={styles.ctas}>
              <a href="#categories" style={styles.btnPrimary}>Browse Categories</a>
              <a href="#featured" style={styles.btnGhost}>View Featured</a>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" style={styles.section}>
          <h2 style={styles.h2}>Top Categories</h2>
          <div style={styles.grid}>
            {categories.map((c) => (
              <a key={c.slug} href="#" style={styles.catCard}>
                <span style={styles.catIcon}>{c.icon}</span>
                <span style={styles.catName}>{c.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Featured – Cars */}
        <section id="featured" style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.h2}>Featured Cars</h2>
            <a href="#" style={styles.link}>See all →</a>
          </div>
          <div style={styles.cardGrid}>
            {cars.map((car) => (
              <article key={car.id} style={styles.card}>
                <div style={styles.imageWrap}>
                  <img
                    src={car.img}
                    alt={car.name}
                    style={styles.img}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{car.name}</h3>
                  <p style={styles.meta}>{car.location}</p>
                  <p style={styles.price}>₹{car.pricePerDay}/day</p>
                  <div style={styles.cardCtas}>
                    <a href="#" style={styles.btnPrimarySm}>Rent Now</a>
                    <a href="#" style={styles.btnGhostSm}>Details</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Featured – Bikes */}
        <section style={styles.section}>
          <div style={styles.sectionHead}>
            <h2 style={styles.h2}>Popular Bikes</h2>
            <a href="#" style={styles.link}>See all →</a>
          </div>
          <div style={styles.cardGrid}>
            {bikes.map((bike) => (
              <article key={bike.id} style={styles.card}>
                <div style={styles.imageWrap}>
                  <img
                    src={bike.img}
                    alt={bike.name}
                    style={styles.img}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{bike.name}</h3>
                  <p style={styles.meta}>{bike.location}</p>
                  <p style={styles.price}>₹{bike.pricePerDay}/day</p>
                  <div style={styles.cardCtas}>
                    <a href="#" style={styles.btnPrimarySm}>Rent Now</a>
                    <a href="#" style={styles.btnGhostSm}>Details</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Trust badges / USPs */}
        <section style={{ ...styles.section, ...styles.uspWrap }}>
          <div style={styles.usp}>
            <strong>Verified Owners</strong>
            <span>Documents checked</span>
          </div>
          <div style={styles.usp}>
            <strong>Transparent Pricing</strong>
            <span>No hidden fees</span>
          </div>
          <div style={styles.usp}>
            <strong>Support</strong>
            <span>7 days a week</span>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const styles = {
  main: { minHeight: "70vh", padding: "0", margin: 0 },
  hero: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
    color: "#fff",
    padding: "60px 20px",
    textAlign: "center",
  },
  heroInner: { maxWidth: 1100, margin: "0 auto" },
  h1: { fontSize: "32px", lineHeight: 1.2, margin: "0 0 10px" },
  sub: { opacity: 0.9, margin: "0 0 20px" },
  ctas: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },

  btnPrimary: {
    display: "inline-block",
    padding: "10px 16px",
    background: "#22c55e",
    color: "#0b1428",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 700,
  },
  btnGhost: {
    display: "inline-block",
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.6)",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 600,
  },

  section: { maxWidth: 1100, margin: "40px auto", padding: "0 20px" },
  h2: { fontSize: 24, margin: "0 0 16px" },
  link: { textDecoration: "none", color: "#2563eb", fontWeight: 600 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 16,
  },
  catCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 16,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: 600,
    justifyContent: "center",
  },
  catIcon: { fontSize: 22 },
  catName: {},

  sectionHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  imageWrap: { height: 160, background: "#f1f5f9" },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  cardBody: { padding: 14, display: "flex", flexDirection: "column", gap: 8 },
  cardTitle: { margin: 0, fontSize: 18 },
  meta: { margin: 0, color: "#64748b", fontSize: 14 },
  price: { margin: "2px 0 8px", fontWeight: 700 },

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

  uspWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  usp: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
};
