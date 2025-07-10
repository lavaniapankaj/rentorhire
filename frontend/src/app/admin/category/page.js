'use client'
import Link from 'next/link'

export default function CategoryDashboard() {
  return (
    <div>
      <h1>Category Dashboard</h1>
      <ul style={{ display: 'flex', gap: '10px', listStyle: 'none' }}>
        <li><Link href="/admin/category/add">Add Category</Link></li>
        <li><Link href="/admin/category/list">List Categories</Link></li>
        <li><Link href="/admin/category/edit">Edit Category</Link></li>
        <li><Link href="/admin/category/delete">Delete Category</Link></li>
      </ul>
    </div>
  )
}
