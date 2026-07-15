import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { API_URL } from "../utils/apiUrl";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      {[1, 2, 3, 4].map((s) => (
        <FaStar key={s} className="text-yellow-400" size={16} />
      ))}
      <FaStarHalfAlt className="text-yellow-400" size={16} />
      <span className="text-gray-400 text-xs ml-1">({rating})</span>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBeginning, setIsBeginning] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/testimonials`)
      .then((res) => {
        setTestimonials(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (testimonials.length === 0)
    return <p className="text-center py-10">No testimonials found.</p>;

  return (
    <section className="testi-section">

      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="testi-heading">
          What <span className="text-[#e0141e]">Our Clients</span> Says About Us?
        </h2>
      </div>

      {/* Mobile Arrows */}
      <div className="testi-arrows-mobile">
        <button
          className="testi-arrow"
          style={{ visibility: isBeginning ? "hidden" : "visible" }}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaArrowLeft />
        </button>
        <button
          className="testi-arrow"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Swiper Wrapper */}
      <div className="testi-wrapper">

        {/* Desktop Left Arrow */}
        <button
          className="testi-arrow testi-arrow-desktop"
          style={{ visibility: isBeginning ? "hidden" : "visible" }}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaArrowLeft />
        </button>

        <Swiper
          key={testimonials.length}
          modules={[Autoplay]}
          centeredSlides={true}
          slidesPerView={1.4}
          spaceBetween={20}
          loop={false}
          speed={800}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          slideToClickedSlide={false}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            768: { slidesPerView: 1.3 },
            1024: { slidesPerView: 1.4 },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setIsBeginning(swiper.isBeginning)}
          className={`testi-swiper ${isBeginning ? "is-beginning" : ""}`}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <div className="testi-card">
                <div className="testi-img-side">
                  <img src={t.image} alt={t.name} className="testi-img" />
                </div>
                <div className="testi-content-side">
                  <h4 className="testi-name">{t.name}</h4>
                  <p className="testi-country">{t.country}</p>
                  <Stars rating={t.rating} />
                  <p className="testi-review">{t.review}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Desktop Right Arrow */}
        <button
          className="testi-arrow testi-arrow-desktop"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaArrowRight />
        </button>

      </div>
    </section>
  );
}