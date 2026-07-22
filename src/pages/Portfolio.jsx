import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";

function Portfolio() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/portfolio`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (projects.length === 0)
    return <p className="text-center py-10">No projects found.</p>;

  return (
    <section id="portfolio" className="px-[6%] py-15 mb-10">
      <h2
        data-aos="fade-right"
        data-aos-delay="100"
        data-aos-duration="1000"
        className="section-heading text-[33px] text-[#2e2e2e] uppercase font-bold text-center mb-8.75"
      >
        Our Portfolio
      </h2>

      <div
        className="portfolio-grid-wrapper grid grid-cols-3 gap-5 pt-3"
        data-aos="fade-in"
        data-aos-delay="300"
        data-aos-duration="1000"
      >
        {projects.map((project) => (
          <div
            key={project._id}
            className="portfolio-card relative h-81.25 rounded-[20px] overflow-hidden cursor-pointer"
            onClick={() => navigate(`/portfolio/${project._id}`)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="portfolio-overlay">
              <button className="portfolio-view-btn">
                <span className="portfolio-arrow-wrapper">
                  <MdArrowOutward size={20} className="portfolio-arrow" />
                </span>
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;