'use client'
import Link from 'next/link'

export default function UserDashboard() {
  return (
    <div>
      <h1>User</h1>
      <ul style={{ display: 'flex', gap: '10px', listStyle: 'none' }}>
        <li><Link href="/admin/user/add">Add New User</Link></li>
        <li><Link href="/admin/user/list">All Users</Link></li>
        <li><Link href="/admin/user/edit">Edit User</Link></li>
        <li><Link href="/admin/user/delete">Delete User</Link></li>
      </ul>
    </div>
  )
}
