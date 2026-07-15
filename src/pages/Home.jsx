import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServicesSlider from './ServicesSlider'
import GraphicDesign from './GraphicDesign'
import Portfolio from './Portfolio'
import Footer from '../components/Footer'
import ExpandingCards from '../components/ExpandingCards'
import ComingSoon from '../components/ComingSoon'
import Testimonials from '../components/Testmonials'
import { useLocation } from 'react-router-dom'


export default function Home() {
  
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ExpandingCards/>
      <ComingSoon/>
      <Portfolio/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}
