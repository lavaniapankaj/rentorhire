'use client';
import { useState, useEffect } from 'react';
import styles from './post.module.css';
import { getAuthToken } from '../../../utils/utilities';

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function ViewPost({ postId, onClose }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_ADMIN_BASE_URL}/post/view`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: postId }),
        });

        const data = await res.json();
        if (data.status && data.data) {
          setPost(data.data);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popupBox}>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popupBox}>
          <p>Post not found.</p>
          <button className="btn btn-light mt-3" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupBox}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">{post.post_title}</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {post.post_image_url && (
          <div className="mb-3 text-center">
            <img
              src={post.post_image_url}
              alt={post.post_title}
              className="rounded"
              style={{
                maxWidth: '100%',
                height: 'auto',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            />
          </div>
        )}

        <table className="table table-borderless">
          <tbody>
            <tr>
              <th style={{ width: '35%' }}>Slug:</th>
              <td>{post.post_slug}</td>
            </tr>
            <tr>
              <th>Status:</th>
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
            </tr>
            <tr>
              <th>Category:</th>
              <td>{post.category_name || '-'}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{post.description || '-'}</td>
            </tr>
            <tr>
              <th>Excerpt:</th>
              <td>{post.post_excerpt || '-'}</td>
            </tr>
            <tr>
              <th>Published:</th>
              <td>
                {new Date(post.add_date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
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
