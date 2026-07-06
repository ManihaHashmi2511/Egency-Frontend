import { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const services = [
  {
    title: "UI/UX Design",
    desc: "Crafting intuitive, beautiful interfaces that users genuinely love to use and engage with every single day.",
    image: "/services/ui-ux.jpg",
  },
  {
    title: "Web Development",
    desc: "Building fast, secure, and scalable websites that perform smoothly across all devices and platforms.",
    image: "/services/web-dev.jpg",
  },
  {
    title: "Graphic Designing",
    desc: "Designing creative visuals, logos, and brand assets that capture attention and leave a lasting impression.",
    image: "/services/graphic-design.jpg",
  },
  {
    title: "Digital Marketing",
    desc: "Data-driven strategies designed to grow your audience, boost engagement, and increase overall conversions.",
    image: "/services/digital-markiting.jpg",
  },
  {
    title: "Branding & Designing",
    desc: "Creating memorable brand visuals and identities that truly resonate with your target audience.",
    image: "/services/brand-design.jpg",
  },
  {
    title: "Content Creation",
    desc: "Producing engaging multimedia content that powers and elevates your digital marketing channels.",
    image: "/services/content-create.jpg",
  },
  {
    title: "Video Editing & Animations",
    desc: "Leveraging high-quality video content to tell your brand's story and boost conversions.",
    image: "/services/vid-editing.jpg",
  },
  {
    title: "3D Modeling",
    desc: "Converting your creative ideas into stunning, tangible visual assets and detailed product renders.",
    image: "/services/3d-model.jpg",
  },
  {
    title: "Social Media Automation",
    desc: "Automating your content scheduling, posts, and performance insights for maximum efficiency.",
    image: "/services/social-med.jpg",
  },
  {
    title: "Influencer Marketing",
    desc: "Connecting your brand with the right creators to expand reach and build trust.",
    image: "/services/influencer-markit.jpg",
  },
];

const ServicesSlider = ({ bgColor = "#111111" }) => {
  const [index, setIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const updateCards = () => {
      setCardsToShow(window.innerWidth <= 768 ? 1 : 3);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const maxIndex = services.length - cardsToShow;
  const nextSlide = () => {
    setIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="services-section" style={{ background: bgColor }}>
      <div
        className="services-header"
        data-aos="fade-left"
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        {/* <h2 className="text-white text-[30px] font-medium" style={{ color: bgColor === "#f4f4f4" ? "#111" : "#ffffff" }}>
          <span className="highlight">Best services</span> for your business
        </h2> */}

        <div className="services-buttons">
          <button onClick={prevSlide} className="slider-btn">
            <FaArrowLeftLong />
          </button>
          <button onClick={nextSlide} className="slider-btn">
            <FaArrowRightLong />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        className="slider-container"
        data-aos="fade-in"
        data-aos-delay="300"
        data-aos-duration="1000"
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${index * (100 / cardsToShow)}%)`,
          }}
        >
          {services.map((service, i) => {
            const isActive = i === index + 1;

            return (
              <div
                key={i}
                className={`service-card ${isActive ? "active" : ""}`}
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="service-overlay">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
