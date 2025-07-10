import styles from './admin.module.css'

export default function AdminDashboard() {
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
