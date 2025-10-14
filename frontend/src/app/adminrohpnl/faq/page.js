'use client';
import { useState, useEffect } from 'react';
import styles from './faq.module.css';
import { useRouter } from 'next/navigation';
import AddFaqForm from './AddFaqForm';
import EditFaqForm from './EditFaqForm';
import ViewFaq from './ViewFaq';
import { getAuthToken } from "../../../utils/utilities";

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function ListFaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewFaqId, setViewFaqId] = useState(null);
  const [editFaqId, setEditFaqId] = useState(null);

  /** Fetch FAQs */
  const fetchFaqs = async (page = 1, title = '', status = '') => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const queryParams = new URLSearchParams({
        page,
        limit: 5,
        title,
        status
      }).toString();

      const response = await fetch(`${API_ADMIN_BASE_URL}/faqs/list?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status && Array.isArray(data.data)) {
        setFaqs(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        setFaqs([]);
      }
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs(page, searchTitle, searchStatus);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFaqs(1, searchTitle, searchStatus);
  };

  /** Loader */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <img
          src="/infinity-loading.gif"
          alt="Loading..."
          width={100}
          height={80}
          style={{ objectFit: 'contain', opacity: 0.9 }}
        />
      </div>
    );
  }

  return (
    <section className="container mt-4">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">All FAQs</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          + Add New FAQ
        </button>
        {showAddForm && (
          <AddFaqForm
            onClose={() => setShowAddForm(false)}
            onSuccess={() => fetchFaqs(page, searchTitle, searchStatus)}
          />
        )}
      </div>

      {/* ===== Search Form ===== */}
      <form className="d-flex gap-2 mb-3" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="form-control"
          style={{ maxWidth: '250px' }}
        />
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
          className="form-select"
          style={{ maxWidth: '180px' }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="btn btn-dark">Search</button>
      </form>

      {/* ===== Table Section ===== */}
      {faqs.length === 0 ? (
        <p>No FAQs found.</p>
      ) : (
        <>
          <div className={`table-responsive ${styles.faqTableWrap}`}>
            <table className="table table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Added On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, index) => (
                  <tr key={faq.id}>
                    <td>{index + 1 + (page - 1) * 5}</td>
                    <td>{faq.title}</td>
                    <td className="text-truncate" style={{ maxWidth: '300px' }}>
                      {faq.description}
                    </td>
                    <td>{faq.category_name || '-'}</td>
                    <td>
                      <span
                        className={`badge ${
                          faq.active === 'Active' ? 'bg-success' : 'bg-secondary'
                        }`}
                      >
                        {faq.active}
                      </span>
                    </td>
                    <td>
                      {new Date(faq.add_date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => setViewFaqId(faq.id)}
                      >
                        View
                      </button>

                      {viewFaqId && (
                        <ViewFaq
                          faqId={viewFaqId}
                          onClose={() => setViewFaqId(null)}
                        />
                      )}

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setEditFaqId(faq.id)}
                      >
                        Edit
                      </button>

                      {editFaqId && (
                        <EditFaqForm
                          faqId={editFaqId}
                          onClose={() => setEditFaqId(null)}
                          onSuccess={() => fetchFaqs(page, searchTitle, searchStatus)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== Pagination ===== */}
          <div className="d-flex justify-content-center mt-3 gap-2">
            <button
              className="btn btn-outline-dark btn-sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <span className="fw-medium align-self-center">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-outline-dark btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
