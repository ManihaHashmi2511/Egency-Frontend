import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { API_URL } from "../utils/apiUrl";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // fetch Current blog by its id 
    axios
      .get(`${API_URL}/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setBlog(null);
        setLoading(false);
      });

    // Related blogs ke liye poori list fetch krne ke liye
    axios
      .get(`${API_URL}/blogs`)
      .then((res) => {
        const related = res.data.filter((b) => b._id !== id).slice(0, 2);
        setRelatedBlogs(related);
      })
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  // Blog not found
  if (!blog) {
    return (
      <div className="not-found">
        <h2>Blog not found</h2>
        <Link to="/blog">Go back to Blogs</Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar2 />
      <div className="blog-detail-page">
        {/* Back button */}
        <Link to="/blog" className="back-btn">
          <FaArrowLeft /> Back to Blogs
        </Link>

        {/* Two column layout */}
        <div className="blog-layout">
          {/* LEFT - Main Content */}
          <div className="blog-main">
            {/* Category + meta */}
            <p className="blog-category">{blog.category}</p>
            <h1 className="blog-title">{blog.title}</h1>

            {/* Author + date + read time */}
            <div className="blog-meta">
              <img src={blog.authorImg} alt={blog.author} />
              <span>
                <FaUser /> {blog.author}
              </span>
              <span>
                <FaCalendarAlt /> {blog.date}
              </span>
              <span>
                <FaClock /> {blog.readTime}
              </span>
            </div>

            {/* Main image */}
            <img src={blog.image} alt={blog.title} className="blog-thumbnail" />

            {/* Content blocks */}
            <div className="blog-content">
              {blog.content &&
                blog.content.map((block, i) => {
                  if (block.type === "paragraph")
                    return <p key={i}>{block.text}</p>;
                  if (block.type === "heading")
                    return <h2 key={i}>{block.text}</h2>;
                  return null;
                })}
            </div>

            {/* Tags */}
            <div className="blog-tags">
              {blog.tags &&
                blog.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
            </div>
          </div>

          {/* RIGHT - Sidebar */}
          <div className="blog-sidebar">
            {/* Author card */}
            <div className="sidebar-box">
              <h4>Author</h4>
              <div className="sidebar-author">
                <img src={blog.authorImg} alt={blog.author} />
                <div>
                  <p>{blog.author}</p>
                  <span>{blog.authorRole}</span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="sidebar-box">
              <h4>Share</h4>
              <div className="share-btns">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="share facebook"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="share twitter"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${window.location.href}`}
                  target="_blank"
                  rel="noreferrer"
                  className="share linkedin"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Related posts */}
            <div className="sidebar-box">
              <h4>Related Posts</h4>
              {relatedBlogs.map((b) => (
                <Link key={b._id} to={`/blog/${b._id}`} className="related-item">
                  <img src={b.image} alt={b.title} />
                  <div>
                    <p>{b.title}</p>
                    <span>{b.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;