import 'bootstrap/dist/css/bootstrap.min.css';
import AppShell from './main/AppShell';

export const metadata = {
  title: 'My Website',
  description: 'Next.js App Router demo',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}