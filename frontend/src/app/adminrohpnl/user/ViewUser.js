'use client';
import styles from '../admin.module.css';
import Image from 'next/image';

export default function ViewUser({ user, onClose }) {
  if (!user) return null;

  /** Dynamically constructing the image URL and handling null/empty values */
  const filePath = user.file_path || ''; /** If file_path is null/undefined, use an empty string */
  const fileName = user.file_name || ''; /** If file_name is null/undefined, use an empty string */

  const profile_picture_url = `${filePath}${fileName}`.trim(); /** Remove extra spaces if any */
 
  /** image if the constructed URL is empty or invalid */
  const imageToShow = profile_picture_url && profile_picture_url !== '/nullnull' 
    ? profile_picture_url 
    : '/media/users/profile/dummy-profile-img.jpg'; /** default image */


  return (
    <div className={styles.roh_modal_overlay}>
      <div className={styles.roh_viewuser_modal}>
        <button className={styles.modalCloseButton} onClick={onClose}>×</button>
        <h2>User Details</h2>
        <Image 
          src={imageToShow}  /** Dynamically setting the image source with fallback */
          alt="Profile" 
          className={styles.profileImage} 
          width={100} 
          height={100} 
        />
        <div className={styles.viewuser_details}>
          <p><strong>Username:</strong> {user.user_name}</p>
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
          <p><strong>Address:</strong> {user.address_1}, {user.landmark}, {user.city}, {user.state} - {user.pincode}</p>
          <p><strong>Status:</strong> {user.active === 1 ? 'Active' : 'Inactive'}</p>
        </div>
        <button onClick={onClose} className={styles.roh_close_btn}>Close</button>
      </div>
    </div>
  );
}