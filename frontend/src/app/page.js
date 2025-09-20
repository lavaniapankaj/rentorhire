"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./home.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;

export default function RentHomePage() {
  const words = useMemo(() => ["Affordable.", "Trusted.", "Flexible."], []);
  const [index, setIndex] = useState(0);

  // categories with children
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  // Rotate words
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, [words.length]);

  // Fetch categories and children
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setCatLoading(true);
        const res = await fetch(`${API_BASE_URL}/getallactivecategory`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        /** Now get the children for each parent category */
        const withChildren = await Promise.all(
          (Array.isArray(data) ? data : []).map(async (parent) => {
            try {
              const resp = await fetch(`${API_BASE_URL}/getallactivechildcategory`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ parent_category_id: parent.id }),
              });
              const children = resp.ok ? await resp.json() : [];
              return { ...parent, children };
            } catch {
              return { ...parent, children: [] };
            }
          })
        );

        if (mounted) setCategories(withChildren);
      } catch (e) {
        console.error("Fetch categories failed:", e);
        if (mounted) setCategories([]);
      } finally {
        if (mounted) setCatLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const letters = words[index].split("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const locVal = document.getElementById("location").value.trim();
    const catEl = document.getElementById("category").selectedOptions[0];
    const catVal = catEl?.value;
    const parentSlug = catEl?.dataset.parent || "";
    const isChild = catEl?.dataset.child === "true";
    const qVal = document.getElementById("whatoftype").value.trim();

    let url = "/";

    if (isChild) {
      // child selected → /services/parent/child?q…&location…
      const params = new URLSearchParams();
      if (qVal) params.set("q", qVal);
      if (locVal) params.set("location", locVal);
      url = `/services/${parentSlug}/${catVal}?${params.toString()}`;
    } else if (catVal) {
      // parent selected → /services/parent
      url = `/services/${catVal}`;
    } else {
      // nothing selected → /products?q…&location…
      const params = new URLSearchParams();
      if (qVal) params.set("q", qVal);
      if (locVal) params.set("location", locVal);
      //url = `/products?${params.toString()}`;
    }

    window.location.href = url;
  };

  return (
    <>
      <head>
        <title>Find On Rent</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Book Reliable Rentals From Locals - Fast, Easy"
        />
      </head>

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
                </div>
              </div>

              {/* Search Bar */}
              <div className="col-12">
                <div className={`container ${styles.custom_searchbar_wrap}`}>
                  <div className={styles.custom_searchbar}>
                    <form className="w-100" onSubmit={handleSubmit}>
                      <div className="row">
                        {/* Location */}
                        <div className={`col-lg-3 col-md-6 col-12 ${styles.border_rightF1}`}>
                          <div className="form-group w-100">
                            <label htmlFor="location" className={`${styles.loc_block_inner}`}>
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
                              <img src="/images/homepg/pin.svg" alt="pin" />
                            </div>
                          </div>
                        </div>

                        {/* Category */}
                        <div className={`col-lg-3 col-md-6 col-12 ${styles.border_rightF2}`}>
                          <div className="form-group w-100">
                            <label htmlFor="category" className={`${styles.cat_block_inner}`}>
                              Category
                            </label>
                            <div className={styles.category_in_wrap}>
                              <select id="category" className="text-muted w-100" defaultValue="">
                                <option value="">Select Category</option>
                                {!catLoading &&
                                  categories.map((parent) => (
                                    <React.Fragment key={parent.id}>
                                      <option
                                        value={parent.slug}
                                        data-child="false"
                                        data-parent={parent.slug}
                                      >
                                        {parent.name}
                                      </option>
                                      {parent.children?.map((child) => (
                                        <option
                                          key={child.id}
                                          value={child.slug}
                                          data-child="true"
                                          data-parent={parent.slug}
                                        >
                                          &nbsp;&nbsp;– {child.name}
                                        </option>
                                      ))}
                                    </React.Fragment>
                                  ))}
                              </select>
                              <Image
                                className="toggle-icon"
                                src="/images/homepg/down.svg"
                                alt="star icon"
                                width={20}
                                height={20}
                              />
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
                            <button className="button theme-btn-new" type="submit">
                              <Image
                                className="toggle-icon"
                                src="/images/assets/search.svg"
                                alt="search"
                                width={34}
                                height={34}
                              />
                            </button>
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
      </section>
    </>
  );
}
