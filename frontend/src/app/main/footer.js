import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} ${styles.h_container}`} >
      <div className="container">
        <div className="row gy-4">
          {/* Brand / About */}
          <div className="col-12 col-md-12 col-lg-4">
            <div className={styles.brandBlock}>
              <Link href="/" className={styles.logoLink}>
                <img
                  src="/images/global-imgs/site-logo.png"
                  alt="Find On Rent"
                  className={styles.logo}
                />
              </Link>

              <p className={`${styles.desc} mt-3`}>
                We offer everything you need—furniture, electronics, vehicles, tools,
                and more—on rent. Flexible plans, easy booking, and doorstep delivery
                make renting hassle-free.
              </p>

              <ul className={styles.social}>
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
          <div className="col-6 col-md-3 col-lg-2">
            <h3 className={styles.title}>Company</h3>
            <ul className={styles.list}>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Press</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-6 col-md-3 col-lg-2">
            <h3 className={styles.title}>Services</h3>
            <ul className={styles.list}>
              <li><Link href="/products/">Vehicles</Link></li>
              <li><Link href="#">Electronics</Link></li>
              <li><Link href="#">Home Appliances</Link></li>
              <li><Link href="#">Events &amp; Party</Link></li>
              <li><Link href="#">Travel &amp; Camping</Link></li>
              <li><Link href="#">Tools &amp; Equipment</Link></li>
              <li><Link href="#">View All Services</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-6 col-md-3 col-lg-2">
            <h3 className={styles.title}>Help</h3>
            <ul className={styles.list}>
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
          <div className="col-6 col-md-3 col-lg-2">
            <h3 className={styles.title}>Explore More</h3>
            <ul className={styles.list}>
              <li><Link href="#">All Categories</Link></li>
              <li><Link href="#">Popular Cities</Link></li>
              <li><Link href="#">New Arrivals</Link></li>
              <li><Link href="#">Trending Rentals</Link></li>
              <li><Link href="#">Upcoming Features</Link></li>
            </ul>
          </div>
        </div>

        {/* Copy bar */}
        <div className={`${styles.copyBar} d-flex flex-wrap align-items-center mt-4`}>
          <div className="col-12 col-md-6">
            <div className={styles.fineLinks}>
              <Link href="#" className={styles.fineLink}>Privacy &amp; Policy</Link>
              <Link href="#" className={styles.fineLink}>Terms &amp; Conditions</Link>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <p className={styles.copyText}>
              © 2025 <strong>Find On Rent</strong>. All rights reserved. | Powered by <a href="https://webdevops.ltd/" target="_blank">WebDevOps Pvt Ltd</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
