import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  FaShoppingCart,
  FaHeartbeat,
  FaGraduationCap,
  FaBuilding,
  FaUtensils,
  FaPlane,
  FaCar,
  FaFilm,
  FaLeaf,
  FaLaptopCode,
  FaBullhorn,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: <FaShoppingCart />,
    name: "E-Commerce & Retail",
    desc: "Scalable online stores and retail solutions that drive sales.",
  },
  {
    icon: <FaBuilding />,
    name: "Real Estate",
    desc: "Property listing platforms with modern UI and smart filters.",
  },
  {
    icon: <FaCar />,
    name: "Automotive",
    desc: "Dealer websites and digital marketing for automotive brands.",
  },
  {
    icon: <FaFilm />,
    name: "Media & Entertainment",
    desc: "Content platforms, portfolios, and media brand identities.",
  },
  {
    icon: <FaLeaf />,
    name: "Fashion & Lifestyle",
    desc: "Stunning visual identities and stores for fashion brands.",
  },
  {
    icon: <FaLaptopCode />,
    name: "Technology & SaaS",
    desc: "Product landing pages and dashboards for tech companies.",
  },
  {
    icon: <FaBullhorn />,
    name: "Marketing & Agencies",
    desc: "Websites and tools built specifically for creative agencies.",
  },
  {
    icon: <FaHome />,
    name: "Interior & Architecture",
    desc: "Portfolio sites and 3D visualization for design professionals.",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
};

const Industries = () => {
  return (
    <div>
      <Navbar2 />

      <section className="ind-section">

        {/* Heading */}
        <div className="ind-header">
          <p className="ind-tag">INDUSTRIES WE SERVE</p>
          <h1 className="ind-title">
            Built for Every <span className="highlight">Industry</span>
          </h1>
          <p className="ind-para">
            We've worked across a wide range of industries, delivering
            tailored digital solutions that fit each sector's unique needs.
          </p>
        </div>

        {/* Grid */}
        <div className="ind-grid">
          {industries.map((item, i) => (
            <motion.div
              key={i}
              className="ind-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariant}
              whileHover={{ y: -5 }}
            >
              <div className="ind-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="ind-cta">
          <h2>Don't see your industry?</h2>
          <p>We work with businesses of all types. Let's talk about your project.</p>
          <Link to="/contact" className="ind-cta-btn ">
          <button className="btn-primary"> Get in Touch →</button>
           
          </Link>
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default Industries;