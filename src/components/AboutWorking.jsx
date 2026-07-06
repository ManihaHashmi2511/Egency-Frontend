import { FaPlay } from "react-icons/fa";

export default function AboutWorking() {
  return (
    <section className="working-section">
      {/* Heading */}
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="working-heading">
          TAKE A VITAL LOOK AT OUR WORKING
        </h2>
      </div>

      {/* Video Image with Play Button */}
      <div className="working-video-wrapper" data-aos="zoom-in">
        <img
          src="/about-work.jpg"
          alt="Our Working"
          className="working-image"
        />

        {/* Play Button with pulsing rays */}
        <div className="play-button-wrapper">
          <span className="pulse-ring"></span>
          <span className="pulse-ring delay-1"></span>
          <span className="pulse-ring delay-2"></span>
          <button className="play-button">
            <FaPlay />
          </button>
        </div>
      </div>
    </section>
  );
}
