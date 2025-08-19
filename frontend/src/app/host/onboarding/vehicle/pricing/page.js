"use client";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/host/onboarding/vehicle/review");
  };

  return (
    <div>
      <h2>Pricing</h2>
      <p>Set the daily price and availability of your vehicle.</p>
      <button onClick={handleNext} style={{ marginTop: 20 }}>
        Next
      </button>
    </div>
  );
}
