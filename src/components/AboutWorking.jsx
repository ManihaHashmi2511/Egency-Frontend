import { useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";


const VIDEO_EMBED_URL = "https://www.youtube.com/embed/wkr1D7zTR_g";

export default function AboutWorking() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="working-section">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="working-heading">
          TAKE A VITAL LOOK AT OUR WORKING
        </h2>
      </div>

      <div className="working-video-wrapper" data-aos="zoom-in">
        <img
          src="/about-work.jpg"
          alt="Our Working"
          className="working-image"
        />

        <div className="play-button-wrapper">
          <span className="pulse-ring"></span>
          <span className="pulse-ring delay-1"></span>
          <span className="pulse-ring delay-2"></span>
          <button
            className="play-button"
            onClick={() => setShowVideo(true)}
            aria-label="Play video"
          >
            <FaPlay />
          </button>
        </div>
      </div>

      {/* Video Popover Modal */}
      {showVideo && (
        <div className="video-modal-overlay" onClick={() => setShowVideo(false)}>
          <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              <FaTimes />
            </button>
            <div className="video-modal-frame">
              <iframe
                src={`${VIDEO_EMBED_URL}?autoplay=1`}
                title="Company Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}