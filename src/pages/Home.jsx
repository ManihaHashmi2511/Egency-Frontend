import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ServicesSlider from './ServicesSlider'
import GraphicDesign from './GraphicDesign'
import Portfolio from './Portfolio'
import Footer from '../components/Footer'
import ExpandingCards from '../components/ExpandingCards'
import ComingSoon from '../components/ComingSoon'
import Testimonials from '../components/Testmonials'


export default function Home() {
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
