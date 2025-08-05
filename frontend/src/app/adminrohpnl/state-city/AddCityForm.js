'use client';
import { useEffect, useState, useRef } from 'react';

export default function AddCityForm({ onSuccess, onCancel }) {
  const [cityName, setCityName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugTouched, setIsSlugTouched] = useState(false);
  const [stateId, setStateId] = useState('');
  const [states, setStates] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Prevent double fetch of states list
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

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
          setStates(data.data);
        } else {
          console.error('Failed to fetch states');
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  // Auto-generate slug from cityName unless user manually edits slug
  useEffect(() => {
    if (!isSlugTouched) {
      const autoSlug = cityName
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-')     // Replace spaces with dashes
        .replace(/-+/g, '-');     // Remove multiple dashes
      setSlug(autoSlug);
    }
  }, [cityName, isSlugTouched]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!stateId) {
      setErrorMessage('Please select a state.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const admindtl = localStorage.getItem('authUser');
    const authUser = JSON.parse(admindtl);
    const authid = authUser.id;

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/city/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          city_name: cityName,
          city_slug: slug,
          add_id: authid,
          state_id: Number(stateId),
        }),
      });

      const data = await res.json();

      if (data.status) {
        alert('City Added successfully!');
        onSuccess(); // Close modal and refresh list
      } else {
        setErrorMessage(data.message || 'Failed to add city.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 20 }}>Add New City</h3>

      <div style={{ marginBottom: 12 }}>
        <label>City Name:</label><br />
        <input
          type="text"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
            setIsSlugTouched(false);
          }}
          required
          style={{ width: '100%', padding: '6px' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Slug:</label><br />
        <input
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setIsSlugTouched(true);
          }}
          required
          style={{ width: '100%', padding: '6px' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>State:</label><br />
        <select
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
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
        {errorMessage && (
          <div style={{ color: 'red', marginTop: 6 }}>{errorMessage}</div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: 20 }}>
        <button type="submit" style={{ padding: '8px 16px' }}>Add City</button>
        <button type="button" onClick={onCancel} style={{ padding: '8px 16px' }}>Cancel</button>
      </div>
    </form>
  );
}
