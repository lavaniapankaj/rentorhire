"use client";
import { useState } from "react";
import Script from "next/script";
import styles from "./become.module.css";
import VehicleDetailsForm from "./components/VehicleDetailsForm";

export default function BecomeAHostPage() {

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    /* Step 1 */
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
  
  const categories = {
    "Vehicle": "car.svg",
    "Electronics": "home-appliance.svg",
    "Furniture": "furniture.svg",
    "Event and Outdoor": "cheers.svg",
    "Tools and Equipment": "wrench.svg",
    "Home Appliances": "appliance-repair.svg",
    "Other": "categories.svg"
  };
  
  const subCategories = {
    Vehicle: [
      { name: "Bike", icon: "bike.svg" },
      { name: "Car", icon: "car.svg" },
    ],
    Electronics: [
      { name: "Camera", icon: "camera.svg" }
    ],
    Furniture: [
      { name: "Chair", icon: "chair.svg" }
    ],
    Other: []
  };
  

  /** On click of the next button */
  const handleNextStep = () => {
    console.log("step change> validation and next step");
    /* Step 1 validation */
    if (currentStep === 1) {

      console.log("step 1 running");

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
      console.log("step 2 running");
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




    console.log("formdata>> ", formData);
  
    // Aage ke steps ke liye bhi same logic add kar sakte ho
  };
  

  /* TO change the step */
  const goToStep = (step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Yeh function har ek item ke details update karega
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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // API call ya backend submission yahan
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
  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;  
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };
  
  
  

  return (
    <div className="p-6">

      {/* Ab yaha tu apna form / designer ka HTML paste karega */}
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
                                  {formData.items.length > 1 && (
                                    <button type="button" className={`${styles.btnClose} ${styles.btn} position-absolute top-0 end-0 m-2`} onClick={() => removeItem(index)}> Remove </button>
                                  )}
                                  <h4 className={styles.mb3}>What Are You Renting?</h4>
                                  <p> Let us know what type of item you are listing, along with its key details and documents. You can add multiple items. </p>

                                  {/* CATEGORY SELECTION */}
                                  <div className="mb-2">
                                    <label className={styles.formLabel}>Select a Category</label>
                                    <small>(Choose the type of item you are listing)</small>
                                    <div className={`${styles.dFlex} flex-wrap ${styles.gap2} ${styles.categoryWrap}`} >
                                      {Object.entries(categories).map(([key, icon]) => {
                                        const inputId = `cat_${index}_${key.replace(/\s/g, "")}`;
                                        return (
                                          <div key={key}>
                                            <input type="radio" className={styles.btnCheck} name={`dataType_${index}`} id={inputId} value={key} checked={item.category === key} onChange={(e) => handleItemChange(index, "category", e.target.value)} />
                                            <label htmlFor={inputId} className={`${styles.btn} btn-outline-secondary ${styles.wmax} ${styles.radioBtns} rounded-3 py-2 px-3 text-start`} >
                                              {/* <img src={`assets/images/icons/${icon}`} alt={key} /> */}
                                              <span>{key}</span>
                                            </label>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* SUBCATEGORY SELECTION */}
                                  <div className="sub-categories mb-2">
                                    {item.category && subCategories[item.category]?.length > 0 ? (
                                      <>
                                        <label className={styles.formLabel}>Select a Sub Category</label>
                                        <div className={`${styles.dFlex} flex-wrap ${styles.gap2} ${styles.subCategoryWrap}`}>
                                          {subCategories[item.category].map((sub, subIndex) => {
                                            const subId = `sub_${index}_${sub.name.replace(/\s/g, "")}`;
                                            return (
                                              <div key={subIndex}>
                                                <input type="radio" className={styles.btnCheck} name={`subCategory_${index}`} id={subId} value={sub.name} checked={item.subCategory === sub.name} onChange={(e) => handleItemChange(index, "subCategory", e.target.value)} />
                                                <label htmlFor={subId} className={`${styles.btn} btn-outline-secondary ${styles.wmax} ${styles.radioBtns} rounded-3 py-2 px-3 text-start`}>
                                                  {/* <img src={`assets/images/icons/${sub.icon}`} alt={sub.name} /> */}
                                                  <span>{sub.name}</span>
                                                </label>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </>
                                    ) : (
                                      item.category && (
                                        <p className="text-muted mt-2"><b>{item.category}</b> are coming soon 🚀</p>
                                      )
                                    )}
                                  </div>

                                  {/* CHILD FORM / MESSAGE */}
                                  <div className="child-inputs">
                                    {item.category === "Vehicle" && item.subCategory ? (
                                      <VehicleDetailsForm index={index} item={item} handleDetailsChange={handleDetailsChange} errors={errors} />
                                    ) : (
                                      item.subCategory && (
                                        <p className="text-muted mt-2"> <b>coming soon 🚀</b></p>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))}

                              <button type="button" className={`${styles.btn} mb-3 addMoreBtn`} onClick={addItem}> + Add Item </button>
                              <div className={`${styles.footerSepertor} mt-3 ${styles.mb4}`}></div>
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
                                <p>
                                  Please review your business and rental item details below. If everything
                                  looks good, hit Submit to publish your listing.
                                </p>

                                {/* Business Info */}
                                <div className={`card ${styles.mb3} bg-transparent`}>
                                  <div className="card-body">
                                    <h5 className="card-title">{formData.businessName || "N/A"}</h5>
                                    <p className="card-text">
                                      <strong>Contact Person:</strong> {formData.contactPerson || "N/A"}<br />
                                      <strong>Phone:</strong> {formData.whatsappNumber || "N/A"}<br />
                                      <strong>GST:</strong> {formData.gstNumber || "N/A"}<br />
                                      <strong>Delivery:</strong> {formData.deliveryAvailable || "N/A"}<br />
                                      <strong>Address:</strong> {formData.streetAddress || "N/A"},{" "}
                                      {formData.landmark || "N/A"},{" "}
                                      {formData.city || "N/A"},{" "}
                                      {formData.state || "N/A"} - {formData.pinCode || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                {/* Rental Items */}
                                {formData.items?.map((item, idx) => (
                                  <div key={idx} className={`card ${styles.mb3} bg-transparent`}>
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {item.details?.item_name || "N/A"}
                                      </h5>
                                      <p className="card-text">
                                        <strong>Category:</strong> {item.category || "N/A"}<br />
                                        <strong>Sub Category:</strong> {item.subCategory || "N/A"}<br />
                                        <strong>Description:</strong>{" "}
                                        {item.details?.vehicle_description || "N/A"}<br />
                                        <strong>Price/Day:</strong> ₹{item.details?.price_per_day || "N/A"}<br />
                                        <strong>Price/Week:</strong> ₹{item.details?.price_per_week || "N/A"}<br />
                                        <strong>Price/Month:</strong> ₹{item.details?.price_per_month || "N/A"}<br />
                                        <strong>Custom Day Price:</strong> ₹{item.details?.price_custom_day || "N/A"}<br />
                                        <strong>Security Deposit:</strong> ₹{item.details?.security_deposit || "N/A"}<br />
                                        <strong>Booking Terms:</strong> {item.details?.booking_terms || "N/A"}<br />
                                        <strong>Availability:</strong> {item.details?.availability_status || "N/A"}<br />
                                        <strong>Engine Type:</strong> {item.details?.engine_type || "N/A"}<br />
                                        <strong>Transmission:</strong> {item.details?.transmission_type || "N/A"}<br />
                                        <strong>Fuel Consumption:</strong> {item.details?.fuel_consumption || "N/A"}<br />
                                        <strong>Seating Capacity:</strong> {item.details?.seating_capacity || "N/A"}<br />
                                        <strong>Color:</strong> {item.details?.color || "N/A"}<br />
                                        <strong>Vehicle Age:</strong> {item.details?.vehicle_age || "N/A"}<br />
                                        <strong>Mileage:</strong> {item.details?.mileage || "N/A"}<br />
                                        <strong>Registration No:</strong> {item.details?.registration_number || "N/A"}<br />
                                        <strong>Insurance Validity:</strong> {item.details?.insurance_validity || "N/A"}<br />
                                        <strong>Vehicle Type:</strong> {item.details?.vehicle_type || "N/A"}<br />
                                        <strong>Rental Period:</strong> {item.details?.rental_period || "N/A"}<br />
                                        <strong>Condition:</strong> {item.details?.vehicle_condition || "N/A"}<br />
                                        <strong>Accessories:</strong> {item.details?.accessories || "N/A"}<br />
                                        <strong>Pickup Address:</strong> {item.details?.address_1 || "N/A"},{" "}
                                        {item.details?.landmark || "N/A"},{" "}
                                        {item.details?.city || "N/A"},{" "}
                                        {item.details?.item_state || "N/A"} - {item.details?.pincode || "N/A"}<br />
                                        <strong>Booking Instructions:</strong> {item.details?.booking_instructions || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Terms */}
                              <div className="form-check my-3">
                                <input className={styles.formCheckInput} type="checkbox" id="termsCheck" />
                                <label className={styles.formCheckLabel} htmlFor="termsCheck">
                                  I confirm that all the information provided is accurate and I agree to the{" "}
                                  <a href="#">Terms of Listing</a>
                                </label>
                              </div>

                              <div className={`${styles.footerSepertor} mt-3 ${styles.mb4}`}></div>
                              <div className={`${styles.dFlex} justify-content-between ${styles.gap2}`}>
                                <button type="button" className={`${styles.btn} ${styles.prevStep}`} onClick={() => goToStep(3)}>Back</button>
                                <button type="submit" className={`${styles.btn} ${styles.submitBtn}`} id="submitForm">Publish Listing</button>
                              </div>
                            </div>
                          )}


                                {/* Success Message */}
                                {/* <div id="successMessage" className="alert alert-success mt-4">
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

  {/* External Scripts */}
  <Script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    strategy="beforeInteractive"
  />
  <Script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    strategy="afterInteractive"
  />
  <Script
    src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
    strategy="afterInteractive"
  />
  <Script
    src="https://webcarelogics.com/lokesh/assets/js/script.js"
    strategy="afterInteractive"
  />
</div>
  );
}