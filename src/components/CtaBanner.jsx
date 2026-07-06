import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const CtaBanner = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-35%", "35%"]);

  return (
    <section ref={ref} className="cta-section">
      <motion.div
        
      />

      <div className="cta-overlay"></div>

      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2>
          Ready to Build Something <span className="highlight">Amazing?</span>
        </h2>
        <p>
          Let's turn your idea into a fully working digital product that truly
          stands out. Our team is ready to help you design, develop, and launch
          with confidence, every step of the way.
        </p>
        <Link to={'/contact'}><button className="btn-primary">Get Free Quote</button></Link>
      </motion.div>
    </section>
  );
};

export default CtaBanner;
