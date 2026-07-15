import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../adminMenu";

const Sidebar = ({ collapsed, mobileOpen, onCloseMobile }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const canAccess = (key) => {
    if (key === "always") return true;
    if (user.role === "superadmin") return true;
    return user.permissions?.includes(key);
  };

  // Mobile pe drawer khula ho to hamesha full labels dikhte hain (icon-only sirf desktop-collapsed state mein)
  const iconOnly = collapsed && !mobileOpen;

  return (
    <>
      {/* Mobile backdrop - drawer ke bahar tap karne se band ho jata hai */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 h-full bg-linear-to-b from-[#1a1a1a] to-[#2b0a0c] text-white flex flex-col shadow-xl overflow-hidden transition-all duration-300 w-64 rounded-r-3xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:rounded-3xl
          ${collapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-center gap-2 h-18.25 shrink-0">
          {iconOnly ? (
            <h1 className="text-xl font-bold text-red-500">E</h1>
          ) : (
            <h1 className="text-xl font-bold tracking-wide whitespace-nowrap">
              Egency <span className="text-red-500">Admin</span>
            </h1>
          )}
        </div>

        {/* Role badge */}
        {!iconOnly && (
          <div className="px-6 py-3 border-b border-white/10 shrink-0">
            <span className="text-xs uppercase tracking-wide bg-red-600/20 text-red-400 px-3 py-1 rounded-full font-semibold">
              {user.role}
            </span>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-1 mt-2 overflow-y-auto overflow-x-hidden thin-scroll">
          {menuItems.map((item, index) => {
            if (!canAccess(item.key)) return null;

            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={onCloseMobile}
                title={iconOnly ? item.label : ""}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition font-medium text-sm
                  ${iconOnly ? "justify-center" : ""}
                  ${
                    isActive
                      ? "bg-red-600 text-white shadow"
                      : "hover:bg-white/10 text-white/70"
                  }`}
              >
                <Icon className="text-lg shrink-0" />
                {!iconOnly && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <p className="text-white/30 text-xs text-center">
            {iconOnly ? "©" : "© 2026 Egency Digital"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;