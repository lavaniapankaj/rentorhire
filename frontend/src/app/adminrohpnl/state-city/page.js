'use client';

import { useState, useEffect } from 'react';
import AddStateForm from './AddStateForm';

export default function StateCityPage() {
  const [activeTab, setActiveTab] = useState('states');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'

  const [isAddStateOpen, setIsAddStateOpen] = useState(false);

  const limit = 5;

  // Fetch states function
  useEffect(() => {
    if (activeTab !== 'states') return;

    const fetchStates = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      try {
        const res = await fetch('http://localhost:8080/api/adminrohpnl/state/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            page: currentPage,
            limit: limit,
            search: searchTerm,
            status: statusFilter,
          }),
        });

        if (!res.ok) throw new Error('Failed to fetch states');

        const data = await res.json();

        if (data.status) {
          setStates(data.data || []);
          setTotalPages(data.totalPages || Math.ceil(data.totalCount / limit) || 1);
        } else {
          setStates([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [currentPage, activeTab, searchTerm, statusFilter]);

  // Fetch cities (dummy data)
  useEffect(() => {
    if (activeTab === 'cities') {
      setCities([
        { id: 1, name: 'Los Angeles' },
        { id: 2, name: 'Houston' },
        { id: 3, name: 'Chicago' },
      ]);
    }
  }, [activeTab]);

  // Handlers
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  // Called after a new state is added successfully
  const handleStateAdded = () => {
    setIsAddStateOpen(false);
    setCurrentPage(1);
    setSearchTerm('');
    setSearchInput('');
    setStatusFilter('all');
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="rohstate_tabs" style={{ marginBottom: 20 }}>
        <button
          onClick={() => handleTabClick('states')}
          className={activeTab === 'states' ? 'rohstate_active' : ''}
          style={{ marginRight: 10, padding: '8px 16px' }}
        >
          States
        </button>
        <button
          onClick={() => handleTabClick('cities')}
          className={activeTab === 'cities' ? 'rohcity_active' : ''}
          style={{ padding: '8px 16px' }}
        >
          Cities
        </button>
      </div>

      {/* STATES TAB */}
      {activeTab === 'states' && (
        <div className="rohstate_container">
          <h2>States</h2>

          <div style={{ marginBottom: 20, display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by state name"
                style={{ padding: 8, minWidth: 200 }}
              />
              <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
              <button
                type="button"
                onClick={handleClearSearch}
                style={{ padding: '8px 16px' }}
              >
                Clear
              </button>
            </form>

            {/* Status Filter */}
            <select value={statusFilter} onChange={handleStatusChange} style={{ padding: 8, minWidth: 120 }}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Add New State Button */}
            <button
              onClick={() => setIsAddStateOpen(true)}
              style={{ marginLeft: 'auto', padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4 }}
            >
              Add New State
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table className="rohstate_table" border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f0f0f0' }}>
                  <tr>
                    <th>State ID</th>
                    <th>State Name</th>
                    <th>State Slug</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {states.length > 0 ? (
                    states.map((state) => (
                      <tr key={state.state_id}>
                        <td>{state.state_id}</td>
                        <td>{state.state_name}</td>
                        <td>{state.state_slug}</td>
                        <td>{state.active === 1 ? 'Active' : 'Inactive'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>No states found.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="rohstate_pagination" style={{ marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || loading}
                  style={{ padding: '8px 16px' }}
                >
                  Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || loading}
                  style={{ padding: '8px 16px' }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* CITIES TAB */}
      {activeTab === 'cities' && (
        <div className="rohcity_container">
          <h2>Cities</h2>
          <ul className="rohcity_list">
            {cities.map((city) => (
              <li key={city.id} className="rohcity_item">
                {city.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AddStateForm Modal */}
      {isAddStateOpen && (
        <AddStateForm
          onClose={() => setIsAddStateOpen(false)}
          onStateAdded={handleStateAdded}
        />
      )}
    </div>
  );
}