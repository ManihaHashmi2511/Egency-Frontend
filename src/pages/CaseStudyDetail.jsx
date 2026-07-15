import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { BsFillTrophyFill } from "react-icons/bs";
import { API_URL } from "../utils/apiUrl";

const CaseStudyDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/case-studies/${id}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setProject(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

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
              {project.services &&
                project.services.map((s, i) => (
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
          {project.gallery &&
            project.gallery.map((img, i) => (
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