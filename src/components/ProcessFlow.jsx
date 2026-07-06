import {
  FaLightbulb,
  FaPencilRuler,
  FaCode,
  FaRocket,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";

const bentoItems = [
  {
    icon: <FaLightbulb size={24} />,
    title: "Discovery & Strategy",
    desc: "We dive deep into your brand, goals, and audience to craft a winning strategy.",
    bg: "#d80712",
    color: "#fff",
  },
  {
    icon: <FaPencilRuler size={24} />,
    title: "Design & Prototype",
    desc: "Wireframes, mockups, and interactive prototypes built with precision.",
    bg: "#303030",
    color: "#fff",
  },
  {
    icon: <FaCode size={24} />,
    title: "Development",
    desc: "Clean, scalable code built with the latest modern technologies.",
    bg: "#fdebeb",
    color: "#111",
  },
  {
    icon: <FaRocket size={24} />,
    title: "Launch",
    desc: "Seamless deployment with full testing and quality assurance.",
    bg: "#fdebeb",
    color: "#111",
  },
  {
    icon: <FaChartLine size={24} />,
    title: "Growth & Analytics",
    desc: "We track, analyze, and optimize for continuous improvement.",
    bg: "#303030",
    color: "#fff",
  },
  {
    icon: <FaHandshake size={24} />,
    title: "Ongoing Support",
    desc: "24/7 dedicated support to keep your product running perfectly. we're here to help. we will be with you every step of the way. Our team is dedicated to your success.",
    bg: "#d80712",
    color: "#fff",
  },
];

const placements = [
  { gridColumn: "1 / 3", gridRow: "1 / 2" },
  { gridColumn: "3 / 4", gridRow: "1 / 2" },
  { gridColumn: "1 / 2", gridRow: "2 / 3" },
  { gridColumn: "2 / 3", gridRow: "2 / 3" },
  { gridColumn: "1 / 3", gridRow: "3 / 4" },
  { gridColumn: "3 / 4", gridRow: "2 / 4" },
];

export default function ProcessFlow() {
  return (
    <section className="bento-section">
      {/* Heading */}
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="bento-heading">
          How We <span className="highlight">Deliver</span>
        </h2>
      </div>

      {/* Main Layout */}
      <div className="bento-main-wrapper">
        {/* Left — Bento Grid */}
        <div className="bento-grid">
          {bentoItems.map((item, index) => (
            <div
              key={index}
              className={`bento-card bento-card-${index}`}
              style={{
                background: item.bg,
                color: item.color,
                ...placements[index],
              }}
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="bento-icon">{item.icon}</div>
              <h3 className="bento-card-title">{item.title}</h3>
              <p className="bento-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Right — Image */}
        <div className="bento-image-wrapper" data-aos="fade-left">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
            alt="Our Process"
            className="bento-image"
          />
          <div className="bento-float-card">
            <h4>100+</h4>
            <p>Projects Delivered Successfully</p>
          </div>
        </div>
      </div>
    </section>
  );
}
