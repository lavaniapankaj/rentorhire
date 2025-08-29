
"use client";
import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import styles from "./home.module.css";

export default function RentPage() {
  const words = useMemo(() => ["Affordable.", "Trusted.", "Flexible."], []);
  const [index, setIndex] = useState(0);

  // rotate every 2 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(t);
  }, [words.length]);

  const letters = words[index].split("");

  return (
    <>
      <head>
        <title>RentOrHire</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      {/* HEADER/FOOTER removed as requested */}

      <section className={styles.hero_wrap}>
        <div className={styles.hero_section}>
          <div className={`container ${styles.hero_container}`}>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className={styles.main_heading}>
                  <h1>
                    Book Reliable Rentals From Locals - Fast, Easy, and{" "}
                    <span className={styles["cd-words-wrapper"]}>
                      <b className="is-visible">
                        <span className={styles.cdLetters}>
                          {letters.map((ch, i) => (
                            <i key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                              {ch}
                            </i>
                          ))}
                        </span>
                      </b>
                    </span>
                  </h1>
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
                              <label htmlFor="location" className="loc_block_inner">
                                Location
                              </label>
                              <div className={styles.location_in_wrap}>
                                <input
                                  className="w-100"
                                  id="location"
                                  type="search"
                                  placeholder="Enter your destination..."
                                  name="location"
                                />
                                <img src="images/homepg/pin.svg" alt="pin" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className={`col-lg-3 col-md-6 col-12 ${styles.border_rightF2}`}>
                          <div className="h-100">
                            <div className="form-group w-100">
                              <label htmlFor="category" className="cat_block_inner">
                                Category
                              </label>
                              <div className={styles.category_in_wrap}>
                                <select id="category" className="text-muted w-100" defaultValue="">
                                  <option value="">Select Category</option>
                                  <option value="">Select Category</option>
                                </select>
                                <img className="toggle-icon" src="images/homepg/down.svg" alt="toggle" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Query */}
                        <div className="col-lg-4 col-md-8 col-12">
                          <div className={styles.search_block_wrap}>
                            <div className={`${styles.search_block_inner} rounded-pill`}>
                              <div className="w-100">
                                <label className={styles.whatoftype} htmlFor="whatoftype">
                                  Search Rentals
                                </label>
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
                                  d="m886.2 843.8-62.6-62.6-99.7-99.7-22.7-22.7v42.4c44.6-44.8 76.8-102.3 90.2-164.2 13.1-60.6 10.1-125.1-10.8-183.7-10.6-29.7-24.8-58.1-43.4-83.6-20.6-28.3-44.5-52.6-72.2-73.8-50-38.3-110.8-60.1-173.3-65.8-62.1-5.6-125.3 7.7-180.7 35.8-57.1 29-105.7 75.8-137.6 131.3-30.9 53.8-46.6 116.6-44.2 178.6 2.4 62.3 21.8 124.2 57.1 175.7 39.7 57.9 95.5 101.7 161 126.7 61.8 23.6 131 27 195.2 11.9 14.8-3.5 29.2-8.1 43.3-13.7 7.5-3 13.7-6.5 17.9-13.8 3.8-6.4 5.4-15.9 3-23.1-2.3-7.3-6.8-14.3-13.8-17.9-6.7-3.5-15.8-5.9-23.1-3-23.5 9.4-48.1 15.8-73.2 19.2 2.7-.4 5.3-.7 8-1.1-26.9 3.5-54.2 3.5-81.1 0 2.7.4 5.3.7 8 1.1-27.1-3.7-53.6-10.9-78.8-21.5l7.2 3c-14.2-6.1-27.9-13.1-41-21.2-6.5-4-12.9-8.3-19.1-12.9-1.5-1.1-2.9-2.1-4.4-3.2-3.9-2.9 2.3 1.8 2.4 1.9-.5-.1-1.9-1.5-2.4-1.9-3.3-2.6-6.5-5.3-9.6-8-11.5-10-22.3-20.8-32.2-32.3-2.4-2.8-4.7-5.6-7-8.4-.5-.6-.9-1.1-1.4-1.7-2.9-3.6 2 2.6 2 2.6-1.4-1.6-2.6-3.5-3.9-5.2-4.2-5.8-8.2-11.7-12-17.8-8.6-13.7-16.1-28.1-22.4-43.1l3 7.2c-10.6-25.2-17.8-51.6-21.4-78.6.4 2.7.7 5.3 1.1 8-3.5-26.9-3.5-54 0-80.9-.4 2.7-.7 5.3-1.1 8 3.7-27 10.8-53.4 21.4-78.6l-3 7.2c5.8-13.6 12.5-26.8 20.2-39.4 4-6.5 8.2-12.9 12.6-19.1 1-1.4 2-2.7 3-4.1.6-.8 1.2-1.5 1.7-2.3 2.7-3.7-2 2.6-2.1 2.6 2.1-3.2 4.8-6.1 7.3-9 9.9-11.8 20.8-22.9 32.4-33.1 2.7-2.4 5.5-4.8 8.3-7.1l4.5-3.6c1.5-1.2 4.5-3.1-2.6 2 1-.7 1.9-1.5 2.9-2.2 5.9-4.4 12-8.6 18.3-12.6 14.3-9.1 29.3-17 44.9-23.6l-7.2 3c25.2-10.6 51.6-17.8 78.6-21.4-2.7.4-5.3.7-8 1.1 26.9-3.5 54-3.5 80.9 0-2.7-.4-5.3-.7-8-1.1 27 3.7 53.4 10.8 78.6 21.4l-7.2-3c13.6 5.8 26.8 12.5 39.4 20.2 6.5 4 12.9 8.2 19 12.6 1.4 1 2.7 2 4.1 3 .8.6 1.5 1.2 2.3 1.7 3.7 2.7-2.6-2-2.6-2.1 3.2 2.1 6.1 4.8 9 7.3 11.8 9.9 22.9 20.8 33.1 32.4 2.4 2.7 4.8 5.5 7.1 8.3l3.6 4.5c1.2 1.5 3.1 4.5-2-2.6.7 1 1.5 1.9 2.2 2.9 4.4 5.9 8.6 12 12.6 18.3 9.1 14.3 17 29.3 23.6 44.9l-3-7.2c10.6 25.2 17.8 51.6 21.4 78.6-.4-2.7-.7-5.3-1.1-8 3.5 26.9 3.5 54 0 80.9.4-2.7.7-5.3 1.1-8-3.7 27-10.8 53.4-21.4 78.6l3-7.2c-7.5 17.5-16.5 34.4-27.1 50.2-2.7 4-5.4 7.9-8.2 11.7-.7 1-1.4 1.9-2.2 2.9-2.9 3.9 3.8-4.9 1.6-2.1l-4.5 5.7c-6.4 7.7-13.1 15.2-20.2 22.3-11.4 11.5-11.5 30.9 0 42.4l62.6 62.6 99.7 99.7 22.7 22.7c11.1 11.1 31.5 11.9 42.4 0 11-11.8 11.9-30.4 0-42.3z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Advance Filter (placeholder, hidden by default in CSS) */}
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
      </section>

    </>
  );
}
