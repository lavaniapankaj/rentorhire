"use client";

import { Suspense } from "react";
import Vehiclesbikes from "./Vehiclesbikes";

export default function BikesPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading bikes...</p>}>
      <Vehiclesbikes />
    </Suspense>
  );
}