"use client";
import { useRouter } from "next/navigation";

export default function DetailsPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/host/onboarding/vehicle/location");
  };

  return (
    <div>
      <h2>Vehicle Details</h2>
      <p>Enter your vehicle info (make, model, year, etc).</p>
      <button onClick={handleNext} style={{ marginTop: 20 }}>
        Next
      </button>
    </div>
  );
}
