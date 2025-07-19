'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

/** Admin login - Coded by Raj - July 11 2025 */
export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
      localStorage.clear(); /* removes all keys from localStorage */
    }, []); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('http://localhost:8080/adminrohpnl/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Login failed');
        }
      
        const data = await res.json();
        if(data.status == false){
          throw new Error(data.message || 'Login failed');
        }
      
        /* Now store the token in the local storage */
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.user));

        document.cookie = `authToken=${data.token}; path=/`;
        document.cookie = `authUser=${JSON.stringify(data.user)}; path=/`;

        /* Redirect on the admin dashboard */
        router.push('/adminrohpnl');
      } catch (error) {
        alert(error.message);
      }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            <h2>Admin Login</h2>
            <p>Welcome! Enter your email and password to log in to the admin dashboard.</p>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}> Email: </label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}/>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}> Password: </label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}/>
                </div>
                <button type="submit" style={{ padding: '0.5rem 1rem' }}> Login </button>
            </form>
        </div>
    );
}