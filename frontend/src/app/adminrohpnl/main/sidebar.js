'use client'
import { useState } from 'react'

export default function Sidebar() {
  const [isUsersOpen, setIsUsersOpen] = useState(false)

  const toggleUsersMenu = () => {
    setIsUsersOpen(!isUsersOpen)
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
      </ul>
    </aside>
  )
}
