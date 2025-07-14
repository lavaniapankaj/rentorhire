'use client'

export default function Sidebar() {
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
            Category List
          </a>
        </li>

        {/* Settings Menu Item */}
        <li>
          <a href="#" style={{ display: 'block', padding: '5px', textDecoration: 'none' }}>
            Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}
