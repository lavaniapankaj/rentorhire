"use client";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const router = useRouter();

  const handleFinish = () => {
    alert("Vehicle submitted successfully!");
    router.push("/dashboard"); // or any success page
  };

  return (
    <div>
      <h2>Review & Publish</h2>
      <p>Check your details and confirm.</p>
      <button onClick={handleFinish} style={{ marginTop: 20 }}>
        Finish
      </button>
    </div>
  );
}
