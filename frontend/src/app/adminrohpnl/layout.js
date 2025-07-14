// 'use client';
import Header from './main/header';
import Sidebar from './main/sidebar';
import Footer from './main/footer';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export default function AdminLayout({ children }) {

  
  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   console.log("token>>", token);
  //   if(!token){
  //     /* Redirect on the admin dashboard */
  //     router.push('/auth/admin');
  //   }
  // }, []); 

  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '20px' }}>
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
