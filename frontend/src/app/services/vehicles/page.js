"use client";
import styles from './vehicles.module.css';
import HeroSection from '../../globalComponents/heroSection';
import AboutUs from '../../globalComponents/aboutUs';
import FAQSection from '../../globalComponents/faqSection';
import InnerServices from '../../globalComponents/innerServices';
import LatestArtical from '../../globalComponents/latestArticle';
import Testimonials from '../../globalComponents/testimonials';
import WhyChooseUs from '../../globalComponents/whyChooseUs';
import NeedHelp from '../../globalComponents/needHelp';

export default function Vechicles() {

    return (
        <>
        <div class="container-fluid">

            {/* Hero section */}
            <HeroSection />

            {/* Innser services section */}
            <InnerServices />

            {/* FAQ section component */}
            <FAQSection />

            {/* about us component */}
            <AboutUs/>

            {/* latest artical component */}
            <LatestArtical/>
            
            {/* Testimonial component */}
            <Testimonials/>
            
            {/* why choose us component */}
            <WhyChooseUs/>
            
            {/* need help component */}
            <NeedHelp/>

        </div>
        </>
    );

}