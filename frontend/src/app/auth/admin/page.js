'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const API_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_ADMIN_URL;

/** Admin login - Coded by Raj - July 11 2025 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      
      /** Checking for the token and redirecting on the dashboard if the token is not expired */
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };
      
      const token = getCookie('authToken');
      if(token){
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
      
        if (decodedToken.exp > currentTime) {
          // localStorage.clear();
          window.location.href = "/adminrohpnl";
        }
      } 
    }, []); 
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_ADMIN_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await res.json();

      if (data.status === false) {
        throw new Error(data.message || 'Login failed');
      }
      
      document.cookie = `authToken=${data.token}; path=/`;
      document.cookie = `authUser=${JSON.stringify(data.user)}; path=/`;
      window.location.href = "/adminrohpnl";
    } catch (error) {
      console.error("Login error:", error);          // default error log
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);    // stack trace for exact location
      alert(error.message);
    }    
  };
/** Login new layout coded by Vishnu - July 28 2025 */
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Left Side */}
        <div style={styles.leftPane}>
          <h2 style={styles.adminHeading}>Admin Login</h2>
          <p style={styles.description}>
            Welcome! Enter your email and password to log in to the admin dashboard.
          </p>
        </div>

        {/* Right Side */}
        <div style={styles.rightPane}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.signinTitle}>Signin</h3>
            <div style={styles.inputGroup}>
            <input
                type="email"
                placeholder="Enter Username ..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password ..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={styles.showPasswordBtn}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit" style={styles.loginButton}>LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f4f6f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '900px',
    height: '500px',
    display: 'flex',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    background: '#fff',
  },
  leftPane: {
    flex: 1,
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  adminHeading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.5',
  },
  rightPane: {
    flex: 1,
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
  },
  signinTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '2rem',
    borderBottom: '2px solid #007bff',
    width: 'fit-content',
    paddingBottom: '0.5rem',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  showPasswordBtn: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    fontSize: '13px',
  },
  loginButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
