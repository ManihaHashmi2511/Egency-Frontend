import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

// Star rating
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
  // Static array hata di, ab API se aayega data
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/testimonials")
      .then((res) => {
        setTestimonials(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching testimonials:", err);
        setLoading(false);
      });
  }, []);

  // Jab tak data aa raha hai
  if (loading) return <p className="text-center py-10">Loading...</p>;

  // Agar database mein koi data nahi
  if (testimonials.length === 0)
    return <p className="text-center py-10">No testimonials found.</p>;

  return (
    <section className="testi-section">
      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="testi-heading">
          What <span className="text-[#e0141e]">Our Clients</span> Says About
          Us?
        </h2>
      </div>

      {/* Mobile Arrows — sirf small screen par */}
      <div className="testi-arrows-mobile">
        <button className="testi-arrow testi-prev">
          <FaArrowLeft />
        </button>
        <button className="testi-arrow testi-next">
          <FaArrowRight />
        </button>
      </div>

      {/* Swiper Slider */}
      <div className="testi-wrapper">
        {/* Desktop Arrows — sirf large screen par */}
        <button className="testi-arrow testi-prev testi-arrow-desktop">
          <FaArrowLeft />
        </button>

        <Swiper
          key={testimonials.length}
          modules={[Autoplay, Navigation]}
          slidesPerView={1.4}
          spaceBetween={20}
          loop={testimonials.length > 1}
          initialSlide={0}
          speed={1000}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".testi-prev",
            nextEl: ".testi-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1.1, centeredSlides: true },
            768: { slidesPerView: 1.3, centeredSlides: true },
            1024: { slidesPerView: 1.4, centeredSlides: true },
          }}
          observer={true}
          observeParents={true}
          className="testi-swiper"
        >
          {testimonials.map((t) => (
            // MongoDB ka _id use kar rahe hain key mein
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

        {/* Desktop Arrows — sirf large screen par */}
        <button className="testi-arrow testi-next testi-arrow-desktop">
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
