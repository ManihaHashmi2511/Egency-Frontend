import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import StatCard from "../Components/StatCard";
import api from "../../utils/api";
import {
  MdWavingHand,
  MdOutlineArticle,
  MdOutlineCases,
  MdOutlineRateReview,
  MdOutlineGroups,
  MdOutlineMailOutline,
  MdMarkEmailUnread,
  MdOutlinePersonAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineLockReset,
} from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BAR_COLORS = ["#3b82f6", "#a855f7", "#f59e0b", "#10b981", "#ec4899", "#06b6d4"];

const ACTION_ICONS = {
  created: MdOutlinePersonAdd,
  updated: MdOutlineEdit,
  deleted: MdOutlineDelete,
  password_changed: MdOutlineLockReset,
};

const ACTION_COLORS = {
  created: "text-emerald-500",
  updated: "text-blue-500",
  deleted: "text-red-500",
  password_changed: "text-amber-500",
};

const timeAgo = (dateString) => {
  const diffMs = new Date() - new Date(dateString);
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
};

const buildMonthlyGrowth = (blogs, portfolio) => {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleString("default", { month: "short" }),
      Blogs: 0,
      Portfolio: 0,
    });
  }
  const countInto = (items, field) => {
    items.forEach((item) => {
      const d = new Date(item.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = months.find((m) => m.key === key);
      if (bucket) bucket[field] += 1;
    });
  };
  countInto(blogs, "Blogs");
  countInto(portfolio, "Portfolio");
  return months;
};

const buildCategoryBreakdown = (portfolio) => {
  const counts = {};
  portfolio.forEach((item) => {
    const cat = item.category || "Uncategorized";
    counts[cat] = (counts[cat] || 0) + 1;
  });
  const total = portfolio.length || 1;
  return Object.entries(counts)
    .map(([name, value], index) => ({
      name,
      value,
      percent: Math.round((value / total) * 100),
      color: BAR_COLORS[index % BAR_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isSuperAdmin = user.role === "superadmin";

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    blogs: 0, portfolio: 0, testimonials: 0, team: 0, contacts: 0, unreadContacts: 0,
  });
  const [monthlyGrowth, setMonthlyGrowth] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, portfolioRes, testimonialsRes, teamRes, contactRes] =
          await Promise.all([
            api.get("/blogs"),
            api.get("/portfolio"),
            api.get("/testimonials"),
            api.get("/team"),
            api.get("/contact"),
          ]);

        const blogs = blogsRes.data;
        const portfolio = portfolioRes.data;
        const testimonials = testimonialsRes.data;
        const team = teamRes.data;
        const contacts = contactRes.data;
        const unreadContacts = contacts.filter((msg) => !msg.isRead).length;

        setStats({
          blogs: blogs.length,
          portfolio: portfolio.length,
          testimonials: testimonials.length,
          team: team.length,
          contacts: contacts.length,
          unreadContacts,
        });

        if (isSuperAdmin) {
          setMonthlyGrowth(buildMonthlyGrowth(blogs, portfolio));
          setCategoryData(buildCategoryBreakdown(portfolio));

          // Ab real activity log backend se aata hai - sab actions cover hote hain
          const activityRes = await api.get("/activity-logs");
          setRecentActivity(activityRes.data);
        }
      } catch (error) {
        console.log("Dashboard stats fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isSuperAdmin]);

  const statCards = [
    { label: "Total Blogs", count: stats.blogs, icon: MdOutlineArticle, cardBg: "bg-blue-50", iconBg: "bg-blue-500", permissionKey: "blog", path: "/admin/blog" },
    { label: "Portfolio Projects", count: stats.portfolio, icon: MdOutlineCases, cardBg: "bg-purple-50", iconBg: "bg-purple-500", permissionKey: "portfolio", path: "/admin/portfolio" },
    { label: "Testimonials", count: stats.testimonials, icon: MdOutlineRateReview, cardBg: "bg-amber-50", iconBg: "bg-amber-500", permissionKey: "testimonials", path: "/admin/testimonials" },
    { label: "Team Members", count: stats.team, icon: MdOutlineGroups, cardBg: "bg-emerald-50", iconBg: "bg-emerald-500", permissionKey: "team", path: "/admin/team" },
    { label: "Contact Messages", count: stats.contacts, icon: MdOutlineMailOutline, cardBg: "bg-cyan-50", iconBg: "bg-cyan-500", permissionKey: "contact", path: "/admin/contact" },
    { label: "Unread Messages", count: stats.unreadContacts, icon: MdMarkEmailUnread, cardBg: "bg-red-50", iconBg: "bg-red-500", permissionKey: "contact", path: "/admin/contact" },
  ];

  const visibleCards = isSuperAdmin
    ? statCards
    : statCards.filter((card) => user.permissions?.includes(card.permissionKey));

  return (
    <AdminLayout title="Dashboard">
      <h3 className="text-2xl font-bold flex items-center text-gray-800">
        Hello, {user?.name}! <MdWavingHand className="ml-2 text-amber-500 text-3xl" />
      </h3>
      <p className="text-gray-500 mt-2 mb-8">Welcome to Egency Digital Admin Panel.</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(isSuperAdmin ? 6 : 3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-24 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          {visibleCards.length === 0 ? (
            <p className="text-gray-400 text-base text-center py-10">
              No modules assigned yet — contact your Super Admin
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleCards.map((card) => (
                <StatCard key={card.label} {...card} onClick={() => navigate(card.path)} />
              ))}
            </div>
          )}

          {isSuperAdmin && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h4 className="text-gray-800 font-semibold mb-5">Content Growth (Last 6 Months)</h4>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={monthlyGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Blogs" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Portfolio" stroke="#a855f7" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h4 className="text-gray-800 font-semibold mb-5">Portfolio by Category</h4>
                  {categoryData.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-16">No portfolio projects yet</p>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {categoryData.map((cat) => (
                        <div key={cat.name}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                            <span className="text-sm text-gray-500">{cat.value} ({cat.percent}%)</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full transition-all"
                              style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mt-8 mb-4">
                <h4 className="text-gray-800 font-semibold mb-5">Recent Activity</h4>
                {recentActivity.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-6">No recent activity</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {recentActivity.map((log) => {
                      const Icon = ACTION_ICONS[log.action] || MdOutlineEdit;
                      const color = ACTION_COLORS[log.action] || "text-gray-500";
                      return (
                        <div
                          key={log._id}
                          className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`text-xl ${color}`} />
                            <div>
                              <p className="text-gray-800 text-sm font-medium">{log.description}</p>
                              <p className="text-gray-400 text-xs mt-0.5">
                                by {log.performedByName} ({log.performedByRole})
                              </p>
                            </div>
                          </div>
                          <span className="text-gray-400 text-xs shrink-0">{timeAgo(log.createdAt)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default Dashboard;