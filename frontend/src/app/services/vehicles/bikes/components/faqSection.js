"use client";
import Image from "next/image";
import styles from "../../bikes/components/faqSection.module.css";

export default function FAQSection() {

    return (
        <>
           <section className={`mt-5  ${styles.faq_wrap}`}>
      <div className={`py-5 ${styles.faq_inner}`}>
        <div className={styles.faq_wrap_main}>
          <div className="container  position-relative">
            <div className="row">
              {/* Left Column */}
              <div className="col-12 col-md-6 col-lg-6">
                <div className={styles.faq_left_outer}>
                  <div className={styles.faq_left_wrap}>
                    <div className={styles.faq_leftcol}>
                      <Image className={styles.faq_fimg2}
                        src="/images/homepg/faq1.jpg"
                        alt="FAQ 1"
                        width={500}
                        height={400}
                      />
                    </div>
                    <div className={styles.faq_leftcol}>
                      <Image className={styles.faq_fimg2}
                        src="/images/homepg/faq2.jpg"
                        alt="FAQ 2"
                        width={500}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className={styles.car_overflow}>
                    <Image className={styles.faq_carover}
                      src="/images/homepg/device.png"
                      alt="Device"
                      width={500}
                      height={400}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className={`col-12 col-md-6 col-lg-6`}>
                <div className="d-flex justify-content-start align-items-center mt-4 mt-md-0 mt-lg-0">
                  <div className={styles.star_box}>
                    <div className={`d-flex align-items-center gap-1 ${styles.star_inner}`}>
                      <Image
                        src="/images/homepg/star.svg"
                        alt="Star"
                        width={24}
                        height={24}
                      />
                      <span className={styles.star_title}>Frequently Asked Questions</span>
                    </div>
                  </div>
                </div>

                <h3 className={`text-left ${styles.second_heading}`}>
                  Everything You Need to Know Sample FAQs:
                </h3>

                {/* Accordion */}
                <div className={styles.accordion} id="accordionExample">
                  {/* Item 1 */}
                  <div className={`accordion-item ${styles.accordion_item}`}>
                    <h2 className={`accordion-header  ${styles.accordion_header}`} id="headingOne">
                      <button
                        className={`accordion-button  ${styles.accordion_button} ${styles.collapsed}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Is software included on the laptop?
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className={`accordion-collapse collapse show  ${styles.accordion_collapse}`}
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className={`accordion-body ${styles.accordion_body}`}>
                        <strong>This is the first item's accordion body.</strong> It is
                        shown by default, until the collapse plugin adds the appropriate
                        classes that we use to style each element.
                      </div>
                    </div>
                  </div>

                 <div className={`accordion-item ${styles.accordion_item}`}>
                    <h2 className={`accordion-header  ${styles.accordion_header}`} id="headingTwo">
                      <button
                        className={`accordion-button  ${styles.accordion_button} ${styles.collapsed}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Are accessories like chargers or tripods included?
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className={`accordion-collapse  collapse  ${styles.accordion_collapse}`}
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className={`accordion-body ${styles.accordion_body}`}>
                        <strong>This is the first item's accordion body.</strong> It is
                        shown by default, until the collapse plugin adds the appropriate
                        classes that we use to style each element.
                      </div>
                    </div>
                  </div>
                  <div className={`accordion-item ${styles.accordion_item}`}>
                    <h2 className={`accordion-header  ${styles.accordion_header}`} id="headingThree">
                      <button
                        className={`accordion-button  ${styles.accordion_button} ${styles.collapsed}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Can I test the device before renting?
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className={`accordion-collapse  collapse  ${styles.accordion_collapse}`}
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className={`accordion-body ${styles.accordion_body}`}>
                        <strong>This is the first item's accordion body.</strong> It is
                        shown by default, until the collapse plugin adds the appropriate
                        classes that we use to style each element.
                      </div>
                    </div>
                  </div>

                 
                  
                </div>
                {/* End Accordion */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        </>
    );

}