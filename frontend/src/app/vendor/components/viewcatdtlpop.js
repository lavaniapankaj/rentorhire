"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./vendorcatpop.module.css";
import Link from "next/link";

export default function ViewCatDtlPop({ category, onClose }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isLeftActive, setIsLeftActive] = useState(false); // ✅ NEW STATE

  const handleCardClick = () => {
    setShowDetails(true);
    setIsLeftActive(true); // ✅ ADD CLASS ON CLICK
  };

  return (
    <div className={styles.roh_popup_overlay}>
      <div className={styles.roh_popup_box}>
        <button
          className={styles.roh_popup_close}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className={`justify-content-center ${styles.roh_popup_header}`}
              >
                <Image
                  src="/bike-red-icon.svg"
                  alt={category}
                  width={60}
                  height={60}
                />
                <h3>Choose {category}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={styles.roh_popup_body}>
          <div className="roh_vehicleSection">
            <div className="container-fluid px-2 px-md-3 px-lg-3 position-relative mt-5">
              <div className="row d-flex justify-content-start g-4">

                {/* <div className={ `${styles.roh_listingMain}`}>
                  
                </div> */}
                {/* Left Side - Vehicle Cards */}
                <div
                  className={`${styles.roh_vehicleListing} ${isLeftActive ? styles.roh_vehicleListing_left : ""
                    }`} // ✅ APPLY CLASS CONDITIONALLY
                  style={{
                    width: showDetails ? "450px" : "100%",
                    marginLeft: showDetails ? "0" : "",
                    transition: "width 0.4s ease, margin-left 0.2s ease",
                  }}
                >
                  {[...Array(10)].map((_, index) => (
                    <div
                      key={index}
                      className={`card p-4 ${styles.roh_fleetscard}`}
                      onClick={handleCardClick}
                      style={{ cursor: "pointer" }}
                      >
                      <Image
                        src="/images/bikes/duke250.jpg"
                        alt="Item image"
                        width={600}
                        height={360}
                        className={`card-img-top ${styles.roh_cardImg}`}
                      />
                      <div
                        className={`card-body d-flex flex-column pt-3 ${styles.roh_cardBody}`}
                      >
                        <div>
                          <span className="badge rounded-pill px-3 py-2 badge-car">
                            categoryName
                          </span>
                          <h5 className={`${styles.feets_cardH} mt-3 mb-3`}>
                            Duke 250
                          </h5>
                        </div>

                        <div className={`d-flex justify-content-between text-secondary mb-2 ${styles.roh_listingCard_genInfo}`}>
                          <div
                            className={`d-flex align-items-center gap-1 ${styles.roh_feets_data_list}`}
                          >
                            <Image
                              src="/rental-period.svg"
                              alt="icon"
                              width={20}
                              height={20}
                            />
                            <span>Rental Period</span>
                          </div>
                          <span className="text-dark fw-medium">2 Days</span>
                        </div>

                        <div className={`d-flex justify-content-between text-secondary mb-4 ${styles.roh_listingCard_genInfo}`}>
                          <div
                            className={`d-flex align-items-center gap-1 ${styles.roh_feets_data_list}`}
                          >
                            <Image
                              src="/car-availability.svg"
                              alt="icon"
                              width={20}
                              height={20}
                            />
                            <span>Availability</span>
                          </div>
                          <span className="text-dark fw-medium">
                            Available
                          </span>
                        </div>

                        <div className={`d-flex justify-content-between align-items-center border-top mt-auto pt-2 ${styles.roh_cardPrice_content}`}>
                          <div className="mb-0">
                            <span className={styles.priceStrong}>₹200 </span>
                            <span className={styles.priceMuted}> /Per Day</span>
                          </div>

                          <button className={styles.ctaBtn}>
                            <Image
                              src="/arrow.svg"
                              alt="Arrow"
                              width={30}
                              height={30}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Side - Details Section */}
                {showDetails && (
                  <div
                    className={styles.roh_singleVehicle_details}
                    style={{
                      width: "calc(100% - 450px)",
                      display: "block",
                      transition: "width 0.2s ease",
                    }}
                  >
                    <section>
                      <div className="roh_singleVehicle_detailsInner">
                        <div className={`d-flex gap-2 ${styles.roh_singleVehicle_detailsHeader}`}>
                        <button className={`bg-dark text-white p-2 ${styles.roh_backTolisting}`}>Back</button>
                        <h4>Vehicle Details</h4>

                        </div>
                        <p>
                          This section shows more information about the selected
                          vehicle (e.g., Duke 250).
                        </p>
                        {/* Booking form or content can be added here */}
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
