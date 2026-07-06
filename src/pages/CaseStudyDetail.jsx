import { useParams, Link } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillTrophyFill } from "react-icons/bs";

const caseStudies = [
  {
    id: 1,
    category: "Branding",
    title: "Brand Identity Redesign for TechCorp",
    desc: "Complete brand overhaul that increased recognition by 40% within 3 months.",
    about: "TechCorp needed a fresh identity to compete in a crowded market. We redesigned their logo, color palette, typography, and brand guidelines from scratch — creating a cohesive, modern look that resonated with their audience.",
    client: "TechCorp Inc.",
    duration: "6 Weeks",
    result: "40% brand recognition increase",
    services: ["Logo Design", "Brand Guidelines", "Typography"],
    image: "/portfolio/hero-banner.jpg",
    gallery: [
      "/portfolio/portfolio-2.jpg",
      "/portfolio/portfolio-3.jpg",
    ],
  },
  {
    id: 2,
    category: "Web Development",
    title: "E-Commerce Platform for Fashion House",
    desc: "Built a scalable MERN stack solution that tripled online sales.",
    about: "Fashion House required a fully custom e-commerce platform with advanced filtering, cart management, and payment integration. We delivered a fast, mobile-first solution built on the MERN stack.",
    client: "Fashion House PK",
    duration: "8 Weeks",
    result: "3x sales increase",
    services: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/portfolio/portfolio-2.jpg",
    gallery: [
      "/portfolio/portfolio-3.jpg",
      "/portfolio/portfolio-4.jpg",
    ],
  },
  {
    id: 3,
    category: "UI/UX Design",
    title: "Mobile App UI for HealthTech Startup",
    desc: "User-centered design that achieved 4.8 stars on the App Store.",
    about: "HealthTech needed an intuitive mobile app experience for patients and doctors. We conducted user research, created wireframes, and delivered polished high-fidelity designs ready for development.",
    client: "HealthTech Ltd.",
    duration: "4 Weeks",
    result: "4.8★ App Store rating",
    services: ["UI Design", "UX Research", "Prototyping"],
    image: "/portfolio/portfolio-3.jpg",
    gallery: [
      "/portfolio/portfolio-4.jpg",
      "/portfolio/portfolio-5.jpg",
    ],
  },
  {
    id: 4,
    category: "Digital Marketing",
    title: "Social Media Campaign for Retail Brand",
    desc: "Multi-platform campaign that delivered 5x return on ad spend.",
    about: "We planned and executed a full social media campaign across Instagram, Facebook, and TikTok. Creative content, targeted ads, and continuous optimization led to exceptional ROAS results.",
    client: "RetailBrand Co.",
    duration: "3 Months",
    result: "5x ROAS",
    services: ["Social Media", "Paid Ads", "Content Creation"],
    image: "/portfolio/portfolio-4.jpg",
    gallery: [
      "/portfolio/portfolio-5.jpg",
      "/portfolio/portfolio-6.jpg",
    ],
  },
  {
    id: 5,
    category: "Branding",
    title: "Logo & Brand Kit for Tech Startup",
    desc: "Minimalist logo design with complete brand guidelines delivered in one week.",
    about: "A fast-growing tech startup needed a complete brand identity in record time. We delivered a clean, scalable logo and full brand kit within one week without compromising quality.",
    client: "StartupX",
    duration: "1 Week",
    result: "100% client satisfaction",
    services: ["Logo Design", "Brand Kit", "Color System"],
    image: "/portfolio/portfolio-5.jpg",
    gallery: [
      "/portfolio/hero-banner.jpg",
      "/portfolio/portfolio-2.jpg",
    ],
  },
  {
    id: 6,
    category: "3D Modeling",
    title: "3D Product Visualization for Manufacturing Co.",
    desc: "Photorealistic renders that saved 70% on photography costs.",
    about: "Instead of expensive product photography, we created photorealistic 3D renders of their entire product line. The result was high-quality visuals at a fraction of the cost.",
    client: "ManufactureCo.",
    duration: "5 Weeks",
    result: "70% cost savings",
    services: ["3D Modeling", "Rendering", "Animation"],
    image: "/portfolio/portfolio-6.jpg",
    gallery: [
      "/portfolio/hero-banner.jpg",
      "/portfolio/portfolio-3.jpg",
    ],
  },
];

const CaseStudyDetail = () => {
  const { id } = useParams();
  const project = caseStudies.find((c) => c.id === parseInt(id));

  if (!project) {
    return (
      <div>
        <Navbar2 />
        <div className="csd-not-found">
          <h2>Project not found</h2>
          <Link to="/case-studies">← Back to Case Studies</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar2 />

      <div className="csd-page">

        {/* Back button */}
        <Link to="/case-studies" className="csd-back">
          <FaArrowLeft /> Back to Case Studies
        </Link>

        {/* Title + Category */}
        <div className="csd-header">
          <span className="csd-category">{project.category}</span>
          <h1 className="csd-title">{project.title}</h1>
        </div>

        {/* Main Image */}
        <div className="csd-main-image">
          <img src={project.image} alt={project.title} />
        </div>

        {/* Content - description + details */}
        <div className="csd-content">

          {/* Left - About */}
          <div className="csd-about">
            <h3>About the Project</h3>
            <p>{project.about}</p>

            {/* Services tags */}
            <div className="csd-tags">
              {project.services.map((s, i) => (
                <span key={i} className="csd-tag">{s}</span>
              ))}
            </div>
          </div>

          {/* Right - Details card */}
          <div className="csd-details">
            <div className="csd-detail-item">
              <span>Client</span>
              <p>{project.client}</p>
            </div>
            <div className="csd-detail-item">
              <span>Duration</span>
              <p>{project.duration}</p>
            </div>
            <div className="csd-detail-item">
              <span>Category</span>
              <p>{project.category}</p>
            </div>
            <div className="csd-detail-item result">
              <BsFillTrophyFill className="trophy" />
              <div>
                <span>Result</span>
                <p>{project.result}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="csd-gallery">
          {project.gallery.map((img, i) => (
            <div key={i} className="csd-gallery-img">
              <img src={img} alt={`Project image ${i + 1}`} />
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;