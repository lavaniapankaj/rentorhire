"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../cars/components/faqSection.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;

export default function FAQSection({ cate_id }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  /** Fetch FAQs by category */
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/getsinglecategoryrecentfaqs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: cate_id }),
        });
        const data = await res.json();
        if (data.status && Array.isArray(data.data)) {
          setFaqs(data.data);
        } else {
          setFaqs([]);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cate_id) fetchFaqs();
  }, [cate_id]);

  return (
    <section className={`mt-5 ${styles.faq_wrap}`}>
      <div className={`py-5 ${styles.faq_inner}`}>
        <div className={styles.faq_wrap_main}>
          <div className="container position-relative">
            <div className="row">
              {/* ===== Left Column (Images) ===== */}
              <div className="col-12 col-md-6 col-lg-6">
                <div className={styles.faq_left_outer}>
                  <div className={styles.faq_left_wrap}>
                    <div className={styles.faq_leftcol}>
                      <Image
                        className={styles.faq_fimg2}
                        src="/images/homepg/faq1.jpg"
                        alt="FAQ 1"
                        width={500}
                        height={400}
                      />
                    </div>
                    <div className={styles.faq_leftcol}>
                      <Image
                        className={styles.faq_fimg2}
                        src="/images/homepg/faq2.jpg"
                        alt="FAQ 2"
                        width={500}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className={styles.car_overflow}>
                    <Image
                      className={styles.faq_carover}
                      src="/images/homepg/device.png"
                      alt="Device"
                      width={500}
                      height={400}
                    />
                  </div>
                </div>
              </div>

              {/* ===== Right Column (Dynamic FAQs) ===== */}
              <div className="col-12 col-md-6 col-lg-6">
                <div className="d-flex justify-content-start align-items-center mt-4 mt-md-0 mt-lg-0">
                  <div className={styles.star_box}>
                    <div
                      className={`d-flex align-items-center gap-1 ${styles.star_inner}`}
                    >
                      <Image
                        src="/images/homepg/star.svg"
                        alt="Star"
                        width={24}
                        height={24}
                      />
                      <span className={styles.star_title}>
                        Frequently Asked Questions
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className={`text-left ${styles.second_heading}`}>
                  Everything You Need to Know Sample FAQs:
                </h3>

                {loading ? (
                  <p className="mt-4">Loading FAQs...</p>
                ) : faqs.length === 0 ? (
                  <p className="mt-4">No FAQs found for this category.</p>
                ) : (
                  <div className={styles.accordion} id="accordionExample">
                    {faqs.map((faq, index) => (
                      <div
                        key={faq.id}
                        className={`accordion-item ${styles.accordion_item}`}
                      >
                        <h2
                          className={`accordion-header ${styles.accordion_header}`}
                          id={`heading-${index}`}
                        >
                          <button
                            className={`accordion-button ${styles.accordion_button} ${
                              index !== 0 ? styles.collapsed : ""
                            }`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${index}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={`collapse-${index}`}
                          >
                            {faq.title}
                          </button>
                        </h2>
                        <div
                          id={`collapse-${index}`}
                          className={`accordion-collapse collapse ${
                            index === 0 ? "show" : ""
                          } ${styles.accordion_collapse}`}
                          aria-labelledby={`heading-${index}`}
                          data-bs-parent="#accordionExample"
                        >
                          <div className={`accordion-body ${styles.accordion_body}`}>
                            {faq.description || "No description available."}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
