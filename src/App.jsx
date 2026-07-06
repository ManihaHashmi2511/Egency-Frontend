import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import GraphicDesign from './pages/GraphicDesign'
import Services from './pages/Services'
import Dashboard from './Admin/Pages/Dashboard'
import Signup from './Admin/Pages/Signup'
import Login from './Admin/Pages/Login'
import ProtectedRoute from './Admin/Components/ProtectedRoute'
import BlogDetail from './pages/BlogDetail'
import PortfolioDetail from './pages/PortfolioDetail'
import Contact from './pages/Contact'
import CaseStudies from './pages/CaseStudies'
import CaseStudyDetail from './pages/CaseStudyDetail'
import Industries from './pages/Industries'

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/graphic-designing" element={<GraphicDesign />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path='/contact' element ={<Contact/>} />
        <Route path="/industries" element={<Industries />} />


        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/case-studies/:id" element={<CaseStudyDetail />} />




       {/* Admin Routes */}
        
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route → sirf logged in user */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


      </Routes>
      </BrowserRouter>
    </div>
  )
}
