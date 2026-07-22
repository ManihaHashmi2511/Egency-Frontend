import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { industries } from "../utils/industries";

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

        <div className="ind-grid">
          {industries.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.slug}
                className="ind-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariant}
                whileHover={{ y: -5 }}
              >
                <Link to={`/industries/${item.slug}`} className="ind-card-link">
                  <div className="ind-icon">
                    <Icon />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

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