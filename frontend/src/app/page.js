"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css";
import Viewproductspop from "./products/components/Viewproductspop";

// ---- API ENDPOINTS ----
const RECENT_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_USER_URL}/getrecentproducts`;
const CATEGORY_API = `${process.env.NEXT_PUBLIC_API_BASE_USER_URL}/getallactivecategory`;

// Category label (fallback)
const CATEGORY = { 1: "Vehicle", 2: "Unknown" };

// Price formatter
const formatPriceINR = (v) => Number(v ?? 0).toLocaleString("en-IN");

export default function RentHomePage() {
  const words = useMemo(() => ["Affordable.", "Trusted.", "Flexible."], []);
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Categories
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  // Rotate words
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, [words.length]);

  // Fetch recent products
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(RECENT_API_URL, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (mounted) setRecent(Array.isArray(data) ? data : []);
        } else if (mounted) setRecent([]);
      } catch (e) {
        console.error("Recent products fetch failed:", e);
        if (mounted) setRecent([]);
      } finally {
        if (mounted) setLoadingRecent(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Fetch categories dynamically
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setCatLoading(true);
        const res = await fetch(CATEGORY_API, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Fetch categories failed:", e);
        if (mounted) setCategories([]);
      } finally {
        if (mounted) setCatLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const letters = words[index].split("");

  return (
    <>
      <head>
        <title>RentOrHire</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      {/* HERO */}
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
                            <i key={i} style={{ animationDelay: `${i * 0.1}s` }}>{ch}</i>
                          ))}
                        </span>
                      </b>
                    </span>
                  </h1>
                </div>
              </div>

              {/* Search Bar */}
              <div className="col-12">
                <div className={`container ${styles.custom_searchbar_wrap}`}>
                  <div className={styles.custom_searchbar}>
                    <form
                      className="w-100"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const locVal = document.getElementById("location").value.trim();
                        const catVal = document.getElementById("category").value;
                        const qVal = document.getElementById("whatoftype").value.trim();

                        const params = new URLSearchParams();
                        params.set("page", "1");
                        params.set("category", catVal || "");
                        params.set("q", qVal || "");
                        params.set("location", locVal || "");

                        window.location.href = `/products?${params.toString()}`;
                      }}
                    >
                      <div className="row">
                        {/* Location */}
                        <div className={`col-lg-3 col-md-6 col-12 ${styles.border_rightF1}`}>
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
                              <img src="/images/homepg/pin.svg" alt="pin" />
                            </div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className={`col-lg-3 col-md-6 col-12 ${styles.border_rightF2}`}>
                          <div className="form-group w-100">
                            <label htmlFor="category" className="cat_block_inner">Category</label>
                            <div className={styles.category_in_wrap}>
                              <select id="category" className="text-muted w-100" defaultValue="">
                                <option value="">Select Category</option>
                                {!catLoading && categories.map((c) => (
                                  <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                              </select>
                              <img className="toggle-icon" src="/images/homepg/down.svg" alt="toggle" />
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
                            <button className="button theme-btn-new" type="submit">Search</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Bottom bullets */}
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

        {/* Recent Products */}
        <div className={styles.fleetswrap_inner}>
          <div className={styles.fleets_wrap_main}>
            <div className="d-flex justify-content-center align-items-center">
              <div className={styles.star_box}>
                <div className="d-flex align-items-center gap-1">
                  <Image src="/images/homepg/star.svg" alt="star icon" width={20} height={20} />
                  <span className={styles.star_title}>Recent Products</span>
                </div>
              </div>
            </div>

            <h3 className={`${styles.second_heading} text-center`}>Browse the newest items added</h3>

            <div className="container-fluid px-2 px-md-3 px-lg-3 position-relative">
              <div className="row g-4">
                {loadingRecent && (
                  <div className="col-12">
                    <p className="text-center text-muted m-0">Loading recent items…</p>
                  </div>
                )}

                {!loadingRecent && recent.slice(0, 8).map((p) => (
                  <div key={p.id} className="col-12 col-sm-6 col-lg-3">
                    <div className={`card ${styles.fleetscard} h-100`}>
                      <Image
                        src={p.media_gallery?.[0]?.file_path + p.media_gallery?.[0]?.file_name || "/media/host/items/placeholder.png"}
                        alt={p.item_name}
                        width={600}
                        height={360}
                        className={`card-img-top p-4 ${styles.cardImg}`}
                      />

                      <div className={`card-body d-flex flex-column pt-2 ${styles.cardBody}`}>
                        <div>
                          <span className="badge rounded-pill px-3 py-2 badge-car">
                            {CATEGORY[p.category_id] ?? p.category_name ?? "Item"}
                          </span>
                          <h5 className={`${styles.feets_cardH} mt-3 mb-3`}>{p.item_name}</h5>

                          <div className="d-flex justify-content-between text-secondary mb-2">
                            <div className="d-flex align-items-center gap-1 feets_data_list">
                              {/* <Image src="/images/homepg/helmet.svg" alt="icon" width={20} height={20} /> */}
                              <span>Rental Period</span>
                            </div>
                            <span className="text-dark fw-medium">{p.rental_period ?? "-"}</span>
                          </div>

                          <div className="d-flex justify-content-between text-secondary mb-4">
                            <div className="d-flex align-items-center gap-1 feets_data_list">
                              {/* <Image src="/images/homepg/pistons.svg" alt="icon" width={20} height={20} /> */}
                              <span>Availability</span>
                            </div>
                            <span className="text-dark fw-medium">{p.availability_status}</span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center border-top mt-auto pt-2">
                          <div className="mb-0">
                            <span className={styles.priceStrong}>₹{formatPriceINR(p.price_per_day)}</span>
                            <span className={styles.priceMuted}> /Per Day</span>
                          </div>

                          <button
                            className={styles.ctaBtn}
                            aria-label={`View item ${p.item_name}`}
                            onClick={() => setSelectedId(p.id)}
                          >
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 16a1 1 0 0 1 1-1h22a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" />
                              <path d="M17.293 6.293a1 1 0 0 1 1.414 0l9 9a1 1 0 0 1 0 1.414l-9 9a1 1 0 1 1-1.414-1.414L24.586 17l-7.293-7.293a1 1 0 0 1 0-1.414z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {!loadingRecent && recent.length === 0 && (
                  <div className="col-12">
                    <p className="text-center text-muted m-0">No recent products found.</p>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center mt-4">
                <Link href="/products" className="btn btn-dark rounded-pill px-4 py-2">View All Items</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedId !== null && (
        <Viewproductspop triggerId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
