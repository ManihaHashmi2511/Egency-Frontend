import { useEffect } from "react";
import { useLocation } from "react-router-dom";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      const maxAttempts = 30; // 3 second tak retry karega jab tak element mile

      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          scrollToElement();
          // Corrective re-scroll thodi der baad - agar images load hone se page shift hua ho, wapas sahi jagah le jata hai
          setTimeout(scrollToElement, 600);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };

      tryScroll();
    } else {
      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      html.style.scrollBehavior = previousBehavior || "";
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;