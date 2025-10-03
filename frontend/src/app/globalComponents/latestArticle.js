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
                      <a className={styles.article_btn}>
                      <Image src="/arrow.svg" alt="Arrow" width={18} height={18} />
                      </a>
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
                    <div className={`${styles.read_link}`}>
                      Read Story
                      <div className={styles.circl_btn}>
                        <a className={styles.article_btn}>
                        <Image src="/arrow.svg" alt="Arrow" width={18} height={18} />
                        </a>
                      </div>
                    </div>
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
                    <div className={`${styles.read_link}`}>
                      Read Story
                      <div className={styles.circl_btn}>
                        <a className={styles.article_btn}>
                        <Image src="/arrow.svg" alt="Arrow" width={18} height={18} />
                        </a>
                      </div>
                    </div>
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
                    <div className={`${styles.read_link}`}>
                      Read Story
                      <div className={styles.circl_btn}>
                        <a className={styles.article_btn}>
                        <Image src="/arrow.svg" alt="Arrow" width={18} height={18} />
                        </a>
                      </div>
                    </div>
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