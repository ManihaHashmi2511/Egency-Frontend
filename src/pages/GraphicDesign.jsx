import React from "react";
import GraphicDesImgGrid from "../components/GraphicDesImgGrid";
import WhyHireUs from "../components/WhyHireUs";
import WhatWeDo from "../components/WhatWeDo";
import Portfolio from "./Portfolio";
import Footer from "../components/Footer";

export default function GraphicDesign() {
  return (
    <div>
      <Navbar2 />

      {/* Banner */}
      <section className="hero-banner-wrapper relative h-57.5 flex items-center justify-center bg-[#1a0505] overflow-hidden">
        <div className="hero-banner-bg"></div>

        {/* Red overlay */}
        <div className="absolute inset-0 bg-[rgba(185,114,117,0.4)]"></div>

        <h1
          className="hero-banner-title relative z-10 text-white text-[36px] font-bold tracking-[0.5px] uppercase"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          Graphic Designing
        </h1>
      </section>

      {/* Hero Text */}
      <section className="hero-text-wrapper text-center px-[6%] py-15">
        <h2 className="text-[45px] font-bold uppercase leading-[1.2] mb-6">
          Bring Your Vision to Life with Our <br />
          Stunning Designs.
        </h2>

        <p className="text-[#555555] text-[17px] max-w-200 mx-auto mb-8 leading-[1.75]">
          Our team of skilled graphic designers giving professional services and
          helping you learn the skills to elevate your own creativity and brand.
        </p>

        <button className="bg-[#e53935] text-white border-none px-10 py-3.5 rounded-lg text-[15px] font-bold cursor-pointer mb-7.5 overflow-hidden relative transition-all duration-300 hover:bg-[#c62828] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(229,57,53,0.4)]">
          Hire now!
        </button>
      </section>

      {/* Image Grid */}
      <GraphicDesImgGrid />

      {/* What is Graphic Designing */}
      <section className="what-is-gd-wrapper flex flex-row justify-between px-[6%] py-15.5 mt-8 items-center">
        <div className="what-is-gd-content w-[53%]">
          <h2 className="text-[30px] font-bold text-[#2e2e2e] uppercase mb-6 ">
            What is <span className="text-[#e53935]">Graphic Designing?</span>
          </h2>
          <p className="text-[#727171] text-[17px] leading-[1.85] mb-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi,
            atque iusto! Est voluptas sint magni iusto, debitis pariatur qui
            provident itaque nisi unde quibusdam eveniet esse, adipisci
            necessitatibus. Quis, aut. Eligendi quae ad quo iusto culpa magnam
            possimus, dolorum atque doloribus, ipsum eum ipsam dolor laudantium
            voluptates. Iusto repellat sunt, eius mollitia explicabo omnis vel
            eligendi modi doloremque itaque nulla.
          </p>
          <button className="btn-read bg-[#e53935] text-white border-none px-7.5 py-2.75 rounded-md text-[14px] font-semibold cursor-pointer">
            Read more
          </button>
        </div>

        <div className="what-is-gd-img what-is-gd-image-box w-[30%] rounded-[20px] overflow-hidden h-90 cursor-pointer mt-5 lg:mt-0 md:mt-0">
          <img
            src="/images/what-is-gd.jpg"
            alt="Graphic designer working"
            className=" w-full h-full object-cover"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
     </section>

     {/* Why Hire Us */}
     <WhyHireUs/>

     {/* What we do */}
     <WhatWeDo/>

     <Portfolio/>

     <Footer/>

    </div>
  );
}
