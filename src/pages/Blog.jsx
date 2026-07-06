import React from "react";
import Navbar2 from "../components/Navbar2";
import { FaSearch } from "react-icons/fa";
import FeaturedBlog from "../components/FeaturedBlog";
import BlogGrid from "../components/BlogGrid";
import Footer from "../components/Footer";

export default function Blog() {
  return (
    <div>
      <Navbar2 />

     {/* Blogs Search section */}
     <section className="blog-header-section">

      {/* Heading */}
      <div className="text-center" data-aos="fade-up">
        <h2 className="blog-main-heading">
          EXPERT TIPS AND TRENDS FROM THE <br />
          <span className="text-red-500">DESIGN WORLD</span>
        </h2>
        <p className="blog-main-para">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </p>
      </div>

      {/* Search Bar */}
      <div className="blog-search-wrapper" data-aos="fade-up">
        <FaSearch className="blog-search-icon " />
        <input
          type="text"
          placeholder="Search your related blogs here"
          className="blog-search-input shadow-lg"
        />
      </div>

    </section>

    {/* Featured Blog */}
    <FeaturedBlog/>

    {/* Blogs Grid */}
    <BlogGrid/>

    {/* Footer */}
    <Footer/>

    </div>
  );
}
