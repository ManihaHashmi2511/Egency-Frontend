import { MdArrowOutward  } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    image: "/portfolio/hero-banner.jpg",
    title: "Brand Identity Design",
    category: "Graphic Designing",
  },
  {
    id: 2,
    image: "/portfolio/portfolio-2.jpg",
    title: "E-Commerce Website",
    category: "Web Development",
  },
  {
    id: 3,
    image: "/portfolio/portfolio-3.jpg",
    title: "Mobile App UI",
    category: "UI/UX Design",
  },
  {
    id: 4,
    image: "/portfolio/portfolio-4.jpg",
    title: "Social Media Campaign",
    category: "Digital Marketing",
  },
  {
    id: 5,
    image: "/portfolio/portfolio-5.jpg",
    title: "Logo & Branding",
    category: "Branding",
  },
  {
    id: 6,
    image: "/portfolio/portfolio-6.jpg",
    title: "3D Product Visualization",
    category: "3D Modeling",
  },
];

function Portfolio() {
  const navigate = useNavigate();

  return (
    <section className="px-[6%] py-15 mb-10">
      <h2 data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000" className="section-heading text-[33px] text-[#2e2e2e] uppercase font-bold text-center mb-8.75">
        Our Portfolio
      </h2>

      <div className="portfolio-grid-wrapper grid grid-cols-3 gap-5 pt-3" data-aos="fade-in" data-aos-delay="300" data-aos-duration="1000" >
        {projects.map((project) => (
          <div
            key={project.id}
            className="portfolio-card relative h-81.25 rounded-[20px] overflow-hidden cursor-pointer"
            onClick={() => navigate(`/portfolio/${project.id}`)}
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
