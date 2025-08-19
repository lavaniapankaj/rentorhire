"use client";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/host/onboarding/vehicle/details");
  };

  return (
    <div>
      <h2>Select Category</h2>
      <p>For now, only Vehicle is supported.</p>
      <button onClick={handleNext} style={{ marginTop: 20 }}>
        Next
      </button>
    </div>
  );
}
