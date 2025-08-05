'use client';

import { useState, useEffect } from 'react';
import AddStateForm from './AddStateForm';
import EditStateForm from './EditStateForm';
import CityList from './CityList'; // import CityList component

export default function StateCityPage() {
  const [activeTab, setActiveTab] = useState('states');
  const [states, setStates] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isAddStateOpen, setIsAddStateOpen] = useState(false);
  const [isEditStateOpen, setIsEditStateOpen] = useState(false);
  const [stateIdToEdit, setStateIdToEdit] = useState(null);
  const [editStateError, setEditStateError] = useState(null);

  const limit = 5;

  // Fetch States
  const fetchStates = async (page = currentPage) => {
    if (activeTab !== 'states') return;
    setLoading(true);
    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/state/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ page, limit, search: searchTerm, status: statusFilter }),
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

  useEffect(() => {
    fetchStates();
  }, [currentPage, activeTab, searchTerm, statusFilter]);

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

  const handleStateAdded = () => {
    setIsAddStateOpen(false);
    setCurrentPage(1);
    setSearchTerm('');
    setSearchInput('');
    setStatusFilter('all');
  };

  const handleEditState = async (state_id) => {
    setStateIdToEdit(state_id);
    setIsEditStateOpen(true);
  };

  const handleStateUpdated = async (updatedState) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:8080/api/adminrohpnl/state/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedState),
      });

      if (!res.ok) throw new Error('Failed to update state');

      const data = await res.json();
      if (data.status) {
        alert('State updated successfully!');  // This blocks further execution until the user clicks "OK"
        setIsEditStateOpen(false);
        setEditStateError(null);
        await fetchStates(currentPage);
        return { success: true };
      } else {
        return { error: data.message || 'Failed to update state' };
      }
    } catch (error) {
      console.error('Error updating state:', error);
      return { error: 'An error occurred while updating the state.' };
    }
  };

  const handleDeleteState = async (state_id) => {
    if (!window.confirm('Are you sure you want to delete this state?')) return;

    setLoading(true);
    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/state/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ state_id }),
      });

      if (!res.ok) throw new Error('Failed to delete state');

      const data = await res.json();

      if (data.status) {
        await fetchStates(currentPage);
      } else {
        alert(data.message || 'Failed to delete state');
      }
    } catch (error) {
      console.error('Error deleting state:', error);
      alert('An error occurred while deleting the state.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <img src="/infinity-loading.gif" alt="Loading..." width="80" />
        </div>
      ) : (
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

        {/* === STATES TAB === */}
        {activeTab === 'states' && (
          <div className="rohstate_container">
            <h2>States</h2>

            <div style={{ marginBottom: 20, display: 'flex', gap: '10px', alignItems: 'center' }}>
              <form
                onSubmit={handleSearchSubmit}
                style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by state name"
                  style={{ padding: 8, minWidth: 200 }}
                />
                <button type="submit" style={{ padding: '8px 16px' }}>
                  Search
                </button>
                <button type="button" onClick={handleClearSearch} style={{ padding: '8px 16px' }}>
                  Clear
                </button>
              </form>

              <select value={statusFilter} onChange={handleStatusChange} style={{ padding: 8, minWidth: 120 }}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button
                onClick={() => setIsAddStateOpen(true)}
                style={{ marginLeft: 'auto', padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 4 }}
              >
                Add New State
              </button>
            </div>

            
                <table className="rohstate_table" border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  {/* Table Headers remain fixed */}
                  <thead style={{ backgroundColor: '#f0f0f0' }}>
                    <tr>
                      <th>State ID</th>
                      <th>State Name</th>
                      <th>State Slug</th>
                      <th>Status</th>
                      <th>Action</th>
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
                          <td>
                            <button onClick={() => handleEditState(state.state_id)}>Edit</button> |{' '}
                            <button
                              onClick={() => handleDeleteState(state.state_id)}
                              disabled={loading || state.active !== 1}
                              title={state.active !== 1 ? "Inactive state can't be deleted" : "Delete state"}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center' }}>
                          No states found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="rohstate_pagination" style={{ marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                  <button onClick={handlePrevPage} disabled={currentPage === 1 || loading} style={{ padding: '8px 16px' }}>
                    Previous
                  </button>
                  <span>{`Page ${currentPage} of ${totalPages}`}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages || loading} style={{ padding: '8px 16px' }}>
                    Next
                  </button>
                </div>
          </div>
        )}

        {/* === CITIES TAB === */}
        {activeTab === 'cities' && <CityList />}

        {isAddStateOpen && <AddStateForm onClose={() => setIsAddStateOpen(false)} onStateAdded={handleStateAdded} />}

        {isEditStateOpen && (
          <EditStateForm
            key={stateIdToEdit}
            state_id={stateIdToEdit}
            onClose={() => {
              setIsEditStateOpen(false);
              setEditStateError(null);
            }}
            onStateUpdated={handleStateUpdated}
            error={editStateError}
          />
        )}
      </div>
      )}
    </div>
  );
}