import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdSearch,
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdKeyboardArrowDown,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";

const PortfolioTable = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/portfolio");
      setItems(res.data);
    } catch (error) {
      console.log("Portfolio fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))];

  const filtered = items.filter((i) => {
    const matchesSearch =
      i.title?.toLowerCase().includes(search.toLowerCase()) ||
      i.client?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || i.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const swapOrder = async (indexA, indexB) => {
    const itemA = items[indexA];
    const itemB = items[indexB];
    try {
      await Promise.all([
        api.put(`/portfolio/${itemA._id}`, { order: itemB.order }),
        api.put(`/portfolio/${itemB._id}`, { order: itemA.order }),
      ]);
      fetchItems();
    } catch (error) {
      Swal.fire("Error", "Could not reorder, please try again", "error");
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    swapOrder(index, index - 1);
  };

  const handleMoveDown = (index) => {
    if (index === items.length - 1) return;
    swapOrder(index, index + 1);
  };

  const handleDelete = async (item) => {
    const confirm = await Swal.fire({
      title: `Delete "${item.title}"?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/portfolio/${item._id}`);
      Swal.fire("Deleted", "Project removed successfully", "success");
      fetchItems();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by title or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>

        <button
          onClick={() => navigate("/admin/portfolio/add")}
          className="flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl text-base font-medium transition-all shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add Project
        </button>
      </div>

      {search || categoryFilter !== "all" ? (
        <p className="text-gray-400 text-sm mb-4">Reorder arrows only work on the full unfiltered list</p>
      ) : null}

      {loading ? (
        <div className="text-center text-gray-400 text-base py-14">Loading projects...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-14">No projects found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <div
              key={item._id}
              className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {!search && categoryFilter === "all" && (
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <MdArrowUpward className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === items.length - 1}
                    className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <MdArrowDownward className="text-sm" />
                  </button>
                </div>
              )}

              <div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-50 to-red-100 text-red-400 text-3xl font-semibold">
                    {item.title?.charAt(0).toUpperCase()}
                  </div>
                )}
                {item.category && (
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {item.category}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                {item.client && <p className="text-gray-500 text-sm mb-4">Client: {item.client}</p>}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/admin/portfolio/edit", { state: { project: item } })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium cursor-pointer transition-colors border border-gray-200"
                  >
                    <MdOutlineEdit className="text-lg" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg hover:bg-red-50 text-red-600 text-sm font-medium cursor-pointer transition-colors border border-red-100"
                  >
                    <MdOutlineDelete className="text-lg" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioTable;