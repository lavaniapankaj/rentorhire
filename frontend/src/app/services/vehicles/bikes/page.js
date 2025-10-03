"use client";

import { Suspense } from "react";
import Vehiclesbikes from "./Vehiclesbikes";
import FAQSection from '../../../services/vehicles/bikes/components/faqSection';
import Testimonials from '../../../globalComponents/testimonials';
import AboutUs from "../../../globalComponents/aboutUs";
import LatestArtical from '../../../globalComponents/latestArticle';
import ReadyToRide from '../../../services/vehicles/bikes/components/readyToRide';
import WhyChooseUs from '../../../globalComponents/whyChooseUs';
import NeedHelp from '../../../globalComponents/needHelp';

export default function BikesPage() {
  return (
    <>

      {/* Hero Section and Product Listing */}
      <Suspense >
        <Vehiclesbikes />
      </Suspense>

      {/* FAQ section component */}
      <FAQSection />

      {/* Testimonial component */}
      <Testimonials />

      {/* about us component */}
      <AboutUs />

      {/* latest artical component */}
      <LatestArtical />


      {/* why choose us component */}
      <WhyChooseUs />

      {/* need help component */}
      <NeedHelp />

      {/* ready to ride component */}
      <ReadyToRide />

    </>
  );
}