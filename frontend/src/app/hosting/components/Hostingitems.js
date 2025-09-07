"use client";
import { useEffect, useState } from "react";
import styles from "../hosting.module.css";

/* ---------------- utils ---------------- */
const getCookie = (name) => {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  } catch {
    return null;
  }
};

// robust numeric cast (handles " 1 ", "01", 1, true, null)
const toNum = (val) => {
  if (val === true) return 1;
  if (val === false || val == null) return 0;
  if (typeof val === "string") {
    const t = val.trim();
    if (t === "") return 0;
    const n = Number(t);
    return Number.isNaN(n) ? 0 : n;
  }
  const n = Number(val);
  return Number.isNaN(n) ? 0 : n;
};

// pick first present key (handles api naming variations)
const pick = (obj, keys, fallback = undefined) => {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
  }
  return fallback;
};

/* --------------- ImageSlider --------------- */
const ImageSlider = ({ images = [] }) => {
  const validImages = Array.isArray(images) ? images : [];
  const [current, setCurrent] = useState(0);

  if (validImages.length === 0) return <span>No image</span>;

  const nextImage = () => setCurrent((p) => (p + 1) % validImages.length);
  const prevImage = () => setCurrent((p) => (p === 0 ? validImages.length - 1 : p - 1));

  const img = validImages[current] || {};
  const src = (img.file_path || "") + (img.file_name || "");

  return (
    <div className={styles.sliderWrapper}>
      <img src={src} alt={img.file_name || "image"} className={styles.sliderImage} />
      {validImages.length > 1 && (
        <div className={styles.sliderControls}>
          <button onClick={prevImage} aria-label="Previous">&lt;</button>
          <button onClick={nextImage} aria-label="Next">&gt;</button>
        </div>
      )}
    </div>
  );
};

