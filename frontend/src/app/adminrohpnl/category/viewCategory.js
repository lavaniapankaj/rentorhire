'use client';
import styles from '../admin.module.css';

export default function ViewCategory({ category, onClose }) {
  if (!category) return null;

  return (
    <div className={styles.roh_modal_overlay}>
      <div className={styles.roh_viewuser_modal}>
        <button className={styles.modalCloseButton} onClick={onClose}>×</button>
        <h2>Category Details</h2>
        <div className={styles.viewuser_details}>
          <p><strong>Name:</strong> {category.name} </p>
          {category.parent_category_name && (
            <p>
              <strong>Parent Category Name:</strong> {category.parent_category_name}
            </p>
          )}
          <p><strong>Description:</strong> {category.description} </p>
          {/* Add more fields if needed */}
        </div>
        <button onClick={onClose} className={styles.roh_close_btn}>Close</button>
      </div>
    </div>
  );
}