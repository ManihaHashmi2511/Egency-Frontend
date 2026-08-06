import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { industries } from "../utils/industries";
import { API_URL } from "../utils/apiUrl";

const IndustryPortfolio = () => {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/portfolio`)
      .then((res) => {
        // sirf wahi projects honge jinke "industries" array mein ye industry name maujood hai
        const filtered = res.data.filter((p) =>
          p.industries?.includes(industry?.name)
        );
        setProjects(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, [slug]);

  if (!industry) {
    return (
      <div>
        <Navbar2 />
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">Industry not found</p>
          <Link to="/industries" className="btn-primary inline-block mt-4">
            Back to Industries
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar2 />

      <section className="px-[6%] py-15 mb-10">
        <Link
          to="/industries"
          className="flex items-center gap-2 text-[#2e2e2e] mb-6 w-fit hover:text-[#e0141e] transition-colors"
        >
          <FaArrowLeft /> Back to Industries
        </Link>

        <h2 className="section-heading text-[33px] text-[#2e2e2e] uppercase font-bold text-center mb-2">
          {industry.name}
        </h2>
        <p className="text-center text-gray-500 max-w-xl mx-auto mb-8.75">
          {industry.desc}
        </p>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-center py-10 text-gray-400">
            No projects for this industry yet — check back soon.
          </p>
        ) : (
          <div className="portfolio-grid-wrapper grid grid-cols-3 gap-5 pt-3">
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/portfolio/${project._id}`}
                className="portfolio-card relative h-81.25 rounded-[20px] overflow-hidden cursor-pointer block"
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
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default IndustryPortfolio;