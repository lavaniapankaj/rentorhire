'use client';
import styles from './admin.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {

  /** Admin login tkoen check - Coded by Raj - July 13 2025 */
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const authUserData = localStorage.getItem('authUser');
    const parsedAuthUserData = authUserData ? JSON.parse(authUserData) : null;
    
    if (!token || (parsedAuthUserData && parsedAuthUserData.role_id !== 1)) {
      // Redirect to the login page or handle the redirect logic here
      router.push('/auth/admin');
    }
  }, []); 
  /** Admin login tkoen check - Coded by Raj - July 13 2025 END */

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
