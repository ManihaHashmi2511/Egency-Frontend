import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import { FaSearch } from "react-icons/fa";
import FeaturedBlog from "../components/FeaturedBlog";
import BlogGrid from "../components/BlogGrid";
import Footer from "../components/Footer";
import { API_URL } from "../utils/apiUrl";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/blogs`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  // Featured blog dhoondo (jiska featured: true hai)
  const featuredBlog = blogs.find((b) => b.featured === true);

  // Baaki blogs (featured wala grid mein repeat na ho isliye alag kiya)
  const otherBlogs = blogs.filter((b) => b.featured !== true);

  // Search term ke hisaab se title ya category match karo
  const filteredBlogs = otherBlogs.filter((blog) => {
    const term = searchTerm.toLowerCase();
    return (
      blog.title.toLowerCase().includes(term) ||
      (blog.category && blog.category.toLowerCase().includes(term))
    );
  });

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Featured Blog - jab search khali ho tabhi dikhega */}
      {searchTerm === "" && featuredBlog && <FeaturedBlog blog={featuredBlog} />}

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <BlogGrid blogs={filteredBlogs} />
      ) : (
        <p className="text-center py-10">No blogs found matching your search.</p>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}