'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '../admin.module.css';
import bcrypt from 'bcryptjs';

const initialFormState = {
  first_name: '',
  last_name: '',
  user_name: '',
  email: '',
  phone_number: '',
  password_hash: '',
  user_role: '',
  profile_picture_file: null,
  address_1: '',
  landmark: '',
  state: '',
  city: '',
  pincode: ''
};

export default function AddUserForm({ onSuccess, onClose }) {
  const [form, setForm] = useState(initialFormState);
  const [roles, setRoles] = useState([]);
  const token = localStorage.getItem('authToken');
  const fetchedOnce = useRef(false); // ✅ used to prevent double call

  // ✅ Fetch roles only once
  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/adminrohpnl/role/roles');
        const data = await res.json();

        if (res.ok && data.status && Array.isArray(data.data)) {
          setRoles(data.data);
        } else {
          console.error('Failed to fetch roles:', data);
        }
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture_file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(form.password_hash, salt);

    const payload = {
      user_name: form.user_name,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone_number: form.phone_number,
      password_hash: hashedPassword,
      user_role_id: parseInt(form.user_role),
      profile_picture_url: 'http://localhost:3000/adminrohpnl',
      address_1: form.address_1,
      landmark: form.landmark,
      state: form.state,
      city: form.city,
      pincode: parseInt(form.pincode),
      add_id: 1,
      edit_id: 1
    };

    try {
      const res = await fetch('http://localhost:8080/api/adminrohpnl/user/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      alert(data?.message || 'Unknown response');

      if (!res.ok || data.status === false) {
        console.error('Backend Error:', data);
        return;
      }

      setForm(initialFormState);
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      console.error('❌ API Error:', err);
      alert('Server error');
    }
  };

  return (
    <>
      <h2>Add New User</h2>
      <form className={styles.adminUserAddFormContainer} onSubmit={handleSubmit}>
        {/* First and Last Name */}
        <div className={styles.adminUserAddFormRow}>
          <div className={`${styles.adminUserAddFormGroup} ${styles.adminUserAddFormGroupHalf}`}>
            <label htmlFor="first_name">FIRST NAME</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>
          <div className={`${styles.adminUserAddFormGroup} ${styles.adminUserAddFormGroupHalf}`}>
            <label htmlFor="last_name">LAST NAME</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Other Fields */}
        {[
          'user_name',
          'email',
          'phone_number',
          'password_hash',
          'address_1',
          'landmark',
          'state',
          'city',
          'pincode'
        ].map((field) => (
          <div key={field} className={styles.adminUserAddFormGroup}>
            <label htmlFor={field}>{field.replaceAll('_', ' ').toUpperCase()}</label>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Profile Picture */}
        <div className={styles.adminUserAddFormGroup}>
          <label htmlFor="profile_picture_file">PROFILE PICTURE</label>
          <input
            type="file"
            id="profile_picture_file"
            name="profile_picture_file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Dynamic Role Dropdown */}
        <div className={styles.adminUserAddFormGroup}>
          <label htmlFor="user_role">USER ROLE</label>
          <select name="user_role" value={form.user_role} onChange={handleChange}>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit & Cancel */}
        <button type="submit" className={styles.adminUserAddSubmitBtn}>Register User</button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
      </form>
    </>
  );
}
