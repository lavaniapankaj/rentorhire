'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  useEffect(() => {
    /** Load Bootstrap JS on client side for navbar toggles and dropdowns */
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <header className={styles.headerArea}>
    <div className={`container   ${styles.headerBlock} ${styles.h_container}`}>
      <div className={`row ${styles.topbarBlock}`}>
          <div className={`col-5 col-sm-6 col-lg-6`}>
              <button className={styles.dashboardbtn}>Dashboard</button>
          </div>
          <div className={`col-7 col-sm-6 col-lg-6`}>
            <div className='d-flex align-items-center justify-content-center'>
            <div className={styles.buttonCustom}>
                  <button>List Your Item</button>
                </div>
                <div className={styles.circlBtn}>
                  <button aria-label="go">
                    <svg fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <g clipRule="evenodd" fill="black" fillRule="evenodd">
                        <path d="m4 16c0-.5523.44772-1 1-1h22c.5523 0 1 .4477 1 1s-.4477 1-1 1h-22c-.55228 0-1-.4477-1-1z" />
                        <path d="m17.2929 6.29289c.3905-.39052 1.0237-.39052 1.4142 0l9 9.00001c.3905.3905.3905 1.0237 0 1.4142l-9 9c-.3905.3905-1.0237.3905-1.4142 0s-.3905-1.0237 0-1.4142l8.2929-8.2929-8.2929-8.29289c-.3905-.39053-.3905-1.02369 0-1.41422z" />
                      </g>
                    </svg>
                  </button>
                </div>
          </div></div>
      </div>
      <div className={`row align-items-center`}>

        {/* Logo */}
        <div className={`col-4 col-md-3 col-lg-2 ${styles.logoBlock} `}>
          <Link href="/">
            <img
              className={styles.logo}
              src="/images/global-imgs/site-logo.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Navbar */}
        <div className={`col-8 col-md-9 d-flex d-md-flex justify-content-end justify-content-md-end d-lg-block justify-content-lg-center col-lg-6 order-1 order-lg-0 ${styles.col_lg_7}`}>
          <nav className={`navbar navbar-expand-lg navbar-dark bg-transparent ${styles.navbar_n}`}>
            <button
              className={`navbar-toggler ${styles.navbar_toggler}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className={`navbar-toggler-icon`}></span>
            </button>

            <div className={`collapse navbar-collapse justify-content-start  ${styles.navbarNav_n}`} id="navbarNav">
              <ul className={`navbar-nav w-100 align-items-center justify-content-around  ${styles.roh_navbarNav}`}>
                <li className="nav-item">
                  <Link className={styles.navLink} href="/">Home</Link>
                </li>
                <li className={`nav-item ${styles.dropdown}`}>
                  <a
                    className={`nav-link dropdown_toggle ${styles.dropdown_toggle} ${styles.navLink}`}
                    href="/products/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Services 
                  </a>
                  <div className={`dropdown-menu ${styles.dropdown_menu}`} aria-labelledby="navbarDropdown">
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Vehicles</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Electronics</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Home Appliances</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Tools & Equipment</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Events & Party</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Baby & Kids</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Travel & Camping</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Studio & Production</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Office & Furniture</Link>
                    <Link className={`dropdown-item ${styles.dropdown_item}`} href="#">Miscellaneous</Link>
                  </div>
                </li>
                <li className="nav-item">
                  <a className={styles.navLink} href="#">How It Works</a>
                </li>
                <li className="nav-item">
                  <Link className={styles.navLink} href="/lokesh/faq.html">FAQs</Link>
                </li>
                <li className="nav-item">
                  <a className={styles.navLink} href="#">About Us</a>
                </li>
                <li className="nav-item">
                  <a className={styles.navLink} href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* CTA + Dashboard */}
        <div className={`col-6 col-md-8 col-lg-4 d-none d-md-none d-lg-flex  justify-content-end ${styles.col_lg_2}`}>
          <div className={`d-flex align-items-center ${styles.topBtns}`}>
            <Link href="/dashboard" className={styles.loginBtn}>
              Dashboard
            </Link>

            <Link href="/become-a-host" style={{ textDecoration: 'none' }}>
              <div className="d-flex align-items-center">
                <div className={styles.buttonCustom}>
                  <button>List Your Item</button>
                </div>
                <div className={styles.circlBtn}>
                  <button aria-label="go">
                    <svg fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <g clipRule="evenodd" fill="black" fillRule="evenodd">
                        <path d="m4 16c0-.5523.44772-1 1-1h22c.5523 0 1 .4477 1 1s-.4477 1-1 1h-22c-.55228 0-1-.4477-1-1z" />
                        <path d="m17.2929 6.29289c.3905-.39052 1.0237-.39052 1.4142 0l9 9.00001c.3905.3905.3905 1.0237 0 1.4142l-9 9c-.3905.3905-1.0237.3905-1.4142 0s-.3905-1.0237 0-1.4142l8.2929-8.2929-8.2929-8.29289c-.3905-.39053-.3905-1.02369 0-1.41422z" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  </header>
  );
};

export default Header;
