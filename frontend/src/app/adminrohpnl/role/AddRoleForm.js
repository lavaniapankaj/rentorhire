'use client'
import { useState } from 'react';
import styles from '../admin.module.css';

export default function AddRoleForm({ onClose, onSuccess }) {
  const [roleName, setRoleName] = useState('');
  const [status, setStatus] = useState(1); // Default active status
  const [addId] = useState(1); // Static value for add_id (adjust if dynamic)
  const [eddId] = useState(1); // Static value for edd_id (adjust if dynamic)
  
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/role/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: roleName,
          active: status,
          add_id: addId,  // Send add_id as part of the request
          edd_id: eddId,  // Send edd_id as part of the request
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add role'); // Show the message from the API
      }

      onSuccess(); // Call the success callback to close modal and refresh roles
    } catch (err) {
      setErrorMessage(err.message); // Show error message from API or other errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addRoleForm}>
      <h3>Add New Role</h3>

      <div className={styles.formField}>
        <label htmlFor="roleName">Role Name</label>
        <input
          type="text"
          id="roleName"
          value={roleName}
          onChange={handleRoleNameChange}
          required
        />
      </div>

      <div className={styles.formField}>
        <label>Status</label>
        <select value={status} onChange={handleStatusChange}>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
      </div>

      {/* Show error message if there is one */}
      {errorMessage && (
        <div className={styles.errorMessage}>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitBtn}>Save</button>
        <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
