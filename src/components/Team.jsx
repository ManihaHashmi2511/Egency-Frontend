import { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin } from "react-icons/fa";
import { API_URL } from "../utils/apiUrl";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/team`)
      .then((res) => {
        setTeam(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (team.length === 0)
    return <p className="text-center py-10">No team members found.</p>;

  return (
    <section className="team-section">
      {/* Heading */}
      <div className="text-start  mb-12" data-aos="fade-up">
        <h2 className="team-heading">
          MEET OUR <span className="text-red-500">EXPERT TEAM</span>
        </h2>
      </div>

      {/* Team Grid */}
      <div className="team-grid">
        {team.map((member, index) => (
          <div
            key={member._id}
            className="team-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="team-img-wrapper">
              <img src={member.image} alt={member.name} className="team-img" />

              {/* LinkedIn Overlay */}
              <div className="team-overlay">
                <a
                  href={member.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-linkedin-btn"
                >
                  <span>Linked</span>
                  <FaLinkedin className="W-6 h-6" />
                </a>
              </div>
            </div>

            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}