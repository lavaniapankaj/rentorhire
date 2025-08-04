'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import styles from '../admin.module.css';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import ViewUser from './ViewUser';

export default function ListUserPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [editUser, setEditUser] = useState(null);
  const router = useRouter();

  const [filters, setFilters] = useState({
    user_name: '',
    user_role_id: '',
    active: '',
  });

  const [searchForm, setSearchForm] = useState({
    user_name: '',
    user_role_id: '',
    active: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const roleMap = roles.reduce((map, role) => {
    map[role.id] = role.name;
    return map;
  }, {});

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchUsers = async () => {
      if (!initialLoad) setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/adminrohpnl/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ page: currentPage, limit, ...filters }),
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        if (data.rcode == 0) router.push('/auth/admin');
        setUsers(data.data.users || []);
        setTotalPages(data.data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };
    fetchUsers();
  }, [currentPage, filters]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/adminrohpnl/role/roles');
        if (!res.ok) throw new Error('Failed to fetch roles');
        const data = await res.json();
        if (data.rcode == 0) router.push('/auth/admin');
        setRoles(data.data || []);
      } catch (err) {
        console.error('Role fetch error:', err);
      }
    };
    fetchRoles();
  }, []);

  const handleSearchFormChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(searchForm);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = async (user) => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/user/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });
      const data = await res.json();
      if (data.rcode == 0) router.push('/auth/admin');
      setEditUser(data.data[0]);
      setIsEditModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditUser(null);
  };

  const handleDeleteUser = async (user_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id }),
      });
      const data = await res.json();
      if (data.rcode == 0) router.push('/auth/admin');
      if (!res.ok) throw new Error('Failed to delete user');
      alert('User deleted successfully');
      setFilters({ ...filters }); // refresh
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting user.');
    }
  };

  const openViewModal = async (user) => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/user/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ user_id: user.user_id }),
      });
      const data = await res.json();
      if (data.rcode == 0) router.push('/auth/admin');
      setViewUser(data.data[0]);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewUser(null);
  };

  return (
    <div className={styles.rohpnl_wrapper} id="rohpnl_wrapper">
      {/* Header & Filter UI (always visible) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 className={styles.rohpnl_heading}>All Users</h2>
        <button onClick={openModal} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}>
          Add New User
        </button>
      </div>

      <div style={{ marginBottom: 30 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label>User Info:</label><br />
            <input
              type="text"
              name="user_name"
              value={searchForm.user_name}
              onChange={handleSearchFormChange}
              style={{ padding: 6, width: 200 }}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div>
            <label>User Role:</label><br />
            <select
              name="user_role_id"
              value={searchForm.user_role_id}
              onChange={handleSearchFormChange}
              style={{ padding: 6, width: 200 }}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Status:</label><br />
            <select
              name="active"
              value={searchForm.active}
              onChange={handleSearchFormChange}
              style={{ padding: 6, width: 200 }}
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '6px 14px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: 4 }}>
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className={styles.rohpnl_tableContainer}>
        <table className={styles.rohpnl_table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>User Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{ textAlign: 'center' }}>Loading data...</td></tr>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}  className={user.active === 0 ? 'rohuserinactive' : 'rohuseractive'}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{roleMap[user.user_role_id] || 'Unknown Role'}</td>
                  <td>{user.active === 1 ? 'Active' : 'Inactive'}</td>
                  <td className={user.active === 0 ? 'rohadminpnliuserdelete' : ''}>
                    <button onClick={() => openEditModal(user)}>Edit</button> | 
                    <button
                      onClick={() => handleDeleteUser(user.user_id)}
                      disabled={user.active === 0}
                      style={{ color: user.active === 0 ? '#aaa' : '#000', cursor: user.active === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      Delete
                    </button> | 
                    <button onClick={() => openViewModal(user)}>View</button>
                  </td>

                </tr>
              ))
            ) : (
              <tr><td colSpan="9" style={{ textAlign: 'center' }}>No users available</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1 || loading} style={{ marginRight: 10 }}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages || loading} style={{ marginLeft: 10 }}>
          Next
        </button>
        {loading && !initialLoad && <div style={{ marginTop: 10 }}>Updating...</div>}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className={styles.modalContent}>
            <button onClick={closeModal} className={styles.modalCloseButton}>×</button>
            <AddUserForm onClose={closeModal} onSuccess={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {isEditModalOpen && editUser && (
        <EditUserForm user={editUser} roles={roles} onClose={closeEditModal} onSuccess={() => { setFilters((prev) => ({ ...prev })); closeEditModal(); }} />
      )}

      {isViewModalOpen && viewUser && (
        <ViewUser user={viewUser} onClose={closeViewModal} />
      )}
    </div>
  );
}
