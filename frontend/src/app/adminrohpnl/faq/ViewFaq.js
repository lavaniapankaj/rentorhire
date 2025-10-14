'use client';
import { useState, useEffect } from 'react';
import styles from './faq.module.css';
import { getAuthToken } from '../../../utils/utilities';

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function ViewFaq({ faqId, onClose }) {
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_ADMIN_BASE_URL}/faq/view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: faqId }),
        });

        const data = await res.json();
        if (data.status && data.data) {
          setFaq(data.data);
        }
      } catch (err) {
        console.error('Error fetching FAQ:', err);
      } finally {
        setLoading(false);
      }
    };

    if (faqId) fetchFaq();
  }, [faqId]);

  if (loading) {
    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popupBox}>
          <p>Loading FAQ...</p>
        </div>
      </div>
    );
  }

  if (!faq) {
    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popupBox}>
          <p>FAQ not found.</p>
          <button className="btn btn-light mt-3" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={`${styles.popupBox} shadow-lg`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">{faq.title}</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <table className="table table-borderless">
          <tbody>
            <tr>
              <th style={{ width: '35%' }}>Category:</th>
              <td>{faq.category_name || '-'}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>
                <span
                  className={`badge ${
                    Number(faq.active) === 1 ? 'bg-success' : 'bg-secondary'
                  }`}
                >
                  {Number(faq.active) === 1 ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{faq.description || '-'}</td>
            </tr>
            <tr>
              <th>Added On:</th>
              <td>
                {faq.add_date
                  ? new Date(faq.add_date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-light border" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
