import styles from '../admin.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 RentOrHire. All rights reserved.</p>
      <p>
        Developed by{' '}
        <a href="https://rentorhire.in" target="_blank" rel="noopener noreferrer">
          RentOrHire Team
        </a>
      </p>
    </footer>
  );
}
