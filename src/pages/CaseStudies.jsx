import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import {BsFillTrophyFill} from 'react-icons/bs'
import { IoIosArrowRoundForward } from "react-icons/io";


// Case studies data
const caseStudies = [
  {
    id: 1,
    category: "Branding",
    title: "Brand Identity Redesign for TechCorp",
    desc: "Complete brand overhaul that increased recognition by 40% within 3 months.",
    image: "/portfolio/hero-banner.jpg",
    result: "40% brand recognition increase",
  },
  {
    id: 2,
    category: "Web Development",
    title: "E-Commerce Platform for Fashion House",
    desc: "Built a scalable MERN stack solution that tripled online sales.",
    image: "/portfolio/portfolio-2.jpg",
    result: "3x sales increase",
  },
  {
    id: 3,
    category: "UI/UX Design",
    title: "Mobile App UI for HealthTech Startup",
    desc: "User-centered design that achieved 4.8 stars on the App Store.",
    image: "/portfolio/portfolio-3.jpg",
    result: "4.8★ App Store rating",
  },
  {
    id: 4,
    category: "Digital Marketing",
    title: "Social Media Campaign for Retail Brand",
    desc: "Multi-platform campaign that delivered 5x return on ad spend.",
    image: "/portfolio/portfolio-4.jpg",
    result: "5x ROAS",
  },
  {
    id: 5,
    category: "Branding",
    title: "Logo & Brand Kit for Tech Startup",
    desc: "Minimalist logo design with complete brand guidelines delivered in one week.",
    image: "/portfolio/portfolio-5.jpg",
    result: "100% client satisfaction",
  },
  {
    id: 6,
    category: "3D Modeling",
    title: "3D Product Visualization for Manufacturing Co.",
    desc: "Photorealistic renders that saved 70% on photography costs.",
    image: "/portfolio/portfolio-6.jpg",
    result: "70% cost savings",
  },
];

// Filter categories
const filters = [
  "All",
  "Branding",
  "Web Development",
  "UI/UX Design",
  "Digital Marketing",
  "3D Modeling",
];

export default function CaseStudies() {
  const navigate = useNavigate();

  // Active filter track karo
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter logic — All selected ho to sab dikhao, warna category match karo
  const filtered =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeFilter);

  return (
    <div>
      <Navbar2 />

      <section className="cs-section">
        {/* Heading */}
        <div className="cs-heading-wrapper" data-aos="fade-up">
          <h2 className="cs-heading">
            Case <span className="text-red-500">Studies</span>
          </h2>
          <p className="cs-para">
            Real projects, real results — explore how we've helped businesses
            grow.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="cs-filters" data-aos="fade-up">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`cs-filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="cs-grid">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="cs-card"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              onClick={() => navigate(`/case-studies/${item.id}`)}
            >
              <div className="cs-card-img-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cs-card-img"
                />
                <div className="cs-card-overlay">
                  <span className="cs-card-category">{item.category}</span>
                  <h3 className="cs-card-title">{item.title}</h3>
                  <p className="cs-card-desc">{item.desc}</p>
                  <div className="cs-card-footer">
                    <span className="cs-card-result flex items-center gap-2"><BsFillTrophyFill className="text-amber-500" />{item.result}</span>
                    <span className="cs-view-btn">View case <IoIosArrowRoundForward size={21} /></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
