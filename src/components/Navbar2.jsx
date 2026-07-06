import { useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  return (
    <nav className="navbar2">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-5">
        {/* Logo */}
        <Link to={"/"}>
          <img
            src="/egency_logo1.jpg"
            alt="Egency Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              to="/about"
              className={`nav-link2 ${location.pathname === "/about" ? "active" : ""}`}
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`nav-link2 ${location.pathname === "/services" ? "active" : ""}`}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/case-studies"
              className={`nav-link2 ${location.pathname === "/case-studies" ? "active" : ""}`}
            >
              Case Studies
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link2 ${location.pathname === "/contact" ? "active" : ""}`}
            >
              Contact us
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
          <span style={{ background: "#333" }}></span>
          <span style={{ background: "#333" }}></span>
          <span style={{ background: "#333" }}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu md:hidden bg-white px-6 ${menuOpen ? "open py-4" : ""} flex flex-col gap-4 shadow-md`}
      >
        <a
          href="/about"
          className={`nav-link2 ${location.pathname === "/about" ? "active" : ""}`}
        >
          About us
        </a>
        <a
          href="/services"
          className={`nav-link2 ${location.pathname === "/services" ? "active" : ""}`}
        >
          Services
        </a>
        <a
          href="/case-studies"
          className={`nav-link2 ${location.pathname === "/case-studies" ? "active" : ""}`}
        >
          Case Studies
        </a>
        <a
          href="/contact"
          className={`nav-link2 ${location.pathname === "/contact" ? "active" : ""}`}
        >
          Contact
        </a>
        <div className="flex gap-3 mt-2">
          <button className="text-[#f70c17] border border-[#D80712] flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px]  w-full">
            <FaWhatsapp size={18} /> WhatsApp
          </button>
          <button className="bg-[#D80712] hover:bg-[#cc0a13] text-white flex rounded-[10px] px-3.5 py-1.5 items-center gap-1.5 w-full">
            <FaEnvelope size={17} /> Email Us
          </button>
        </div>
      </div>
    </nav>
  );
}
