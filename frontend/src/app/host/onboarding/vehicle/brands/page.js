"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BrandsStep() {
  const [brands, setBrands] = useState([]);
  const [selected, setSelected] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const subCategoryId = searchParams.get("subcategory");

  useEffect(() => {
    if (!subCategoryId) return;

    fetch("http://localhost:8080/user/getallchildcategorybrands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ child_category_id: subCategoryId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBrands(data);
        } else {
          setBrands([]); 
        }
      })
      .catch((err) => console.error("Error fetching brands:", err));
  }, [subCategoryId]);

  const handleNext = () => {
    if (!selected) {
      alert("Please select a brand");
      return;
    }
    /** Push to the next step with the selected brand */
    // router.push(`/host/onboarding/vehicle/model?brand=${selected}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Select a Brand</h2>
      {brands.length === 0 && <p>No brands found</p>}

      {brands.map((brand) => (
        <div key={brand.id}>
          <label>
            <input
              type="radio"
              name="brand"
              value={brand.id}
              onChange={() => setSelected(brand.id)}
            />
            {brand.brand_name}
          </label>
        </div>
      ))}

      <button onClick={handleNext} style={{ marginTop: 20 }}>
        Next →
      </button>
    </div>
  );
}
