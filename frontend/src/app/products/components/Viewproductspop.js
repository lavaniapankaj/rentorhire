"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./view.module.css";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

export default function Viewproductspop({ triggerId, onClose }) {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [serviceProvider, setServiceProvider] = useState(null);
  const [parsedAuthUserData, setParsedAuthUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const abortRef = useRef(null);

  const getCookie = (name) => {
    if (typeof document === "undefined") return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const getCurrentUrl = () => {
    if (typeof window !== "undefined") return window.location.href;
    return "/";
  };

  /** Validate JWT + role (optional) */
  const getValidSession = () => {
    try {
      const authUserRaw = getCookie("authUser");
      const token =
        getCookie("token") ||
        getCookie("authToken") ||
        getCookie("accessToken");

      const authUser = authUserRaw ? JSON.parse(authUserRaw) : null;
      if (!token || !authUser) return { isValid: false, authUser: null };

      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (!decoded?.exp || decoded.exp <= now) {
        return { isValid: false, authUser: null };
      }

      // Optional: role-based gating (example)
      // if (authUser.role_id !== 1) return { isValid: false, authUser: null };

      return { isValid: true, authUser };
    } catch (e) {
      return { isValid: false, authUser: null };
    }
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

  // Fetch item (+ conditionally fetch service provider info on valid token)
  useEffect(() => {
    const { isValid, authUser } = getValidSession();
    setIsAuthenticated(isValid);
    setParsedAuthUserData(authUser || null);

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

        // Only fetch service provider info if token/session is valid
        if (isValid && singleItem?.service_provider_id) {
          const res2 = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_USER_URL}/getserviceprovideinfo`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                service_provider_id: singleItem.service_provider_id,
              }),
              signal: ac.signal,
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
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
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
              <div className={styles.popupwrap_inner}>
            <div className={styles.detailsGrid}>
                                <div class="d-flex justify-content-between text-dark  content_layer">
                                    <div className="d-flex align-items-center gap-1 feets_data_list">
                                        <Image 
                                          src="/lokesh/assets/images/door.svg" alt="Door Icon" width={40} height={40} />
                                        <span>Doors</span>
                                    </div>
                                    <span className="text-dark fw-medium">4</span>
                                </div>
                                <div class="d-flex justify-content-between text-dark  content_layer">
                                    <div className="d-flex align-items-center gap-1 feets_data_list">
                                        <Image src="/lokesh/assets/images/ic_passanger.svg" width={40} height={40} />
                                        <span>Passengers</span>
                                    </div>
                                    <span className="text-dark fw-medium">5</span>
                                </div>
                                <div class="d-flex justify-content-between text-dark   content_layer">
                                    <div className="d-flex align-items-center gap-1 feets_data_list">
                                        <Image src="/lokesh/assets/images/icon-transmission.svg" width={40} height={40} />
                                        <span>Transmission</span>
                                    </div>
                                    <span className="text-dark fw-medium">Manual</span>
                                </div>
                                <div className="d-flex justify-content-between text-dark   content_layer">
                                    <div className="d-flex align-items-center gap-1 feets_data_list">
                                        <Image src="/lokesh/assets/images/icon-age.svg" width={40} height={40} />
                                        <span>Age</span>
                                    </div>
                                    <span className="text-dark fw-medium">Under 2 years</span>
                                </div>
                                <div className="d-flex justify-content-between text-dark   content_layer">
                                    <div className="d-flex align-items-center gap-1 feets_data_list">
                                        <Image src="/lokesh/assets/images/icon-bags.svg" width={40} height={40} />
                                        <span>Luggage</span>
                                    </div>
                                    <span className="text-dark fw-medium">2 Small Bags</span>
                                </div>
                                <div className="d-flex justify-content-between text-dark   content_layer">
                                    <div className="d-flex align-items-center gap-1 feets_data_list">
                                        <Image src="/lokesh/assets/images/icon-transmission.svg" width={40} height={40} />
                                        <span>Air Condition</span>
                                    </div>
                                    <span className="text-dark fw-medium">Yes</span>
                                </div>
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
                isAuthenticated ? (
                  // Valid token → direct contact
                  <a href={`tel:${serviceProvider.phone_number}`}>
                    <button>
                      Contact {serviceProvider.first_name} {serviceProvider.last_name} (
                      {serviceProvider.phone_number})
                    </button>
                  </a>
                ) : (
                  // No/expired token → ask login with redirect
                  <a
                    href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}
                  >
                    <button>Contact Seller</button>
                  </a>
                )
              ) : isAuthenticated ? (
                <button disabled>Loading contact…</button>
              ) : (
                <a
                  href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}
                >
                  <button>Contact Seller</button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
