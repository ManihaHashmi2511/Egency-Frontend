import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import { GoTrophy } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { countriesData } from "../data/countriesData";

const officeLocations = [
  { name: "New York", area: "United States", coordinates: [-74.006, 40.7128] },
  { name: "London", area: "United Kingdom", coordinates: [-0.1276, 51.5074] },
  { name: "Abu Dhabi", area: "United Arab Emirates", coordinates: [55.2708, 25.2048] },
  { name: "Lahore", area: "Pakistan", coordinates: [74.3587, 31.5204] },
  { name: "Rio De Janeiro", area: "Brazil", coordinates: [-43.1729, -22.9068] },
  { name: "Sydney", area: "Australia", coordinates: [151.2093, -33.8688] },
  { name: "Tokyo", area: "Japan", coordinates: [139.6917, 35.6895] },
];

const stats = [
  { end: 10, suffix: "+", label: "AWARDS", icon: <GoTrophy /> },
  { end: 190, suffix: "+", label: "CASE STUDIES", icon: <IoBookOutline /> },
  { end: 2781, suffix: "+", label: "CUSTOMERS", icon: <HiOutlineUsers /> },
  { end: 9, suffix: "", label: "OFFICES", icon: <HiOutlineBuildingOffice2 /> },
];

const WIDTH = 960;
const HEIGHT = 500;
const ZOOM_SCALE = 1;

const WorldMap = () => {
  const navigate = useNavigate();
  const [geographies, setGeographies] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [selectedCityIndex, setSelectedCityIndex] = useState(2); // Lahore
  const [hasSelected, setHasSelected] = useState(false);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (inView) setValues(stats.map((s) => s.end));
  }, [inView]);

  const projection = d3.geoMercator().scale(148).translate([WIDTH / 2, HEIGHT / 1.6]);
  const pathGenerator = d3.geoPath().projection(projection);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        const countries = topojson.feature(data, data.objects.countries);
        setGeographies(countries.features);
      });
  }, []);

  const currentCountry = countriesData.find((c) => c.country === selectedCountry);
  const currentCities = currentCountry?.cities || [];
  const selectedCity = currentCities[selectedCityIndex] || currentCities[0];

  const zoomTarget = hasSelected && selectedCity ? projection(selectedCity.coordinates) : null;

  const groupTransform = zoomTarget
    ? `translate(${WIDTH / 2 - zoomTarget[0] * ZOOM_SCALE}, ${HEIGHT / 2 - zoomTarget[1] * ZOOM_SCALE}) scale(${ZOOM_SCALE})`
    : "translate(0, 0) scale(1)";

  const projectToPercent = (coords) => {
    const [rawX, rawY] = projection(coords);
    let finalX = rawX;
    let finalY = rawY;
    if (zoomTarget) {
      finalX = (WIDTH / 2 - zoomTarget[0] * ZOOM_SCALE) + rawX * ZOOM_SCALE;
      finalY = (HEIGHT / 2 - zoomTarget[1] * ZOOM_SCALE) + rawY * ZOOM_SCALE;
    }
    return { xPercent: (finalX / WIDTH) * 100, yPercent: (finalY / HEIGHT) * 100 };
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCityIndex(0);
    setHasSelected(true);
  };

  const handleCityChange = (e) => {
    setSelectedCityIndex(Number(e.target.value));
    setHasSelected(true);
  };

  return (
    <div className="wm-section">
      <div className="wm-heading">
        <h2 data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
          We're global to privilege you
        </h2>
        <p data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
          Sed ut perspiciatis unde omnis iste natus error sit voluptem suspec
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.
        </p>
      </div>

      <div className="wm-controls">
        <div className="wm-select-group">
          <div className="wm-select-wrapper">
            <select className="wm-select" value={selectedCountry} onChange={handleCountryChange}>
              {countriesData.map((c) => (
                <option key={c.country} value={c.country}>{c.country}</option>
              ))}
            </select>
            <MdKeyboardArrowDown className="wm-select-arrow" />
          </div>

          <div className="wm-select-wrapper">
            <select className="wm-select" value={selectedCityIndex} onChange={handleCityChange}>
              {currentCities.map((city, i) => (
                <option key={city.name} value={i}>{city.name}</option>
              ))}
            </select>
            <MdKeyboardArrowDown className="wm-select-arrow" />
          </div>
        </div>

        <button className="wm-btn" onClick={() => navigate("/services")}>
          See Services
        </button>
      </div>

      <div className="wm-map-outer" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
        <div className="wm-map-wrapper">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            <defs>
              <pattern id="dots" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.2" fill="#c8c8c8" />
              </pattern>
              <clipPath id="mapClip">
                <rect x="0" y="0" width={WIDTH} height={HEIGHT} />
              </clipPath>
            </defs>

            <g clipPath="url(#mapClip)">
              <g className="wm-zoom-group" transform={groupTransform}>
                {geographies.map((geo, i) => (
                  <path key={i} d={pathGenerator(geo)} fill="url(#dots)" stroke="none" />
                ))}

                {officeLocations.map((loc) => {
                  const [x, y] = projection(loc.coordinates);
                  return (
                    <g key={loc.name}>
                      <circle cx={x} cy={y} r={12} fill="rgba(255,80,0,0.15)">
                        <animate attributeName="r" from="7" to="15" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={x} cy={y} r={5} fill="#ff4500" />
                    </g>
                  );
                })}

                {selectedCity && (() => {
                  const [x, y] = projection(selectedCity.coordinates);
                  return (
                    <g>
                      <circle cx={x} cy={y} r={14} fill="rgba(37,99,235,0.18)">
                        <animate attributeName="r" from="8" to="18" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.7" to="0" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={x} cy={y} r={7} fill="#2563eb" stroke="#fff" strokeWidth="2" />
                    </g>
                  );
                })()}
              </g>
            </g>
          </svg>

          {officeLocations.map((loc) => {
            const { xPercent, yPercent } = projectToPercent(loc.coordinates);
            return (
              <div
                key={loc.name}
                className="wm-tooltip-permanent"
                style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
              >
                <strong>{loc.name.toUpperCase()}</strong>
                <span>{loc.area}</span>
              </div>
            );
          })}

          {selectedCity && (() => {
            const { xPercent, yPercent } = projectToPercent(selectedCity.coordinates);
            return (
              <div
                className="wm-tooltip-search"
                style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
              >
                <strong>{selectedCity.name.toUpperCase()}</strong>
                <span>{selectedCountry}</span>
              </div>
            );
          })()}
        </div>
      </div>

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