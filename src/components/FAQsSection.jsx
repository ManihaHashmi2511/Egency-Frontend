import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const faqs = [
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines depend on scope and complexity, but most projects take between 4 to 8 weeks from discovery to launch. We always share a clear timeline before starting work.",
  },
  {
    question: "Do you provide support after the project is launched?",
    answer:
      "Yes, we offer ongoing support and maintenance packages after launch to ensure your website or application continues to run smoothly and stays up to date.",
  },
  {
    question: "Can you work with our existing brand guidelines?",
    answer:
      "Absolutely. We can work within your existing brand identity, or help you build a new one from scratch if you don't have one yet.",
  },
  
  {
    question: "How do we get started working together?",
    answer:
      "Simply reach out through our contact form or book a call. We'll discuss your goals, requirements, and timeline, then prepare a proposal tailored to your project.",
  },
];

const FAQsSection = () => {
  // Pehla FAQ (index 0) by default open rahega
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    // Agar already open hai to band kardo, warna usi ko open kardo
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        {/* Left side - Questions */}
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
                  key={index}
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

        {/* Right side - Image */}
        <div className="faq-right">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
            alt="Our team at work"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
