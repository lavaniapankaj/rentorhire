export default function Sidebar() {
    return (
      <aside style={{ width: '200px', background: '#eee', padding: '10px' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/admin/user">Users</a></li>
          <li><a href="/admin/category">Categories</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </aside>
    )
  }
  