import {
  MdSpaceDashboard,
  MdOutlineRateReview,
  MdOutlineGroups,
  MdOutlineQuestionAnswer,
  MdOutlineDesignServices,
  MdOutlineAutoAwesome,
  MdOutlineArticle,
  MdOutlineCases,
  MdOutlineFolderSpecial,
  MdOutlineMailOutline,
  MdOutlineSettings,
  MdOutlineCampaign,
} from "react-icons/md";

export const menuItems = [
  { key: "always", label: "Dashboard", icon: MdSpaceDashboard, path: "/admin/dashboard" },
  { key: "comingsoon", label: "Coming Soon Banner", icon: MdOutlineCampaign, path: "/admin/coming-soon" },
  { key: "testimonials", label: "Testimonials", icon: MdOutlineRateReview, path: "/admin/testimonials" },
  { key: "team", label: "Team Members", icon: MdOutlineGroups, path: "/admin/team" },
  { key: "faqs", label: "FAQs", icon: MdOutlineQuestionAnswer, path: "/admin/faqs" },
  { key: "services", label: "Services", icon: MdOutlineDesignServices, path: "/admin/services" },
  { key: "whatwedo", label: "What We Do", icon: MdOutlineAutoAwesome, path: "/admin/what-we-do" },
  { key: "blog", label: "Blog", icon: MdOutlineArticle, path: "/admin/blog" },
  { key: "portfolio", label: "Portfolio", icon: MdOutlineCases, path: "/admin/portfolio" },
  { key: "casestudies", label: "Case Studies", icon: MdOutlineFolderSpecial, path: "/admin/case-studies" },
  { key: "contact", label: "Contact Messages", icon: MdOutlineMailOutline, path: "/admin/contact" },
  { key: "always", label: "Settings", icon: MdOutlineSettings, path: "/admin/settings" },
];