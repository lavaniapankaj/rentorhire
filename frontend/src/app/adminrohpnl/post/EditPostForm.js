'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './post.module.css';
import { getAuthToken } from '../../../utils/utilities';

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

export default function EditPostForm({ postId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    post_title: '',
    post_slug: '',
    description: '',
    post_excerpt: '',
    cate_id: '',
    post_status: 'draft',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  /** Fetch existing post data */
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
          setFormData({
            post_title: data.data.post_title,
            post_slug: data.data.post_slug,
            description: data.data.description,
            post_excerpt: data.data.post_excerpt,
            cate_id: data.data.cate_id || '',
            post_status: data.data.post_status,
          });
          if (data.data.post_image_url) setPreview(data.data.post_image_url);
        }
      } catch (err) {
        console.error('Error loading post data:', err);
      }
    };

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

    fetchPost();
    fetchCategories();
  }, [postId]);

  /** Handlers */
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      post_title: title,
      post_slug: title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-'),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getAuthToken();
      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        fd.append(key, formData[key]);
      });
      fd.append('id', postId);
      if (imageFile) fd.append('post_picture_file', imageFile);

      const res = await fetch(`${API_ADMIN_BASE_URL}/post/edit`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();
      if (data.status || data.success) {
        alert('✅ Post updated successfully!');
        onSuccess?.();
        onClose?.();
      } else {
        alert(data.message || 'Failed to update post');
      }
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupBox}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Edit Post</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Post Title</label>
            <input
              type="text"
              className="form-control"
              name="post_title"
              value={formData.post_title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Slug</label>
            <input
              type="text"
              className="form-control"
              name="post_slug"
              value={formData.post_slug}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Excerpt</label>
            <textarea
              className="form-control"
              name="post_excerpt"
              rows="2"
              value={formData.post_excerpt}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Status</label>
            <select
              className="form-select"
              name="post_status"
              value={formData.post_status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="form-control"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                width={90}
                height={70}
                className="mt-2 rounded border"
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-light border" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
