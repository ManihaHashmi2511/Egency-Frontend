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


const testimonials = [
  {
    id: 1,
    name: "George Conway",
    country: "United States",
    rating: 4.5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    image: "/testimonials/Man-2.jpg",
  },
  {
    id: 4,
    name: "Sophia Shaffer",
    country: "United Kingdom",
    rating: 4.5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/testimonials/Woman-1.jpg",
  },
  {
    id: 2,
    name: "Mike Jason",
    country: "United States",
    rating: 4.5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "/testimonials/Man-1.jpg",
  },
  {
    id: 3,
    name: "Amelia Jane",
    country: "United States",
    rating: 4.5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    image: "/testimonials/Woman-3.jpg",
  },
  {
    id: 4,
    name: "Sarah Williams",
    country: "United Kingdom",
    rating: 4.5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "/testimonials/Woman-2.jpg",
  },
  {
    id: 5,
    name: "James Miller",
    country: "Australia",
    rating: 4.5,
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
    image: "/testimonials/Man-3.jpg",
  },
];

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
  return (
    <section className="testi-section">

      {/* Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="testi-heading">
          What <span className="text-[#e0141e]">Our Clients</span> Says About Us?
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
          modules={[Autoplay, Navigation]}
          slidesPerView={1.4}
          centeredSlides={true}
          spaceBetween={20}
          loop={true}
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
          className="testi-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
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