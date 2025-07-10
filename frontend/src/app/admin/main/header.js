import Link from 'next/link'
import Image from 'next/image'
import styles from '../admin.module.css'
import profilePic from './pankaj-img-1.webp'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/admin" className={styles.brand}>
        <h2>RentOrHire</h2>
      </Link>

      <Image src={profilePic} alt="Profile" className={styles.profileIcon} width={32} height={32}/>
    </header>
  )
}
