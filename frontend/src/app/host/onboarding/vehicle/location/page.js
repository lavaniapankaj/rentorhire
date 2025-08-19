"use client";
import { useRouter } from "next/navigation";

export default function LocationPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/host/onboarding/vehicle/pricing");
  };

  return (
    <div>
      <h2>Location</h2>
      <p>Set the pickup/drop-off location for the vehicle.</p>
      <button onClick={handleNext} style={{ marginTop: 20 }}>
        Next
      </button>
    </div>
  );
}
