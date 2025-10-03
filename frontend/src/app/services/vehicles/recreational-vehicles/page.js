"use client";

import { Suspense } from "react";
import Vehiclesrecreational from "./Vehiclesrecreational";

export default function RecreationalPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading recreational vehicles...</p>}>
      <Vehiclesrecreational />
    </Suspense>
  );
}