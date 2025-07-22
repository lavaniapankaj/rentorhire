'use client';
import { useState, useEffect, useRef } from 'react';

export default function EditStateForm({ state_id, onClose, onStateUpdated, error }) {
  const [stateName, setStateName] = useState('');
  const [stateSlug, setStateSlug] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false); // Track visibility of the error
  const hasFetched = useRef(false);  // useRef to track if API has been called

  // Fetch state details to pre-fill the form
  useEffect(() => {
    if (!state_id || hasFetched.current) return; // Prevent API call if already called

    const fetchStateDetails = async () => {
      hasFetched.current = true;  // Mark that API has been called
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:8080/api/adminrohpnl/state/getsingle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ state_id }),
        });

        if (!res.ok) throw new Error('Failed to fetch state details');
        const data = await res.json();

        if (data.status && data.data.length > 0) {
          const state = data.data[0];
          setStateName(state.state_name);
          setStateSlug(state.state_slug);
        } else {
          alert('State not found!');
        }
      } catch (error) {
        console.error('Error fetching state details:', error);
        alert('An error occurred while fetching state details.');
      }
    };

    fetchStateDetails();
  }, [state_id]); // Only run when state_id changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedState = {
      state_name: stateName,
      state_slug: stateSlug,
      state_id: state_id,
    };

    // Reset error message before sending request
    setErrorMessage('');

    await onStateUpdated(updatedState);  // Pass updated state to parent
  };

  // Handle error message with delay and fade-out animation
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setIsErrorVisible(true);

      setTimeout(() => {
        setIsErrorVisible(false); // Hide the error message after 2-3 seconds
      }, 3000); // 3000 ms = 3 seconds
    }
  }, [error]);

  return (
    <div className="rohstateedit_overlay">
      <div className="rohstateedit_popup">
        <h2>Edit State</h2>
        <form onSubmit={handleSubmit}>
          <label className="rohstateedit_label">
            State Name:
            <input
              type="text"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
              className="rohstateedit_input"
            />
          </label>
          <br />
          <label className="rohstateedit_label">
            State Slug:
            <input
              type="text"
              value={stateSlug}
              onChange={(e) => setStateSlug(e.target.value)}
              required
              className="rohstateedit_input"
            />
          </label>
          <br />
          {/* Error Message with fade-out */}
          {isErrorVisible && (
            <p className="rohstateedit_error-message fade-out">{errorMessage}</p>
          )}
          <button type="submit" className="rohstateedit_button">Update</button>
        </form>
        <button onClick={onClose} className="rohstateedit_button">Close</button>
      </div>
    </div>
  );
}
