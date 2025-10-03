"use client";

import { Suspense } from "react";
import Vehiclesluxury from "./Vehiclesluxury";
import FAQSection from '../../../services/vehicles/luxury-vehicles/components/faqSection';
import Testimonials from '../../../globalComponents/testimonials';
import AboutUs from "../../../globalComponents/aboutUs";
import LatestArtical from '../../../globalComponents/latestArticle';
import ReadyToRide from '../../../services/vehicles/luxury-vehicles/components/readyToRide';
import WhyChooseUs from '../../../globalComponents/whyChooseUs';
import NeedHelp from '../../../globalComponents/needHelp';

export default function LuxuryPage() {
  return (
    <>

      {/* Hero Section and Product Listing */}
      <Suspense>
        <Vehiclesluxury />
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