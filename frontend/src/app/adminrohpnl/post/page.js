'use client';
import { useState, useEffect } from 'react';
import styles from './post.module.css';
import { useRouter } from 'next/navigation';
import AddPostForm from './AddPostForm';
import EditPostForm from './EditPostForm';
import ViewPost from './ViewPost';
import { getAuthToken } from "../../../utils/utilities";


const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function ListPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState(false);
  const [viewPostId, setViewPostId] = useState(null);
  const [editPostId, setEditPostId] = useState(null);




  const fetchPosts = async (page = 1, title = '', status = '') => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const queryParams = new URLSearchParams({
        page,
        limit: 5,
        title,
        status
      }).toString();

      const response = await fetch(`${API_ADMIN_BASE_URL}/post/list?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status && Array.isArray(data.data)) {
        setPosts(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error('Error:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page, searchTitle, searchStatus);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts(1, searchTitle, searchStatus);
  };

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
        <h2 className="fw-bold">All Posts</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Post
        </button>
        {showAddForm && (
          <AddPostForm
            onClose={() => setShowAddForm(false)}
            onSuccess={() => fetchPosts(page, searchTitle, searchStatus)}
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
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <button className="btn btn-dark">Search</button>
      </form>

      {/* ===== Table Section ===== */}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <div className={`table-responsive ${styles.postTableWrap}`}>
            <table className="table table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Publish</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <td>{index + 1 + (page - 1) * 5}</td>
                    <td>
                      {post.post_image_url ? (
                        <img
                          src={post.post_image_url}
                          alt={post.post_title}
                          width={60}
                          height={50}
                          style={{
                            objectFit: 'cover',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                          }}
                        />
                      ) : (
                        <span className="text-muted">No Image</span>
                      )}
                    </td>
                    <td>{post.post_title}</td>
                    <td>{post.post_slug}</td>
                    <td>
                      <span
                        className={`badge ${
                          post.post_status === 'published'
                            ? 'bg-success'
                            : post.post_status === 'draft'
                            ? 'bg-secondary'
                            : 'bg-warning'
                        }`}
                      >
                        {post.post_status}
                      </span>
                    </td>
                    <td>{post.category_name || '-'}</td>
                    <td>
                      {new Date(post.add_date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td>
                      <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => setViewPostId(post.id)}
                        >
                          View
                        </button>

                        {viewPostId && (
                          <ViewPost
                            postId={viewPostId}
                            onClose={() => setViewPostId(null)}
                          />
                        )}
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setEditPostId(post.id)}
                      >
                        Edit
                      </button>

                      {editPostId && (
                        <EditPostForm
                          postId={editPostId}
                          onClose={() => setEditPostId(null)}
                          onSuccess={() => fetchPosts(page, searchTitle, searchStatus)}
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