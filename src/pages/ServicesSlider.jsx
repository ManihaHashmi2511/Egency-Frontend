import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { API_URL } from "../utils/apiUrl";

const ServicesSlider = ({ bgColor = "#111111" }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [step, setStep] = useState(0); 

  const trackRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/services`)
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updateCards = () => {
      setCardsToShow(window.innerWidth <= 768 ? 1 : 3);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  useEffect(() => {
    const measureStep = () => {
      if (trackRef.current && trackRef.current.children.length > 1) {
        const firstCard = trackRef.current.children[0];
        const secondCard = trackRef.current.children[1];
        const gapPx = secondCard.offsetLeft - firstCard.offsetLeft;
        setStep(gapPx);
      }
    };
    // thoda delay taaki images/layout settle ho jaye
    const timer = setTimeout(measureStep, 50);
    window.addEventListener("resize", measureStep);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measureStep);
    };
  }, [services, cardsToShow]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (services.length === 0)
    return <p className="text-center py-10">No services found.</p>;

  const maxIndex = Math.max(services.length - cardsToShow, 0);

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
          ref={trackRef}
          style={{
            transform: `translateX(-${index * step}px)`,
          }}
        >
          {services.map((service, i) => {
            const isActive = i === index + 1;

            return (
              <div
                key={service._id}
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