import React, { useState } from "react";

export default function ExpandingCards() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div>
      <section className="px-[6%] py-15 mb-8">
        <h2 data-aos="fade-left" data-aos-delay="200" className="section-heading text-[33px] text-[#2e2e2e] font-bold uppercase text-center mb-8.75">
          What We Can Do For You?
        </h2>

        <div className="expand-cards-wrapper flex gap-4 h-90 pt-3">
          <div
            className={`expand-card relative rounded-[14px] overflow-hidden cursor-pointer ${activeCard === 0 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(0)}
          >
            <div className="expand-card-red-bar"></div>
            <img src="/graphic design/service-1.jpg" alt="Branding" />
            <div
              className="absolute bottom-0 left-0 right-0 z-2 p-4 pt-5.5"
              style={{
                background:
                  "linear-gradient(to top, rgba(48,46,46,0.78) 0%, transparent 100%)",
              }}
            >
              <div className="text-white font-medium text-[21px] whitespace-nowrap overflow-hidden text-ellipsis">
                Branding
              </div>
              <div className="expand-card-desc text-white/90 text-base mt-1.75">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </div>
            </div>
          </div>

          <div
            className={`expand-card relative rounded-[14px] overflow-hidden cursor-pointer ${activeCard === 1 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(0)}
          >
            <div className="expand-card-red-bar"></div>
            <img src="/graphic design/service-2.jpg" alt="UI UX Design" />
            <div
              className="absolute bottom-0 left-0 right-0 z-2 p-4 pt-5.5"
              style={{
                background:
                  "linear-gradient(to top, rgba(48,46,46,0.78) 0%, transparent 100%)",
              }}
            >
              <div className="text-white font-medium text-[21px] whitespace-nowrap overflow-hidden text-ellipsis">
                UI / UX Design
              </div>
              <div className="expand-card-desc text-white/90 text-base mt-1.75">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </div>
            </div>
          </div>

          <div
            className={`expand-card relative rounded-[14px] overflow-hidden cursor-pointer ${activeCard === 2 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(2)}
            onMouseLeave={() => setActiveCard(0)}
          >
            <div className="expand-card-red-bar"></div>
            <img src="/graphic design/service-3.jpg" alt="Print Design" />
            <div
              className="absolute bottom-0 left-0 right-0 z-2 p-4 pt-5.5"
              style={{
                background:
                  "linear-gradient(to top, rgba(48,46,46,0.78) 0%, transparent 100%)",
              }}
            >
              <div className="text-white font-medium text-[21px] whitespace-nowrap overflow-hidden text-ellipsis">
                Print Design
              </div>
              <div className="expand-card-desc text-white/90 text-base mt-1.75">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </div>
            </div>
          </div>

          <div
            className={`expand-card relative rounded-[14px] overflow-hidden cursor-pointer ${activeCard === 3 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(3)}
            onMouseLeave={() => setActiveCard(0)}
          >
            <div className="expand-card-red-bar"></div>
            <img src="/graphic design/service-4.jpg" alt="Social Media" />
            <div
              className="absolute bottom-0 left-0 right-0 z-2 p-4 pt-5.5"
              style={{
                background:
                  "linear-gradient(to top, rgba(48,46,46,0.78) 0%, transparent 100%)",
              }}
            >
              <div className="text-white font-medium text-[21px] whitespace-nowrap overflow-hidden text-ellipsis">
                Social Media
              </div>
              <div className="expand-card-desc text-white/90 text-base mt-1.75">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </div>
            </div>
          </div>

          <div
            className={`expand-card relative rounded-[14px] overflow-hidden cursor-pointer ${activeCard === 4 ? "active" : ""}`}
            onMouseEnter={() => setActiveCard(4)}
            onMouseLeave={() => setActiveCard(0)}
          >
            <div className="expand-card-red-bar"></div>
            <img src="/graphic design/service-5.jpg" alt="Motion Graphics" />
            <div
              className="absolute bottom-0 left-0 right-0 z-2 p-4 pt-5.5"
              style={{
                background:
                  "linear-gradient(to top, rgba(48,46,46,0.78) 0%, transparent 100%)",
              }}
            >
              <div className="text-white font-medium text-[21px] whitespace-nowrap overflow-hidden text-ellipsis">
                Motion Graphics
              </div>
              <div className="expand-card-desc text-white/90 text-base mt-1.75">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
