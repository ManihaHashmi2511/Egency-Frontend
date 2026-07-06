import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";

const stats = [
  { id: 1, end: 1.5, suffix: "K", label: "Projects done", color: "#E63946" },
  { id: 2, end: 10, suffix: "K", label: "Satisfied clients", color: "#3B82F6" },
  { id: 3, end: 15, suffix: "+", label: "Services available", color: "#F97316" },
  { id: 4, end: 98, suffix: "%", label: "Growth rate", color: "#D946EF" },
];

export default function AboutWhoWeAre() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (inView) {
      setValues(stats.map((s) => s.end));
    }
  }, [inView]);

  return (
    <section className="whoweare-section">
      <div className="whoweare-wrapper">

        {/* Left Text */}
        <div className="whoweare-content" data-aos="fade-right">
          <h2 className="whoweare-heading">
            <span className="text-red-500">WHO</span> WE ARE?
          </h2>
          <p className="whoweare-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </p>
          <button className="btn-primary">Read more</button>
        </div>

        {/* Right Stats */}
        <div className="whoweare-stats" ref={ref} data-aos="fade-left">
          {stats.map((stat, index) => (
            <div key={stat.id} className="stat-box" >
              <h1 className="stat-number" style={{ color: stat.color }}>
                <Odometer value={values[index]} format="(,ddd).dd"  duration={2000} />
                <span>{stat.suffix}</span>
              </h1>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}