"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryStep() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/user/getallactivecategory")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleNext = () => {
    if (!selected) return alert("Please select a category");
    router.push(`/host/onboarding/vehicle/subcategories?parent=${selected}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Select a Category</h2>
      {categories.map((cat) => (
        <div key={cat.id}>
          <label>
            <input
              type="radio"
              name="category"
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
