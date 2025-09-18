"use client";
import styles from './css/aboutUs.module.css';
import Image from "next/image";


export default function AboutUs() {

    return (
        <>
        <section className="py-5">
          <div className="container">
            <div className="row">
              {/* Left Images */}
              <div className="col-12 col-md-12 col-lg-6">
                <div className={styles.body_img_egg}>
                  <div className={`${styles.egg_img1_wrap} ${styles.about_img_1}`}>
                    <div className={styles.egg_img1}>
                      <Image className={styles.eggimg1}
                        src="/images/homepg/big5.jpg"
                        alt="Electronic rental 1"
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className={`${styles.egg_img2_wrap} ${styles.about_img_2}`}>
                    <div className={styles.egg_img2}>
                      <Image className={styles.eggimg2}
                        src="/images/homepg/big6.jpg"
                        alt="Electronic rental 2"
                        width={600}
                        height={400}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="col-12 col-md-12 col-lg-6">
                <div className={styles.banner_bottom}>
                  <div className={styles.star_box}>
                    <div className={`align-items-center gap-1 ${styles.star_inner} ${styles.star_inner}`}>
                      <Image
                        src="/images/homepg/star.svg"
                        alt="Star icon"
                        width={20}
                        height={20}
                      />
                      <span className={styles.star_title}>About us</span>
                    </div>
                  </div>

                  <h3 className={styles.second_heading}>
                    Your Go-To Platform for Reliable Electronic Rentals
                  </h3>
                  <p className={`${styles.global_heading} ${styles.gray_global_heading}`}>
                    Need a laptop for work, a DSLR for an event, or a projector for
                    your presentation? We connect you with trusted owners offering
                    well-maintained, ready-to-use devices.
                  </p>

                  <ul className={styles.about_media_list}>
                    <li>
                      <div className={styles.media}>
                        <div className={styles.media_imgbox}>
                          <div className={styles.back_circle}>
                            <Image
                              src="/images/homepg/operating-system.svg"
                              alt="Verified electronics"
                              width={40}
                              height={40}
                            />
                          </div>
                        </div>
                        <div className={`media-body`}>
                          <h5 className={`${styles.media_title}`}>
                            Verified electronics & tested hardware
                          </h5>
                          <p className={`${styles.global_heading} ${styles.media_desc} ${styles.gray_global_heading}`}>
                            We Have Optimized The Booking Process So That Our
                            Clients Can Experience The Easiest And The Safest
                            Service
                          </p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className={styles.media}>
                        <div className={styles.media_imgbox}>
                          <div className={styles.back_circle}>
                            <Image
                              src="/images/homepg/best-price.svg"
                              alt="Best price"
                              width={40}
                              height={40}
                            />
                          </div>
                        </div>
                        <div className={`media-body`}>
                          <h5 className={`${styles.media_title}`}>
                            Transparent pricing — no hidden charges
                          </h5>
                          <p className={`${styles.global_heading} ${styles.media_desc} ${styles.gray_global_heading}`}>
                            We Have Optimized The Booking Process So That Our
                            Clients Can Experience The Easiest And The Safest
                            Service
                          </p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className={styles.media}>
                        <div className={styles.media_imgbox}>
                          <div className={styles.back_circle}>
                            <Image
                              src="/images/homepg/cross-docking.svg"
                              alt="Pickup and drop-off"
                              width={40}
                              height={40}
                            />
                          </div>
                        </div>
                        <div className={`media-body`}>
                          <h5 className={`${styles.media_title}`}>
                            Pickup & drop-off available locally
                          </h5>
                          <p className={`${styles.global_heading} ${styles.media_desc} ${styles.gray_global_heading}`}>
                            We Have Optimized The Booking Process So That Our
                            Clients Can Experience The Easiest And The Safest
                            Service
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div className={`d-flex align-items-center ${styles.top_btns}`}>
                    <div className={`${styles.buttonCustom}`}>
                      <button>Contact us</button>
                    </div>
                    <div className={`${styles.circl_btn}`}>
                      <button>
                        <svg
                          fill="none"
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          id="fi_9210374"
                        >
                          <g
                            clipRule="evenodd"
                            fill="rgb(0,0,0)"
                            fillRule="evenodd"
                          >
                            <path d="m4 16c0-.5523.44772-1 1-1h22c.5523 0 1 .4477 1 1s-.4477 1-1 1h-22c-.55228 0-1-.4477-1-1z"></path>
                            <path d="m17.2929 6.29289c.3905-.39052 1.0237-.39052 1.4142 0l9 9.00001c.3905.3905.3905 1.0237 0 1.4142l-9 9c-.3905.3905-1.0237.3905-1.4142 0s-.3905-1.0237 0-1.4142l8.2929-8.2929-8.2929-8.29289c-.3905-.39053-.3905-1.02369 0-1.41422z"></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Right */}
            </div>
          </div>
        </section>
        </>
    );

}