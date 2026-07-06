import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

// Dummy data - baad mein API se replace hoga
const blogs = [
  {
    id: 1,
    title: "How AI is Shaping Modern Branding and Marketing",
    category: "Artificial Intelligence",
    date: "June 21, 2025",
    readTime: "5 min read",
    author: "Steve Albert",
    authorRole: "Senior Designer",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80",
    tags: ["AI", "Branding", "Marketing"],
    content: [
      {
        type: "paragraph",
        text: "Artificial intelligence is reshaping how brands communicate, engage, and grow. From automated content creation to hyper-personalized campaigns, AI is giving businesses powerful tools.",
      },
      { type: "heading", text: "AI in Content Creation" },
      {
        type: "paragraph",
        text: "Tools like large language models can now draft blog posts, social media captions, and ad copy in seconds. Human creativity still plays a vital role, but AI handles repetitive tasks.",
      },
      { type: "heading", text: "Personalization at Scale" },
      {
        type: "paragraph",
        text: "AI analyzes user behavior and browsing patterns to deliver the right message to the right person at the right time — boosting engagement and conversions.",
      },
    ],
  },
  {
    id: 2,
    title: "Top UI/UX Trends to Watch in 2025",
    category: "Design",
    date: "June 15, 2025",
    readTime: "4 min read",
    author: "Adam Miller",
    authorRole: "UI/UX Designer",
    authorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    tags: ["UI", "UX", "Design"],
    content: [
      {
        type: "paragraph",
        text: "The world of UI/UX design is constantly evolving. Several exciting trends are emerging that redefine how users interact with digital products.",
      },
      { type: "heading", text: "Glassmorphism and Soft UI" },
      {
        type: "paragraph",
        text: "Frosted glass effects, subtle shadows, and layered transparency continue to dominate modern interface design.",
      },
    ],
  },
  {
    id: 3,
    title: "Why Every Business Needs a Strong Digital Presence",
    category: "Business",
    date: "June 10, 2025",
    readTime: "6 min read",
    author: "Steve Albert",
    authorRole: "Business Strategist",
    authorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Business", "Digital", "Strategy"],
    content: [
      {
        type: "paragraph",
        text: "Having a strong online presence is no longer optional. Your digital footprint directly impacts your credibility, reach, and revenue.",
      },
      { type: "heading", text: "First Impressions Are Digital" },
      {
        type: "paragraph",
        text: "Before a customer visits you, they have already Googled you. A professional website builds trust before any human interaction.",
      },
    ],
  },
];

const BlogDetail = () => {
  const { id } = useParams();

  // ID se blog dhoondo
  const blog = blogs.find((b) => b.id === parseInt(id));

  // Related blogs - current ke ilawa baki 2
  const relatedBlogs = blogs.filter((b) => b.id !== parseInt(id)).slice(0, 2);

  // Blog nahi mila
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
        <Navbar2/>
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
              <img src={blog.authorImage} alt={blog.author} />
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
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="blog-thumbnail"
            />

            {/* Content blocks */}
            <div className="blog-content">
              {blog.content.map((block, i) => {
                if (block.type === "paragraph")
                  return <p key={i}>{block.text}</p>;
                if (block.type === "heading")
                  return <h2 key={i}>{block.text}</h2>;
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="blog-tags">
              {blog.tags.map((tag, i) => (
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
                <img src={blog.authorImage} alt={blog.author} />
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
                <Link key={b.id} to={`/blog/${b.id}`} className="related-item">
                  <img src={b.thumbnail} alt={b.title} />
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
      <Footer/>
    </div>
  );
};

export default BlogDetail;
