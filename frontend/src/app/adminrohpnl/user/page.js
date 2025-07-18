'use client'
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
  const [limit] = useState(1);
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

  // NEW: For View Modal
  const [viewUser, setViewUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const roleMap = roles.reduce((map, role) => {
    map[role.id] = role.name;
    return map;
  }, {});

  useEffect(() => {
    
  const token = localStorage.getItem('authToken');
  const authUserData = localStorage.getItem('authUser');
  const parsedAuthUserData = authUserData ? JSON.parse(authUserData) : null;
  console.log(token, parsedAuthUserData);
  if (!token || (parsedAuthUserData && parsedAuthUserData.role_id !== 1)) {
    // Redirect to the login page or handle the redirect logic here
    router.push('/auth/admin');
  }

    const fetchUsers = async () => {
      if (!initialLoad) setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/adminrohpnl/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            page: currentPage,
            limit,
            ...filters,
          }),
        });

        if (!res.ok) throw new Error('Failed to fetch users');

        const data = await res.json();
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
        setRoles(data.data || []);
      } catch (err) {
        console.error('Role fetch error:', err);
      }
    };

    fetchRoles();
  }, []);

  const handleSearchFormChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/user/view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });

      if (!res.ok) throw new Error('Failed to fetch user details');

      const data = await res.json();
      const userData = data.data[0];
      setEditUser(userData);
      setIsEditModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditUser(null);
  };

  /** DELETE USER */
  const handleDeleteUser = async (user_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      });

      if (!res.ok) throw new Error('Failed to delete user');

      alert('User deleted successfully');
      setFilters({ ...filters }); // trigger refresh with current filters
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred while deleting the user.');
    }
  };

  // NEW: Open View Modal & fetch user details
  const openViewModal = async (user) => {
    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/user/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.user_id }),
      });
      if (!res.ok) throw new Error('Failed to fetch user details');
      const data = await res.json();
      const userData = data.data[0];
      setViewUser(userData);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewUser(null);
  };

  if (initialLoad && loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.rohpnl_wrapper} id="rohpnl_wrapper">
      <div className={styles.rohpnl_add_newbtn} id="rohpnl_add_newbtn">
        <button className={styles.rohpnl_add_newbtn} onClick={openModal}>
          Add New User
        </button>
      </div>
      <h2 className={styles.rohpnl_heading} id="rohpnl_heading">All Users</h2>

      {/* Filter Form */}
      <div className={styles.rohpnl_filterBox} id="rohpnl_filterBox">
        <h3 className={styles.rohpnl_filterTitle} id="rohpnl_filterTitle">Search Users</h3>
        <form onSubmit={handleSearch} className={styles.rohpnl_filterForm} id="rohpnl_filterForm">
          <div className={styles.rohpnl_filterField}>
            <label>User Info:</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={searchForm.user_name}
              onChange={handleSearchFormChange}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.rohpnl_filterField}>
            <label>User Role:</label>
            <select
              id="user_role_id"
              name="user_role_id"
              value={searchForm.user_role_id}
              onChange={handleSearchFormChange}
              className={styles.filterSelect}
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.rohpnl_filterField}>
            <label>Status:</label>
            <select
              id="active"
              name="active"
              value={searchForm.active}
              onChange={handleSearchFormChange}
              className={styles.filterSelect}
            >
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div className={styles.rohpnl_filterActions}>
            <button type="submit" className={styles.rohpnl_btn}>
              Search
            </button>
          </div>
        </form>
      </div>

      {/* User Table */}
      <div className={styles.rohpnl_tableContainer} id="rohpnl_tableContainer">
        {users.length > 0 ? (
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
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.user_id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{roleMap[user.user_role_id] || 'Unknown Role'}</td>
                  <td>{user.active === 1 ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button onClick={() => openEditModal(user)}>Edit</button> | 
                    <button onClick={() => handleDeleteUser(user.user_id)}>Delete</button> | 
                    <button onClick={() => openViewModal(user)} className={styles.actionButton}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.rohpnl_noData} id="rohpnl_noData">No users available</p>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.rohpnl_pagination} id="rohpnl_pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || loading}
          className={styles.rohpnl_btn}
        >
          Previous
        </button>
        <span className={styles.rohpnl_pageInfo}>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading}
          className={styles.rohpnl_btn}
        >
          Next
        </button>
        {loading && !initialLoad && (
          <span className={styles.rohpnl_loadingText}>Updating...</span>
        )}
      </div>

      {/* Add New User Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 1000
        }}>
          <div className={styles.modalContent}>
            <button 
              className={styles.modalCloseButton}
              onClick={closeModal}>
              ×
            </button>
            <AddUserForm onClose={closeModal} onSuccess={() => { setIsModalOpen(false); }} />
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalCloseButton} onClick={closeEditModal}>×</button>
            <EditUserForm
              user={editUser}
              roles={roles}
              onClose={closeEditModal}
              onSuccess={() => {
                setFilters((prev) => ({ ...prev })); /** refresh */
                closeEditModal(); /** modal close */
              }}
            />
          </div>
        </div>
      )}

      {/* View User Modal */}
      {isViewModalOpen && viewUser && (
        <ViewUser user={viewUser} onClose={closeViewModal} />
      )}
    </div>
  )
}