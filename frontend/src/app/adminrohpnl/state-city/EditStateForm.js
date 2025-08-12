'use client';
import { useState, useEffect, useRef } from 'react';
import { getAuthToken, getAuthUser } from "@/utils/utilities";

export default function EditStateForm({ state_id, onClose, onStateUpdated, error }) {
  const [stateName, setStateName] = useState('');
  const [stateSlug, setStateSlug] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const hasFetched = useRef(false);
  /** Getting the token from the cookies */
  const token = getAuthToken();
  const authUser = getAuthUser();

  // Fetch state details
  useEffect(() => {
    if (!state_id || hasFetched.current) return;

    const fetchStateDetails = async () => {
      hasFetched.current = true;
      try {
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
  }, [state_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedUser = authUser ? JSON.parse(authUser) : null;
    const editId = parsedUser?.id || null;
    
    const updatedState = {
      state_name: stateName,
      state_slug: stateSlug,
      state_id: state_id,
      edit_id: editId,
    };

    setErrorMessage('');
    setIsErrorVisible(false);

    const result = await onStateUpdated(updatedState);

    if (result?.error) {
      setErrorMessage(result.error);
      setIsErrorVisible(true);
      setTimeout(() => setIsErrorVisible(false), 3000);
    }
  };

  return (
    <>
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

            {isErrorVisible && (
              <p className="rohstateedit_error-message fade-out">{errorMessage}</p>
            )}

            <button type="submit" className="rohstateedit_button update">Update</button>
          </form>
          <button onClick={onClose} className="rohstateedit_button close">Close</button>
        </div>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .rohstateedit_overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .rohstateedit_popup {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          position: relative;
        }

        .rohstateedit_label {
          font-weight: 500;
        }

        .rohstateedit_input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .rohstateedit_button {
          margin-top: 15px;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .rohstateedit_button.update {
          background-color: #007bff;
          color: white;
          margin-right: 10px;
        }

        .rohstateedit_button.close {
          background-color: #6c757d;
          color: white;
        }

        .rohstateedit_error-message {
          color: red;
          margin: 10px 0;
          font-weight: 500;
          transition: opacity 0.5s ease-in-out;
        }

        .fade-out {
          animation: fadeOut 3s forwards;
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }

        @media (max-width: 480px) {
          .rohstateedit_popup {
            width: 90%;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}