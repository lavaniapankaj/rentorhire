"use client";
import { useEffect } from "react";
import styles from './css/latestArticle.module.css';
import Image from "next/image";


export default function LatestArtical() {
      

    return (
        <>
    <section className={styles.articles_wrap}>
      <div className={`container ${styles.articles_inner}`}>
        <div className={styles.articles_wrap_main}>
          {/* Star Heading */}
          <div className={`d-flex justify-content-center align-items-center`}>
            <div className={styles.star_box}>
              <div className={` d-flex align-items-center gap-1 ${styles.star_inner}`}>
                <Image
                  src="/images/homepg/star.svg"
                  alt="Star Icon"
                  width={20}
                  height={20}
                />
                <span className={styles.star_title}>Latest Articles</span>
              </div>
            </div>
          </div>

          <h3 className={`text-center ${styles.second_heading}`}>
            Stay informed and inspired for
            <br />
            your next journey
          </h3>

          <div className={`container-fluid mt-5 position-relative`}>
            <div className={`row g-4`}>
              {/* Left Column */}
              <div className={`col-md-6`}>
                <div
                  className={`${styles.main_card} ${styles.htiscbox}`}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('/images/blog1.jpg')`,
                  }}
                >
                  <div className={`${styles.main_carddate} ${styles.thedate}`}>
                    <Image
                      src="https://webcarelogics.com/lokesh/assets/images/calendar_i.svg"
                      alt="Calendar Icon"
                      width={16}
                      height={16}
                    />{" "}
                    August 5, 2024
                  </div>
                  <h5>How to choose the right scooter for city use</h5>
                  <div className={`${styles.read_more_btn}`}>
                    <div className={`${styles.circl_btn}`}>
                      <button className={styles.article_btn}>
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

              {/* Right Column */}
              <div className={`col-md-6`}>
                {/* Sub-card 1 */}
                <div className={styles.sub_card}>
                  <div className={`${styles.article_sm_imgbox} ${styles.htiscbox}`}>
                    <Image
                      src="/images/blog1.jpg"
                      alt="Car Option"
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className={styles.article_sm_content}>
                    <small className={`${styles.global_heading} ${styles.gray_global_heading} ${styles.thedate}`}>
                      <Image
                        src="/images/calendar.svg"
                        alt="Calendar"
                        width={16}
                        height={16}
                      />{" "}
                      August 5, 2024
                    </small>
                    <h6>Electric vs. petrol bikes — what suits you?</h6>
                    <a className={`${styles.read_link}`}>
                      Read Story
                      <div className={styles.circl_btn}>
                        <button className={styles.article_btn}>
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
                    </a>
                  </div>
                </div>

                {/* Sub-card 2 */}
                <div className={styles.sub_card}>
                  <div className={`${styles.article_sm_imgbox} ${styles.htiscbox}`}>
                    <Image
                      src="/images/blog2.jpg"
                      alt="Car Option"
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className={styles.article_sm_content}>
                    <small className={`${styles.global_heading} ${styles.gray_global_heading} ${styles.thedate}`}>
                      <Image
                        src="/images/calendar.svg"
                        alt="Calendar"
                        width={16}
                        height={16}
                      />{" "}
                      August 5, 2024
                    </small>
                    <h6>Electric vs. petrol bikes — what suits you?</h6>
                    <a className={`${styles.read_link}`}>
                      Read Story
                      <div className={styles.circl_btn}>
                        <button className={styles.article_btn}>
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
                    </a>
                  </div>
                </div>

                {/* Sub-card 3 */}
                 <div className={styles.sub_card}>
                  <div className={`${styles.article_sm_imgbox} ${styles.htiscbox}`}>
                    <Image
                      src="/images/blog3.jpg"
                      alt="Car Option"
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className={styles.article_sm_content}>
                    <small className={`${styles.global_heading} ${styles.gray_global_heading} ${styles.thedate}`}>
                      <Image
                        src="/images/calendar.svg"
                        alt="Calendar"
                        width={16}
                        height={16}
                      />{" "}
                      August 5, 2024
                    </small>
                    <h6>Electric vs. petrol bikes — what suits you?</h6>
                    <a className={`${styles.read_link}`}>
                      Read Story
                      <div className={styles.circl_btn}>
                        <button className={styles.article_btn}>
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
                    </a>
                  </div>
                </div>
              </div>
              {/* End Right Column */}
            </div>
          </div>
        </div>
      </div>
    </section>
        </>
    );

}