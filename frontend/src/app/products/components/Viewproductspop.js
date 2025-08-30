"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./view.module.css";
import Image from "next/image";

export default function Viewproductspop({ triggerId, onClose }) {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [serviceProvider, setServiceProvider] = useState(null);
  const [parsedAuthUserData, setParsedAuthUserData] = useState(null);
  const abortRef = useRef(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  /** Get current URL (for redirect) */
  const getCurrentUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "/";
  };

  /** Body scroll lock while modal open */
  useEffect(() => {
    if (!triggerId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [triggerId]);

  // Fetch item
  useEffect(() => {
    const authUserData = getCookie("authUser");
    const parsed = authUserData ? JSON.parse(authUserData) : null;
    setParsedAuthUserData(parsed);

    if (!triggerId) return;

    setLoading(true);
    setItem(null);
    setServiceProvider(null);

    const ac = new AbortController();
    abortRef.current = ac;

    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_USER_URL}/viewsingleitem`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: triggerId }),
            signal: ac.signal,
          }
        );
        const data = await res.json();
        const singleItem = Array.isArray(data) ? data[0] : data;
        setItem(singleItem);

        /** Fetch service provider details */
        if (singleItem?.service_provider_id) {
          const res2 = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_USER_URL}/getserviceprovideinfo`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                service_provider_id: singleItem.service_provider_id,
              }),
            }
          );
          const data2 = await res2.json();
          setServiceProvider(data2);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching item:", err);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [triggerId]);

  if (!triggerId) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${styles.active}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Loading */}
        {loading && (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner}></div>
            <span className={styles.loadingText}>Loading…</span>
          </div>
        )}

        {/* Item view */}
        {!loading && item && (
          <div className={styles.itemWrap}>
            <h2 className={styles.itemTitle}>{item.item_name}</h2>
            <p className={styles.itemDesc}>{item.vehicle_description}</p>

            <div className={styles.imageWrap}>
              {item.media_gallery && item.media_gallery.length > 0 ? (
                item.media_gallery.map((media) => (
                  <Image
                    key={media.id}
                    src={`${media.file_path}${media.file_name}`}
                    alt={item.item_name}
                    width={280}
                    height={180}
                    className={styles.itemImg}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>

            <div className={styles.detailsGrid}>
              <p>
                <strong>Price/Day:</strong> ₹{item.price_per_day}
              </p>
              <p>
                <strong>Price/Week:</strong> ₹{item.price_per_week}
              </p>
              <p>
                <strong>Price/Month:</strong> ₹{item.price_per_month}
              </p>
              <p>
                <strong>Security Deposit:</strong> ₹{item.security_deposit}
              </p>
              <p>
                <strong>Availability:</strong> {item.availability_status}
              </p>
              <p>
                <strong>Fuel:</strong> {item.engine_type}
              </p>
              <p>
                <strong>Transmission:</strong> {item.transmission_type}
              </p>
              <p>
                <strong>Seats:</strong> {item.seating_capacity}
              </p>
              <p>
                <strong>Color:</strong> {item.color}
              </p>
              <p>
                <strong>Mileage:</strong> {item.mileage ?? "N/A"} kmpl
              </p>
              <p>
                <strong>Condition:</strong> {item.vehicle_condition}
              </p>
            </div>

            <div className={styles.extraInfo}>
              <h4>Accessories</h4>
              <p>{item.accessories}</p>

              <h4>Booking Terms</h4>
              <p>{item.booking_terms}</p>

              <h4>Booking Instructions</h4>
              <p>{item.booking_instructions}</p>
            </div>

            <div className={styles.serProInfo}>
                {serviceProvider ? (
                    parsedAuthUserData ? (
                    /** if user is logged in → contact button + phone number */
                    <a href={`tel:${serviceProvider.phone_number}`}>
                        <button>
                        Contact {serviceProvider.first_name} {serviceProvider.last_name} (
                        {serviceProvider.phone_number})
                        </button>
                    </a>
                    ) : (
                    /** if user is not logged in → login button */
                    <a
                        href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}
                    >
                        <button>Contact Seller</button>
                    </a>
                    )
                ) : (
                    <button disabled>Loading contact…</button>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
