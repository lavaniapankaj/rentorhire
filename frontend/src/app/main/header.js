'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import '../globals.css';
import styles from './header.module.css';
import Image from 'next/image';

const Header = () => {
  useEffect(() => {
    /** Load Bootstrap JS on client side for navbar toggles and dropdowns */
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <script>

      </script>

      <header className={`mainbar  ${styles.roh_header_area} ${styles.roh_is_sticky}`}>
        <div className={`container py-2 ${styles.roh_header_block}`}>
          <div className={`header_manage`}>
            <div className={`row align-items-center d-flex justify-content-between`}>
              <div className={`col-4 col-md-6 col-lg-2 ${styles.roh_logo_block}`}>
                <Link href="/">
                  <Image className={styles.roh_logo} src="/images/global-imgs/site-logo.png" alt="Logo" width={100} height={36} />
                </Link>
              </div>
              <div className={`col-2 col-md-2 col-lg-7 order-1 order-lg-0 ${styles.roh_desktop_headerNav}`}>
                <nav className={`navbar navbar-expand-lg navbar-dark bg-transparent ${styles.roh_header_nav}`}>
                  <div className={`navbar-collapse justify-content-start collapse show ${styles.roh_navbarNav}`} id="navbarNav">
                    <ul className={`navbar-nav w-100 justify-content-around ${styles.roh_navBar}`}>
                      <li className={`nav-item `}>
                        <a className={`nav-link ${styles.roh_navLink}`} href="/">Home</a>
                      </li>
                      <li className={`nav-item dropdown ${styles.roh_dropdown}`}>
                        <a
                          className={`nav-link dropdown_toggle ${styles.dropdown_toggle} ${styles.roh_navLink}`} href="/products/" id="navbarDropdown"> Services
                        </a>
                        <div className={`dropdown-menu ${styles.roh_dropdown_menu}`} aria-labelledby="navbarDropdown">
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/vehicles/">Vehicles</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/electronics/">Electronics</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/home-appliances/">Home Appliances</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/tools-and-equipment/">Tools & Equipment</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/events-and-party/">Events & Party</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Baby & Kids</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Travel & Camping</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Studio & Production</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Office & Furniture</Link>
                          <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Miscellaneous</Link>
                        </div>
                      </li>

                      <li className={`nav-item`}>
                        <a className={`nav-link ${styles.roh_navLink}`} href="/how-it-works/">How It Works</a>
                      </li>
                      <li className={`nav-item`}>
                        <a className={`nav-link ${styles.roh_navLink}`} href="/faq/">FAQs</a>
                      </li>
                      <li className={`nav-item`}>
                        <a className={`nav-link ${styles.roh_navLink}`} href="/about-us/">About Us</a>
                      </li>
                      <li className={`nav-item`}>
                        <a className={`nav-link ${styles.roh_navLink}`} href="/contact-us/">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className={`col-6 col-md-4 col-lg-3 text-end`}>
                <div className={`d-flex align-items-center ${styles.roh_headerRight_button}`}>
                  <div className={`d-flex align-items-center justify-content-center roh_redBtns`}>
                <div className="roh_button_custom"><Link href="/become-a-host">List Your Item</Link></div>
                <div className="roh_circl_btn">
                  <Link href="/become-a-host"><Image src="/arrow.svg" alt="Arrow Right" width={30} height={30} /></Link>
                </div>
              </div>

                  <div className={`roh_dashboard_profile`}>
                    <div className={`${styles.roh_profile_box}`}>
                      <div className="dropdown">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false"><Image src="/user.svg" alt="User" width={30} height={30} /></button>

                        <div className={`dropdown-menu profil-dropdown p-0 ${styles.dropdownmob_menu}`}>
                          <div className={`roh_adrop_outer`} style={{ display: 'block' }}>
                            <div className={`${styles.roh_adrop_box_wrap}`}>
                              <ul className={`${styles.roh_adrop_list}`}>
                                <li>
                                  <a href="/dashboard" className={styles.loginBtn}>
                                    <Image src="/user1.svg" alt="Profile" width={20} height={20} /> Profile </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image src="/support.svg" alt="Support" width={20} height={20} /> Support </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image src="/chat.svg" alt="Inbox" width={20} height={20} /> Inbox </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image src="/setting-lines.svg" alt="Setting" width={20} height={20} /> Settings </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image src="/log-in.svg" alt="Log-In" width={20} height={20} /> Login </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image src="/logout.svg" alt="Log-Out" width={20} height={20} /> Logout </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*------------------- Mobile menu offcanvas Pop Up Start-----------------------*/}
                  <div className={`${styles.roh_mobileMenu}`}>
                    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                      <Image src="/menu-icon.svg" alt="Mobile Menu" width={30} height={30} />
                    </button>
                    <div className={`offcanvas offcanvas-start`} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                      <div className={`offcanvas-header ${styles.roh_offcanvas_header}`}>
                        <Image className={styles.roh_logo} src="/images/global-imgs/site-logo.png" alt="Logo" width={100} height={36} />
                        <button type="button" className={`btn-close`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
                      </div>
                      <div className={`offcanvas-body ${styles.roh_offcanvas_body}`}>
                        <ul className={`navbar-nav w-100 justify-content-around ${styles.roh_navBar}`}>
                          <li className={`nav-item `}>
                            <a className={`nav-link ${styles.roh_navLink}`} href="/">Home</a>
                          </li>
                          <li className={`nav-item dropdown ${styles.roh_dropdown}`}>
                            <a
                              className={`nav-link dropdown_toggle ${styles.dropdown_toggle} ${styles.roh_navLink}`} href="/products/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" > Services
                            </a>
                            <div className={`dropdown-menu ${styles.roh_dropdown_menu}`} aria-labelledby="navbarDropdown">
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/vehicles/">Vehicles</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/electronics/">Electronics</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/home-appliances/">Home Appliances</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="/services/tools-and-equipment/">Tools & Equipment</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Events & Party</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Baby & Kids</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Travel & Camping</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Studio & Production</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Office & Furniture</Link>
                              <Link className={`dropdown-item ${styles.roh_dropdown_item}`} href="#">Miscellaneous</Link>
                            </div>
                          </li>
                          <li className={`nav-item`}>
                            <a className={`nav-link ${styles.roh_navLink}`} href="#">How It Works</a>
                          </li>
                          <li className={`nav-item`}>
                            <a className={`nav-link ${styles.roh_navLink}`} href="/faq.html">FAQs</a>
                          </li>
                          <li className={`nav-item`}>
                            <a className={`nav-link ${styles.roh_navLink}`} href="#">About Us</a>
                          </li>
                          <li className={`nav-item`}>
                            <a className={`nav-link ${styles.roh_navLink}`} href="#">Contact Us</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/*------------------- Mobile menu Pop Up END-----------------------*/}
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
