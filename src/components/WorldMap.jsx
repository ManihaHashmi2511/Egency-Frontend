import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import { GoTrophy } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import {HiOutlineUsers} from "react-icons/hi"
import {HiOutlineBuildingOffice2} from "react-icons/hi2"


const locations = [
  { name: "New York", area: "United States", coordinates: [-74.006, 40.7128] },
  { name: "London", area: "United Kingdom", coordinates: [-0.1276, 51.5074] },
  { name: "Dubai", area: "United Arab Emirates", coordinates: [55.2708, 25.2048] },
  { name: "Lahore", area: "Pakistan", coordinates: [74.3587, 31.5204] },
  { name: "Brazil", area: "Rio De Janeiro", coordinates: [-43.1729, -22.9068] },
  { name: "Sydney", area: "Australia", coordinates: [151.2093, -33.8688] },
  { name: "Tokyo", area: "Japan", coordinates: [139.6917, 35.6895] },
];

const stats = [
  { end: 10, suffix: "+", label: "AWARDS", icon:  <GoTrophy /> },
  { end: 190, suffix: "+", label: "CASE STUDIES", icon: <IoBookOutline /> },
  { end: 2781, suffix: "+", label: "CUSTOMERS", icon: <HiOutlineUsers />},
  { end: 9, suffix: "", label: "OFFICES", icon: <HiOutlineBuildingOffice2 /> },
];

const WorldMap = () => {
  const [geographies, setGeographies] = useState([]);
  const [selected, setSelected] = useState("Lahore");
  const [pinPositions, setPinPositions] = useState({});
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);

  // Odometer
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (inView) {
      setValues(stats.map((s) => s.end));
    }
  }, [inView]);

  const width = 960;
  const height = 500;

  const projection = d3
    .geoMercator()
    .scale(148)
    .translate([width / 2, height / 1.6]);

  const pathGenerator = d3.geoPath().projection(projection);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        const countries = topojson.feature(data, data.objects.countries);
        setGeographies(countries.features);
      });
  }, []);

  useEffect(() => {
    const updatePositions = () => {
      if (!svgRef.current || !wrapperRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = rect.width / width;
      const scaleY = rect.height / height;

      const positions = {};
      locations.forEach((loc) => {
        const [x, y] = projection(loc.coordinates);
        positions[loc.name] = {
          x: x * scaleX,
          y: y * scaleY,
        };
      });
      setPinPositions(positions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [geographies]);

  return (
    <div className="wm-section">

      {/* Heading */}
      <div className="wm-heading">
        <h2 data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">We're global to privilege you</h2>
        <p data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
          Sed ut perspiciatis unde omnis iste natus error sit voluptem suspec
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
        </p>
      </div>

      {/* Dropdown + Button */}
      <div className="wm-controls">
        <select
          className="wm-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc.name} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
        <button className="wm-btn">See Services</button>
      </div>

      {/* Map */}
      <div className="wm-map-wrapper" ref={wrapperRef} data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="5"
              height="5"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.2" fill="#c8c8c8" />
            </pattern>
          </defs>

          {geographies.map((geo, i) => (
            <path
              key={i}
              d={pathGenerator(geo)}
              fill="url(#dots)"
              stroke="none"
            />
          ))}

          {locations.map((loc) => {
            const [x, y] = projection(loc.coordinates);
            const isSelected = selected === loc.name;

            return (
              <g
                key={loc.name}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(loc.name)}
              >
                <circle cx={x} cy={y} r={12} fill="rgba(255,80,0,0.15)">
                  <animate
                    attributeName="r"
                    from="7"
                    to="15"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={x} cy={y} r={isSelected ? 7 : 5} fill="#ff4500" />
              </g>
            );
          })}
        </svg>

        {/* Permanent tooltips */}
        {locations.map((loc) => {
          const pos = pinPositions[loc.name];
          if (!pos) return null;
          return (
            <div
              key={loc.name}
              className="wm-tooltip-permanent"
              style={{ left: pos.x, top: pos.y }}
              onClick={() => setSelected(loc.name)}
            >
              <strong>{loc.name.toUpperCase()}</strong>
              <span>{loc.area}</span>
            </div>
          );
        })}
      </div>

      {/* Stats with Odometer */}
      <div className="wm-stats" ref={ref} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
        {stats.map((stat, i) => (
          <div key={i} className="wm-stat">
            <span className="wm-stat-icon">{stat.icon}</span>
            <h3>
              <Odometer value={values[i]} format="(,ddd)" duration={6000} />
              <span>{stat.suffix}</span>
            </h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldMap;