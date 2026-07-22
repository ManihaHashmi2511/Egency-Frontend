import { useState, useEffect } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <img
            src="/company_logo2.png"
            alt="Egency Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>
        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link to="/about" className="nav-link">
              About us
            </Link>
          </li>
          <li>
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li>
            <Link to="/case-studies" className="nav-link">
              Case Studies
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/+923250525254"
            target="_blank"
            rel="noreferrer"
          >
            <button className="flex items-center gap-1.5 border border-[#D80712] cursor-pointer font-semibold text-[#f84b54] px-3.5 py-1.5 rounded-[10px] transition-all duration-300">
              <FaWhatsapp size={20} /> WhatsApp
            </button>
          </a>
          <a href="mailto:info@egencydigital.com">
            <button className="bg-[#D80712] flex items-center gap-1.5 cursor-pointer  hover:bg-[#cc0a13] text-white px-6 py-1.5 rounded-[10px] transition-all duration-300">
              <FaEnvelope size={18} /> Email Us
            </button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div
          className={`hamburger md:hidden ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={{ background: "#fff" }}></span>
          <span style={{ background: "#fff" }}></span>
          <span style={{ background: "#fff" }}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu md:hidden bg-black/90 px-6 ${menuOpen ? "open py-4" : ""} flex flex-col gap-4`}
      >
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/services" className="nav-link">
          Services
        </Link>
        <Link to="/case-studies" className="nav-link">
          Case Studies
        </Link>
        <Link to="/contact" className="nav-link">
          Contact us
        </Link>
        <div className="flex gap-3 mt-2">
          <button
            className="text-[#f70c17] border border-[#D80712] flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px]  w-full"
          >
            <FaWhatsapp size={18} /> WhatsApp
          </button>
          <button
            className="bg-[#D80712] hover:bg-[#cc0a13] text-white flex rounded-[10px] px-3.5 py-1.5 items-center gap-1.5 w-full"
          >
            <FaEnvelope size={17} /> Email Us
          </button>
        </div>
      </div>
    </nav>
  );
}
