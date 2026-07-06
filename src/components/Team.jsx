import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const team = [
  {
    id: 1,
    name: "James Anderson",
    role: "Graphic Designer",
    image: "/team/member-1.jpg",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "UI/UX Designer",
    image: "/team/member-2.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Web Developer",
    image: "/team/member-3.jpg",
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "Content Strategist",
    image: "/team/member-4.jpg",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Digital Marketer",
    image: "/team/member-5.jpg",
  },
  {
    id: 6,
    name: "Olivia Brown",
    role: "Brand Strategist",
    image: "/team/member-6.jpg",
  },
  {
    id: 7,
    name: "Daniel Lee",
    role: "3D Animator",
    image: "/team/member-7.jpg",
  },
  {
    id: 8,
    name: "Hannah Davis",
    role: "Social Media Manager",
    image: "/team/member-8.jpg",
  },
];

export default function Team() {
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
            key={member.id}
            className="team-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="team-img-wrapper">
              <img src={member.image} alt={member.name} className="team-img" />

              {/* LinkedIn Overlay */}
              <div className="team-overlay">
                <a href="#" className="team-linkedin-btn">
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
