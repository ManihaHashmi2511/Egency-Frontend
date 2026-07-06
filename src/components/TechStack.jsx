import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiAngular,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiDotnet,
  SiGo,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiRedis,
  SiAndroid,
  SiSwift,
  SiFlutter,
  SiIonic,
} from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io5";
import { FaJava, FaApple } from "react-icons/fa";

const techData = {
  Frontend: [
    { icon: <SiHtml5 />, name: "HTML5", color: "#E34F26" },
    { icon: <IoLogoCss3 />, name: "CSS3", color: "#1572B6" },
    { icon: <SiJavascript />, name: "JavaScript", color: "#F7DF1E" },
    { icon: <SiReact />, name: "React", color: "#61DAFB" },
    { icon: <SiAngular />, name: "Angular", color: "#DD0031" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "#38BDF8" },
  ],
  Backend: [
    { icon: <SiNodedotjs />, name: "Node.js", color: "#339933" },
    { icon: <FaJava />, name: "Java", color: "#f89820" },
    { icon: <SiPython />, name: "Python", color: "#3776AB" },
    { icon: <SiPhp />, name: "PHP", color: "#777BB4" },
    { icon: <SiDotnet />, name: ".NET", color: "#512BD4" },
    { icon: <SiGo />, name: "Go", color: "#00ADD8" },
  ],
  Database: [
    { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
    { icon: <SiMysql />, name: "MySQL", color: "#4479A1" },
    { icon: <SiPostgresql />, name: "PostgreSQL", color: "#4169E1" },
    { icon: <SiFirebase />, name: "Firebase", color: "#FFCA28" },
    { icon: <SiRedis />, name: "Redis", color: "#DC382D" },
  ],
  Mobile: [
    { icon: <FaApple />, name: "iOS", color: "#333333" },
    { icon: <SiAndroid />, name: "Android", color: "#3DDC84" },
    { icon: <SiSwift />, name: "Swift", color: "#FA7343" },
    { icon: <SiFlutter />, name: "Flutter", color: "#02569B" },
    { icon: <SiIonic />, name: "Ionic", color: "#3880FF" },
  ],
};

const tabImages = {
  Frontend: "/services/frontend2-img.jpg",
  Backend:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80",
  Database:
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=700&q=80",
  Mobile:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80",
};

const tabs = ["Frontend", "Backend", "Database", "Mobile"];

const TechStack = () => {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(210);
  const frameRef = useRef(null);
  const wrapperRef = useRef(null);
  const orbitRef = useRef(null);

  const activeTechs = techData[activeTab];

  useEffect(() => {
    const updateRadius = () => {
      if (orbitRef.current) {
        const size = orbitRef.current.offsetWidth;
        setRadius(size / 2 - 50);
      }
    };

    const timer = setTimeout(updateRadius, 100);
    window.addEventListener("resize", updateRadius);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateRadius);
    };
  }, []);
  // Continuous rotation
  useEffect(() => {
    const animate = () => {
      setRotation((prev) => (prev + 0.3) % 360);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <section className="tech-section">
      <div className="tech-header">
        <h2>
          Technology Stacks <span className="highlight">We Use</span>
        </h2>
        <p>
          We work with modern, reliable tools and frameworks to build fast,
          scalable, and future-proof digital products.
        </p>
      </div>

      <div className="tech-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tech-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tech-split">
        {/* Left - Orbit */}
        <div className="tech-split-left">
          <div className="orbit-wrapper" ref={orbitRef}>
            <div className="orbit-ring" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="orbit-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab}
              </motion.div>
            </AnimatePresence>

            {activeTechs.map((tech, i) => {
              const baseAngle = (360 / activeTechs.length) * i;
              const angle = baseAngle + rotation - 90;

              // Percentage mein position - wrapper size se independent
              const xPercent = 50 + 45 * Math.cos((angle * Math.PI) / 180);
              const yPercent = 50 + 45 * Math.sin((angle * Math.PI) / 180);

              let normalizedAngle = angle % 360;
              if (normalizedAngle < 0) normalizedAngle += 360;
              const distanceFromTop = Math.min(
                Math.abs(normalizedAngle - 270),
                360 - Math.abs(normalizedAngle - 270),
              );
              const isAtTop = distanceFromTop < 12;

              return (
                <div
                  key={`${activeTab}-${tech.name}`}
                  className={`orbit-icon ${isAtTop ? "orbit-highlight" : ""}`}
                  style={{
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                  }}
                >
                  <div
                    className="orbit-icon-circle"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <p>{tech.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Image */}
        <div className="tech-split-right" ref={wrapperRef}>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeTab}
              src={tabImages[activeTab]}
              alt={`${activeTab} technologies`}
              className="tech-tab-image"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
