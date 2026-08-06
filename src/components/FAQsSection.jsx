import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { API_URL } from "../utils/apiUrl";

const FAQsSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // fisrt index 0 remain open by default  
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/faqs`)
      .then((res) => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  const toggleFaq = (index) => {
    // if alrady open the close it, otherwise open the closed one
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (faqs.length === 0)
    return <p className="text-center py-10">No FAQs found.</p>;

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        {/* Left side - Questions */}
        <div className="faq-right">
          <img src="/faq-img.jpg" alt="Our team at work" />
        </div>
        {/* Right side - Image */}
        <div className="faq-left">
          <h2>
            Frequently Asked <span className="highlight">Questions</span>
          </h2>
          <p className="faq-subtext">
            Got questions? We've got answers. Here are some of the most common
            things our clients ask us.
          </p>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq._id}
                  className={`faq-item ${isOpen ? "faq-active" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className={`faq-icon ${isOpen ? "rotated" : ""}`}>
                      <FaPlus />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
