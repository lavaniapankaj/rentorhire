"use client";
import { useEffect, useState } from "react";
import styles from "../become.module.css";

export default function VehicleDetailsForm({ index, item, formData, setFormData, handleDetailsChange, errors }) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  /** Handle input change */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    /** inside handleChange */
    if (type === "file") {
      setFormData({ ...formData, [name]: Array.from(files || []) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  if (!mounted) return null;
  return (
    <form className={styles.vehicleForm} encType="multipart/form-data">
      {/* Basic Info */}
      <div>
        <label className={styles.formLabel}>Item Name</label>
        <input type="text" name="item_name" placeholder="Item Name" value={item.details?.item_name || ""} onChange={(e) => handleDetailsChange(index, "item_name", e.target.value)} />
        {errors.item_name && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.item_name}</span>
          </div>
        )}
      </div>

      <div>
        <label className={styles.formLabel}>Vehicle Description</label>
        <textarea name="vehicle_description" placeholder="Vehicle Description" value={item.details?.vehicle_description || ""} onChange={(e) => handleDetailsChange(index, "vehicle_description", e.target.value)} />
        {errors.vehicle_description && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.vehicle_description}</span>
          </div>
        )}
      </div>
      
      <div>
      <label className={styles.formLabel}>Add Image</label>
        <input type="file" name="image_ids" multiple onChange={handleChange}/>
        {errors.image_ids && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.image_ids}</span>
          </div>
        )}
      </div>

      {/* Pricing */}
      <div>
      <label className={styles.formLabel}>Price Per Day</label>
        <input type="number" name="price_per_day" placeholder="Price Per Day" value={item.details?.price_per_day || ""} onChange={(e) => handleDetailsChange(index, "price_per_day", e.target.value)} />
        {errors.price_per_day && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.price_per_day}</span>
          </div>
        )}
      </div>
      <div>
      <label className={styles.formLabel}>Price Per Week</label>
      <input type="number" name="price_per_week" placeholder="Price Per Week" value={item.details?.price_per_week || ""} onChange={(e) => handleDetailsChange(index, "price_per_week", e.target.value)} />
      </div>

      <div>
      <label className={styles.formLabel}>Price Per Month</label>
      <input type="number" name="price_per_month" placeholder="Price Per Month" value={item.details?.price_per_month || ""} onChange={(e) => handleDetailsChange(index, "price_per_month", e.target.value)} />
      </div>

      <div>
      <label className={styles.formLabel}>Price (Custom Day)</label>
      <input type="number" name="price_custom_day" placeholder="Price (Custom Day)"  value={item.details?.price_custom_day || ""} onChange={(e) => handleDetailsChange(index, "price_custom_day", e.target.value)}/>
      </div>

      <div>
      <label className={styles.formLabel}>Security Deposit</label>
      <input type="number" name="security_deposit" placeholder="Security Deposit"  value={item.details?.security_deposit || ""} onChange={(e) => handleDetailsChange(index, "security_deposit", e.target.value)}/>
      </div>

      <div>
      <label className={styles.formLabel}>Booking Terms</label>
      <textarea name="booking_terms" placeholder="Booking Terms" value={item.details?.booking_terms || ""} onChange={(e) => handleDetailsChange(index, "booking_terms", e.target.value)}/>
      </div>

      {/* Status */}
      <div>
      <label className={styles.formLabel}>Availability Status</label>
        <select name="availability_status" value={item.details?.availability_status || ""} onChange={(e) => handleDetailsChange(index, "availability_status", e.target.value)}>
          <option value="">Select Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
          <option value="Booked">Booked</option>
        </select>
        {errors.availability_status && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.availability_status}</span>
          </div>
        )}
      </div>

      <div>
      <label className={styles.formLabel}>Engine Type</label>
      <select name="engine_type" value={item.details?.engine_type || ""} onChange={(e) => handleDetailsChange(index, "engine_type", e.target.value)}>
        <option value="">Engine Type</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
        <option value="CNG">CNG</option>
      </select>
      </div>

      <div>
      <label className={styles.formLabel}>Transmission Type</label>
      <select name="transmission_type" value={item.details?.transmission_type || ""} onChange={(e) => handleDetailsChange(index, "transmission_type", e.target.value)}>
        <option value="">Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>
      </div>

      {/* Vehicle Specs */}
      <div>
      <label className={styles.formLabel}>Fuel Consumption</label>
      <input type="number" name="fuel_consumption" placeholder="Fuel Consumption" value={item.details?.fuel_consumption || ""} onChange={(e) => handleDetailsChange(index, "fuel_consumption", e.target.value)}/>
      </div>
      <div>
      <label className={styles.formLabel}>Seating Capacity</label>
      <input type="number" name="seating_capacity" placeholder="Seating Capacity" value={item.details?.seating_capacity || ""} onChange={(e) => handleDetailsChange(index, "seating_capacity", e.target.value)}/>
      </div>
      <div>
      <label className={styles.formLabel}>Color</label>
      <input type="text" name="color" placeholder="Color" value={item.details?.color || ""} onChange={(e) => handleDetailsChange(index, "color", e.target.value)}/>
      </div>
      <div>
      <label className={styles.formLabel}>Vehicle Age</label>
      <input type="number" name="vehicle_age" placeholder="Vehicle Age" value={item.details?.vehicle_age || ""} onChange={(e) => handleDetailsChange(index, "vehicle_age", e.target.value)}/>
      </div>
      <div>
      <label className={styles.formLabel}>Mileage</label>
      <input type="number" name="mileage" placeholder="Mileage" value={item.details?.mileage || ""} onChange={(e) => handleDetailsChange(index, "mileage", e.target.value)} />
      </div>
      <div>
      <label className={styles.formLabel}>Registration Number</label>
        <input type="text" name="registration_number" placeholder="Registration Number" value={item.details?.registration_number || ""} onChange={(e) => handleDetailsChange(index, "registration_number", e.target.value)}/>
        {errors.registration_number && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.registration_number}</span>
          </div>
        )}
      </div>
      
      <div>
      <label className={styles.formLabel}>Insurance Validity</label>
      <input type="date" name="insurance_validity" placeholder="Insurance Validity" value={item.details?.insurance_validity || ""} onChange={(e) => handleDetailsChange(index, "insurance_validity", e.target.value)}/>
      </div>

      {/* Type & Period */}
      <div>
        <label className={styles.formLabel}>Vechicle Type</label>
        <select name="vehicle_type" value={item.details?.vehicle_type || ""} onChange={(e) => handleDetailsChange(index, "vehicle_type", e.target.value)}>
          <option value="">Vehicle Type</option>
          <option value="Luxury">Luxury</option>
          <option value="Economy">Economy</option>
          <option value="Standard">Standard</option>
        </select>
        {errors.vehicle_type && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.vehicle_type}</span>
          </div>
        )}
      </div>

      <div>
      <label className={styles.formLabel}>Rental Period</label>
      <select name="rental_period" value={item.details?.rental_period || ""} onChange={(e) => handleDetailsChange(index, "rental_period", e.target.value)}>
        <option value="">Rental Period</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Custom">Custom</option>
      </select>
      </div>
      <div>
      <label className={styles.formLabel}>Vechicle Condition</label>
      <select name="vehicle_condition" value={item.details?.vehicle_condition || ""} onChange={(e) => handleDetailsChange(index, "vehicle_condition", e.target.value)}>
        <option value="">Vehicle Condition</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Refurbished">Refurbished</option>
      </select>
      </div>
      {/* Accessories */}
      <div>
      <label className={styles.formLabel}>Accessories</label>
      <textarea name="accessories" placeholder="Accessories" value={item.details?.accessories || ""} onChange={(e) => handleDetailsChange(index, "accessories", e.target.value)}/>
      </div>
      {/* Address */}
      <div>
      <label className={styles.formLabel}>Address Line 1</label>
        <input type="text" name="address_1" placeholder="Address Line 1" value={item.details?.address_1 || ""} onChange={(e) => handleDetailsChange(index, "address_1", e.target.value)}/>
        {errors.address_1 && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.address_1}</span>
          </div>
        )}
      </div>
      <div>
      <label className={styles.formLabel}>Landmark</label>
        <input type="text" name="landmark" placeholder="Landmark" value={item.details?.landmark || ""} onChange={(e) => handleDetailsChange(index, "landmark", e.target.value)}/>
        {errors.landmark && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.landmark}</span>
          </div>
        )}
      </div>
      <div>
      <label className={styles.formLabel}>State</label>
        <input type="text" name="item_state" placeholder="State" value={item.details?.item_state || ""} onChange={(e) => handleDetailsChange(index, "item_state", e.target.value)}/>
        {errors.item_state && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.item_state}</span>
          </div>
        )}
      </div>
      <div>
      <label className={styles.formLabel}>City</label>
        <input type="text" name="city" placeholder="City" value={item.details?.city || ""} onChange={(e) => handleDetailsChange(index, "city", e.target.value)}/>
        {errors.city && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.city}</span>
          </div>
        )}
      </div>
      <div>
      <label className={styles.formLabel}>Pincode</label>
        <input type="number" name="pincode" placeholder="Pincode" value={item.details?.pincode || ""} onChange={(e) => handleDetailsChange(index, "pincode", e.target.value)}/>
        {errors.pincode && (
          <div style={{ color: "red", marginTop: "4px" }}>
            <span>{errors.pincode}</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div>
      <label className={styles.formLabel}>Booking Instructions</label>
      <textarea name="booking_instructions" placeholder="Booking Instructions" value={item.details?.booking_instructions || ""} onChange={(e) => handleDetailsChange(index, "booking_instructions", e.target.value)}/>
      </div>
    </form>
  );
}