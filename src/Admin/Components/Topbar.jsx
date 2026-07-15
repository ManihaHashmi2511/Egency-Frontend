import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
  FaBell,
  FaBars,
  FaUserCog,
} from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import axios from "axios";
import { menuItems } from "../adminMenu";
import { API_URL } from "../../utils/apiUrl";

const Topbar = ({ title, onToggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const [unreadCount, setUnreadCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const filteredResults = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canSeeContacts = user.role === "superadmin" || user.permissions?.includes("contact");

  const fetchNotifications = () => {
    if (!canSeeContacts) return;

    const token = localStorage.getItem("token");
    axios
      .get(`${API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const unread = res.data.filter((msg) => !msg.isRead).length;
        setUnreadCount(unread);
        setRecentMessages(res.data.slice(0, 4));
      })
      .catch((err) => console.log("Error fetching messages:", err));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (path) => {
    navigate(path);
    setSearchTerm("");
    setShowResults(false);
  };

  const handleBellClick = () => {
    if (!showNotifications) fetchNotifications();
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d80712",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.post(
            `${API_URL}/users/logout`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.log("Logout error:", error);
        } finally {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 shrink-0">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="text-gray-500 hover:text-red-600 cursor-pointer text-xl transition shrink-0"
        >
          <FaBars />
        </button>
        <h2 className="text-lg sm:text-2xl font-bold text-gray-700 tracking-wide truncate">
          {title}
        </h2>
      </div>

      {/* Search - chhoti screens pe hide, taake title/icons ko jagah mile */}
      <div className="relative flex-1 max-w-md hidden md:block" ref={searchRef}>
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search modules... (e.g. Blog, Contact)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition text-sm"
        />

        {showResults && searchTerm && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left text-sm text-gray-700"
                  >
                    <Icon className="text-red-500" />
                    {item.label}
                  </button>
                );
              })
            ) : (
              <p className="px-4 py-3 text-sm text-gray-400">No module found.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-3 shrink-0">
        {canSeeContacts && (
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={handleBellClick}
              className="relative text-gray-500 hover:text-red-600 cursor-pointer text-xl transition p-2"
              title="Notifications"
            >
              <FaBell />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h4 className="text-base font-semibold text-gray-800">Contact Messages</h4>
                </div>

                {recentMessages.length === 0 ? (
                  <p className="px-5 py-6 text-center text-gray-400 text-sm">No messages yet</p>
                ) : (
                  <div className="max-h-80 overflow-y-auto thin-scroll">
                    {recentMessages.map((msg) => (
                      <button
                        key={msg._id}
                        onClick={() => {
                          setShowNotifications(false);
                          navigate("/admin/contact");
                        }}
                        className="w-full flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition text-left border-b border-gray-50 last:border-0 cursor-pointer"
                      >
                        {!msg.isRead && (
                          <MdCircle className="text-red-500 text-[8px] mt-2 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{msg.name}</p>
                          <p className="text-gray-500 text-xs truncate">{msg.message}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/admin/contact");
                  }}
                  className="w-full text-center py-3 text-red-600 text-sm font-medium hover:bg-red-50 transition cursor-pointer border-t border-gray-100"
                >
                  View all messages
                </button>
              </div>
            )}
          </div>
        )}

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-gray-50 px-1.5 sm:px-2 py-1.5 rounded-xl transition"
          >
            <FaUserCircle className="text-2xl text-red-500" />
            <div className="text-sm text-left hidden sm:block">
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/admin/settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left text-sm text-gray-700"
              >
                <FaUserCog className="text-red-500" /> My Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-left text-sm text-red-600 border-t border-gray-100"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;