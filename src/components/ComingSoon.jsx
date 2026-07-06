import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    // Event date — 45 days baad
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() + 45);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="coming-soon-wrapper" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1000">
      <div className="coming-soon-box">

        {/* Decorative Dots */}
        <div className="dot blue"></div>
        <div className="dot orange"></div>
        <div className="dot teal"></div>
        <div className="dot purple"></div>

        {/* Left Content */}
        <div className="coming-soon-content">
          <h2 className="coming-soon-heading">
            <span className="text-[#e90b16]">GRAPHIC DESIGN</span> EVENT <br />
            COMING SOON!
          </h2>

          <p className="coming-soon-para">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>

          {/* Timer */}
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

          <Link to={'/contact'} ><button className="btn-primary mt-6">Register now!</button></Link>
        </div>

        {/* Right Image */}
        <div className="coming-soon-img-wrapper">
          <img src="/Man-img2.png" alt="Event" className="coming-soon-img" />
        </div>

      </div>
    </section>
  );
}