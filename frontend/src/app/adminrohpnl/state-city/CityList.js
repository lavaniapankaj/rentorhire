'use client';
import { useEffect, useState, useRef } from 'react';
import AddCityForm from './AddCityForm';
import EditCityForm from './EditCityForm';
import styles from '../admin.module.css';

export default function CityList() {
  const [cities, setCities] = useState([]);
  const [stateMap, setStateMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCityId, setEditCityId] = useState(null);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const didFetch = useRef(false);

  // Fetch States (only once on initial render)
  const fetchStates = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:8080/api/adminrohpnl/state/getall', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.status) {
        const map = {};
        data.data.forEach((state) => {
          map[state.state_id] = state.state_name;
        });
        setStateMap(map);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  // Fetch Cities (getall) based on page, search, and status
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

  // Fetch City Details (getsingle) when editing a city
  const fetchCityDetails = async (cityId) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:8080/api/adminrohpnl/city/getsingle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ city_id: cityId }),
      });

      const data = await res.json();

      if (data.status && Array.isArray(data.data) && data.data.length > 0) {
        const city = data.data[0];
        setEditCityId(cityId); // Set the city ID for the edit modal
        setIsEditModalOpen(true);
      } else {
        console.error('City not found');
      }
    } catch (error) {
      console.error('Error fetching city details:', error);
    }
  };

  // Handle Delete
  const handleDelete = async (cityId, isActive) => {
    if (isActive === 0) {
      alert("Inactive city cannot be deleted");
      return;
    }
    
    const confirmDelete = window.confirm("Are you sure you want to delete this city?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:8080/api/adminrohpnl/city/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            city_id: cityId,
          }),
        });

        const data = await res.json();

        if (data.status) {
          alert("City deleted successfully");
          fetchCities(); // Refresh city list after deletion
        } else {
          alert("Failed to delete city");
        }
      } catch (error) {
        console.error('Error deleting city:', error);
        alert("Error deleting city");
      }
    }
  };

  // useEffect to fetch states and cities only when needed
  useEffect(() => {
    if (!didFetch.current) {
      fetchStates();
      fetchCities();
      didFetch.current = true; // Mark fetching as done
    }
  }, []);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    setSearch(trimmed);
    setCurrentPage(1);
    fetchCities(1, trimmed, statusFilter);
  };

  // Handle clear search input
  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
    setCurrentPage(1);
    fetchCities(1, '', statusFilter);
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatusFilter(newStatus);
    setCurrentPage(1);
    fetchCities(1, search, newStatus);
  };

  // Handle pagination for next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCities(nextPage, search, statusFilter);
    }
  };

  // Handle pagination for previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchCities(prevPage, search, statusFilter);
    }
  };

  // Handle edit city action
  const handleEdit = (cityId) => {
    fetchCityDetails(cityId);
  };

  return (
    <div>
       {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <img src="/infinity-loading.gif" alt="Loading..." width="80" />
        </div>
      ) : (
      <div>
      <h2>City List</h2>

      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Filter and Add New City Button side by side */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
        </div>
        {/* Add New City button */}
        <button onClick={() => setIsModalOpen(true)} style={{ padding: '6px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add New City
        </button>
      </div>

        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          {/* Table Headers always visible */}
          <thead style={{ backgroundColor: '#f0f0f0' }}>
            <tr>
              <th>ID</th>
              <th>City Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cities.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No cities found.</td>
              </tr>
            ) : (
              cities.map((city) => (
                <tr key={city.city_id}  className={city.active !== 1 ? styles.rohadminpncitydeltr : 'activeCityRow'}>
                  <td>{city.city_id}</td>
                  <td>{city.city_name}</td>
                  <td>{city.city_slug}</td>
                  <td>{city.active === 1 ? 'Active' : 'Inactive'}</td>
                  <td>{stateMap[city.state_id] || city.state_id}</td>
                  <td>
                    <button onClick={() => handleEdit(city.city_id)}>Edit</button> | 
                    <button 
                      onClick={() => handleDelete(city.city_id, city.active)} 
                      disabled={city.active === 0}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ marginTop: 15, display: 'flex', gap: 15, alignItems: 'center' }}>
          <button onClick={handlePrev} disabled={currentPage === 1 || loading}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages || loading}>Next</button>
        </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: 30,
            borderRadius: 10,
            minWidth: 400,
            position: 'relative'
          }}>
            <AddCityForm
              onSuccess={() => {
                setIsModalOpen(false);
                fetchCities();
              }}
              onCancel={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: 30,
            borderRadius: 10,
            minWidth: 400,
            position: 'relative'
          }}>
            <EditCityForm
              cityId={editCityId}
              onSuccess={() => {
                setIsEditModalOpen(false);
                fetchCities();
              }}
              onCancel={() => {
                setIsEditModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
      </div>
    )}
    </div>
  );
}
