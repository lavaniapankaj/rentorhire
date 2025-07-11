'use client'
import { useState, useEffect } from 'react';

export default function ListUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(4);

  // Filter state
  const [filters, setFilters] = useState({
    user_name: '',
    user_role_id: '',
    active: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/adminrohpnl/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: currentPage,
            limit: limit,
            ...filters, // Include filters in the request
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('API Response:', data);

        setUsers(data.data.users || []);
        setTotalPages(data.data.totalPages || 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, limit, filters]); // Run again if currentPage or filters change

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    setCurrentPage(1); // Reset to page 1 when search is clicked
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error:- {error}</p>;
  }

  return (
    <div>
      <h2>List User Page </h2>
      <p>This is the page to show all users.</p>

      {/* Filter Section */}
      <div>
        <h3>Search Users</h3>
        <form onSubmit={handleSearch}>
          <label>
            User Name:
            <input
              type="text"
              name="user_name"
              value={filters.user_name}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            User Role:
            <input
              type="text"
              name="user_role_id"
              value={filters.user_role_id}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Active:
            <select name="active" value={filters.active} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </label>
          <button type="submit">Search</button>
        </form>
      </div>

      {/* User Table */}
      {users.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>User Role ID</th>
              <th>Active</th>
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
                <td>{user.user_role_id}</td>
                <td>{user.active === 1 ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}

      {/* Pagination Section */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
