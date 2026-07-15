import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import GraphicDesign from "./pages/GraphicDesign";
import Services from "./pages/Services";
import Login from "./Admin/Pages/Login";
import ProtectedRoute from "./Admin/Components/ProtectedRoute";
import BlogDetail from "./pages/BlogDetail";
import PortfolioDetail from "./pages/PortfolioDetail";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Industries from "./pages/Industries";
import AdminDashboard from "./Admin/Pages/Dashboard";
import Settings from "./Admin/Pages/Settings";
import AddEditTestimonial from "./Admin/Pages/AddEditTestimonial";
import AdminTestimonials from "./Admin/Components/AdminTestimonials";
import TeamMembers from "./Admin/Pages/TeamMembers";
import AddEditTeamMember from "./Admin/Pages/AddEditTeamMember";
import FAQs from "./Admin/Pages/FAQs";
import AddEditFAQ from "./Admin/Pages/AddEditFAQ";
import AdminServices from "./Admin/Pages/AdminServices";
import AddEditService from "./Admin/Pages/AddEditService";
import AdminWhatWeDo from "./Admin/Pages/AdminWhatWeDo";
import AddEditWhatWeDo from "./Admin/Pages/AddEditWhatWeDo";
import BlogPosts from "./Admin/Pages/BlogPosts";
import AddEditBlogPost from "./Admin/Pages/AddEditBlogPost";
import AdminPortfolio from "./Admin/Pages/AdminPortfolio";
import AddEditPortfolio from "./Admin/Pages/AddEditPortfolio";
import AdminCaseStudies from "./Admin/Pages/AdminCaseStudies";
import AddEditCaseStudy from "./Admin/Pages/AddEditCaseStudy";
import AdminContactMessages from "./Admin/Pages/ContactMessages";
import ContactMessages from "./Admin/Pages/ContactMessages";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/graphic-designing" element={<GraphicDesign />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/industries" element={<Industries />} />

          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetail />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute requiredPermission="testimonials">
                <AdminTestimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials/add"
            element={
              <ProtectedRoute requiredPermission="testimonials">
                <AddEditTestimonial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials/edit"
            element={
              <ProtectedRoute requiredPermission="testimonials">
                <AddEditTestimonial />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/team"
            element={
              <ProtectedRoute requiredPermission="team">
                <TeamMembers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/team/add"
            element={
              <ProtectedRoute requiredPermission="team">
                <AddEditTeamMember />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/team/edit"
            element={
              <ProtectedRoute requiredPermission="team">
                <AddEditTeamMember />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/faqs"
            element={
              <ProtectedRoute requiredPermission="faqs">
                <FAQs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/faqs/add"
            element={
              <ProtectedRoute requiredPermission="faqs">
                <AddEditFAQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/faqs/edit"
            element={
              <ProtectedRoute requiredPermission="faqs">
                <AddEditFAQ />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/services"
            element={
              <ProtectedRoute requiredPermission="services">
                <AdminServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/add"
            element={
              <ProtectedRoute requiredPermission="services">
                <AddEditService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services/edit"
            element={
              <ProtectedRoute requiredPermission="services">
                <AddEditService />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/what-we-do"
            element={
              <ProtectedRoute requiredPermission="whatwedo">
                <AdminWhatWeDo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/what-we-do/add"
            element={
              <ProtectedRoute requiredPermission="whatwedo">
                <AddEditWhatWeDo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/what-we-do/edit"
            element={
              <ProtectedRoute requiredPermission="whatwedo">
                <AddEditWhatWeDo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute requiredPermission="blog">
                <BlogPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/add"
            element={
              <ProtectedRoute requiredPermission="blog">
                <AddEditBlogPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/edit"
            element={
              <ProtectedRoute requiredPermission="blog">
                <AddEditBlogPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio"
            element={
              <ProtectedRoute requiredPermission="portfolio">
                <AdminPortfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio/add"
            element={
              <ProtectedRoute requiredPermission="portfolio">
                <AddEditPortfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/portfolio/edit"
            element={
              <ProtectedRoute requiredPermission="portfolio">
                <AddEditPortfolio />
              </ProtectedRoute>
            }
          />

          {/* ── ADMIN: Case Studies ── */}
          <Route
            path="/admin/case-studies"
            element={
              <ProtectedRoute requiredPermission="casestudies">
                <AdminCaseStudies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/case-studies/add"
            element={
              <ProtectedRoute requiredPermission="casestudies">
                <AddEditCaseStudy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/case-studies/edit"
            element={
              <ProtectedRoute requiredPermission="casestudies">
                <AddEditCaseStudy />
              </ProtectedRoute>
            }
          />

          {/* ── ADMIN: Contact Messages ── */}
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute requiredPermission="contact">
                <ContactMessages />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
