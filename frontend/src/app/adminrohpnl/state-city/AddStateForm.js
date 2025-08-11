import { useState } from 'react';

export default function AddStateForm({ onClose, onStateAdded }) {
  const [stateName, setStateName] = useState('');
  const [stateSlug, setStateSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false); // 👈 new state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleStateNameChange = (e) => {
    const name = e.target.value;
    setStateName(name);

    if (!slugManuallyEdited) {
      setStateSlug(generateSlug(name));
    }
  };

  const handleSlugChange = (e) => {
    setStateSlug(e.target.value);
    setSlugManuallyEdited(true); // 👈 mark as manually edited
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const token = localStorage.getItem('authToken');
    const admindtl = localStorage.getItem('authUser');
    const authUser = JSON.parse(admindtl);
    const authid = authUser.id;

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/state/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          state_name: stateName,
          state_slug: stateSlug,
          add_id: authid,
          edit_id: 0,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.status === false) {
        setErrorMessage(data.message || 'Failed to add state');
        setLoading(false);
        return;
      }

      setErrorMessage('');
      setLoading(false);
      
      // Show success alert after state is successfully added
      alert('State registered successfully!');

      // Trigger onStateAdded callback after successful registration
      onStateAdded();
      onClose(); // Close modal after success

    } catch (err) {
      setErrorMessage('Internal server error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="modalBackdrop" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div className="modalContent" style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 6,
        width: 400,
        position: 'relative',
      }}>
        <h3>Add New State</h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <label>State Name</label>
            <input
              type="text"
              value={stateName}
              onChange={handleStateNameChange}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>State Slug</label>
            <input
              type="text"
              value={stateSlug}
              onChange={handleSlugChange}
              required
              style={{ width: '100%', padding: 8 }}
            />
          </div>

          {errorMessage && (
            <div style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={onClose} disabled={loading} style={{ padding: '8px 16px' }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
