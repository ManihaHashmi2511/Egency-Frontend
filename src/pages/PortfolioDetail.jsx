import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaChartLine,
  FaUsers,
  FaStar,
  FaRocket,
  FaBullseye,
  FaAward,
  FaQuestion,
} from "react-icons/fa";
import { API_URL } from "../utils/apiUrl";

const iconMap = {
  chart: <FaChartLine />,
  users: <FaUsers />,
  rocket: <FaRocket />,
  star: <FaStar />,
  bullseye: <FaBullseye />,
  award: <FaAward />,
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Current project fetch karo
    axios
      .get(`${API_URL}/portfolio/${id}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setProject(null);
        setLoading(false);
      });

    // Prev/Next navigation ke liye poori list (order ke hisaab se sorted) fetch karo
    axios
      .get(`${API_URL}/portfolio`)
      .then((res) => setAllProjects(res.data))
      .catch((err) => console.log("Error:", err));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!project)
    return <div className="text-center py-20">Project not found!</div>;

  // order field se prev/next nikalo (MongoDB _id sequential nahi hota, isliye order use karte hain)
  const currentIndex = allProjects.findIndex((p) => p._id === project._id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex !== -1 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div>
      <Navbar2 />

      <div className="portfolio-detail-wrapper">
        {/* Section 1: Project Info */}
        <section className="pd-info-section">
          <a href="/#portfolio" className="back-btn">
            <FaArrowLeft /> Back to Portfolio
          </a>

          <div className="pd-info-grid">
            <div className="pd-main-img-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="pd-main-img"
              />
            </div>

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
                <div className="pd-result-icon">
                  {iconMap[result.icon] || <FaQuestion size={24} />}
                </div>
                <h3 className="pd-result-number">{result.number}</h3>
                <p className="pd-result-label">{result.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Next/Prev */}
        <section className="pd-nav-section">
          {prevProject && (
            <button
              onClick={() => navigate(`/portfolio/${prevProject._id}`)}
              className="pd-nav-btn"
            >
              <FaArrowLeft /> {prevProject.title}
            </button>
          )}
          {nextProject && (
            <button
              onClick={() => navigate(`/portfolio/${nextProject._id}`)}
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