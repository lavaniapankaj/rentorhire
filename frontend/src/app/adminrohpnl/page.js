'use client';
import styles from './admin.module.css';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {

  /** Admin login token check - Coded by Raj - July 15 2025 */
  const router = useRouter();
  useEffect(() => {
    /** Checking for the token and redirecting on the dashboard if the token is not expired */
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const token = getCookie('authToken');
    const authUserData = getCookie('authUser');
    
    const parsedAuthUserData = authUserData ? JSON.parse(authUserData) : null;
    
    let isTokenExpired = false;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        if (decodedToken.exp < currentTime) {
          isTokenExpired = true;
        }
      } catch (err) {
        isTokenExpired = true;
      }
    }

    if (!token || isTokenExpired || (parsedAuthUserData && parsedAuthUserData.role_id !== 1)) {
      // Redirect to the login page
      router.push('/auth/admin');
    }
  }, []); 
  /** Admin login token check - Coded by Raj - July 15 2025 END */

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome, Admin</h2>
      <p className={styles.intro}>This is your control panel. Manage categories, users, and app settings from here.</p>

      {/* Stats Section */}
      <div className={styles.section}>
        <h3>Stats Overview</h3>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <strong>24</strong>
            <p>Total Categories</p>
          </div>
          <div className={styles.card}>
            <strong>157</strong>
            <p>Registered Users</p>
          </div>
          <div className={styles.card}>
            <strong>3</strong>
            <p>Pending Requests</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className={styles.section}>
        <h3>Recent Activity</h3>
        <ul className={styles.activityList}>
          <li>Category "Electronics" added</li>
          <li>User "LXGyS@example.com" registered</li>
          <li>Request to delete "Outdated Products" category</li>
        </ul>
      </div>
    </div>
  )
}
