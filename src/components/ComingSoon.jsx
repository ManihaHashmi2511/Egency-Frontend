import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";

export default function ComingSoon() {
  const [banner, setBanner] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/coming-soon`)
      .then((res) => {
        const active = res.data.find((b) => b.isActive);
        setBanner(active || null);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  useEffect(() => {
    if (!banner?.eventDate) return;

    const eventDate = new Date(banner.eventDate);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [banner]);

  // Koi active banner na ho to section render hi nahi hota
  if (!banner) return null;

  return (
    <section className="coming-soon-wrapper" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1000">
      <div className="coming-soon-box">
        <div className="dot blue"></div>
        <div className="dot orange"></div>
        <div className="dot teal"></div>
        <div className="dot purple"></div>

        <div className="coming-soon-content">
          <h2 className="coming-soon-heading">
            <span className="text-[#e90b16]">{banner.highlightText}</span> {banner.headingRest}
          </h2>

          <p className="coming-soon-para">{banner.description}</p>

          <div className="coming-soon-timer">
            <div className="timer-box">
              <span className="timer-num">{timeLeft.days}</span>
              <span className="timer-label">Days</span>
            </div>
            <span className="timer-colon">:</span>
            <div className="timer-box">
              <span className="timer-num">{timeLeft.hours}</span>
              <span className="timer-label">Hours</span>
            </div>
            <span className="timer-colon">:</span>
            <div className="timer-box">
              <span className="timer-num">{timeLeft.mins}</span>
              <span className="timer-label">Mins</span>
            </div>
            <span className="timer-colon">:</span>
            <div className="timer-box">
              <span className="timer-num">{timeLeft.secs}</span>
              <span className="timer-label">Secs</span>
            </div>
          </div>

          <Link to={banner.buttonLink || "/contact"}>
            <button className="btn-primary mt-6">{banner.buttonText || "Register now!"}</button>
          </Link>
        </div>

        <div className="coming-soon-img-wrapper">
          <img src={banner.image || "/Man-img2.png"} alt="Event" className="coming-soon-img" />
        </div>
      </div>
    </section>
  );
}