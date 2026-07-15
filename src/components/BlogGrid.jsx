import { Link } from "react-router-dom";

export default function BlogGrid({ blogs }) {
  return (
    <section className="blog-grid-section">
      <div className="blog-grid space-y-9">
        {blogs.map((blog, index) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
            <div
              className="blog-card"
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="blog-card-img"
              />
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-desc">{blog.desc}</p>

              <div className="blog-card-author">
                <img
                  src={blog.authorImg}
                  alt={blog.author}
                  className="blog-author-img"
                />
                <div>
                  <h4 className="blog-author-name">{blog.author}</h4>
                  <p className="blog-author-date">{blog.date}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}