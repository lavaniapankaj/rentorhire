"use client";
import { useEffect, useState } from "react";
import styles from "../hosting.module.css";

export default function Hostingitemslist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/getalllisteditems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service_provider_id: 1 }),
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.rohhostinglist_container}>
      {items.map((item) => (
        <div key={item.id} className={styles.rohhostinglist_card}>
          {/* Image placeholder */}
          <div className={styles.rohhostinglist_image}>
            <span>Image</span>
          </div>

          {/* Item details */}
          <h3 className={styles.rohhostinglist_title}>{item.item_name}</h3>
          <p className={styles.rohhostinglist_category}>
            Category: {item.category_id}
          </p>
          <p className={styles.rohhostinglist_reg}>
            Reg. No: {item.registration_number || "N/A"}
          </p>

          {/* Action buttons */}
          <div className={styles.rohhostinglist_actions}>
            <button className={styles.rohhostinglist_view}>View</button>
            <button className={styles.rohhostinglist_edit}>Edit</button>
            <button className={styles.rohhostinglist_delete}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
