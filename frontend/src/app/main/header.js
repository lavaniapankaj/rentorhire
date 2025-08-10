"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="#" style={styles.link}>About</Link>
        <Link href="#" style={styles.link}>Services</Link>
        <Link href="#" style={styles.link}>Contact</Link>
        <Link href="#" style={styles.link}>Dashboard</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: { background: "#222", padding: "15px 0" },
  nav: { display: "flex", justifyContent: "center", gap: "20px" },
  link: { color: "#fff", textDecoration: "none", fontWeight: "bold" },
};
