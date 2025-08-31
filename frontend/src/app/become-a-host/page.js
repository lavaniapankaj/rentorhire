"use client";
import Script from "next/script";
import styles from "./become.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import VehicleDetailsForm from "./components/VehicleDetailsForm";

export default function BecomeAHostPage() {

  const router = useRouter();

  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    /* Step 1 */
    service_provider_id: "",
    businessName: "",
    contactPerson: "",
    whatsappNumber: "",
    gstNumber: "",
    deliveryAvailable: "",
  
    /* Step 2 */
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
  
    /* Step 3 */
    items: [
      { category: "", subCategory: "", details: "" }
    ],
  });

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };


  useEffect(() => {
    const authUserData = getCookie("authUser");
    const parsedAuthUserData = authUserData ? JSON.parse(authUserData) : null;

    if (parsedAuthUserData?.id) {
      setFormData((prev) => ({
        ...prev,
        service_provider_id: parsedAuthUserData.id,
      }));
    } else {
      console.warn("No user data found in cookies");
    }

    fetch("http://localhost:8080/api/user/getallactivecategory")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);



  /** On click of the next button */
  const handleNextStep = () => {
    /* Step 1 validation */
    if (currentStep === 1) {

      const { businessName, contactPerson, whatsappNumber, deliveryAvailable } = formData;
      if (!businessName.trim()) {
        alert("Please enter Business Name");
        return;
      }
      if (!contactPerson.trim()) {
        alert("Please enter Owner/Contact Person Name");
        return;
      }
      if (!whatsappNumber.trim()) {
        alert("Please enter Contact Number");
        return;
      }
      if (!deliveryAvailable) {
        alert("Please select Delivery Availability");
        return;
      }
      goToStep(currentStep + 1);
    }

    if(currentStep === 2){
      const { streetAddress, city, state, pinCode } = formData;
      if (!streetAddress.trim()) {
        alert("Please enter the Street address");
        return;
      }
      if (!city.trim()) {
        alert("Please enter the city name");
        return;
      }
      if (!state.trim()) {
        alert("Please select the state");
        return;
      }
      if (!pinCode) {
        alert("Please enter the pincode");
        return;
      }

      goToStep(currentStep + 1);

    }

    if(currentStep === 3){
      goToStep(currentStep + 1);
    }  
  };

  /* TO change the step */
  const goToStep = (step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  /** getting the sub-categories by selecting the categories */
  const handleCategorySelect = async (index, cat) => {
    try {
      // Step 1: update category in formData (subCategory reset karna)
      setFormData((prev) => {
        const updatedItems = [...prev.items];
        updatedItems[index] = {
          ...updatedItems[index],
          category: cat.id,
          subCategory: "" // reset
        };
        return { ...prev, items: updatedItems };
      });
      
      // Step 2: API call for subcategories
      const res = await fetch("http://localhost:8080/api/user/getallactivechildcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_category_id: cat.id }),
      });
      
      const data = await res.json();
      
      // Step 3: save subcategories separately by index
      setSubCategories((prev) => ({
        ...prev,
        [index]: data,
      }));
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  // Subcategory selection
  const handleSubCategorySelect = (index, sub) => {
    setFormData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        subCategory: sub.id
      };
      return { ...prev, items: updatedItems };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        details: {
          ...updatedItems[index].details,
          [field]: value,
        },
      };
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {      
      const fd = new FormData();
      
      console.log("formData 2>> ", formData);
      // Business Info
      fd.append("service_provider_id", formData.service_provider_id || "");
      fd.append("businessName", formData.businessName || "");
      fd.append("contactPerson", formData.contactPerson || "");
      fd.append("whatsappNumber", formData.whatsappNumber || "");
      fd.append("gstNumber", formData.gstNumber || "");
      fd.append("deliveryAvailable", formData.deliveryAvailable || "");
      fd.append("streetAddress", formData.streetAddress || "");
      fd.append("landmark", formData.landmark || "");
      fd.append("city", formData.city || "");
      fd.append("state", formData.state || "");
      fd.append("pinCode", formData.pinCode || "");
  
      // ✅ Items (agar multiple vehicles hai to loop)
      if (formData.items && Array.isArray(formData.items)) {
        formData.items.forEach((item, index) => {
          fd.append(`items[${index}][category]`, item.category || "");
          fd.append(`items[${index}][subCategory]`, item.subCategory || "");
          fd.append(`items[${index}][details][item_name]`, item.details?.item_name || "");
          fd.append(`items[${index}][details][vehicle_description]`, item.details?.vehicle_description || "");
          fd.append(`items[${index}][details][price_per_day]`, item.details?.price_per_day || "");
          fd.append(`items[${index}][details][price_per_week]`, item.details?.price_per_week || "");
          fd.append(`items[${index}][details][price_per_month]`, item.details?.price_per_month || "");
          fd.append(`items[${index}][details][price_custom_day]`, item.details?.price_custom_day || "");
          fd.append(`items[${index}][details][security_deposit]`, item.details?.security_deposit || "");
          fd.append(`items[${index}][details][booking_terms]`, item.details?.booking_terms || "");
          fd.append(`items[${index}][details][availability_status]`, item.details?.availability_status || "");
          fd.append(`items[${index}][details][engine_type]`, item.details?.engine_type || "");
          fd.append(`items[${index}][details][transmission_type]`, item.details?.transmission_type || "");
          fd.append(`items[${index}][details][fuel_consumption]`, item.details?.fuel_consumption || "");
          fd.append(`items[${index}][details][seating_capacity]`, item.details?.seating_capacity || "");
          fd.append(`items[${index}][details][color]`, item.details?.color || "");
          fd.append(`items[${index}][details][vehicle_age]`, item.details?.vehicle_age || "");
          fd.append(`items[${index}][details][mileage]`, item.details?.mileage || "");
          fd.append(`items[${index}][details][registration_number]`, item.details?.registration_number || "");
          fd.append(`items[${index}][details][insurance_validity]`, item.details?.insurance_validity || "");
          fd.append(`items[${index}][details][vehicle_type]`, item.details?.vehicle_type || "");
          fd.append(`items[${index}][details][rental_period]`, item.details?.rental_period || "");
          fd.append(`items[${index}][details][vehicle_condition]`, item.details?.vehicle_condition || "");
          fd.append(`items[${index}][details][accessories]`, item.details?.accessories || "");
          fd.append(`items[${index}][details][address_1]`, item.details?.address_1 || "");
          fd.append(`items[${index}][details][landmark]`, item.details?.landmark || "");
          fd.append(`items[${index}][details][city]`, item.details?.city || "");
          fd.append(`items[${index}][details][item_state]`, item.details?.item_state || "");
          fd.append(`items[${index}][details][pincode]`, item.details?.pincode || "");
          fd.append(`items[${index}][details][booking_instructions]`, item.details?.booking_instructions || "");
        });
      }

      // ✅ API Call
      const response = await fetch(
        "http://localhost:8080/api/user/becomehostaddnewvehicle",
        {
          method: "POST",
          body: fd, // browser khud content-type set karega
        }
      );
  
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "API Error");
  
      console.log("✅ API Response:", result);
      alert("Vehicle Added Successfully!");
      
      // 👇 Redirect
      router.push("/hosting");
    } catch (error) {
      console.error("❌ Submission Failed:", error);
      alert("Error submitting vehicle data");
    }
  };
  
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { category: "", subCategory: "", details: "" }]
    }));
  };
  
  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-6">
      <div className={styles.form_section_main}>
        <div id="header"></div>
          <section className={`${styles.form_section_main} ${styles.py5}`}>
            <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles.col12}>
                  <div className={`${styles.border} ${styles.rowwhite}`}>
                    <div className={`${styles.px4} ${styles.pxmd5}`}>
                      <div className={styles.py5}>
                        <h2 className={`${styles.mb3} ${styles.textCenter} fw-bold`}>List Your Business. Get More Rentals.</h2>
                        <div className={`${styles.titleSepertor} mb-5`}></div>
                          <h4 className={`my-4 step_btn_fr mb-2 ${styles.main_steps}`}> Step {currentStep}: Tell Us About Your Business</h4>
                          <div className={`${styles.progress} ${styles.mb4}`}>
                            <div className={styles.progressBar} role="progressbar" style={{ width: `${(currentStep / 4) * 100}%`,}}> Step {currentStep} of 4 </div>
                          </div>

                          {/* Step 1 */}
                          {currentStep === 1 && (
                            <div id="step1" className="step">      
                              <form id="providerForm">
                                <div className={styles.row}>
                                  <div className={`${styles.mb3} ${styles.colMd6}`}>
                                    <label className={styles.formLabel}>Business Name</label>
                                    <input type="text" name="businessName" className={`${styles.formControl} ${styles.reFormF}`} value={formData.businessName} onChange={handleChange} required />
                                    <small className={`${styles.formText} ${styles.textMuted}`}>
                                      Enter the name as it appears on official documents.
                                    </small>
                                  </div>
                                  <div className={`${styles.mb3} ${styles.colMd6}`}>
                                    <label className={styles.formLabel}>Owner/Contact Person</label>
                                    <input type="text" name="contactPerson" className={`${styles.formControl} ${styles.reFormF}`} value={formData.contactPerson} onChange={handleChange} />
                                    <small className={`${styles.formText} ${styles.textMuted}`}>
                                      Who should we get in touch with?
                                    </small>
                                  </div>
                                </div>

                                <div className={styles.row}>
                                  <div className={`${styles.mb3} ${styles.colMd6}`}>
                                    <label className={styles.formLabel}>Contact Number</label>
                                    <input type="tel" name="whatsappNumber" className={`${styles.formControl} ${styles.reFormF}`} placeholder="+91-" value={formData.whatsappNumber} onChange={handleChange} />
                                    <small className={`${styles.formText} ${styles.textMuted}`}>
                                      Number for customer communication.
                                    </small>
                                  </div>
                                </div>

                                <div className={styles.row}>
                                  <div className={`${styles.mb3} ${styles.colMd6}`}>
                                    <label className={styles.formLabel}>GST Number (if applicable)</label>
                                    <input type="text" name="gstNumber" className={`${styles.formControl} ${styles.reFormF}`} value={formData.gstNumber} onChange={handleChange} />
                                    <small className={`${styles.formText} ${styles.textMuted}`}>
                                      Leave blank if you're not GST registered.
                                    </small>
                                  </div>
                                </div>

                                <div className={styles.row}>
                                  <div className={`${styles.mb3} ${styles.colMd6}`}>
                                    <label className={styles.formLabel}>Is Delivery Available?</label>
                                    <div className={`${styles.dFlex} flex-wrap ${styles.gap2} category-wrap`}>
                                      {["Yes", "No", "Paid Delivery"].map((option) => (
                                        <div key={option}>
                                          <input type="radio" name="deliveryAvailable" value={option} className={styles.btnCheck} id={`da_${option.replace(/\s/g, "").toLowerCase()}`} checked={formData.deliveryAvailable === option} onChange={handleRadioChange} />
                                          <label htmlFor={`da_${option.replace(/\s/g, "").toLowerCase()}`} className={`${styles.btn} btn-outline-secondary ${styles.wmax} ${styles.radioBtns} rounded-3 py-1 px-3 text-start`} > {option} </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className={`${styles.footerSepertor} mt-3 ${styles.mb4}`}></div>
                                <div className="text-end">
                                  <button type="button" className={`${styles.btn} btn-primary ${styles.nextStep}`} onClick={handleNextStep}> Next </button>
                                </div>
                              </form>
                            </div>
                          )}

                          {/* Step 2: Verify Phone Number */}
                          {currentStep === 2 && (
                            <div id="step2" className="step">        
                              <div className={styles.row}>
                                <div className={`${styles.mb3} ${styles.colMd6}`}>
                                  <label className={styles.formLabel}>Street Address</label>
                                  <input type="text" className={`${styles.formControl} ${styles.reFormF}`} name="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
                                  <small className={`${styles.formText} ${styles.textMuted}`}>Your building number, shop name, or street name.</small>
                                </div>
                              </div>
                              <div className={styles.row}>
                                <div className={`${styles.mb3} ${styles.colMd6}`}>
                                  <label className={styles.formLabel}>Landmark</label>
                                  <input type="text" className={`${styles.formControl} ${styles.reFormF}`} name="landmark" value={formData.landmark} onChange={handleChange} />
                                  <small className={`${styles.formText} ${styles.textMuted}`}>Nearby point of reference to help locate your address.</small>
                                </div>
                                <div className={`${styles.mb3} ${styles.colMd6}`}>
                                  <label className={styles.formLabel}>City</label>
                                  <input type="text" className={`${styles.formControl} ${styles.reFormF}`} name="city" value={formData.city} onChange={handleChange} required />
                                  <small className={`${styles.formText} ${styles.textMuted}`}>Your city of operation.</small>
                                </div>
                              </div>
                              <div className={styles.row}>
                                <div className={`${styles.mb3} ${styles.colMd6}`}>
                                  <label className={styles.formLabel}>State</label>
                                  <select id="state" name="state" required className={`${styles.formControl} ${styles.reFormF}`} value={formData.state} onChange={handleChange}>
                                    <option value="">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Puducherry">Puducherry</option>
                                  </select>
                                  <small className={`${styles.formText} ${styles.textMuted}`}>Select from the dropdown.</small>
                                </div>
                                <div className={`${styles.mb3} ${styles.colMd6}`}>
                                  <label className={styles.formLabel}>Pin Code</label>
                                  <input type="text" name="pinCode" className={`${styles.formControl} ${styles.reFormF}`} value={formData.pinCode} onChange={handleChange} pattern="[0-9]{6}" maxLength={6} inputMode="numeric" required />
                                  <small className={`${styles.formText} ${styles.textMuted}`}>Enter your 6-digit postal code.</small>
                                </div>
                              </div>
                              <div className={`${styles.footerSepertor} mt-3 ${styles.mb4}`}></div>
                                <div className={`${styles.dFlex} justify-content-between ${styles.gap2}`}>
                                  <button type="button" className={`${styles.btn} ${styles.prevStep}`} onClick={() => goToStep(1)}>Back</button>
                                  <button type="button" className={`${styles.btn} ${styles.nextStep}`} onClick={handleNextStep}>Next Step</button>
                              </div>
                            </div>
                          )}

                          {/* Step 3: List Your Items */}
                          {currentStep === 3 && (
                            <div id="step3" className="step">                           
                              {formData.items.map((item, index) => (
                                <div key={index} className={`${styles.card} ${styles.mb4} p-3 ${styles.repeaterItem} bgTransparent positionRelative`}>
                                  {/* REMOVE BUTTON */}
                                  {formData.items.length > 1 && (
                                    <button type="button" className={`${styles.btnClose} ${styles.btn} position-absolute m-2`} onClick={() => removeItem(index)}> Remove </button>
                                  )}
                                  <h4 className={styles.mb3}>What Are You Renting?</h4>
                                  <p> Let us know what type of item you are listing, along with its key details and documents. You can add multiple items.</p>

                                  {/* CATEGORY SELECTION */}
                                  <div className="mb-2">
                                    <label className={styles.formLabel}>Select a Category</label>
                                    <small>(Choose the type of item you are listing)</small>
                                    <div className={`${styles.dFlex} flex-wrap ${styles.gap2} ${styles.categoryWrap}`}>
                                      {categories.map((cat) => {
                                        const inputId = `cat_${cat.id}_${index}`;
                                        return (
                                          <div key={cat.id}>
                                            <input type="radio" className={styles.btnCheck} name={`category_${index}`} id={inputId} value={cat.id} checked={item.category === cat.id} onChange={() => handleCategorySelect(index, cat)}/>
                                            <label htmlFor={inputId} className={`${styles.btn} btn-outline-secondary ${styles.wmax} ${styles.radioBtns} rounded-3 py-2 px-3 text-start`}>
                                              <span>{cat.name}</span>
                                            </label>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* SUBCATEGORY SELECTION */}
                                  <div className="sub-categories mb-2">
                                    {item.category ? (
                                      <>
                                        {subCategories ? (
                                          <>
                                            <label className={styles.formLabel}>Select a Sub Category</label>
                                            <div className={`${styles.dFlex} flex-wrap ${styles.gap2} ${styles.subCategoryWrap}`}>
                                              {subCategories[index].map((sub, subIndex) => {
                                                const subId = `sub_${index}_${sub.id}`;
                                                return (
                                                  <div key={sub.id}>
                                                    <input type="radio" className={styles.btnCheck} name={`subCategory_${index}`} id={subId} value={sub.id} checked={item.subCategory === sub.id} onChange={() => handleSubCategorySelect(index, sub)}/>
                                                    <label htmlFor={subId} className={`${styles.btn} btn-outline-secondary ${styles.wmax} ${styles.radioBtns} rounded-3 py-2 px-3 text-start`}>
                                                      <span>{sub.name}</span>
                                                    </label>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </>
                                        ) : (
                                          <p className="text-muted mt-2"><b>{item.category}</b> sub-categories are coming soon 🚀 </p>
                                        )}
                                      </>
                                    ) : null}
                                  </div>
                                  
                                  {/* CHILD FORM / MESSAGE */}
                                  <div className="child-inputs">
                                    {item.category === 1 && item.subCategory ? (
                                      <VehicleDetailsForm index={index} item={item} formData={formData} setFormData={setFormData} handleDetailsChange={handleDetailsChange} errors={errors}/>
                                    ) : (
                                      item.subCategory && (
                                        <p className="text-muted mt-2"><b>coming soon 🚀</b></p>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))}
                              
                              {/* ADD ITEM BTN */}
                              {/* <button type="button" className={`${styles.btn} mb-3 addMoreBtn`} onClick={addItem}> + Add Item </button> */}
                              {/* <div className={`${styles.footerSepertor} mt-3 ${styles.mb4}`}></div> */}
                              
                              {/* FOOTER BTNS */}
                              <div className={`${styles.dFlex} justify-content-between ${styles.gap2}`}>
                                <button type="button" className={`${styles.btn} ${styles.prevStep}`} onClick={() => goToStep(2)}> Back </button>
                                <button type="button" className={`${styles.btn} ${styles.nextStep}`} onClick={handleNextStep}> Next Step </button>
                              </div>
                            </div>
                          )}

                          {/* Step 4: Review & Submit */}
                          {currentStep === 4 && (
                            <div id="step5" className="step">
                              <div id="summary">
                                <p> Please review your business and rental item details below. If everything looks good, hit Submit to publish your listing. </p>

                                {/* Business Info */}
                                <div className={`card ${styles.mb3} bg-transparent`}>
                                  <div className="card-body">
                                    <h5 className="card-title"> {formData.businessName || "N/A"} </h5>
                                    <p className="card-text">
                                      <strong>Contact Person:</strong>{" "}
                                      {formData.contactPerson || "N/A"} <br />
                                      <strong>Phone:</strong> {formData.whatsappNumber || "N/A"} <br />
                                      <strong>GST:</strong> {formData.gstNumber || "N/A"} <br />
                                      <strong>Delivery:</strong>{" "}
                                      {formData.deliveryAvailable || "N/A"} <br />
                                      <strong>Address:</strong> {formData.streetAddress || "N/A"},{" "}
                                      {formData.landmark || "N/A"},{" "}
                                      {formData.city || "N/A"},{" "}
                                      {formData.state || "N/A"} - {formData.pinCode || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                {/* Rental Items */}
                                {formData.items?.map((item, idx) => {
                                  // Category name
                                  const categoryName = categories.find((cat) => cat.id === item.category)?.name || "N/A";

                                  // SubCategory name
                                  const subCategoryName = subCategories[idx]?.find((sub) => sub.id === item.subCategory)?.name || "N/A";

                                  return (
                                    <div key={idx} className={`card ${styles.mb3} bg-transparent`}>
                                      <div className="card-body">
                                        <h5 className="card-title">{item.details?.item_name || "N/A"}</h5>
                                        <p className="card-text">
                                          <strong>Category:</strong> {categoryName}<br/>
                                          <strong>Sub Category:</strong> {subCategoryName}<br/>
                                          <strong>Description:</strong>{" "}
                                          {item.details?.vehicle_description || "N/A"}<br/>
                                          <strong>Price/Day:</strong> ₹ {item.details?.price_per_day || "N/A"}<br/>
                                          <strong>Price/Week:</strong> ₹ {item.details?.price_per_week || "N/A"}<br/>
                                          <strong>Price/Month:</strong> ₹ {item.details?.price_per_month || "N/A"}<br/>
                                          <strong>Custom Day Price:</strong> ₹ {item.details?.price_custom_day || "N/A"}<br/>
                                          <strong>Security Deposit:</strong> ₹ {item.details?.security_deposit || "N/A"}<br/>
                                          <strong>Booking Terms:</strong>{" "}
                                          {item.details?.booking_terms || "N/A"}<br/>
                                          <strong>Availability:</strong>{" "}
                                          {item.details?.availability_status || "N/A"}<br/>
                                          <strong>Engine Type:</strong>{" "}
                                          {item.details?.engine_type || "N/A"}<br/>
                                          <strong>Transmission:</strong>{" "}
                                          {item.details?.transmission_type || "N/A"}<br/>
                                          <strong>Fuel Consumption:</strong>{" "}
                                          {item.details?.fuel_consumption || "N/A"}<br/>
                                          <strong>Seating Capacity:</strong>{" "}
                                          {item.details?.seating_capacity || "N/A"}<br/>
                                          <strong>Color:</strong> {item.details?.color || "N/A"}<br/>
                                          <strong>Vehicle Age:</strong>{" "}
                                          {item.details?.vehicle_age || "N/A"}<br/>
                                          <strong>Mileage:</strong> {item.details?.mileage || "N/A"}<br/>
                                          <strong>Registration No:</strong>{" "}
                                          {item.details?.registration_number || "N/A"}<br/>
                                          <strong>Insurance Validity:</strong>{" "}
                                          {item.details?.insurance_validity || "N/A"}<br/>
                                          <strong>Vehicle Type:</strong>{" "}
                                          {item.details?.vehicle_type || "N/A"}<br/>
                                          <strong>Rental Period:</strong>{" "}
                                          {item.details?.rental_period || "N/A"}<br/>
                                          <strong>Condition:</strong>{" "}
                                          {item.details?.vehicle_condition || "N/A"}<br/>
                                          <strong>Accessories:</strong>{" "}
                                          {item.details?.accessories || "N/A"}<br/>
                                          <strong>Pickup Address:</strong>{" "}
                                          {item.details?.address_1 || "N/A"},{" "}
                                          {item.details?.landmark || "N/A"},{" "}
                                          {item.details?.city || "N/A"},{" "}
                                          {item.details?.item_state || "N/A"} -{" "}
                                          {item.details?.pincode || "N/A"}<br />
                                          <strong>Booking Instructions:</strong>{" "}
                                          {item.details?.booking_instructions || "N/A"}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Terms */}
                                <div className="form-check my-3">
                                  <input className={styles.formCheckInput} type="checkbox" id="termsCheck"/>
                                  <label className={styles.formCheckLabel} htmlFor="termsCheck">
                                    I confirm that all the information provided is accurate and I agree to the
                                    <a href="#">Terms of Listing</a>
                                  </label>
                                </div>

                                <div className={`${styles.footerSepertor} mt-3 ${styles.mb4}`}></div>
                                <div className={`${styles.dFlex} justify-content-between ${styles.gap2}`}>
                                  <button type="button" className={`${styles.btn} ${styles.prevStep}`} onClick={() => goToStep(3)}>
                                    Back
                                  </button>
                                  <button type="submit" className={`${styles.btn} ${styles.submitBtn}`} id="submitForm" onClick={handleSubmit}>
                                    Publish Listing
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                                {/* Success Message */}
                                {/* <div id="successMessage" className="alert alert-success d-none mt-4">
                                    Your listing has been submitted. We will review and publish it within 24 hours.
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Left Image Side */}
                {/* Form Side */}
            </div>
        </div>
    </section>
    <div id="footer"></div>
  </div>
</div>
  );
}