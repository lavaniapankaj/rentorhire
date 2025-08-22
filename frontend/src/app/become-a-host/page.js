"use client";
import { useEffect, useState } from "react";
import styles from "./become.module.css";
import VehicleDetailsForm from "./components/VehicleDetailsForm"; 


export default function BecomeAHost() {
  const [step, setStep] = useState(1);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Step 1: Categories
  useEffect(() => {
    if (step === 1) {
      fetch("http://localhost:8080/user/getallactivecategory")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error(err));
    }
  }, [step]);

  // Step 2: Subcategories
  useEffect(() => {
    if (step === 2 && selectedParent) {
      fetch("http://localhost:8080/user/getallactivechildcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_category_id: selectedParent }),
      })
        .then((res) => res.json())
        .then((data) => setSubCategories(data))
        .catch((err) => console.error(err));
    }
  }, [step, selectedParent]);

  // Step 3: Brands
  useEffect(() => {
    if (step === 3 && selectedSub) {
      fetch("http://localhost:8080/user/getallchildcategorybrands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child_category_id: selectedSub }),
      })
        .then((res) => res.json())
        .then((data) => setBrands(data))
        .catch((err) => console.error(err));
    }
  }, [step, selectedSub]);

  // Step 4: Models
  useEffect(() => {
    if (step === 4 && selectedBrand) {
      fetch("http://localhost:8080/user/getallchildcategorybrandsmodel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_id: selectedBrand }),
      })
        .then((res) => res.json())
        .then((data) => setModels(data))
        .catch((err) => console.error(err));
    }
  }, [step, selectedBrand]);

  const handleNext = async () => {
    if (step === 1 && selectedParent) setStep(2);
    else if (step === 2 && selectedSub) setStep(3);
    else if (step === 3 && selectedBrand) setStep(4);
    else if (step === 4 && selectedModel) setStep(5);
    else if (step === 5) {
      const finalData = {
        service_provider_id: 1, 
        item_name: formData.item_name,
        vehicle_description: formData.vehicle_description,
        category_id: selectedParent,
        // tag_id: selectedSub, 
        tag_id: 2, 
        brand_id: selectedBrand,
        model_id: selectedModel,
        image_ids: formData.image_ids || ["image1.jpg"],
        price_per_day: formData.price_per_day,
        price_per_week: formData.price_per_week,
        price_per_month: formData.price_per_month,
        price_custom_day: formData.price_custom_day,
        item_status: 1,
        admin_item_status: 1,
        total_views: 0,
        security_deposit: formData.security_deposit,
        booking_terms: formData.booking_terms,
        availability_status: formData.availability_status,

        engine_type: formData.engine_type,
        transmission_type: formData.transmission_type,
        fuel_consumption: formData.fuel_consumption,
        seating_capacity: formData.seating_capacity,
        color: formData.color,
        vehicle_age: formData.vehicle_age,
        mileage: formData.mileage,
        registration_number: formData.registration_number,
        insurance_validity: formData.insurance_validity,
        vehicle_type: formData.vehicle_type,
        rental_period: formData.rental_period,
        vehicle_condition: formData.vehicle_condition,
        accessories: formData.accessories,
        address_1: formData.address_1,
        landmark: formData.landmark,
        item_state: formData.item_state,
        city: formData.city,
        pincode: formData.pincode,
        booking_instructions: formData.booking_instructions,
      };

      console.log("Final Submit Data:", finalData);

      try {
        const response = await fetch("http://localhost:8080/user/becomehostaddnewvehicle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        });

        if (!response.ok) throw new Error("API Error");

        const result = await response.json();
        console.log("✅ API Response:", result);
        alert("Vehicle Added Successfully!");
      } catch (error) {
        console.error("❌ Submission Failed:", error);
        alert("Error submitting vehicle data");
      }
    } else {
      alert("Please select an option");
    }
  };



  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const stepTitles = {
    1: "Select Category",
    2: "Select Subcategory",
    3: "Select Brand",
    4: "Select Model",
    5: "Final Form",
  };

  return (
    <div className={styles.rohhostdas_wrapper}>
      {/* Popup */}
      <div className={styles.rohhostdas_popup}>
        {/* Header */}
        <div className={styles.rohhostdas_header}>
          <h2>{stepTitles[step]}</h2>
          <a href="/account" className={styles.rohhostdas_accountLink}>
            My-Account
          </a>
        </div>

        {/* Step Content */}
        <div className={styles.rohhostdas_content}>
          {step === 1 &&
            categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedParent(cat.id)}
                className={`${styles.rohhostdas_box} ${
                  selectedParent === cat.id ? styles.rohhostdas_selected : ""
                }`}
              >
                {cat.name}
              </div>
            ))}

          {step === 2 &&
            subCategories.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSub(sub.id)}
                className={`${styles.rohhostdas_box} ${
                  selectedSub === sub.id ? styles.rohhostdas_selected : ""
                }`}
              >
                {sub.name}
              </div>
            ))}

          {step === 3 &&
            brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`${styles.rohhostdas_box} ${
                  selectedBrand === brand.id ? styles.rohhostdas_selected : ""
                }`}
              >
                {brand.brand_name}
              </div>
            ))}

          {step === 4 &&
            models.map((model) => (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`${styles.rohhostdas_box} ${
                  selectedModel === model.id ? styles.rohhostdas_selected : ""
                }`}
              >
                {model.model_name}
              </div>
            ))}

          {step === 5 && (
            <div className={styles.fullWidthForm}>
              <VehicleDetailsForm formData={formData} setFormData={setFormData} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.rohhostdas_footer}>
          {step > 1 && (
            <button
              className={styles.rohhostdas_back}
              onClick={handleBack}
            >
              ← Back
            </button>
          )}
          <button className={styles.rohhostdas_next} onClick={handleNext}>
            {step === 5 ? "Finish ✅" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
