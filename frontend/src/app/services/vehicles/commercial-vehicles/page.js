"use client";

import { Suspense } from "react";
import Vehiclescommercial from "./Vehiclescommercial";

export default function CommercialPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading Commercial Vehicles...</p>}>
      <Vehiclescommercial />
    </Suspense>
  );
}