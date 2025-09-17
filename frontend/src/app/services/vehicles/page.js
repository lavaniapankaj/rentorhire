"use client";
import styles from './vehicles.module.css';
import HeroSection from '../../globalComponents/heroSection';
import AboutUs from '../../globalComponents/aboutUs';
import FAQSection from '../../globalComponents/faqSection';
import InnerServices from '../../globalComponents/innerServices';
import LatestArtical from '../../globalComponents/latestArticle';

export default function Vechicles() {

    return (
        <>
        <div class="container-fluid">

            {/* Innser services section */}
            <InnerServices />

            {/* FAQ section component */}
            <FAQSection />

            {/* about us component */}
            <AboutUs/>

            {/* Testimonial component */}
            <LatestArtical/>

        </div>
        </>
    );

}