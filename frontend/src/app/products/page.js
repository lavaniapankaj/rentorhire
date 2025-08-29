// "use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./product.module.css";

export const metadata = { title: "ROH Products" };

export default function ProductsPage() {
  return (
    <section className={styles.hero_wrap}>
      <div className={styles.hero_section}>
        <div className={`container ${styles.hero_container}`}>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className={styles.main_heading}>
                <h1>Products</h1>
                <h2 className="d-none">Lorem ipsum dolor sit amet, consectetur.</h2>
              </div>
            </div>

            {/* Search Bar */}
            <div className="col-12">
              <div className={`container ${styles.custom_searchbar_wrap}`}>
                <div className={styles.custom_searchbar}>
                  <form className="w-100" action="#" method="post">
                    <div className="row">
                      {/* Location */}
                      <div className={`col-lg-3 col-md-6 col-12 ${styles.border_rightF1}`}>
                        <div className="h-100">
                          <div className="form-group w-100">
                            <label htmlFor="location" className="loc_block_inner">Location</label>
                            <div className={styles.location_in_wrap}>
                              <input
                                className="w-100"
                                id="location"
                                type="search"
                                placeholder="Enter your destination..."
                                name="location"
                              />
                              {/* If this is in /public, use absolute path */}
                              <img src="/images/homepg/pin.svg" alt="pin" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Category */}
                      <div className={`col-lg-3 col-md-6 col-12 ${styles.border_rightF2}`}>
                        <div className="h-100">
                          <div className="form-group w-100">
                            <label htmlFor="category" className="cat_block_inner">Category</label>
                            <div className={styles.category_in_wrap}>
                              <select id="category" className="text-muted w-100" defaultValue="">
                                <option value="">Select Category</option>
                                <option value="">Select Category</option>
                              </select>
                              <img className="toggle-icon" src="/images/homepg/down.svg" alt="toggle" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Query */}
                      <div className="col-lg-4 col-md-8 col-12">
                        <div className={styles.search_block_wrap}>
                          <div className={`${styles.search_block_inner} rounded-pill`}>
                            <div className="w-100">
                              <label className={styles.whatoftype} htmlFor="whatoftype">Search Rentals</label>
                              <input
                                id="whatoftype"
                                className="rounded-pill w-100"
                                type="search"
                                placeholder="Enter something..."
                                name="q"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="col-lg-2 col-md-12 col-12">
                        <div className={styles.rent_search_btn}>
                          <button className="button theme-btn" type="submit" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                              <path
                                fill="#ffffff"
                                d="m886.2 843.8-62.6-62.6-99.7-99.7-22.7-22.7v42.4c44.6-44.8 76.8-102.3 90.2-164.2 13.1-60.6 10.1-125.1-10.8-183.7-10.6-29.7-24.8-58.1-43.4-83.6-20.6-28.3-44.5-52.6-72.2-73.8-50-38.3-110.8-60.1-173.3-65.8-62.1-5.6-125.3 7.7-180.7 35.8-57.1 29-105.7 75.8-137.6 131.3-30.9 53.8-46.6 116.6-44.2 178.6 2.4 62.3 21.8 124.2 57.1 175.7 39.7 57.9 95.5 101.7 161 126.7 61.8 23.6 131 27 195.2 11.9 14.8-3.5 29.2-8.1 43.3-13.7 7.5-3 13.7-6.5 17.9-13.8 3.8-6.4 5.4-15.9 3-23.1-2.3-7.3-6.8-14.3-13.8-17.9-6.7-3.5-15.8-5.9-23.1-3-23.5 9.4-48.1 15.8-73.2 19.2..."
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Bottom text */}
              <div className="col-12">
                <div className="bottom_title">
                  <ul className={styles.list_bottom}>
                    <li>100% free</li>
                    <li>peer to peer rentals</li>
                    <li>no booking fees</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
        {/* ===== Main products section ===== */}
        <div className={styles.fleetswrap_inner}>
        <div className={styles.fleets_wrap_main}>
            <div className="d-flex justify-content-center align-items-center">
            <div className={styles.star_box}>
                <div className="d-flex align-items-center gap-1">
                <Image
                    src="/images/homepg/star.svg"
                    alt="star icon"
                    width={20}
                    height={20}
                />
                <span className={styles.star_title}>Our Fleets</span>
                </div>
            </div>
            </div>

            <h3 className={`${styles.second_heading} text-center`}>
            Explore our perfect and <br /> extensive fleet
            </h3>

            <div className="container mt-5 position-relative">
            <div id="thisfleets" className="owl-carousel owl-theme">
                <div className="item">
                <div className={`card ${styles.fleetscard}`}>
                    <Image
                    src="/images/homepg/bajaj.jpg"
                    className="card-img-top p-4"
                    alt="Bajaj Pulsar 150cc"
                    width={400}
                    height={250}
                    />

                    <div className="card-body d-flex flex-column justify-content-between pt-2">
                    <div>
                        <span className="badge rounded-pill px-3 py-2 badge-car">Bike</span>

                        <h5 className={`${styles.feets_cardH} mt-3 mb-4`}>
                        Bajaj Pulsar 150cc
                        </h5>

                        <div className="d-flex justify-content-between text-secondary mb-2">
                        <div className="d-flex align-items-center gap-1 feets_data_list">
                            <Image
                            src="/images/homepg/helmet.svg"
                            alt="Helmet icon"
                            width={20}
                            height={20}
                            />
                            <span>Helmet included</span>
                        </div>
                        <span className="text-dark fw-medium">1</span>
                        </div>

                        <div className="d-flex justify-content-between text-secondary mb-4">
                        <div className="d-flex align-items-center gap-1 feets_data_list">
                            <Image
                            src="/images/homepg/pistons.svg"
                            alt="Pistons icon"
                            width={20}
                            height={20}
                            />
                            <span>Engine Capacity</span>
                        </div>
                        <span className="text-dark fw-medium">350 cc</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top pt-2">
                        <div className="mb-0">
                        <span className={styles.priceStrong}>$329</span>
                        <span className={styles.priceMuted}>/Per Day</span>
                        </div>

                        <Link href="/book-now" className="btn-brand">
                        <div className={styles.circl_btn}>
                            <button aria-label="Book now">
                            {/* svg here */}
                            </button>
                        </div>
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
                {/* Repeat other items... */}
            </div>
            </div>
        </div>
        </div>
        {/* ===== end products section ===== */}

    </section>
  );
}
