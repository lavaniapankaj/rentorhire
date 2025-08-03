'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function Sidebar() {
  const [currentUrl, setCurrentUrl] = useState('')
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.pathname)
    }
  }, [])
  const isActive = (path) => currentUrl == path;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'authUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/auth/admin');
  };

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.menuList}>
        {/* <li><a href="/adminrohpnl" className={`link ${isActive('/adminrohpnl') ? 'active' : ''}`}>Dashboard</a></li> */}
        {/* <li><a href="/adminrohpnl" className={styles.menuLink}>Dashboard</a></li> */}
        <li><a href="/adminrohpnl"     className={`${styles.menuLink} ${isActive('/adminrohpnl') ? styles.menuActive : ''}`}>Dashboard</a></li>
        <li><a href="/adminrohpnl/category" className={`${styles.menuLink} ${isActive('/adminrohpnl/category') ? styles.menuActive : ''}`}>Categories</a></li>
        <li><a href="#" className={`${styles.menuLink} ${isActive('/adminrohpnl/product') ? styles.menuActive : ''}`}>Products</a></li>
        <li><a href="/adminrohpnl/user" className={`${styles.menuLink} ${isActive('/adminrohpnl/user') ? styles.menuActive : ''}`}>Users</a></li>
        <li><a href="/adminrohpnl/role" className={`${styles.menuLink} ${isActive('/adminrohpnl/role') ? styles.menuActive : ''}`}>Roles</a></li>
        <li><a href="/adminrohpnl/route" className={`${styles.menuLink} ${isActive('/adminrohpnl/route') ? styles.menuActive : ''}`}>Routes</a></li>
        <li><a href="/adminrohpnl/state-city" className={`${styles.menuLink} ${isActive('/adminrohpnl/state-city') ? styles.menuActive : ''}`}>State & City</a></li>
        <li><a href="#" className={`${styles.menuLink} ${isActive('/adminrohpnl/setting') ? styles.menuActive : ''}`}>Settings</a></li>
        <li>
          <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </aside>
  );
}
