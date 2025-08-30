"use client";
import { useState, useEffect } from "react";
import styles from "./hosting.module.css";
import Hostingitems from "./components/Hostingitems";

export default function BecomeAHosting() {
  const [activeTab, setActiveTab] = useState("hostingHub");

  useEffect(() => {
    // Set full page background
    document.body.style.backgroundImage = 'url("/images/homepg/bg-img-3.svg")';
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    // Cleanup when component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "hostingHub":
        return <div className={styles.rohhostpnlhostinh_tabContent}>This is the Hosting Hub.</div>;
      case "listing":
        return <div className={styles.rohhostpnlhostinh_tabContent}>
          <Hostingitems />
        </div>;
      case "calendar":
        return <div className={styles.rohhostpnlhostinh_tabContent}>This is your Calendar.</div>;
      default:
        return <div className={styles.rohhostpnlhostinh_tabContent}>Please select a tab.</div>;
    }
  };

  return (
    <div className={styles.rohhostpnlhostinh_container} style={{ backgroundColor: "rgba(255,255,255,0.85)", borderRadius: 10, padding: 30 }}>
      {/* Tabs */}
      <div className={styles.rohhostpnlhostinh_tabs} role="tablist" aria-label="Hosting navigation">
        <div
          role="tab"
          tabIndex={0}
          className={`${styles.rohhostpnlhostinh_tab} ${
            activeTab === "hostingHub" ? styles.rohhostpnlhostinh_active : ""
          }`}
          onClick={() => setActiveTab("hostingHub")}
          onKeyDown={(e) => e.key === "Enter" && setActiveTab("hostingHub")}
        >
          Hosting Hub
        </div>
        <div
          role="tab"
          tabIndex={0}
          className={`${styles.rohhostpnlhostinh_tab} ${
            activeTab === "listing" ? styles.rohhostpnlhostinh_active : ""
          }`}
          onClick={() => setActiveTab("listing")}
          onKeyDown={(e) => e.key === "Enter" && setActiveTab("listing")}
        >
          Listing
        </div>
        <div
          role="tab"
          tabIndex={0}
          className={`${styles.rohhostpnlhostinh_tab} ${
            activeTab === "calendar" ? styles.rohhostpnlhostinh_active : ""
          }`}
          onClick={() => setActiveTab("calendar")}
          onKeyDown={(e) => e.key === "Enter" && setActiveTab("calendar")}
        >
          Calendar
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.rohhostpnlhostinh_tabContentWrapper}>{renderTabContent()}</div>
    </div>
  );
}
