'use client'
import Link from 'next/link'

export default function CategoryDashboard() {
  return (
    <div>
      <h1>Category Dashboard</h1>
      <ul style={{ display: 'flex', gap: '10px', listStyle: 'none' }}>
        <li><Link href="/adminrohpnl/category/add">Add Category</Link></li>
        <li><Link href="/adminrohpnl/category/list">List Categories</Link></li>
        <li><Link href="/adminrohpnl/category/edit">Edit Category</Link></li>
        <li><Link href="/adminrohpnl/category/delete">Delete Category</Link></li>
      </ul>
    </div>
  )
}
