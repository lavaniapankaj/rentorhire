"use client";
import { useState } from "react";
import styles from "../become.module.css";


export default function VehicleDetailsForm({ formData, setFormData }) {
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form className={styles.vehicleForm}>
      {/* Basic Info */}
      <input
        type="text"
        name="item_name"
        placeholder="Item Name"
        value={formData.item_name || ""}
        onChange={handleChange}
      />
      <textarea
        name="vehicle_description"
        placeholder="Vehicle Description"
        value={formData.vehicle_description || ""}
        onChange={handleChange}
      />
      <input
        type="file"
        name="images"
        multiple
        onChange={handleChange}
      />

      {/* Pricing */}
      <input
        type="number"
        name="price_per_day"
        placeholder="Price Per Day"
        value={formData.price_per_day || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price_per_week"
        placeholder="Price Per Week"
        value={formData.price_per_week || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price_per_month"
        placeholder="Price Per Month"
        value={formData.price_per_month || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price_custom_day"
        placeholder="Price (Custom Day)"
        value={formData.price_custom_day || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="security_deposit"
        placeholder="Security Deposit"
        value={formData.security_deposit || ""}
        onChange={handleChange}
      />
      <textarea
        name="booking_terms"
        placeholder="Booking Terms"
        value={formData.booking_terms || ""}
        onChange={handleChange}
      />

      {/* Status */}
      <select
        name="availability_status"
        value={formData.availability_status || ""}
        onChange={handleChange}
      >
        <option value="">Select Availability</option>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
        <option value="Booked">Booked</option>
      </select>

      <select
        name="engine_type"
        value={formData.engine_type || ""}
        onChange={handleChange}
      >
        <option value="">Engine Type</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
        <option value="CNG">CNG</option>
      </select>

      <select
        name="transmission_type"
        value={formData.transmission_type || ""}
        onChange={handleChange}
      >
        <option value="">Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>

      {/* Vehicle Specs */}
      <input
        type="text"
        name="fuel_consumption"
        placeholder="Fuel Consumption"
        value={formData.fuel_consumption || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="seating_capacity"
        placeholder="Seating Capacity"
        value={formData.seating_capacity || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="vehicle_age"
        placeholder="Vehicle Age"
        value={formData.vehicle_age || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="mileage"
        placeholder="Mileage"
        value={formData.mileage || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="registration_number"
        placeholder="Registration Number"
        value={formData.registration_number || ""}
        onChange={handleChange}
      />
      <input
        type="date"
        name="insurance_validity"
        placeholder="Insurance Validity"
        value={formData.insurance_validity || ""}
        onChange={handleChange}
      />

      {/* Type & Period */}
      <select
        name="vehicle_type"
        value={formData.vehicle_type || ""}
        onChange={handleChange}
      >
        <option value="">Vehicle Type</option>
        <option value="Luxury">Luxury</option>
        <option value="Economy">Economy</option>
        <option value="Standard">Standard</option>
      </select>

      <select
        name="rental_period"
        value={formData.rental_period || ""}
        onChange={handleChange}
      >
        <option value="">Rental Period</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Custom">Custom</option>
      </select>

      <select
        name="vehicle_condition"
        value={formData.vehicle_condition || ""}
        onChange={handleChange}
      >
        <option value="">Vehicle Condition</option>
        <option value="New">New</option>
        <option value="Used">Used</option>
        <option value="Refurbished">Refurbished</option>
      </select>

      {/* Accessories */}
      <textarea
        name="accessories"
        placeholder="Accessories"
        value={formData.accessories || ""}
        onChange={handleChange}
      />

      {/* Address */}
      <input
        type="text"
        name="address_1"
        placeholder="Address Line 1"
        value={formData.address_1 || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="landmark"
        placeholder="Landmark"
        value={formData.landmark || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="item_state"
        placeholder="State"
        value={formData.item_state || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode || ""}
        onChange={handleChange}
      />

      {/* Instructions */}
      <textarea
        name="booking_instructions"
        placeholder="Booking Instructions"
        value={formData.booking_instructions || ""}
        onChange={handleChange}
      />
    </form>
  );
}
