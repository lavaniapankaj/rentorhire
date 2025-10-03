"use client";

import { Suspense } from "react";
import Vehiclesrecreational from "./Vehiclesrecreational";
import FAQSection from '../../../services/vehicles/recreational-vehicles/components/faqSection';
import Testimonials from '../../../globalComponents/testimonials';
import AboutUs from "../../../globalComponents/aboutUs";
import LatestArtical from '../../../globalComponents/latestArticle';
import ReadyToRide from '../../../services/vehicles/recreational-vehicles/components/readyToRide';
import WhyChooseUs from '../../../globalComponents/whyChooseUs';
import NeedHelp from '../../../globalComponents/needHelp';

export default function RecreationalPage() {
  return (
    <>

      {/* Hero Section and Product Listing */}
      <Suspense >
        <Vehiclesrecreational />
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