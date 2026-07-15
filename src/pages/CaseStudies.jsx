import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { BsFillTrophyFill } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import { API_URL } from "../utils/apiUrl";

// Filter categories
const filters = [
  "All",
  "Branding",
  "Web Development",
  "UI/UX Design",
  "Digital Marketing",
  "3D Modeling",
];

export default function CaseStudies() {
  const navigate = useNavigate();

  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active filter track karo
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    axios
      .get(`${API_URL}/case-studies`)
      .then((res) => {
        setCaseStudies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  // Filter logic — All selected ho to sab dikhao, warna category match karo
  const filtered =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeFilter);

  return (
    <div>
      <Navbar2 />

      <section className="cs-section">
        {/* Heading */}
        <div className="cs-heading-wrapper" data-aos="fade-up">
          <h2 className="cs-heading">
            Case <span className="text-red-500">Studies</span>
          </h2>
          <p className="cs-para">
            Real projects, real results — explore how we've helped businesses
            grow.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="cs-filters" data-aos="fade-up">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`cs-filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <p className="text-center py-10">No case studies found.</p>
        ) : (
          <div className="cs-grid">
            {filtered.map((item, index) => (
              <div
                key={item._id}
                className="cs-card"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                onClick={() => navigate(`/case-studies/${item._id}`)}
              >
                <div className="cs-card-img-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cs-card-img"
                  />
                  <div className="cs-card-overlay">
                    <span className="cs-card-category">{item.category}</span>
                    <h3 className="cs-card-title">{item.title}</h3>
                    <p className="cs-card-desc">{item.desc}</p>
                    <div className="cs-card-footer">
                      <span className="cs-card-result flex items-center gap-2">
                        <BsFillTrophyFill className="text-amber-500" />
                        {item.result}
                      </span>
                      <span className="cs-view-btn">
                        View case <IoIosArrowRoundForward size={21} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}