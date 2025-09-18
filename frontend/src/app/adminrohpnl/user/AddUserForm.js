'use client';
import { useState, useEffect, useRef } from 'react';
import styles from '../admin.module.css';
import bcrypt from 'bcryptjs';
import { getAuthToken, getAuthUser } from "../../../utils/utilities";

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

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

  /** Getting the token from the cookies */
  const token = getAuthToken();
  const admindtl = getAuthUser();

  const authUser = JSON.parse(admindtl);
  const authid = authUser.id;

  const fetchedOnce = useRef(false); // used to prevent double call

  // Fetch roles on component mount
  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchRoles = async () => {
      try {
        const res = await fetch(`${API_ADMIN_BASE_URL}/role/roles`);
        const data = await res.json();
        /** recode = 0 is used for the token error */
        if(data.rcode == 0){
          window.location.href = "/auth/admin";
        }

        if (res.ok && data.status && Array.isArray(data.data)) {
          setRoles(data.data); //store role array
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

    const payload = new FormData();
    payload.append('user_name', form.user_name);
    payload.append('first_name', form.first_name);
    payload.append('last_name', form.last_name);
    payload.append('email', form.email);
    payload.append('phone_number', form.phone_number);
    payload.append('password_hash', hashedPassword);
    payload.append('user_role_id', parseInt(form.user_role));
    payload.append('profile_picture_file', form.profile_picture_file); // Add file to FormData
    payload.append('address_1', form.address_1);
    payload.append('landmark', form.landmark);
    payload.append('state', form.state);
    payload.append('city', form.city);
    payload.append('pincode', parseInt(form.pincode));
    payload.append('add_id', authid);
    payload.append('edit_id', 0);

    try {
        const res = await fetch(`${API_ADMIN_BASE_URL}/user/create`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}` // No Content-Type here, FormData sets it automatically
            },
            body: payload
        });

        const data = await res.json();
        if (res.ok && data.status === true) {
            // Success message after user is registered
            alert('User registered successfully!');
        } else {
            // Handle failure scenario
            alert(data?.message || 'Failed to register user');
        }

        if (!res.ok || data.status === false) {
            return;
        }

        setForm(initialFormState); // Reset form fields
        if (onSuccess) onSuccess(); // Trigger success callback
        if (onClose) onClose(); // Close modal

    } catch (err) {
        console.error('API Error:', err);
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
            type={
              field.includes('password') ? 'password' :
              field === 'pincode' ? 'number' : 'text'
            }
            id={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            min={field === 'pincode' ? 10000 : undefined}  /** Ensure pincode is at least a 5-digit number */
            max={field === 'pincode' ? 999999 : undefined}  /** Ensure pincode does not exceed 6 digits */
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
