import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
  if (window.innerWidth >= 1024) {
    // Desktop: sirf collapse/expand
    setCollapsed(!collapsed);
  } else {
    // Mobile: sirf drawer open/close
    setMobileOpen(!mobileOpen);
  }
};

  return (
    <div className="h-screen w-screen bg-gray-200 p-2 sm:p-4 flex gap-4 overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col gap-4 h-full overflow-hidden min-w-0">
        <Topbar
          title={title}
          collapsed={collapsed}
          onToggleSidebar={toggleSidebar}
        />

        <div className="flex-1 bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-y-auto thin-scroll p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;