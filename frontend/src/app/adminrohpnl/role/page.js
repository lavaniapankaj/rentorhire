'use client';
import { useState, useEffect } from 'react';
import AddRoleForm from './AddRoleForm';
import EditRoleForm from './EditRoleForm';

export default function ListUserPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit] = useState(20);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  // Fetch Roles List
  const token = localStorage.getItem('authToken');
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/role/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          page: 1,
          limit: limit,
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch roles');

      const data = await res.json();
      setRoles(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [limit]);

  // Handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (roleId) => {
    setSelectedRoleId(roleId);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRoleId(null);
  };

  if (loading) return <p>Loading roles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '30px' }}>
      <button onClick={openAddModal} style={{ padding: '8px 16px', marginBottom: '20px' }}>
        Add Role
      </button>

      <h2>Roles List</h2>

      {roles.length > 0 ? (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Role ID</th>
              <th>Role Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>{role.active === 1 ? 'Active' : 'Inactive'}</td>
                <td>
                  <button onClick={() => openEditModal(role.id)}>Edit</button>
                  {' | '}
                  <button onClick={() => alert('In Progress.......')}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No roles available.</p>
      )}

      {/* Add Role Modal */}
      {isAddModalOpen && (
        <AddRoleForm
          onClose={closeAddModal}
          onSuccess={() => {
            closeAddModal();
            fetchRoles();
          }}
        />
      )}

      {/* Edit Role Modal */}
      {isEditModalOpen && selectedRoleId && (
        <EditRoleForm
          roleId={selectedRoleId}
          onClose={closeEditModal}
          onSuccess={() => {
            closeEditModal();
            fetchRoles();
          }}
        />
      )}
    </div>
  );
}
