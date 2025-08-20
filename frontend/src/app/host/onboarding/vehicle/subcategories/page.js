"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SubCategoryStep() {
  const [subCategories, setSubCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const parentId = searchParams.get("parent");

  useEffect(() => {
    if (!parentId) return;

    fetch("http://localhost:8080/user/getallactivechildcategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parent_category_id: parentId }),
    })
      .then((res) => res.json())
      .then((data) => setSubCategories(data));
  }, [parentId]);

  const handleNext = () => {
    if (!selected) {
      alert("Please select a subcategory");
      return;
    }
    router.push(`/host/onboarding/vehicle/brands?subcategory=${selected}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Select a Subcategory</h2>
      {subCategories.length === 0 && <p>No subcategories found</p>}

      {subCategories.map((cat) => (
        <div key={cat.id}>
          <label>
            <input
              type="radio"
              name="subcategory"
              value={cat.id}
              onChange={() => setSelected(cat.id)}
            />
            {cat.name}
          </label>
        </div>
      ))}

      <button onClick={handleNext} style={{ marginTop: 20 }}>
        Next →
      </button>
    </div>
  );
}
