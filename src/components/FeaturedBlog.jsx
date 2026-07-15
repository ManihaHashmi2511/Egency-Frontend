import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FeaturedBlog({ blog }) {
  if (!blog) return null;

  return (
    <section className="featured-blog-section">
      <div className="featured-blog-card" data-aos="fade-up">

        {/* Left Image */}
        <div className="featured-blog-img-wrapper">
          <span className="featured-tag">Tending</span>
          <img
            src={blog.image}
            alt={blog.title}
            className="featured-blog-img"
          />
        </div>

        {/* Right Content */}
        <div className="featured-blog-content">
          <h3 className="featured-blog-title">{blog.title}</h3>

          {/* Tags */}
          <div className="featured-blog-tags">
            {blog.tags &&
              blog.tags.map((tag, i) => (
                <span key={i} className="blog-pill">
                  {tag}
                </span>
              ))}
          </div>

          {/* Description */}
          <p className="featured-blog-desc">{blog.desc}</p>

          {/* Bottom Row */}
          <div className="featured-blog-footer">
            <div className="featured-blog-author">
              <img
                src={blog.authorImg}
                alt={blog.author}
                className="author-img"
              />
              <div>
                <h4 className="author-name">{blog.author}</h4>
                <p className="author-date">{blog.date}</p>
              </div>
            </div>

            <Link to={`/blog/${blog._id}`}>
              <button className="btn-primary featured-read-btn">
                Read more <FaArrowRight />
              </button>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}