import { useState, useEffect } from 'react';
import styles from '../admin.module.css';
import { getAuthToken } from "@/utils/utilities";

export default function EditCategoryForm({ category, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    parent_category_id: '',
    description: '',
  });

  const [parentCategories, setParentCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  /** Getting the token from the cookies */
  const token = getAuthToken();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        parent_category_id: category.parent_category_id ? String(category.parent_category_id) : '',
        description: category.description || '',
      });
    }
  }, [category]);

  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL}/category/getParent`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.rcode === 0) {
          router.push('/auth/admin');
        }

        if (res.ok && data.status === true && Array.isArray(data.data.categories)) {
          setParentCategories(data.data.categories);
        } else {
          console.error('Failed to fetch categories:', data);
        }
      } catch (err) {
        console.error('Error fetching parent categories:', err);
      }
    };

    fetchParentCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const updatedCategory = {
      ...category,
      name: formData.name,
      parent_category_id: formData.parent_category_id || null,
      description: formData.description,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL}/category/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCategory),
      });

      const data = await res.json();

      if (data.rcode === 0) {
        router.push('/auth/admin');
      }

      if (!res.ok || data.status === false) {
        setErrorMessage(data.message || 'Failed to update category');
      } else {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
        alert('Category updated successfully');
      }
    } catch (err) {
      console.error('Error updating category:', err);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  if (!category) return null;

  return (
    <div className={styles.roh_modal_overlay}>
      <form className={styles.roh_edituser_form} onSubmit={handleSubmit}>
      <button className={styles.modalCloseButton} onClick={onClose}> × </button>
        <h2>Update Category</h2>
        <div className={styles.roh_edituser_form_group}>
          <label htmlFor="name">Category Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={styles.roh_edituser_input} required/>
        </div>

        <div className={styles.roh_edituser_form_group}>
          <label htmlFor="parent_category_id">Parent Category</label>
          <select name="parent_category_id" id="parent_category_id" value={formData.parent_category_id} onChange={handleChange} className={styles.roh_edituser_input}>
            <option value="">None</option>
            {parentCategories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.roh_edituser_form_group}>
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} className={styles.roh_edituser_input}/>
        </div>

        {errorMessage && (
          <div className={styles.error_message}>
            <p>{errorMessage}</p>
          </div>
        )}

        <div className={styles.roh_edituser_form_actions}>
          <button type="submit" className={styles.roh_edituser_submit_btn}>
            Save
          </button>
          <button type="button" onClick={onClose} className={styles.roh_edituser_cancel_btn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}