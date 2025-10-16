"use client";
import styles from './css/whyChooseUs.module.css';
import Image from "next/image";

export default function WhyChooseUs() {

  return (
    <>
      <section className={styles.whychoose_wrap}>
        <div className={`container ${styles.whychoose_inner}`}>
          <div className={styles.whychoose_wrap_main}>
            <div className={`d-flex justify-content-center align-items-center`}>
              <div className={styles.star_box}>
                <div className={`d-flex align-items-center gap-1 ${styles.star_inner}`}>
                  <Image
                    src="/images/homepg/star.svg"
                    alt="Star"
                    width={24}
                    height={24}
                  />
                  <span className={styles.star_title}>Why Choose Us</span>
                </div>
              </div>
            </div>

            <h3 className={`text-center ${styles.second_heading}`}>
              Unmatched quality and service
              <br />
              for your needs
            </h3>

            <div className={`container mt-5 position-relative`}>
              <div className={`row`}>
                {/* Left Column */}
                <div className={`col-12 col-md-4 col-lg-4`}>
                  <div className={`${styles.why_block}`}>
                    <ul className={styles.about_media_list}>
                      <li>
                        <div className={styles.media}>
                          <div className={styles.media_imgbox}>
                            <div className={styles.back_circle}>
                              <Image
                                src="/images/why_one.svg"
                                alt="Verified Listings"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                          <div className={styles.media_body}>
                            <h5 className={styles.media_title}>Verified Listings</h5>
                            <p className={`${styles.global_heading} ${styles.media_desc} ${styles.gray_global_heading}`}>
                              Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex
                              Euismod Eu. Phasellus Hendrerit, Massa.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={styles.media}>
                          <div className={styles.media_imgbox}>
                            <div className={styles.back_circle}>
                              <Image
                                src="/images/why_two.svg"
                                alt="Vehicle Verification"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                          <div className={styles.media_body}>
                            <h5 className={styles.media_title}>Verified Listings</h5>
                            <p className={`${styles.global_heading} ${styles.media_desc} ${styles.gray_global_heading}`}>
                              Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex
                              Euismod Eu. Phasellus Hendrerit, Massa
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Middle Column */}
                <div className={`col-12 col-md-4 col-lg-4`}>
                  <div className={styles.why_choose_img_wrap}>
                    <div className={styles.why_img}>
                      <Image className={styles.middle_img_cover}
                        src="/images/car5.jpg"
                        alt="Car"
                        width={400}
                        height={280}
                      />
                    </div>
                    <div className={styles.why_imgTwo}>
                      <Image
                        src="/images/why-choose-car-img.png"
                        alt="Why Choose Car"
                        width={400}
                        height={280}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className={`col-12 col-md-4 col-lg-4`}>
                  <div className={styles.why_block}>
                    <ul className={styles.about_media_list}>
                      <li>
                        <div className={styles.media}>
                          <div className={styles.media_imgbox}>
                            <div className={styles.back_circle}>
                              <Image
                                src="/images/why_three.svg"
                                alt="Quick Support"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                          <div className={styles.media_body}>
                            <h5 className={styles.media_title}>Verified Listings</h5>
                            <p className={`${styles.global_heading} ${styles.media_desc} ${styles.gray_global_heading}`}>
                              Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex
                              Euismod Eu. Phasellus Hendrerit, Massa.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={styles.media}>
                          <div className={styles.media_imgbox}>
                            <div className={styles.back_circle}>
                              <Image
                                src="/images/why_four.svg"
                                alt="24/7 Support"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                          <div className={styles.media_body}>
                            <h5 className={styles.media_title}>Verified Listings</h5>
                            <p className={`${styles.global_heading} ${styles.media_desc} ${styles.gray_global_heading}`}>
                              Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex
                              Euismod Eu. Phasellus Hendrerit, Massa
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

}