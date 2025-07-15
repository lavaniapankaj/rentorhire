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
    <aside style={{ width: '250px', background: '#eee', padding: '10px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        
        {/* Users Menu Item */}
        <li>
          <a href="/adminrohpnl/user/list" style={{ display: 'block', padding: '5px', textDecoration: 'none' }}>
            Users
          </a>
        </li>

        {/* Categories Link */}
        <li>
          <a
            href="/adminrohpnl/category/list" // Link to the new category list page
            style={{ display: 'block', padding: '5px', textDecoration: 'none' }}
          >
            Category
          </a>
        </li>

        <li><a href="#">Settings</a></li>

        {/* Logout Button */}
        <li>
          <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', marginTop: '20px', width: '100%', textAlign: 'center' }}>
            Logout
          </button>
        </li>
        {/* Settings Menu Item */}
        {/* <li>
          <a href="#" style={{ display: 'block', padding: '5px', textDecoration: 'none' }}>
            Settings
          </a>
        </li> */}
      </ul>
    </aside>
  );
}
