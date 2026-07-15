import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/apiUrl";

export default function ExpandingCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/what-we-do`)
      .then((res) => {
        setCards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (cards.length === 0)
    return <p className="text-center py-10">No cards found.</p>;

  return (
    <div>
      <section className="px-[6%] py-15 mb-8">
        <h2
          data-aos="fade-left"
          data-aos-delay="200"
          className="section-heading text-[33px] text-[#2e2e2e] font-bold uppercase text-center mb-8.75"
        >
          What We Can Do For You?
        </h2>

        <div className="expand-cards-wrapper flex gap-4 h-90 pt-3">
          {cards.map((card, index) => (
            <div
              key={card._id}
              className={`expand-card relative rounded-[14px] overflow-hidden cursor-pointer ${
                activeCard === index ? "active" : ""
              }`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(0)}
            >
              <div className="expand-card-red-bar"></div>
              <img src={card.image} alt={card.title} />
              <div
                className="absolute bottom-0 left-0 right-0 z-2 p-4 pt-5.5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(48,46,46,0.78) 0%, transparent 100%)",
                }}
              >
                <div className="text-white font-medium text-[21px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {card.title}
                </div>
                <div className="expand-card-desc text-white/90 text-base mt-1.75">
                  {card.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}