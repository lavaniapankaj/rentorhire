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

    // redirect the user to the login page after logout
    router.push('/auth/admin');
  }

  return (
    <aside style={{ width: '200px', background: '#eee', padding: '10px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        
        {/* Users Menu with Submenu */}
        <li onMouseEnter={toggleUsersMenu} onMouseLeave={toggleUsersMenu}>
          <a href="/adminrohpnl/user/list" style={{ cursor: 'pointer' }}>Users</a>
          {isUsersOpen && (
            <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
              <li><a href="/adminrohpnl/user/list">All Users</a></li>
              <li><a href="/adminrohpnl/user/add">Add New User</a></li>
            </ul>
          )}
        </li>

        {/* Other menu items */}
        <li><a href="/adminrohpnl/category">Categories</a></li>
        <li><a href="#">Settings</a></li>

        {/* Logout Button */}
        <li>
          <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', marginTop: '20px', width: '100%', textAlign: 'center' }}>
            Logout
          </button>
        </li>
      </ul>
    </aside>
  )
}
