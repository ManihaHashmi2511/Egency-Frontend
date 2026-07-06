import React, { useEffect } from "react";
import Navbar2 from "../components/Navbar2";
import ServicesSlider from "../pages/ServicesSlider"
import Footer from "../components/Footer";
import ProcessFlow from "../components/ProcessFlow";
import FAQsSection from "../components/FAQsSection";
import CtaBanner from "../components/CtaBanner";
import TechStack from "../components/TechStack";
import { useLocation } from "react-router-dom";

export default function Services() {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div>
      <Navbar2 />

      {/* Banner */}
      {/* <section className="hero-banner-wrapper relative h-57.5 flex items-center justify-center bg-[#1a0505] overflow-hidden">
        <div className="hero-banner-bg"></div>

        <div className="absolute inset-0 bg-[rgba(185,114,117,0.4)]"></div>

        <h1
          className="hero-banner-title relative z-10 text-white text-[36px] font-bold tracking-wide uppercase"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          OUR SERVICES
        </h1>
      </section> */}

        {/* Services Slider  Light */}
      <ServicesSlider  />

      {/* Process Flow  dark*/}
      <ProcessFlow/>

      {/* Technology Stacks image dark */}
      <TechStack/>

       {/* FAQs Section  light*/}
      <FAQsSection/>

      {/* CTA Banner image */}
      <CtaBanner/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
