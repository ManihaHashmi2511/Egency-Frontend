import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import WorldMap from "../components/WorldMap";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { API_URL } from "../utils/apiUrl";

// Common fake/placeholder domains - reject these fake emails.
const FAKE_EMAIL_DOMAINS = [
  "test.com",
  "example.com",
  "fake.com",
  "sample.com",
  "mailinator.com",
  "yopmail.com",
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "10minutemail.com",
  "trashmail.com",
  "test.test",
  "email.com",
  "domain.com",
];

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Please enter a valid email address";

  const domain = email.split("@")[1]?.toLowerCase();
  if (FAKE_EMAIL_DOMAINS.includes(domain)) {
    return "Please use a valid email address";
  }
  return "";
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email" && errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value || "" });
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const phoneError = !formData.phone
      ? "Phone number is required"
      : !isValidPhoneNumber(formData.phone)
        ? "Please enter a valid phone number for the selected country"
        : "";

    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    axios
      .post(`${API_URL}/contact`, formData)
      .then((res) => {
        setStatus({
          type: "success",
          message: res.data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSubmitting(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setStatus({
          type: "error",
          message:
            err.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  return (
    <div>
      <Navbar2 />
      <div className="contact-page">
        <section className="contact-top">
          <div className="contact-top-inner">
            <div
              className="contact-info"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
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
                  <p>info@egencydigital.com</p>
                  <p>egencydigitalinfo@gmail.com</p>
                </div>

                <div className="info-bento-card">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <h4>Office Location</h4>
                  <p>Jinnah Colony, Faisalabad, Pakistan</p>
                </div>

                <div className="info-bento-card">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <h4>Working Hours</h4>
                  <p>Mon - Fri: 10:00 AM - 5:00 PM</p>
                  <p>Sat - Sun: Closed</p>
                </div>

                <div className="info-bento-card">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <h4>Phone Number</h4>
                  <p>+92 325 0525254</p>
                </div>
              </div>
            </div>

            <div
              className="contact-form-wrapper"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <h3>Send us a Message</h3>

              {status.message && (
                <p
                  className={
                    status.type === "success"
                      ? "form-status-success"
                      : "form-status-error"
                  }
                >
                  {status.message}
                </p>
              )}

              <form onSubmit={handleSubmit} className="contact-form" noValidate>
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
                    {errors.email && (
                      <p className="field-error">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <PhoneInput
                    international
                    defaultCountry="PK"
                    limitMaxLength
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="300 1234567"
                    className="custom-phone-input"
                  />
                  {errors.phone && (
                    <p className="field-error">{errors.phone}</p>
                  )}
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
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <WorldMap />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
