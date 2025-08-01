import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function EditUserForm({ user, onClose, roles: initialRoles, onSuccess }) {
  const [formData, setFormData] = useState({
    user_id: user.user_id,
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    user_role_id: user.user_role_id,
    password_hash: '',
    profile_picture_url: user.profile_picture_url,
    address_1: user.address_1,
    landmark: user.landmark,
    state: user.state,
    city: user.city,
    pincode: user.pincode,
  });

  const [fetchedRoles, setFetchedRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('authToken');
  const admindtl = localStorage.getItem('authUser');
  const authUser = JSON.parse(admindtl);
  const authid = authUser.id;

  useEffect(() => {
    if (!initialRoles || initialRoles.length === 0) {
      const fetchRoles = async () => {
        try {
          const res = await fetch('http://localhost:8080/api/adminrohpnl/role/roles');
          const data = await res.json();
          if (data.rcode == 0) {
            router.push('/auth/admin');
          }

          if (res.ok && data.status && Array.isArray(data.data)) {
            setFetchedRoles(data.data);
          } else {
            console.error('Failed to fetch roles:', data);
          }
        } catch (err) {
          console.error('Error fetching roles:', err);
        }
      };

      fetchRoles();
    } else {
      setFetchedRoles(initialRoles);
    }
  }, [initialRoles]);

  useEffect(() => {
    setFormData({
      user_id: user.user_id,
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      user_role_id: user.user_role_id,
      password_hash: '',
      profile_picture_url: user.profile_picture_url,
      address_1: user.address_1,
      landmark: user.landmark,
      state: user.state,
      city: user.city,
      pincode: user.pincode,
      edit_id: authid,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profile_picture_url: URL.createObjectURL(file),
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataObj = new FormData();
  
  // Append all the form fields (except file)
  Object.keys(formData).forEach((key) => {
    formDataObj.append(key, formData[key]);
  });

  // If a new profile picture is uploaded, append it to the form data
  const profilePictureFile = document.getElementById('profile_picture_file').files[0];
  if (profilePictureFile) {
    formDataObj.append('profile_picture_file', profilePictureFile);
  }

  try {
    const res = await fetch('http://localhost:8080/api/adminrohpnl/user/edit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataObj, // Send the FormData with the file
    });

    const data = await res.json();
    if (data.rcode === 0) {
      router.push('/auth/admin');
    }

    if (!res.ok || data.status === false) {
      setErrorMessage(data.message || 'Failed to update user');
    } else {
      onSuccess();
      alert('User updated successfully');
    }
  } catch (err) {
    console.error('Error updating user:', err);
    setErrorMessage('An unexpected error occurred. Please try again later.');
  }
};


  return (
    <div className={styles.roh_modal_overlay}>
      <form className={styles.roh_edituser_form} onSubmit={handleSubmit}>
        {/* Username */}
        <div className={styles.roh_edituser_form_group}>
          <label htmlFor="user_name">Username</label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            value={formData.user_name}
            disabled
            className={styles.roh_edituser_input}
          />
        </div>

        {/* First and Last Name */}
        <div className={styles.roh_edituser_form_row}>
          <div className={`${styles.roh_edituser_form_group} ${styles.roh_edituser_form_group_half}`}>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={styles.roh_edituser_input}
            />
          </div>
          <div className={`${styles.roh_edituser_form_group} ${styles.roh_edituser_form_group_half}`}>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={styles.roh_edituser_input}
            />
          </div>
        </div>

        {/* Common fields */}
        {[
        'email',
        'phone_number',
        'address_1',
        'landmark',
        'state',
        'city',
        'pincode',
      ].map((field) => (
        <div key={field} className={styles.roh_edituser_form_group}>
          <label htmlFor={field}>{field.replaceAll('_', ' ').toUpperCase()}</label>
          <input
            type={
              field === 'pincode' ? 'number' : 'text'  /** Set type to 'number' for pincode */
            }
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className={styles.roh_edituser_input}
            min={field === 'pincode' ? 10000 : undefined}  /** Minimum value for pincode (5-digit) */
            max={field === 'pincode' ? 999999 : undefined}  /** Maximum value for pincode (6-digit) */
          />
        </div>
      ))}


        {/* Profile Picture Upload */}
        <div className={styles.roh_edituser_form_group}>
          <label htmlFor="profile_picture_file">Profile Picture</label>
          <input
            type="file"
            id="profile_picture_file"
            name="profile_picture_file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.roh_edituser_input}
          />
        </div>

        {/* Role Dropdown */}
        <div className={styles.roh_edituser_form_group}>
          <label htmlFor="user_role_id">User Role</label>
          <select
            name="user_role_id"
            value={formData.user_role_id}
            onChange={handleChange}
            className={styles.roh_edituser_input}
          >
            <option value="">Select Role</option>
            {fetchedRoles.length > 0 ? (
              fetchedRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))
            ) : (
              <option disabled>No roles available</option>
            )}
          </select>
        </div>

        {/* Password */}
        <div className={styles.roh_edituser_form_group}>
          <label htmlFor="password_hash">Password</label>
          <input
            type="password"
            name="password_hash"
            id="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            className={styles.roh_edituser_input}
          />
          <small>Leave blank if you do not want to change the password</small>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className={styles.error_message}>
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Buttons */}
        <div className={styles.roh_edituser_form_actions}>
          <button type="submit" className={styles.roh_edituser_submit_btn}>
            Update User
          </button>
          <button type="button" onClick={onClose} className={styles.roh_edituser_cancel_btn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
