"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // To check the user is logged in or not
    const cookies = document.cookie.split(";").map(c => c.trim());
    const hasAuthToken = cookies.some(c => c.startsWith("authToken="));
    const hasAuthUser = cookies.some(c => c.startsWith("authUser="));
    setIsLoggedIn(hasAuthToken && hasAuthUser);
  }, []);

  const handleLogout = () => {
    // clear cookies
    document.cookie = "authToken=; Max-Age=0; path=/";
    document.cookie = "authUser=; Max-Age=0; path=/";

    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="#" style={styles.link}>About</Link>
        <Link href="#" style={styles.link}>Services</Link>
        <Link href="#" style={styles.link}>Contact</Link>
        <Link href="/dashboard" style={styles.link}>Dashboard</Link>

        {/* Logout button only if logged in */}
        {isLoggedIn && (
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: { background: "#222", padding: "15px 0" },
  nav: { display: "flex", justifyContent: "center", gap: "20px" },
  link: { color: "#fff", textDecoration: "none", fontWeight: "bold" },
  logoutBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
