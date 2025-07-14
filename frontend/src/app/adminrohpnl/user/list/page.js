'use client'
import { useState, useEffect } from 'react';
import styles from '../../admin.module.css'
import AddUserForm from './AddUserForm';

export default function ListUserPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);

  // Filters used in API call
  const [filters, setFilters] = useState({
    user_name: '',
    user_role_id: '',
    active: '',
  });

  // Form state (temporary before submit)
  const [searchForm, setSearchForm] = useState({
    user_name: '',
    user_role_id: '',
    active: '',
  });

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map role_id to role_name
  const roleMap = roles.reduce((map, role) => {
    map[role.id] = role.name;
    return map;
  }, {});

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      if (!initialLoad) setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/adminrohpnl/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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

  // Fetch Roles
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

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
          <div className={styles.rohpnl_filterField} id="rohpnl_filterField">
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
  
          <div className={styles.rohpnl_filterField} id="rohpnl_filterField">
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
  
          <div className={styles.rohpnl_filterField} id="rohpnl_filterField">
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
  
          <div className={styles.rohpnl_filterActions} id="rohpnl_filterActions">
            <button type="submit" className={styles.rohpnl_btn} id="rohpnl_btn rohpnl_btn--primary">Search</button>
          </div>
        </form>
      </div>
  
      {/* User Table */}
      <div className={styles.rohpnl_tableContainer} id="rohpnl_tableContainer">
        {users.length > 0 ? (
          <table className={styles.rohpnl_table} id="rohpnl_table">
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
          className={styles.rohpnl_btn} id="rohpnl_btn rohpnl_btn--secondary"
        >
          Previous
        </button>
        <span className={styles.rohpnl_pageInfo} id="rohpnl_pageInfo">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || loading}
          className={styles.rohpnl_btn} id="rohpnl_btn rohpnl_btn--secondary"
        >
          Next
        </button>
        {loading && !initialLoad && (
          <span className={styles.rohpnl_loadingText} id="rohpnl_loadingText">Updating...</span>
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
      {/* Include AddUserForm Component here */}
      <AddUserForm onClose={closeModal} onSuccess={() => { setIsModalOpen(false); }} />
    </div>
  </div>
)}


    </div>
  );
}
