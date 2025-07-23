'use client';
import { useEffect, useState, useRef } from 'react';

export default function CityList() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const didFetch = useRef(false); // Prevent double fetch

  const fetchCities = async (page = currentPage, searchTerm = search, status = statusFilter) => {
    setLoading(true);
    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/city/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          page,
          limit,
          search: searchTerm,
          status,
        }),
      });

      const data = await res.json();

      if (data.status) {
        setCities(data.data.data || []);
        setTotalPages(data.data.totalPages || 1);
        setCurrentPage(data.data.currentPage || 1);
      } else {
        setCities([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Run only once
  useEffect(() => {
    if (!didFetch.current) {
      fetchCities();
      didFetch.current = true;
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    setSearch(trimmed);
    setCurrentPage(1);
    fetchCities(1, trimmed, statusFilter);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
    setCurrentPage(1);
    fetchCities(1, '', statusFilter);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatusFilter(newStatus);
    setCurrentPage(1);
    fetchCities(1, search, newStatus);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCities(nextPage, search, statusFilter);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchCities(prevPage, search, statusFilter);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>City List</h2>

      {/* Filter Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ padding: '6px', minWidth: 200 }}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>

        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">All</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </form>

      {/* Table */}
      {loading ? (
        <p>Loading cities...</p>
      ) : cities.length === 0 ? (
        <p>No cities found.</p>
      ) : (
        <>
          <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr>
                <th>ID</th>
                <th>City Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>State ID</th>
                <th>Added On</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.city_id}>
                  <td>{city.city_id}</td>
                  <td>{city.city_name}</td>
                  <td>{city.city_slug}</td>
                  <td>{city.active === 1 ? 'Active' : 'Inactive'}</td>
                  <td>{city.state_id}</td>
                  <td>{new Date(city.add_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: 15, display: 'flex', gap: 15, alignItems: 'center' }}>
            <button onClick={handlePrev} disabled={currentPage === 1 || loading}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages || loading}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
