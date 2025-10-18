"use client";
import { useState, useEffect, useRef } from "react";
import '../../globals.css';
import styles from "./view.module.css";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_USER_URL;
const WEB_BASE_URL = process.env.NEXT_PUBLIC_WEB_BASE_URL;

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
          `${API_BASE_URL}/viewsingleitem`,
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
            `${API_BASE_URL}/getserviceprovideinfo`,
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

  // === Slider Logic ===
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to next image
  const handleNext = () => {
    if (!item?.media_gallery) return;
    setCurrentIndex((prev) => (prev + 1) % item.media_gallery.length);
  };

  // Move to previous image
  const handlePrev = () => {
    if (!item?.media_gallery) return;
    setCurrentIndex((prev) =>
      prev === 0 ? item.media_gallery.length - 1 : prev - 1
    );
  };

  // Auto-slide every 3.5s
  useEffect(() => {
    if (!item?.media_gallery || item.media_gallery.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % item.media_gallery.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [item?.media_gallery]);


  if (!triggerId) return null;

  return (
    <>
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
              <div className={`${styles.roh_prouct_hero_wrap}`}>
                <div className={`${styles.roh_prouct_hero_inner}`}>
                  <div className={`${styles.roh_prouct_hero}`} style={{ backgroundImage: `url(/images/product-popup/services.jpg)` }} >
                    <div className={`container ${styles.roh_service_banner}`}>
                      <div className={`${styles.roh_Zindex}`}>
                        <div className={`${styles.roh_hero_heading}`}>
                          <h1 className={styles.itemTitle} data-wow-duration="2s">{item.item_name}</h1>
                          <p className={styles.itemDesc}>{item.vehicle_description}</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`d-none ${styles.imageWrap}`}>
                {item.media_gallery && item.media_gallery.length > 0 ? (
                  item.media_gallery.map((media) => (
                    <img
                      key={media.id}
                      src={
                        media?.file_path && media?.file_name
                          ? `${WEB_BASE_URL}${media.file_path}${media.file_name}`
                          : "/uploads/media/host/items/placeholder.png"
                      }
                      alt={item?.item_name || "Item image"}
                      width={280}
                      height={180}
                      className={styles.itemImg}
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
              <section className="py-5">
                <div className={`container ${styles.roh_container}`}>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className={`${styles.roh_left_slide_wrap}`}>
                        <div className={`${styles.roh_left_slide_inner}`}>
                          <div className={`${styles.roh_sidebar_pricing}`}>
                            {/* <h2><sup><span>Starting </span></sup> ₹{item.price_per_day}<span>/Per Day</span></h2> */}
                            <h2><sup><span>Starting from </span></sup>₹{Number(item.price_per_day || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                              <span>&nbsp;/Per Day</span>
                            </h2>

                            <div className={`${styles.roh_productPrice}`}>
                              <div className={`d-flex justify-content-between text-dark  ${styles.roh_content_layer}`}>
                                <div className={`d-flex align-items-center gap-1 ${styles.roh_feets_data_list}`}>
                                  <span>Per/Week:</span>
                                </div>
                                <span className="text-dark fw-medium">₹{Number(item.price_per_week || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                              </div>
                              <div className={`d-flex justify-content-between text-dark  ${styles.roh_content_layer}`}>
                                <div className={`d-flex align-items-center gap-1 ${styles.roh_feets_data_list}`}>
                                  <span>Per/Month:</span>
                                </div>
                                <span className="text-dark fw-medium">₹{Number(item.price_per_month || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                              </div>
                            </div>

                          </div>
                          <div className={`${styles.roh_fleets_single_sidebar_list}`}>

                            <div className={`d-flex justify-content-between text-dark  ${styles.roh_content_layer}`}>
                              <div className={`d-flex align-items-center gap-1 ${styles.roh_feets_data_list}`}>
                                <Image src="/images/product-popup/car-security-deposit.svg" alt="Door" width={20} height={20} />
                                <span>Security Deposit:</span>
                              </div>
                              <span className="text-dark fw-medium">₹{Number(item.security_deposit || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className={`d-flex justify-content-between text-dark  ${styles.roh_content_layer}`}>
                              <div className={`d-flex align-items-center gap-1 ${styles.roh_feets_data_list}`}>
                                <Image src="/images/product-popup/car-availability.svg" alt="Door" width={20} height={20} />
                                <span>Availability:</span>
                              </div>
                              <span className="text-dark fw-medium">{item.availability_status}</span>
                            </div>
                          </div>
                          {/* Service Provider Name OUTSIDE the sidebar-bottom-btns */}
                          {serviceProvider && (
                            <div className={`${styles.roh_providerName}`}>
                              <h6>
                                Service provider: <span>{serviceProvider.first_name} {serviceProvider.last_name}</span>
                              </h6>
                            </div>
                          )}

                          <div className="sidebar-bottom-btns">
                            <div className="btn_singlepage_wrap d-flex align-items-center flex-wrap justify-content-start gap-2">
                              {serviceProvider ? (
                                isAuthenticated ? (
                                  // Valid token → direct contact
                                  <div className="d-flex align-items-center justify-content-center roh_redBtns">
                                    <div className="roh_button_custom">
                                      <Link href={`tel:${serviceProvider.phone_number}`}>Contact Us
                                        {/* ({serviceProvider.phone_number}) */}
                                      </Link>
                                    </div>
                                    <div className="roh_circl_btn">
                                      <Link href={`tel:${serviceProvider.phone_number}`}>
                                        <Image src="/arrow.svg" alt="Arrow Right" width={30} height={30} />
                                      </Link>
                                    </div>
                                  </div>
                                ) : (
                                  // No/expired token → ask login with redirect
                                  <div className="d-flex align-items-center justify-content-center roh_redBtns">
                                    <div className="roh_button_custom">
                                      <Link href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}>
                                        Contact Seller
                                      </Link>
                                    </div>
                                    <div className="roh_circl_btn">
                                      <Link href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}>
                                        <Image src="/arrow.svg" alt="Arrow Right" width={30} height={30} />
                                      </Link>
                                    </div>
                                  </div>
                                )
                              ) : isAuthenticated ? (
                                // If service provider is still loading
                                <div className="d-flex align-items-center justify-content-center roh_redBtns">
                                  <div className="roh_button_custom">
                                    <button disabled>Loading contact…</button>
                                  </div>
                                  <div className="roh_circl_btn">
                                    <Image src="/arrow.svg" alt="Arrow Right" width={30} height={30} />
                                  </div>
                                </div>
                              ) : (
                                // If not authenticated and no service provider
                                <div className="d-flex align-items-center justify-content-center roh_redBtns">
                                  <div className="roh_button_custom">
                                    <Link href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}>
                                      Contact Seller
                                    </Link>
                                  </div>
                                  <div className="roh_circl_btn">
                                    <Link href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}>
                                      <Image src="/arrow.svg" alt="Arrow Right" width={30} height={30} />
                                    </Link>
                                  </div>
                                </div>
                              )}

                              <div><span className="text-muted">OR</span></div>

                              {/* WhatsApp Link with Authentication Check */}
                              {isAuthenticated ? (
                                <div className="roh_iconBtn">
                                  <Link href={`https://wa.me/${serviceProvider?.phone_number}?text=Hello%20there!`}>
                                    <Image src="/whatsapp.svg" alt="WhatsApp" width={30} height={30} />
                                  </Link>
                                </div>
                              ) : (
                                <div className="roh_iconBtn">
                                  <Link href={`/login/?redirect=${encodeURIComponent(getCurrentUrl())}`}>
                                    <Image src="/whatsapp.svg" alt="WhatsApp" width={30} height={30} />
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-8">
                      {/* slider */}
                      {item?.media_gallery?.length > 0 && (
                        <div className={styles.roh_slider_container}>
                          <div
                            className={styles.roh_slider_track}
                            style={{
                              transform: `translateX(-${currentIndex * 85}%)`,
                            }}
                          >
                            {item.media_gallery.map((media, index) => (
                              <div key={media.id} className={styles.roh_slide}>
                                <img
                                  src={
                                    media?.file_path && media?.file_name
                                      ? `${WEB_BASE_URL}${media.file_path}${media.file_name}`
                                      : "/uploads/media/host/items/placeholder.png"
                                  }
                                  alt={`${item?.item_name || "Item"}-${index}`}
                                  className={styles.itemImg}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Move buttons below */}
                          <div className={styles.roh_slider_controls}>
                            <button
                              className={`${styles.navBtn} ${styles.prevBtn}`}
                              onClick={handlePrev}
                              aria-label="Previous"
                            >
                              <Image
                                src="/arrow.svg" width={24} height={24} alt="Previous" className={styles.rotateLeft}/>
                            </button>
                            <button
                              className={`${styles.navBtn} ${styles.nextBtn}`}
                              onClick={handleNext}
                              aria-label="Next"
                            >
                              <Image src="/arrow.svg" width={24} height={24} alt="Next" />
                            </button>
                          </div>
                        </div>
                      )}
                      {/* slider end */}

                      <div className={`${styles.roh_about_list_wrap}`}>
                        <div className="star_box">
                          <div className="star_inner d-flex align-items-center gap-1">
                            <Image src="/star.svg" alt="Star" width={19} height={17} />
                            <span className={`roh_star_title`}>Vendor Information</span>
                          </div>
                        </div>
                        <h2 >Listed By: Urban Drive Rentals, Delhi NCR</h2>

                        <ul className={`${styles.roh_about_media_list} ${styles.roh_vendor_info}`}>
                          <li>
                            <div className={`media ${styles.roh_media}`}>
                              <div className="media_imgbox">
                                <div className={`${styles.roh_back_circle}`}>
                                  <Image src="/images/product-popup/location-icon.svg" alt="Location" width={60} height={60} />
                                </div>
                              </div>
                              <div className="media-body">
                                <h5 className={`${styles.roh_media_title}`}>Location</h5>
                                <p className="global_heading media_desc gray_global_heading pb-0 mb-0">Karol Bagh, New Delhi</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={`media ${styles.roh_media}`}>
                              <div className="media_imgbox">
                                <div className={`${styles.roh_back_circle}`}>
                                  <Image src="/images/product-popup/call-icon.svg" alt="Call" width={60} height={60} />
                                </div>
                              </div>
                              <div className="media-body">
                                <h5 className={`${styles.roh_media_title}`}>Contact</h5>
                                <p className="global_heading gray_global_heading media_desc pb-0 mb-0">+91-9876543210</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={`media ${styles.roh_media}`}>
                              <div className="media_imgbox">
                                <div className={`${styles.roh_back_circle}`}>
                                  <Image src="/images/product-popup/calendar-icon.svg" alt="Calendar" width={60} height={60} />
                                </div>
                              </div>
                              <div className="media-body">
                                <h5 className={`${styles.roh_media_title}`}>Active Since:</h5>
                                <p className="global_heading gray_global_heading media_desc pb-0 mb-0">2022</p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className={`media ${styles.roh_media}`}>
                              <div className="media_imgbox">
                                <div className={`${styles.roh_back_circle}`}>
                                  <Image src="/images/product-popup/rating-icon.svg" alt="Rating" width={60} height={60} />
                                </div>
                              </div>
                              <div className="media-body">
                                <h5 className={`${styles.roh_media_title}`}>Vendor Rating:</h5>
                                <p className="global_heading gray_global_heading media_desc pb-0 mb-0">
                                  <Image src="/images/product-popup/star-fill.svg" alt="Rating" width={14} height={14} />
                                  <Image src="/images/product-popup/star-fill.svg" alt="Rating" width={14} height={14} />
                                  <Image src="/images/product-popup/star-fill.svg" alt="Rating" width={14} height={14} />

                                  <Image src="/images/product-popup/star-fill-dark.svg" alt="Rating" width={14} height={14} />
                                  <Image src="/images/product-popup/star-fill-dark.svg" alt="Rating" width={14} height={14} />
                                  (4.8/5 – 120+ Rentals)</p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className={` ${styles.roh_general_info_wrap}`}>
                        <div className="star_box">
                          <div className="star_inner d-flex align-items-center gap-1">
                            <Image src="/star.svg" alt="Star" width={19} height={17} />
                            <span className={`roh_star_title`}>Included Services</span>
                          </div>
                        </div>
                        <h2>Overview – About this Car</h2>
                        <p className="global_heading gray_global_heading media_desc ">Experience the thrill of zipping through the city with the Maruti Suzuki Swift — a stylish and reliable hatchback designed for comfort, fuel efficiency, and a great driving experience. Whether it’s a short weekend trip or daily city commuting, this Swift is your perfect companion.</p>
                        <ul className={`${styles.roh_check_list}`}>
                          <li>
                            <div className={`${styles.roh_featureList}`}>
                              <Image src="/images/product-popup/car-engine.svg" alt="Door" width={28} height={28} />
                              <h6>Fuel: <span>{item.engine_type}</span></h6>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_featureList}`}>
                              <Image src="/images/product-popup/car-transmission.svg" alt="Transmission" width={28} height={28} />
                              <h6>Transmission: <span>{item.transmission_type}</span></h6>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_featureList}`}>
                              <Image src="/images/product-popup/car-seats.svg" alt="Age" width={28} height={28} />
                              <h6>Seats: <span>{item.seating_capacity}</span></h6>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_featureList}`}>
                              <Image src="/images/product-popup/car-color.svg" alt="Luggage" width={28} height={28} />
                              <h6>Color: <span>{item.color}</span></h6>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_featureList}`}>
                              <Image src="/images/product-popup/car-mileage.svg" alt="Air Condition" width={28} height={28} />
                              <h6>Mileage: <span>{item.mileage ?? "N/A"} kmpl</span></h6>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_featureList}`}>
                              <Image src="/images/product-popup/car-condition.svg" alt="Air Condition" width={28} height={28} />
                              <h6>Condition: <span>{item.vehicle_condition}</span></h6>
                            </div>
                          </li>


                        </ul>
                      </div>
                      <div className={`d-none ${styles.roh_general_info_twowrap}`}>
                        <div className="star_box">
                          <div className="star_inner d-flex align-items-center gap-1">
                            <Image src="/star.svg" alt="Star" width={19} height={17} />
                            <span className={`roh_star_title`}>Amenities</span>
                          </div>
                        </div>
                        <h2>Premium Amenities &amp; Features</h2>
                        <ul className={`${styles.roh_check_list} ${styles.roh_new_checklist}`}>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/music-system.svg" alt="Music System" width={35} height={35} />
                              <span>Music System</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/bluetooth-aux-support.svg" alt="Bluetooth + Aux Support" width={35} height={35} />
                              <span>Bluetooth + Aux Support</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/full-air-conditioning.svg" alt="Full Air Conditioning" width={35} height={35} />
                              <span>Full Air Conditioning</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/boot-space-268L.svg" alt="Boot Space: 268L" width={35} height={35} />
                              <span>Boot Space: 268L</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/spare-tyre.svg" alt="Spare Tyre" width={35} height={35} />
                              <span>Spare Tyre</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/toolkit.svg" alt="Toolkit" width={35} height={35} />
                              <span>Toolkit</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/power-steering.svg" alt="Power Steering" width={35} height={35} />
                              <span>Power Steering</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/usb-charging-port.svg" alt="USB Charging Port" width={35} height={35} />
                              <span>USB Charging Port</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/abs-dual-airbags.svg" alt="ABS + Dual Airbags" width={35} height={35} />
                              <span>ABS + Dual Airbags</span>
                            </div>
                          </li>
                          <li>
                            <div className={`${styles.roh_premiumFeaturelist}`}>
                              <Image src="/images/product-popup/reverse-parking-sensors.svg" alt="Reverse Parking Sensors" width={35} height={35} />
                              <span>Reverse Parking Sensors</span>
                            </div>
                          </li>

                        </ul>
                      </div>
                      {/* Policies and agreement*/}

                      <div className={`${styles.roh_general_info_twowrap}`}>
                        <div className="star_box">
                          <div className="star_inner d-flex align-items-center gap-1">
                            <Image src="/star.svg" alt="Star" width={19} height={17} />
                            <span className={`roh_star_title`}>Rental Conditions</span>
                          </div>
                        </div>
                        <h3>Policies and agreement</h3>
                        <div className={`${styles.roh_policy_terms}`}>
                          <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                              <h4 className="accordion-header">
                                <button className={`accordion-button ${styles.roh_accordion_button}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                  Accessories
                                </button>
                              </h4>
                              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <p>{item.accessories}</p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h4 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                  Booking Terms
                                </button>
                              </h4>
                              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <p>{item.booking_terms}</p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h4 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                  Booking Instructions
                                </button>
                              </h4>
                              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <p>{item.booking_instructions}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
