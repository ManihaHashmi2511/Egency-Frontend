import { useParams, useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Brand Identity Design",
    category: "Graphic Designing",
    client: "Egency Digital",
    tools: "Figma, Illustrator, Photoshop",
    duration: "2 Weeks",
    year: "2024",
    image: "/portfolio/hero-banner.jpg",
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "The client needed a complete brand overhaul to stand out in a competitive digital market. Their existing identity lacked consistency and failed to communicate their core values effectively.",
    solution:
      "We developed a comprehensive brand identity system including logo design, color palette, typography, and brand guidelines that perfectly captured their vision and resonated with their target audience.",
    gallery: [
      "/portfolio/hero-banner.jpg",
      "/portfolio/portfolio-2.jpg",
      "/portfolio/portfolio-3.jpg",
    ],
    results: [
      { number: "40%", label: "Brand Recognition" },
      { number: "2x", label: "Client Engagement" },
      { number: "60%", label: "Social Media Growth" },
    ],
  },
  {
    id: 2,
    title: "E-Commerce Website",
    category: "Web Development",
    client: "Fashion House",
    tools: "React, Node.js, MongoDB, Tailwind",
    duration: "6 Weeks",
    year: "2024",
    image: "/portfolio/portfolio-2.jpg",
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "The client needed a fully functional e-commerce platform with seamless user experience, secure payments, and an intuitive admin dashboard.",
    solution:
      "We built a MERN stack e-commerce solution with Stripe integration, real-time inventory management, and a custom admin dashboard for complete control.",
    gallery: [
      "/portfolio/portfolio-2.jpg",
      "/portfolio/portfolio-3.jpg",
      "/portfolio/portfolio-4.jpg",
    ],
    results: [
      { number: "3x", label: "Sales Increase" },
      { number: "50%", label: "Faster Load Time" },
      { number: "90%", label: "Customer Satisfaction" },
    ],
  },
  {
    id: 3,
    title: "Mobile App UI",
    category: "UI/UX Design",
    client: "HealthTech Startup",
    tools: "Figma, Protopie, Adobe XD",
    duration: "3 Weeks",
    year: "2024",
    image: "/portfolio/portfolio-3.jpg",
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "Designing an intuitive health tracking app that simplifies complex medical data for everyday users while maintaining a clean, modern aesthetic.",
    solution:
      "We created a user-centered design with clear data visualization, smooth onboarding flow, and accessibility features ensuring the app works for all age groups.",
    gallery: [
      "/portfolio/portfolio-3.jpg",
      "/portfolio/portfolio-4.jpg",
      "/portfolio/portfolio-5.jpg",
    ],
    results: [
      { number: "95%", label: "User Satisfaction" },
      { number: "4.8★", label: "App Store Rating" },
      { number: "10k+", label: "Downloads" },
    ],
  },
  {
    id: 4,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    client: "Retail Brand",
    tools: "Meta Ads, Google Ads, Canva",
    duration: "4 Weeks",
    year: "2024",
    image: "/portfolio/portfolio-4.jpg",
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "The brand needed to increase online visibility and drive targeted traffic to their newly launched product line within a limited budget.",
    solution:
      "We executed a multi-platform digital campaign with targeted ads, influencer collaborations, and engaging content that maximized ROI.",
    gallery: [
      "/portfolio/portfolio-4.jpg",
      "/portfolio/portfolio-5.jpg",
      "/portfolio/portfolio-6.jpg",
    ],
    results: [
      { number: "5x", label: "Return on Ad Spend" },
      { number: "80%", label: "Traffic Increase" },
      { number: "35%", label: "Conversion Rate" },
    ],
  },
  {
    id: 5,
    title: "Logo & Branding",
    category: "Branding",
    client: "Tech Startup",
    tools: "Illustrator, Photoshop, Figma",
    duration: "1 Week",
    year: "2024",
    image: "/portfolio/portfolio-5.jpg",
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "Creating a memorable logo and brand identity for a tech startup that needed to convey innovation, trust, and professionalism.",
    solution:
      "We designed a minimalist yet powerful logo with a complete brand kit including business cards, letterheads, and social media templates.",
    gallery: [
      "/portfolio/portfolio-5.jpg",
      "/portfolio/portfolio-6.jpg",
      "/portfolio/hero-banner.jpg",
    ],
    results: [
      { number: "100%", label: "Client Satisfaction" },
      { number: "3x", label: "Brand Recall" },
      { number: "25+", label: "Assets Delivered" },
    ],
  },
  {
    id: 6,
    title: "3D Product Visualization",
    category: "3D Modeling",
    client: "Manufacturing Co.",
    tools: "Blender, Cinema 4D, After Effects",
    duration: "5 Weeks",
    year: "2024",
    image: "/portfolio/portfolio-6.jpg",
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "The client needed photorealistic 3D renders of their product line for marketing materials before the physical products were manufactured.",
    solution:
      "We created stunning 3D product visualizations with realistic materials, lighting, and environments that exceeded the quality of actual photography.",
    gallery: [
      "/portfolio/portfolio-6.jpg",
      "/portfolio/hero-banner.jpg",
      "/portfolio/portfolio-2.jpg",
    ],
    results: [
      { number: "70%", label: "Cost Savings" },
      { number: "2x", label: "Faster Marketing" },
      { number: "98%", label: "Photorealism Score" },
    ],
  },
];

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project)
    return <div className="text-center py-20">Project not found!</div>;

  const prevProject = projects.find((p) => p.id === project.id - 1);
  const nextProject = projects.find((p) => p.id === project.id + 1);

  return (
    <div>
      <Navbar2 />

      <div className="portfolio-detail-wrapper">
        {/* Section 1: Project Info */}
        <section className="pd-info-section">
          <div className="pd-info-grid">
            {/* Left — Main Image */}
            <div className="pd-main-img-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="pd-main-img"
              />
            </div>

            {/* Right — Project Details */}
            <div className="pd-details">
              <span className="pd-category">{project.category}</span>
              <h1 className="pd-title">{project.title}</h1>

              <div className="pd-meta">
                <div className="pd-meta-item">
                  <span className="pd-meta-label">Client</span>
                  <span className="pd-meta-value">{project.client}</span>
                </div>
                <div className="pd-meta-item">
                  <span className="pd-meta-label">Tools</span>
                  <span className="pd-meta-value">{project.tools}</span>
                </div>
                <div className="pd-meta-item">
                  <span className="pd-meta-label">Duration</span>
                  <span className="pd-meta-value">{project.duration}</span>
                </div>
                <div className="pd-meta-item">
                  <span className="pd-meta-label">Year</span>
                  <span className="pd-meta-value">{project.year}</span>
                </div>
              </div>

              <div className="pd-buttons">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pd-btn-primary"
                >
                  <FaExternalLinkAlt size={14} /> Live Site
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pd-btn-secondary"
                >
                  <FaGithub size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Challenge & Solution */}
        <section className="pd-cs-section">
          <div className="pd-cs-grid">
            <div className="pd-cs-box">
              <h3 className="pd-cs-title">The Challenge</h3>
              <p className="pd-cs-text">{project.challenge}</p>
            </div>
            <div className="pd-cs-box pd-cs-solution">
              <h3 className="pd-cs-title">Our Solution</h3>
              <p className="pd-cs-text">{project.solution}</p>
            </div>
          </div>
        </section>

        {/* Section 3: Gallery */}
        <section className="pd-gallery-section">
          <h2 className="pd-section-heading">
            Project <span className="text-red-500">Gallery</span>
          </h2>
          <div className="pd-gallery-grid">
            {project.gallery.map((img, i) => (
              <div key={i} className="pd-gallery-item">
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="pd-gallery-img"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Results */}
        <section className="pd-results-section">
          <h2 className="pd-section-heading">
            Project <span className="text-red-500">Results</span>
          </h2>
          <div className="pd-results-grid">
            {project.results.map((result, i) => (
              <div
                key={i}
                className="pd-result-card"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <h3 className="pd-result-number">{result.number}</h3>
                <p className="pd-result-label">{result.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Next/Prev Project */}
        <section className="pd-nav-section">
          {prevProject && (
            <button
              onClick={() => navigate(`/portfolio/${prevProject.id}`)}
              className="pd-nav-btn"
            >
              <FaArrowLeft /> {prevProject.title}
            </button>
          )}
          {nextProject && (
            <button
              onClick={() => navigate(`/portfolio/${nextProject.id}`)}
              className="pd-nav-btn pd-nav-next"
            >
              {nextProject.title} <FaArrowRight />
            </button>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