/* --------------- Main Component --------------- */
export default function Hostingitemslist() {
  const [items, setItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);     // list ke liye
  const [detailLoading, setDetailLoading] = useState(false); // modal ke liye
  const [busyId, setBusyId] = useState(null);                // delete/reactivate progress

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Body scroll lock when modal open (prevents layout jump/blink)
  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isModalOpen]);

  // Initial fetch (only affects page area, not background during modal)
  useEffect(() => {
    const authUserDataLocal = getCookie("authUser");
    const parsed = authUserDataLocal ? JSON.parse(authUserDataLocal) : null;

    if (parsed?.id) {
      setPageLoading(true);
      fetch("http://localhost:8080/api/user/getalllisteditems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_provider_id: parsed.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : [];
          const normalized = list.map((it) => {
            let gallery = it.media_gallery;
            if (typeof gallery === "string") {
              try { gallery = JSON.parse(gallery); } catch { gallery = []; }
            }
            return { ...it, media_gallery: Array.isArray(gallery) ? gallery : [] };
          });
          setItems(normalized);
        })
        .catch((err) => console.error("Fetch error:", err))
        .finally(() => setPageLoading(false));
    }
  }, []);

  // View single item — open modal first, then load details (no background blink)
  const handleViewClick = async (itemId) => {
    setSelectedItem(null);
    setIsModalOpen(true);
    setDetailLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/user/getallsinglelisteditems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId }),
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const it = data[0];
        let gallery = it.media_gallery;
        if (typeof gallery === "string") {
          try { gallery = JSON.parse(gallery); } catch { gallery = []; }
        }
        setSelectedItem({ ...it, media_gallery: Array.isArray(gallery) ? gallery : [] });
      } else {
        console.warn("No item found.");
      }
    } catch (err) {
      console.error("Error fetching item details:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Soft DELETE (item_status = 0). Card list se remove nahi, sirf inactive mark.
  const handleDeleteClick = async (itemId) => {
    const ok = window.confirm("Are you sure you want to delete this item?");
    if (!ok) return;

    try {
      setBusyId(itemId);
      const res = await fetch("http://localhost:8080/api/user/deletesinglelisteditems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, action: "delete" }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Delete failed:", data);
        alert(data?.message || "Failed to delete the item.");
        return;
      }

      setItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, item_status: 0 } : it))
      );
      setSelectedItem((prev) =>
        prev && prev.id === itemId ? { ...prev, item_status: 0 } : prev
      );

      alert("Item marked inactive.");
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Something went wrong while deleting.");
    } finally {
      setBusyId(null);
    }
  };

  // Reactivate (only if admin_item_status = 1)
  const handleReactivateClick = async (itemId) => {
    try {
      setBusyId(itemId);
      const res = await fetch("http://localhost:8080/api/user/deletesinglelisteditems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, action: "reactivate" }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Reactivate failed:", data);
        alert(data?.message || "Unable to re-activate item.");
        return;
      }

      setItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, item_status: 1 } : it))
      );
      setSelectedItem((prev) =>
        prev && prev.id === itemId ? { ...prev, item_status: 1 } : prev
      );

      alert("Item re-activated.");
    } catch (err) {
      console.error("Error re-activating item:", err);
      alert("Something went wrong while re-activating.");
    } finally {
      setBusyId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  /* ---------------- render ---------------- */
  return (
    <>
      <div className={styles.rohhostinglist_container}>
        {pageLoading ? (
          <p>Loading...</p>
        ) : items.length > 0 ? (
          items.map((item) => {
            const itemStatus = toNum(pick(item, ["item_status", "itemStatus", "status"]));
            const adminStatus = toNum(
              pick(item, ["admin_item_status", "adminItemStatus", "admin_status", "adminStatus"])
            );

            const isInactive = itemStatus === 0;
            const isAdminApproved = adminStatus === 1;

            return (
              <div key={item.id} className={styles.rohhostinglist_card}>
                <div className={styles.rohhostinglist_image}>
                  <ImageSlider images={item.media_gallery} />
                </div>

                <h3 className={styles.rohhostinglist_title}>{item.item_name}</h3>
                <p className={styles.rohhostinglist_category}>
                  Category: {item.category_id}
                </p>
                <p className={styles.rohhostinglist_reg}>
                  Reg. No: {item.registration_number || "N/A"}
                </p>

                {/* Status badges */}
                <div className={styles.rohhostinglist_badges}>
                  {isInactive && <span className={styles.badgeMuted}>Inactive</span>}
                  {!isAdminApproved && (
                    <span className={styles.badgeWarn}>Awaiting Admin Approval</span>
                  )}
                </div>

                {/* Actions (modal me koi action nahi) */}
                <div className={styles.rohhostinglist_actions}>
                  <button
                    className={styles.rohhostinglist_view}
                    onClick={() => handleViewClick(item.id)}
                  >
                    View
                  </button>

                  {/* Edit optional — chahe to condition lagao */}
                  <button className={styles.rohhostinglist_edit}>Edit</button>

                  {itemStatus === 1 ? (
                    // ACTIVE -> DELETE only
                    <button
                      className={styles.rohhostinglist_delete}
                      onClick={() => handleDeleteClick(item.id)}
                      disabled={busyId === item.id}
                      aria-busy={busyId === item.id}
                    >
                      {busyId === item.id ? "Processing..." : "Delete"}
                    </button>
                  ) : isAdminApproved ? (
                    // INACTIVE + ADMIN APPROVED -> RE-ACTIVATE only
                    <button
                      className={styles.rohhostinglist_reactivate}
                      onClick={() => handleReactivateClick(item.id)}
                      disabled={busyId === item.id}
                      aria-busy={busyId === item.id}
                    >
                      {busyId === item.id ? "Processing..." : "Re-Activate"}
                    </button>
                  ) : (
                    // INACTIVE + ADMIN NOT APPROVED -> NO action
                    <span className={styles.badgeWarn}>Awaiting Admin Approval</span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {/* Modal (NO delete/reactivate here) */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {detailLoading ? (
              <p>Loading item details...</p>
            ) : selectedItem ? (
              <>
                <button className={styles.modalClose} onClick={closeModal}>×</button>
                <h2>{selectedItem.item_name}</h2>

                {(() => {
                  const itemStatus = toNum(pick(selectedItem, ["item_status", "itemStatus", "status"]));
                  const adminStatus = toNum(
                    pick(selectedItem, ["admin_item_status", "adminItemStatus", "admin_status", "adminStatus"])
                  );
                  return (
                    <p>
                      <strong>Status:</strong>{" "}
                      {itemStatus === 1 ? "Active" : "Inactive"}{" "}
                      {adminStatus !== 1 && "(Admin pending)"}
                    </p>
                  );
                })()}

                <p><strong>Description:</strong> {selectedItem.vehicle_description}</p>
                <p><strong>Category:</strong> {selectedItem.category_id}</p>
                <p><strong>Brand:</strong> {selectedItem.brand_id}</p>
                <p><strong>Model:</strong> {selectedItem.model_id}</p>
                <p><strong>Price / Day:</strong> ₹{selectedItem.price_per_day}</p>
                <p><strong>Price / Week:</strong> ₹{selectedItem.price_per_week}</p>
                <p><strong>Price / Month:</strong> ₹{selectedItem.price_per_month}</p>
                <p><strong>Security Deposit:</strong> ₹{selectedItem.security_deposit}</p>
                <p><strong>Availability:</strong> {selectedItem.availability_status}</p>
                <p><strong>Engine:</strong> {selectedItem.engine_type}</p>
                <p><strong>Transmission:</strong> {selectedItem.transmission_type}</p>
                <p><strong>Fuel Consumption:</strong> {selectedItem.fuel_consumption} km/l</p>
                <p><strong>Seating Capacity:</strong> {selectedItem.seating_capacity}</p>
                <p><strong>Color:</strong> {selectedItem.color}</p>
                <p><strong>Vehicle Condition:</strong> {selectedItem.vehicle_condition}</p>
                <p><strong>Rental Period:</strong> {selectedItem.rental_period}</p>
                <p><strong>Address:</strong> {selectedItem.address_1}, {selectedItem.city}</p>
                <p><strong>Pincode:</strong> {selectedItem.pincode}</p>
                <p><strong>Booking Instructions:</strong> {selectedItem.booking_instructions}</p>
              </>
            ) : (
              <p>Something went wrong.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
