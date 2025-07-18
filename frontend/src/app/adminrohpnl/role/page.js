'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';
import AddRoleForm from './AddRoleForm';

export default function ListUserPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit] = useState(20); // Set limit to 20 roles per page
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const router = useRouter();

  // Fetch Roles List
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/role/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: 1,  // No pagination, just fetch the first 20 roles
          limit: limit,
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch roles');

      const data = await res.json();
      console.log(data);  // Log the full response to see the structure

      // Access roles from data.data (adjust if API response structure differs)
      setRoles(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(); // Fetch roles on component mount
  }, [limit]);

  const openAddNewRoleModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (loading) return <p>Loading roles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.rohpnl_wrapper} id="rohpnl_wrapper">
      <div>
        <button className={styles.rohpnl_addnewrole} id="rohpnl_addrolebtn" onClick={openAddNewRoleModal}>
          Add Role
        </button>
      </div>
      <h2 className={styles.rohpnl_heading} id="rohpnl_heading">Roles List</h2>

      {/* Role List */}
      <div className={styles.rohpnl_tableContainer} id="rohpnl_tableContainer">
        {roles.length > 0 ? (
          <table className={styles.rohpnl_table} id="rohpnl_table">
            <thead>
              <tr>
                <th>Role ID</th>
                <th>Role Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={index}>
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>{role.active === 1 ? 'Active' : 'Inactive'}</td>
                  <td>Edit | Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.rohpnl_noData} id="rohpnl_noData">No roles available</p>
        )}
      </div>

      {/* Modal for Add New Role */}
      {isModalOpen && (
        <AddRoleForm 
          onClose={closeModal} 
          onSuccess={() => {
            setIsModalOpen(false);
            fetchRoles();
          }} 
        />
      )}

    </div>
  );
}
