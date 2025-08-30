'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import Footer from './footer';

export default function AppShell({ children }) {
  const pathname = usePathname();

  /** Hide header/footer for admin routes coded by Vishnu August 28 2025 */
    const hideChrome = pathname.startsWith('/adminrohpnl') || pathname.startsWith('/auth');

  return (
    <>
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}
