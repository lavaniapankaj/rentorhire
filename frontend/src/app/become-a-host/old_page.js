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

  /** To manage the validations */
  const [showCategoryValidation, setShowCategoryValidation] = useState(false);
  const [showSubCategoryValidation, setShowSubCategoryValidation] = useState(false);
  const [showBrandValidation, setShowBrandValidation] = useState(false);
  const [showModelValidation, setShowModelValidation] = useState(false);
  const [errors, setErrors] = useState({});

  /**  */
  const [formData, setFormData] = useState({
    item_name: "",
    vehicle_description: "",
    image_ids: [], // File[]
    price_per_day: "",
    price_per_week: "",
    price_per_month: "",
    price_custom_day: "",
    security_deposit: "",
    booking_terms: "",
    availability_status: "",
    // attributes
    engine_type: "",
    transmission_type: "",
    fuel_consumption: "",
    seating_capacity: "",
    color: "",
    vehicle_age: "",
    mileage: "",
    registration_number: "",
    insurance_validity: "", // YYYY-MM-DD
    vehicle_type: "",
    rental_period: "",
    vehicle_condition: "",
    accessories: "",
    // address
    address_1: "",
    landmark: "",
    item_state: "",
    city: "",
    pincode: "",
    booking_instructions: "",
  });

  /** Step 1: Categories */
  useEffect(() => {
    if (step === 1) {
      fetch("http://localhost:8080/api/user/getallactivecategory")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error(err));
    }
  }, [step]);

  /** Step 2: Subcategories */
  useEffect(() => {
    if (step === 2 && selectedParent) {
      fetch("http://localhost:8080/api/user/getallactivechildcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_category_id: selectedParent }),
      })
        .then((res) => res.json())
        .then((data) => setSubCategories(data))
        .catch((err) => console.error(err));
    }
  }, [step, selectedParent]);

  /** Step 3: Brands */
  useEffect(() => {
    if (step === 3 && selectedSub) {
      fetch("http://localhost:8080/api/user/getallchildcategorybrands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child_category_id: selectedSub }),
      })
        .then((res) => res.json())
        .then((data) => setBrands(data))
        .catch((err) => console.error(err));
    }
  }, [step, selectedSub]);

  /** Step 4: Models */
  useEffect(() => {
    if (step === 4 && selectedBrand) {
      fetch("http://localhost:8080/api/user/getallchildcategorybrandsmodel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand_id: selectedBrand }),
      })
        .then((res) => res.json())
        .then((data) => setModels(data))
        .catch((err) => console.error(err));
    }
  }, [step, selectedBrand]);

  
  // if (!selectedParent) {
  //   setShowError(true);
  //   return;
  // } else {
  //   setShowError(false);
  //   // proceed to next step
  //   console.log("Next step with category:", selectedParent);
  // }

  const handleNext = async () => {
    // if (step === 1 && selectedParent) setStep(2);
    // else if (step === 2 && selectedSub) setStep(3);
    // else if (step === 3 && selectedBrand) setStep(4);
    // else if (step === 4 && selectedModel) setStep(5);

    if (step === 1) {
      if (!selectedParent) {
        setShowCategoryValidation(true);
        return;
      }
      setShowCategoryValidation(false);
      setStep(2);
    } else if (step === 2) {
      if (!selectedSub) {
        setShowSubCategoryValidation(true);
        return;
      }
      setShowSubCategoryValidation(false);
      setStep(3);
    } else if (step === 3) {
      if (!selectedBrand) {
        setShowBrandValidation(true);
        return;
      }
      setShowBrandValidation(false);
      setStep(4);
    } else if (step === 4) {
      if (!selectedModel) {
        setShowModelValidation(true);
        return;
      }
      setShowModelValidation(false);
      setStep(5);
    } else if (step === 5) {

      /** Checking data and showing the validation as needed */
      let newErrors = {};

      if (!formData.item_name.trim()) {
        newErrors.item_name = "Item name is required.";
      }

      if (!formData.price_per_day) {
        newErrors.price_per_day = "Please enter the per day price.";
      }

      if (!formData.availability_status) {
        newErrors.availability_status = "Please select the availability.";
      }

      if (!formData.registration_number) {
        newErrors.registration_number = "Please enter the registration number.";
      }

      if (!formData.vehicle_type) {
        newErrors.vehicle_type = "Please select the vechicle type.";
      }

      if (!formData.address_1) {
        newErrors.address_1 = "Please enter the street address.";
      }

      if (!formData.landmark) {
        newErrors.landmark = "Please enter the landmark.";
      }

      if (!formData.item_state) {
        newErrors.item_state = "Please enter the state.";
      }

      if (!formData.city) {
        newErrors.city = "Please enter the city..";
      }

      if (!formData.pincode) {
        newErrors.pincode = "Please enter the pincode.";
      }


      if (!formData.image_ids || formData.image_ids.length == 0) {
        newErrors.image_ids = "Please select atleast one image.";
      }
    
      // if (!formData.vehicle_description.trim()) {
      //   newErrors.vehicle_description = "Description is required";
      // }
      // if (!formData.image_ids || formData.image_ids.length === 0) {
      //   newErrors.image_ids = "Please upload at least one image";
      // }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      const fd = new FormData();

      /** Hardcoded fields */
      fd.append("service_provider_id", "1"); /** hardcode service provider id */
      fd.append("category_id", String(selectedParent || ""));
      fd.append("tag_id", "2"); /** hardcode tag id */
      fd.append("brand_id", String(selectedBrand || ""));
      fd.append("model_id", String(selectedModel || ""));

      /** Text fields from formData */
      const keys = [
        "item_name",
        "vehicle_description",
        "price_per_day",
        "price_per_week",
        "price_per_month",
        "price_custom_day",
        "item_status",
        "admin_item_status",
        "total_views",
        "security_deposit",
        "booking_terms",
        "availability_status",
        "engine_type",
        "transmission_type",
        "fuel_consumption",
        "seating_capacity",
        "color",
        "vehicle_age",
        "mileage",
        "registration_number",
        "insurance_validity",
        "vehicle_type",
        "rental_period",
        "vehicle_condition",
        "accessories",
        "address_1",
        "landmark",
        "item_state",
        "city",
        "pincode",
        "booking_instructions",
      ];

      // Defaults for those not in state explicitly
      const extrasDefaults = {
        item_status: "1",
        admin_item_status: "1",
        total_views: "0",
      };

      keys.forEach((k) => {
        const val =
          formData[k] != null && formData[k] !== ""
            ? String(formData[k])
            : extrasDefaults[k] != null
            ? String(extrasDefaults[k])
            : "";
        fd.append(k, val);
      });

      // Files — MUST be appended with same field name backend expects
      if (Array.isArray(formData.image_ids)) {
        formData.image_ids.forEach((file) => fd.append("image_ids", file));
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/user/becomehostaddnewvehicle",
          {
            method: "POST",
            body: fd, // 🚫 Content-Type mat set karo; browser khud lagayega
          }
        );

        const result = await response.json();
        if (!response.ok) throw new Error(result?.message || "API Error");
        alert("Vehicle Added Successfully!");
      } catch (error) {
        console.error("❌ Submission Failed:", error);
        alert("Error submitting vehicle data");
      }
    }
     else {
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
          {/* {step === 1 &&
            categories.map((cat) => (
              <div key={cat.id} onClick={() => setSelectedParent(cat.id)} className={`${styles.rohhostdas_box} ${selectedParent === cat.id ? styles.rohhostdas_selected : ""}`}>
                {cat.name}
              </div>
            ))} */}
          {step == 1 && (
            <>
              {categories.map((cat) => (
              <div key={cat.id} onClick={() => setSelectedParent(cat.id)} className={`${styles.rohhostdas_box} ${selectedParent === cat.id ? styles.rohhostdas_selected : ""}`}>
                {cat.name}
              </div>
            ))}

              {/* Validation error message */}
              {showCategoryValidation && (
                <div style={{ color: "red", marginTop: "8px" }}>
                  <span>Please select the category.</span>
                </div>
              )}
            </>
          )}

          {/* {step === 2 &&
            subCategories.map((sub) => (
              <div key={sub.id} onClick={() => setSelectedSub(sub.id)} className={`${styles.rohhostdas_box} ${selectedSub === sub.id ? styles.rohhostdas_selected : ""}`}>
                {sub.name}
              </div>
            ))
          } */}

          {step == 2 && (
            <>
              {subCategories.map((sub) => (
                <div key={sub.id} onClick={() => setSelectedSub(sub.id)} className={`${styles.rohhostdas_box} ${selectedSub === sub.id ? styles.rohhostdas_selected : ""}`}>
                  {sub.name}
                </div>
              ))}

              {/* Validation error message */}
              {showSubCategoryValidation && (
                <div style={{ color: "red", marginTop: "8px" }}>
                  <span>Please select the sub-category.</span>
                </div>
              )}
            </>
          )}

          {/* {step === 3 &&
            brands.map((brand) => (
              <div key={brand.id} onClick={() => setSelectedBrand(brand.id)} className={`${styles.rohhostdas_box} ${selectedBrand === brand.id ? styles.rohhostdas_selected : ""}`}>
                {brand.brand_name}
              </div>
            ))} */}
          {step === 3 && (
            <>
              {brands.map((brand) => (
              <div key={brand.id} onClick={() => setSelectedBrand(brand.id)} className={`${styles.rohhostdas_box} ${selectedBrand === brand.id ? styles.rohhostdas_selected : ""}`}>
                {brand.brand_name}
              </div>
            ))}

            {/* Validation error message */}
            {showBrandValidation && (
                <div style={{ color: "red", marginTop: "8px" }}>
                  <span>Please select the brand.</span>
                </div>
              )}
            </>
          )}

          {/* {step === 4 && 
            models.map((model) => (
              <div key={model.id} onClick={() => setSelectedModel(model.id)} className={`${styles.rohhostdas_box} ${selectedModel === model.id ? styles.rohhostdas_selected : ""}`}>
                {model.model_name}
              </div>
            ))} */}

          {step === 4 && (
            <>
            {models.map((model) => (
              <div key={model.id} onClick={() => setSelectedModel(model.id)} className={`${styles.rohhostdas_box} ${selectedModel === model.id ? styles.rohhostdas_selected : ""}`}>
                {model.model_name}
              </div>
            ))}

            {/* Validation error message */}
            {showModelValidation && (
              <div style={{ color: "red", marginTop: "8px" }}>
                <span>Please select the model.</span>
              </div>
            )}
            </>
          )}

          {step === 5 && (
            <div className={styles.fullWidthForm}>
              {/* <VehicleDetailsForm formData={formData} setFormData={setFormData} /> */}
              <VehicleDetailsForm formData={formData} errors={errors} setFormData={setFormData}/>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.rohhostdas_footer}>
          {step > 1 && (
            <button className={styles.rohhostdas_back} onClick={handleBack}>
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