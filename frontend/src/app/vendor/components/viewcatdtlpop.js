"use client";
import React from "react";
import Image from "next/image";
import styles from "./vendorcatpop.module.css";

export default function ViewCatDtlPop({ category, onClose }) {
  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_box}>
        <button
          className={styles.popup_close}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className={styles.popup_header}>
          <Image
            src={`/images/icons/${category?.toLowerCase() || "bike"}-red-icon.svg`}
            alt={category}
            width={60}
            height={60}
          />
          <h3>{category} Details</h3>
        </div>

        <div className={styles.popup_body}>
          <p>
            Here you can show the specific details, pricing, or
            description related to <strong>{category}</strong>.
          </p>

          <ul className={styles.popup_list}>
            <li>Available Models</li>
            <li>Daily & Weekly Packages</li>
            <li>Pickup/Drop Options</li>
            <li>Documents Required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
