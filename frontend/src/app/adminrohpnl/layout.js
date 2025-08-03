// // 'use client';
// import Header from './main/header';
// import Sidebar from './main/sidebar';
// import Footer from './main/footer';

// // import { useRouter } from 'next/navigation';
// // import { useEffect } from 'react';

// export default function AdminLayout({ children }) {

//   return (
//     <html lang="en">
//       <body>
//         <Header />
//         <div style={{ display: 'flex' }}>
//           <Sidebar />
//           <main style={{ flex: 1, padding: '20px' }}>
//             {children}
//           </main>
//         </div>
//         <Footer />
//       </body>
//     </html>
//   )
// }

// layout.js
import Header from './main/header';
import Sidebar from './main/sidebar';
import Footer from './main/footer';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.layoutBody}>
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
      </body>
    </html>
  );
}
