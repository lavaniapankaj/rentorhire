// layout.js
import Header from './main/header';
import Sidebar from './main/sidebar';
import Footer from './main/footer';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layoutBody}>
      <div className={styles.layoutWrapper}>
        <Header />
        <div className={styles.layoutContent}>
          <Sidebar />
          <main className={styles.mainArea}>
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}