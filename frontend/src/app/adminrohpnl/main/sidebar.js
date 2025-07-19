'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const [isUsersOpen, setIsUsersOpen] = useState(false)

  const toggleUsersMenu = () => {
    setIsUsersOpen(!isUsersOpen)
  }
  
  const handleLogout = () => {
    // Remove the auth token and user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');

    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'authUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    // Redirect the user to the login page after logout
    router.push('/auth/admin');
  }

  return (
    <aside style={sidebarStyles}>
      <ul style={menuListStyles}>
        {/* Dashboard Menu Item */}
        <li style={menuItemStyles}>
          <a href="/adminrohpnl" style={linkStyles}>
            Dashboard
          </a>
        </li>

        {/* Categories Link */}
        <li style={menuItemStyles}>
          <a href="/adminrohpnl/category/" style={linkStyles}>
            Categories
          </a>
        </li>

        {/* Products Link */}
        <li style={menuItemStyles}>
          <a href="#" style={linkStyles}>
            Products
          </a>
        </li>

        {/* Users Menu Item */}
        <li style={menuItemStyles}>
          <a href="/adminrohpnl/user/" style={linkStyles}>
            Users
          </a>
        </li>

        {/* Role Link */}
        <li style={menuItemStyles}>
          <a href="/adminrohpnl/role/" style={linkStyles}>
            Roles
          </a>
        </li>

        {/* Route Link */}
        <li style={menuItemStyles}>
          <a href="#" style={linkStyles}>
            Routes
          </a>
        </li>

        {/* State& & City Link */}
        <li style={menuItemStyles}>
          <a href="#" style={linkStyles}>
            State & City
          </a>
        </li>

        {/* Settings Link */}
        <li style={menuItemStyles}>
          <a href="#" style={linkStyles}>
            Settings
          </a>
        </li>

        {/* Logout Button */}
        <li style={menuItemStyles}>
          <button 
            onClick={handleLogout} 
            style={logoutButtonStyles}
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

// Styles for Sidebar and Menu
const sidebarStyles = {
  width: '250px',
  background: '#2c3e50',
  color: 'white',
  padding: '20px',
  boxSizing: 'border-box',
  fontFamily: 'Arial, sans-serif',
  height: 'auto',
};

const menuListStyles = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const menuItemStyles = {
  marginBottom: '15px',
};

const linkStyles = {
  display: 'block',
  padding: '12px 15px',
  textDecoration: 'none',
  color: 'white',
  backgroundColor: '#34495e',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

const logoutButtonStyles = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  width: '100%',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

const hoverEffect = {
  backgroundColor: '#16a085',
};

