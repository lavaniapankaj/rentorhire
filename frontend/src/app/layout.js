// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './external.module.css';        // <- optional: your remote CSS / fonts @import
import AppShell from './main/AppShell';

export const metadata = {
  // title: 'Rent or Hire',
  // description: 'Find on Rent description',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* don`t use <head> only use metadata/viewport */}
      <body style={{ margin: "0" }} suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
