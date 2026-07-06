import { Link } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div
        className="footer-grid-wrapper grid gap-11 mb-10.5 px-[6%] pt-13 pb-5.5"
        style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}
      >
        <div className="flex flex-col space-y-5">
          <Link to={"/"}>
            <img
              src="/company_logo2.png"
              alt="Egency Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-[#aaaaaa] text-[15px] leading-[1.75]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum.
          </p>
        </div>

        <div>
          <h3 className="text-[20px] font-medium mb-4.5 text-white">
            Quick links
          </h3>
          <Link
            to={'/about'}
            className="footer-link text-[#d6d4d4] text-base block mb-2.25"
          >
            About us
          </Link>
          <Link
            to={'/services'}
            className="footer-link text-[#d6d4d4] text-base block mb-2.25"
          >
            Services
          </Link>
          <Link
            to={'/blog'}
            className="footer-link text-[#d6d4d4] text-base block mb-2.25"
          >
            Blogs
          </Link>
          <Link
            to={'/case-studies'}
            className="footer-link text-[#d6d4d4] text-base block mb-2.25"
          >
            Case Studies
          </Link>
        </div>

        <div>
          <h3 className="text-[20px] font-medium mb-4.5 text-white">Support</h3>
          <Link
            to="/contact"
            className="footer-link text-[#d6d4d4] text-base block mb-2.25"
          >
            Contact Us
          </Link>
          <a
            href="/services#faq"
            className="footer-link text-[#d6d4d4] text-base block mb-2.25"
          >
            FAQ's
          </a>
          <Link
            to="/industries"
            className="footer-link text-[#d6d4d4] text-base block mb-2.25"
          >
           Insudtries We Serve
          </Link>
        </div>

        <div>
          <h3 className="text-[20px] font-medium mb-4.5 text-white">
            Contact Us
          </h3>
          <a
            href="https://wa.me/+923250525254"
            className=" text-[#d6d4d4] text-base flex items-center gap-3 mb-2.25"
          >
            <FaWhatsapp className="text-[#D80712]" size={22} /> +92 325 0525254
          </a>
          <a
            href="mailto:Info@egencydigital.com"
            className=" text-[#d6d4d4] text-base flex items-center gap-3 mb-4"
          >
            <FaEnvelope className="text-[#D80712]" size={20} />{" "}
            Info@egencydigital.com
          </a>
          <h4 className="text-white text-base font-medium mb-3">Follow Us</h4>
          <div className="flex items-center gap-3">
            <a href="#" className="footer-social-icon">
              <FaFacebookF size={14} />
            </a>
            <a href="#" className="footer-social-icon">
              <FaInstagram size={14} />
            </a>
            <a href="#" className="footer-social-icon">
              <FaLinkedinIn size={14} />
            </a>
            <a href="#" className="footer-social-icon">
              <FaXTwitter  size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2e2e2e] h-12.5 flex justify-center items-center bg-[#c91815]">
        <p className="text-[#f8f5f5] text-[15px]">
          @Copyright 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
