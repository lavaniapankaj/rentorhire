import Header from './main/header'
import Sidebar from './main/sidebar'
import Footer from './main/footer'

export default function AdminLayout({ children }) {
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
