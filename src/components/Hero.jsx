import { useEffect } from "react";
import { typewriter } from "../utils/typewriter";
import { Link } from "react-router-dom";

export default function Hero() {
  useEffect(() => {
    typewriter(".heading-typing", ["Egency Digital", "Egency Digital"], 200);
  }, []);

  return (
    <div>
      <section className="relative w-full h-164 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/hero-bg-vid.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex hero-content flex-col justify-end px-6 max-w-7xl mx-auto pb-12"
      
        >
          {/* Heading */}
          <h1 className="hero-heading" data-aos="fade-down" data-aos-delay="100">
            WE ARE <span className="text-[#E50913] heading-typing"></span>
          </h1>

          {/* Paragraph */}
          <p className="hero-para" data-aos="fade-right" data-aos-delay="200" >
            We don't just create digital experiences — We craft immersive brand
            journeys that captivate audiences and drive real business results.
            Our team of passionate innovators combines cutting-edge technology
            with stunning design to elevate your brand above the competition.
          </p>

          {/* Button */}
          <div>
            <Link to={'/contact'}><button className="btn-primary">Get in Touch</button></Link>
          </div>

          {/* Featured In */}
          <div className="mt-10 mb-10" data-aos="fade-up" data-aos-delay="300">
            <p className="featured-label">Featured In:</p>
            <div className="featured-brands-row">
              <span className="featured-brand-text">Behance</span>
              <span className="featured-brand-text">Google</span>
            </div>
             <div className="featured-brands-row">
              <span className="featured-brand-text">Facebook</span>
              <span className="featured-brand-text">Behance</span>
            </div>
          </div>
        </div>
      </section>
      {/* Logos Carousel */}
      <section className="logos-carousel-wrapper">
        <div className="logos-track">
          {/* Teen baar repeat karo */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 space-x-12 ">
              <img
                src="/logos/google-logo.png"
                alt="Google"
                className="carousel-logo"
              />
              <img
                src="/logos/behance-logo2.png"
                alt="Behance"
                className="carousel-logo h-4"
              />
              <img
                src="/logos/fb-logo2.png"
                alt="Facebook"
                className="carousel-logo"
              />
              <img
                src="/logos/dribbble-logo.png"
                alt="Dribbble"
                className="carousel-logo"
              />
              <img
                src="/logos/craft-logo.png"
                alt="Craft"
                className="carousel-logo"
              />
              <img
                src="/logos/invision-logo.png"
                alt="InVision"
                className="carousel-logo"
              />
              <img
                src="/logos/sketch-logo.png"
                alt="Sketch"
                className="carousel-logo"
              />
              <img
                src="/logos/figma-logo.png"
                alt="Figma"
                className="carousel-logo"
              />
              <img
                src="/logos/adobe-logo.png"
                alt="Adobe"
                className="carousel-logo"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
