import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FeaturedBlog() {
  return (
    <section className="featured-blog-section">
      <div className="featured-blog-card" data-aos="fade-up">

        {/* Left Image */}
        <div className="featured-blog-img-wrapper">
          <span className="featured-tag">Tending</span>
          <img
            src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800"
            alt="Featured Blog"
            className="featured-blog-img"
          />
        </div>

        {/* Right Content */}
        <div className="featured-blog-content">
          <h3 className="featured-blog-title">
            The Role of AI in Shaping Modern Branding and Marketing
          </h3>

          {/* Tags */}
          <div className="featured-blog-tags">
            <span className="blog-pill">Artificial intelligence</span>
            <span className="blog-pill">IT</span>
            <span className="blog-pill">Computing</span>
          </div>

          {/* Description */}
          <p className="featured-blog-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>

          {/* Bottom Row */}
          <div className="featured-blog-footer">
            <div className="featured-blog-author">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="Steve Albert"
                className="author-img"
              />
              <div>
                <h4 className="author-name">Steve Albert</h4>
                <p className="author-date">21 Jun, 2024</p>
              </div>
            </div>

            <Link to={`/blog/1`}>
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