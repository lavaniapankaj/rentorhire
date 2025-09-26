"use client";

import { Suspense } from "react";
import Vehiclescars from "./Vehiclescars";

export default function CarsPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading cars...</p>}>
      <Vehiclescars />
    </Suspense>
  );
}
