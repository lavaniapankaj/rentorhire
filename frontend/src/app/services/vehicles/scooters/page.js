"use client";

import { Suspense } from "react";
import Vehiclesscooters from "./Vehiclesscooters";
import FAQSection from '../../../services/vehicles/scooters/components/faqSection';
import Testimonials from '../../../globalComponents/testimonials';
import AboutUs from "../../../globalComponents/aboutUs";
import LatestArtical from '../../../globalComponents/latestArticle';
import ReadyToRide from '../../../services/vehicles/scooters/components/readyToRide';
import WhyChooseUs from '../../../globalComponents/whyChooseUs';
import NeedHelp from '../../../globalComponents/needHelp';

export default function BikesPage() {
  return (
    <>

      {/* Hero Section and Product Listing */}
      <Suspense >
        <Vehiclesscooters />
      </Suspense>


      {/* FAQ section component */}
      <FAQSection cate_id={8} />

      {/* Testimonial component */}
      <Testimonials />

      {/* about us component */}
      <AboutUs />

      {/* why choose us component */}
      <WhyChooseUs />

      {/* ready to ride component */}
      <ReadyToRide />

      {/* latest artical component */}
      <LatestArtical cate_id={8} />


      {/* need help component */}
      <NeedHelp />

    </>
  );
}