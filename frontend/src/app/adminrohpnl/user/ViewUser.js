'use client';
import styles from '../admin.module.css';

export default function ViewUser({ user, onClose }) {
  if (!user) return null;

  return (
    <div className={styles.roh_modal_overlay}>
      <div className={styles.roh_viewuser_modal}>
        <button className={styles.modalCloseButton} onClick={onClose}>×</button>
        <h2>User Details</h2>
        <div className={styles.viewuser_details}>
          <p><strong>Username:</strong> {user.user_name}</p>
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
          <p><strong>Address:</strong> {user.address_1}, {user.landmark}, {user.city}, {user.state} - {user.pincode}</p>
          <p><strong>Status:</strong> {user.active === 1 ? 'Active' : 'Inactive'}</p>
          {/* Add more fields if needed */}
        </div>
        <button onClick={onClose} className={styles.roh_close_btn}>Close</button>
      </div>
    </div>
  );
}
