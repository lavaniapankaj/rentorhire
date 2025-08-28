"use client";
import { useEffect, useState } from "react";
import styles from "../hosting.module.css";

//ImageSlider Component (with prev/next)
const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={styles.sliderWrapper}>
      <img
        src={images[current].file_path + images[current].file_name}
        alt={images[current].file_name}
        className={styles.sliderImage}
        />
      {images.length > 1 && (
        <div className={styles.sliderControls}>
          <button onClick={prevImage}>&lt;</button>
          <button onClick={nextImage}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default function Hostingitemslist() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

    const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const authUserData = getCookie("authUser");
  const parsedAuthUserData = authUserData ? JSON.parse(authUserData) : null;

  // Fetch all listed items on page load
  useEffect(() => {
    const authUserData = getCookie("authUser");
    const parsedAuthUserData = authUserData ? JSON.parse(authUserData) : null;

    if (parsedAuthUserData?.id) {
      setLoading(true);
      fetch("http://localhost:8080/api/user/getalllisteditems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_provider_id: parsedAuthUserData.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => setItems(data))
        .catch((err) => console.error("Fetch error:", err))
        .finally(() => setLoading(false));
    }
  }, []); // <-- empty dependency array ensures it runs only once



  // View single item
  const handleViewClick = async (itemId) => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/user/getallsinglelisteditems",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: itemId }),
        }
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setSelectedItem(data[0]);
        setIsModalOpen(true);
      } else {
        console.warn("No item found.");
      }
    } catch (err) {
      console.error("Error fetching item details:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className={styles.rohhostinglist_container}>
        {loading ? (
          <p>Loading...</p>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className={styles.rohhostinglist_card}>
              <div className={styles.rohhostinglist_image}>
                {item.media_gallery && item.media_gallery.length > 0 ? (
                  <ImageSlider images={item.media_gallery} />
                ) : (
                  <span>No image</span>
                )}
              </div>

              <h3 className={styles.rohhostinglist_title}>{item.item_name}</h3>
              <p className={styles.rohhostinglist_category}>
                Category: {item.category_id}
              </p>
              <p className={styles.rohhostinglist_reg}>
                Reg. No: {item.registration_number || "N/A"}
              </p>

              <div className={styles.rohhostinglist_actions}>
                <button
                  className={styles.rohhostinglist_view}
                  onClick={() => handleViewClick(item.id)}
                >
                  View
                </button>
                <button className={styles.rohhostinglist_edit}>Edit</button>
                <button className={styles.rohhostinglist_delete}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {loading ? (
              <p>Loading item details...</p>
            ) : selectedItem ? (
              <>
                <button className={styles.modalClose} onClick={closeModal}>
                  ×
                </button>
                <h2>{selectedItem.item_name}</h2>
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
