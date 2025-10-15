"use client";
import styles from './vehicles.module.css';
import HeroSection from '../../globalComponents/heroSection';
import AboutUs from '../../globalComponents/aboutUs';
import FAQSection from './faqSection';
import InnerServices from '../../globalComponents/innerServices';
import LatestArtical from '../../globalComponents/latestArticle';
import Testimonials from '../../globalComponents/testimonials';
import TestimonialsNew from '../../globalComponents/testimonialsNew';
import WhyChooseUs from '../../globalComponents/whyChooseUs';
import NeedHelp from '../../globalComponents/needHelp';
import ReadyToRide from '../../globalComponents/readyToRide';

export default function Vechicles() {

    return (
        <>
            <div className="container-fluid">

                {/* Hero section */}
                <HeroSection />

                {/* Innser services section */}
                <InnerServices />

                {/* FAQ section component */}
                <FAQSection cate_id={1} />

                {/* about us component */}
                <AboutUs/>

                {/* Testimonial component */}
                <Testimonials/>
                
                {/* TestimonialNew component */}
                <TestimonialsNew/>
                
                
                {/* latest artical component */}
                <LatestArtical cate_id={1} />
                
                {/* why choose us component */}
                <WhyChooseUs/>

                {/* ready to ride component */}
                <ReadyToRide/>
                
                {/* need help component */}
                <NeedHelp/>

            </div>
        </>
    );

}