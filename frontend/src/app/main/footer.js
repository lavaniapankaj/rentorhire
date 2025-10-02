import Link from "next/link";
import styles from "./footer.module.css";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={`${styles.footer} ${styles.roh_container}`} >
      <div className={`container`}>
        <div className={`row gy-4`}>
          {/* Brand / About */}
          <div className={`col-12 col-md-12 col-lg-4`}>
            <div className={styles.brandBlock}>
              <Link href="/" className={styles.logoLink}>
                <Image 
                  src="/images/global-imgs/site-logo.png" alt="Logo"
                   width={78} height={28} 
                  className={styles.roh_logo}
                />
              </Link>

              <p className={`${styles.desc} mt-3`}>
                We offer everything you need—furniture, electronics, vehicles, tools,
                and more—on rent. Flexible plans, easy booking, and doorstep delivery
                make renting hassle-free.
              </p>

              <ul className={styles.roh_social}>
                <li>
                  <Link href="#">
                    <img
                      src="/images/facebook.svg"
                      alt="Facebook"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <img
                      src="/images/twitter.svg"
                      alt="X / Twitter"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <img
                      src="/images/linkedin.svg"
                      alt="LinkedIn"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <img
                      src="/images/social.svg"
                      alt="Instagram"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Company */}
          <div className={`col-6 col-md-3 col-lg-2`}>
            <h3 className={styles.roh_title}>Company</h3>
            <ul className={styles.roh_list}>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Press</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className={`col-6 col-md-3 col-lg-2`}>
            <h3 className={styles.roh_title}>Services</h3>
            <ul className={styles.roh_list}>
              <li><Link href="/services/vehicles">Vehicles</Link></li>
              <li><Link href="#">Electronics</Link></li>
              <li><Link href="#">Home Appliances</Link></li>
              <li><Link href="#">Events &amp; Party</Link></li>
              <li><Link href="#">Travel &amp; Camping</Link></li>
              <li><Link href="#">Tools &amp; Equipment</Link></li>
              <li><Link href="#">View All Services</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className={`col-6 col-md-3 col-lg-2`}>
            <h3 className={styles.roh_title}>Help</h3>
            <ul className={styles.roh_list}>
              <li><Link href="#">How It Works</Link></li>
              <li><Link href="#">List Your Item</Link></li>
              <li><Link href="#">FAQs</Link></li>
              <li><Link href="#">Provider FAQs</Link></li>
              <li><Link href="#">Why List with Us</Link></li>
              <li><Link href="#">Safety Guidelines</Link></li>
              <li><Link href="#">Cancellation &amp; Refund Policy</Link></li>
            </ul>
          </div>

          {/* Explore More */}
          <div className={`col-6 col-md-3 col-lg-2`}>
            <h3 className={styles.roh_title}>Explore More</h3>
            <ul className={styles.roh_list}>
              <li><Link href="#">All Categories</Link></li>
              <li><Link href="#">Popular Cities</Link></li>
              <li><Link href="#">New Arrivals</Link></li>
              <li><Link href="#">Trending Rentals</Link></li>
              <li><Link href="#">Upcoming Features</Link></li>
            </ul>
          </div>
        </div>

        {/* Copy bar */}
        <div className={`${styles.roh_copyBar} d-flex flex-wrap align-items-center mt-4`}>
          <div className={`col-12 col-md-6`}>
            <div className={styles.fineLinks}>
              <Link href="#" className={styles.roh_fineLink}>Privacy &amp; Policy</Link>
              <Link href="#" className={styles.roh_fineLink}>Terms &amp; Conditions</Link>
            </div>
          </div>
          <div className={`col-12 col-md-6`}>
            <p className={styles.roh_copyText}>
              © 2025 <strong>Find On Rent</strong>. All rights reserved. | Powered by <a href="https://webdevops.ltd/" target="_blank">WebDevOps Pvt Ltd</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
