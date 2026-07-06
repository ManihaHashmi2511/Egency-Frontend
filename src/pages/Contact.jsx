import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import WorldMap from "../components/WorldMap";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

const stats = [
  { number: "500+", label: "Projects Done" },
  { number: "10K+", label: "Satisfied Clients" },
  { number: "15+", label: "Services" },
  { number: "98%", label: "Growth Rate" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <Navbar2 />
      <div className="contact-page">
        {/* ===== Top Section - Info + Form ===== */}
        <section className="contact-top">
          <div className="contact-top-inner">
            {/* Left - Contact Info */}
            <div className="contact-info" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
              <p className="contact-tag">GET IN TOUCH</p>
              <h2>
                Let's Work <span className="highlight">Together</span>
              </h2>
              <p className="contact-intro">
                Have a project in mind? We'd love to hear about it. Send us a
                message and we'll get back to you as soon as possible.
              </p>

              <div className="info-bento">
                <div className="info-bento-card">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <h4>Email Address</h4>
                  <p>hello@egencydigital.com</p>
                  <p>support@egencydigital.com</p>
                </div>

                <div className="info-bento-card">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <h4>Office Location</h4>
                  <p>123 Business Bay, Lahore, Pakistan</p>
                </div>

                <div className="info-bento-card">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <h4>Working Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat - Sun: Closed</p>
                </div>

                <div className="info-bento-card">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <h4>Phone Number</h4>
                  <p>+92 300 1234567</p>
                  <p>+92 321 7654321</p>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="contact-form-wrapper" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
              <h3>Send us a Message</h3>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary contact-submit-btn"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ===== Bottom Section - Map ===== */}
        <WorldMap />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
