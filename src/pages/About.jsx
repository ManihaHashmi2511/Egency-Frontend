import React from "react";
import Navbar2 from "../components/Navbar2";
import AboutWhoWeAre from "../components/AboutWhoWeAre";
import AboutWorking from "../components/AboutWorking";
import Team from "../components/Team";
import Footer from "../components/Footer"

export default function About() {
  return (
    <div>
      <Navbar2 />

        {/* WHO WE ARE */}
        <AboutWhoWeAre />

        {/* Look at our Work */}
        <AboutWorking/>

        {/* Team */}
        <Team/>

        {/* Footer */}
        <Footer />

    </div>
  );
}
