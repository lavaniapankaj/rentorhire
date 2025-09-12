'use client';
import { useEffect, useState, useRef } from 'react';
import { getAuthToken, getAuthUser } from "../../../utils/utilities";

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function EditCityForm({ cityId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    city_name: '',
    city_slug: '',
    state_id: '',
  });

  /** Getting the token from the cookies */
  const token = getAuthToken();
  const admindtl = getAuthUser();
  const authUser = JSON.parse(admindtl);
  const authid = authUser.id;

  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const didFetchStates = useRef(false);
  const didFetchCity = useRef(false);

  /* Fetch all states using GET request */
  useEffect(() => {
    if (didFetchStates.current) return;

    const fetchStates = async () => {
      try {
        const res = await fetch(`${API_ADMIN_BASE_URL}/state/getall`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.status && Array.isArray(data.data)) {
          setStates(data.data);
        } else {
          setErrorMessage(data.message || 'Failed to fetch states');
        }
      } catch (err) {
        console.error('Error fetching states:', err);
        setErrorMessage('An error occurred while fetching states.');
      }
    };

    fetchStates();
    didFetchStates.current = true;
  }, []);

  // Fetch single city details
  useEffect(() => {
    if (!cityId || didFetchCity.current) return; // Fetch city details only once when cityId changes

    const fetchCityDetails = async () => {
      try {
        const res = await fetch(`${API_ADMIN_BASE_URL}/city/getsingle`, {
          method: 'POST', // Use POST for fetching city details
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ city_id: cityId }),
        });

        const data = await res.json();

        if (data.status && Array.isArray(data.data) && data.data.length > 0) {
          const city = data.data[0];
          setFormData({
            city_name: city.city_name,
            city_slug: city.city_slug,
            state_id: city.state_id,
          });
        } else {
          console.error('City not found');
        }
      } catch (err) {
        console.error('Error fetching city:', err);
      }
    };

    fetchCityDetails();
    didFetchCity.current = true; // Mark city details as fetched
  }, [cityId]); // Fetch city details when cityId changes

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit updated city
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_ADMIN_BASE_URL}/city/edit`, {
        method: 'POST', // Keep POST for editing the city
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          city_id: cityId,
          edit_id: authid,
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.status) {
        alert('City Updated successfully!');
        onSuccess();
      } else {
        setErrorMessage(data.message || 'Failed to update city');  // Show the error message returned from API
      }
    } catch (err) {
      console.error('Error updating city:', err);
      setErrorMessage('An error occurred while updating the city.');  // Show a generic error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h3>Edit City</h3>

      <div style={{ marginBottom: 10 }}>
        <label>City Name:</label><br />
        <input
          type="text"
          name="city_name"
          value={formData.city_name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '6px' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>City Slug:</label><br />
        <input
          type="text"
          name="city_slug"
          value={formData.city_slug}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '6px' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>State:</label><br />
        <select
          name="state_id"
          value={formData.state_id}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '6px' }}
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.state_id} value={state.state_id}>
              {state.state_name}
            </option>
          ))}
        </select>
        {/* Display error message below the state dropdown */}
        {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
      </div>

      <div style={{ marginTop: 15 }}>
        <button type="submit" disabled={loading} style={{ marginRight: 10 }}>
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}