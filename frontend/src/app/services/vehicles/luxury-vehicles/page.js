"use client";

import { Suspense } from "react";
import Vehiclesluxury from "./Vehiclesluxury";

export default function LuxuryPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading luxury vehicles...</p>}>
      <Vehiclesluxury />
    </Suspense>
  );
}