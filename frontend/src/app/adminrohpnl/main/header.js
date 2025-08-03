'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from '../admin.module.css';
import profilePic from './pankaj-img-1.webp';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Link href="/adminrohpnl" className={styles.logo}>
          RentOrHire
        </Link>
      </div>
      <div className={styles.profileWrapper}>
        <Image src={profilePic} alt="Profile" width={40} height={40} className={styles.profilePic}/>
      </div>
    </header>
  );
}
