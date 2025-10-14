'use client';
import { useState, useEffect } from 'react';
import styles from './faq.module.css';
import { getAuthToken, getAuthUser } from '../../../utils/utilities';

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function AddFaqForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cate_id: '',
    active: 1, // default active
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /**  Fetch categories */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_ADMIN_BASE_URL}/category/admingetallactivecate`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status && data.data?.categories) {
          setCategories(data.data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  /**  Handle input change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**  Submit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getAuthToken();
      const admindtl = getAuthUser();
      const authUser = JSON.parse(admindtl);
      const authid = authUser?.id || null;

      const payload = {
        ...formData,
        add_id: authid,
      };

      const res = await fetch(`${API_ADMIN_BASE_URL}/faq/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.status || data.success) {
        alert('FAQ added successfully!');
        onSuccess?.();
        onClose?.();
      } else {
        alert(data.message || 'Failed to add FAQ');
      }
    } catch (err) {
      console.error('Error adding FAQ:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popupBox} shadow-lg`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Add New FAQ</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Question / Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Answer / Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Category (optional)</label>
            <select
              className="form-select"
              name="cate_id"
              value={formData.cate_id}
              onChange={handleChange}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Active/Inactive */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Status</label>
            <select
              className="form-select"
              name="active"
              value={formData.active}
              onChange={handleChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-light border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
