import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500",
    title: "10 Branding Trends to Watch in 2024",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    author: "Steve Albert",
    date: "21 Jun, 2024",
    authorImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=500",
    title: "How to Build a Strong Brand Identity",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    author: "Steve Albert",
    date: "21 Jun, 2024",
    authorImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
    title: "The Future of Web Development",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    author: "Steve Albert",
    date: "21 Jun, 2024",
    authorImg:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500",
    title: "Social Media Marketing Strategies",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    author: "Steve Albert",
    date: "21 Jun, 2024",
    authorImg:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500",
    title: "UI/UX Design Best Practices",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    author: "Steve Albert",
    date: "21 Jun, 2024",
    authorImg:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
    title: "Why Content Marketing Matters",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
    author: "Steve Albert",
    date: "21 Jun, 2024",
    authorImg:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
  },
];

export default function BlogGrid() {
  return (
    <section className="blog-grid-section">
      <div className="blog-grid space-y-9">
        {blogs.map((blog, index) => (
          <Link to={`/blog/${blog.id}`}>
            <div
              key={blog.id}
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
