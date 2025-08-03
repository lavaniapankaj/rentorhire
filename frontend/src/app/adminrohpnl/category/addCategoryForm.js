'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '../admin.module.css';

export default function AddCategoryForm({ onSuccess, onClose }) {
  const initialFormState = {
    category_name: "",
    parent_category_id: "",
    category_description: "",
  };
  const [form, setForm] = useState({ initialFormState });
  
  const [categories, setCategories] = useState([]);
  const fetchedOnce = useRef(false);
  const token = localStorage.getItem('authToken');

  /* Fetch the parent categories to create a child category */
  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/adminrohpnl/category/getParent', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        /** recode = 0 is used for the token error */
        if(data.rcode == 0){
          router.push('/auth/admin');
        }

        if (res.ok && data.status == true && Array.isArray(data.data.categories)) {
          setCategories(data.data.categories);
        } else {
          console.error('Failed to fetch categories:', data);
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };
    fetchCategories();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.category_name,
      parent_category_id: form.parent_category_id,
      description: form.category_description,
      add_id: 1,
      edit_id: 1
    };

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/category/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || data.status === false) {
        return;
      }

      setForm(initialFormState);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
      alert("Category created successfully.");
    } catch (err) {
      alert('Something went wrong.');
    }
  };

  /* Handle change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  

  return (
    <>
      <h2 className="admin-cat-title">Add New Category</h2>
      <form className={styles.admin_cat_form}>
        <div className={styles.admin_cat_group}>
          <label htmlFor="category_name">
            Category Name <span className={styles.admin_cat_required}>*</span>
          </label>
          <input type="text" id="category_name" name="category_name" value={form.category_name} onChange={handleChange}/>
        </div>
    
        <div className={styles.admin_cat_group}>
          <label htmlFor="parent_category">Parent Category</label>
          <select id="parent_category" name="parent_category_id" value={form.parent_category_id} onChange={handleChange}>
            <option value="">Select Parent Category</option>
            {/* Dynamically insert options here */}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.admin_cat_group}>
          <label htmlFor="category_description" className="admin_cat_label"> Description </label>
          <textarea id="category_description" name="category_description" className="admin_cat_textarea" value={form.category_description} onChange={handleChange}></textarea>
        </div>

    
        <div className={styles.admin_cat_actions}>
          <button type="submit" className={`${styles['admin-cat-btn']} ${styles['admin-cat-btn-primary']}`} onClick={handleSubmit}  >Register Category</button>
          <button type="button" className={`${styles['admin-cat-btn']} ${styles['admin-cat-btn-secondary']}`} onClick={onClose}>Cancel</button>
        </div>
      </form>
    </>
  
  );
}