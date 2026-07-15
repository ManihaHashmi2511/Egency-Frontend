import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdSearch,
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdArrowUpward,
  MdArrowDownward,
} from "react-icons/md";

const ServicesTable = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.log("Services fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filtered = services.filter((s) =>
    s.title?.toLowerCase().includes(search.toLowerCase())
  );

  // do services ka "order" field aapas mein swap kar deta hai - isse list mein unki position badal jati hai
  const swapOrder = async (indexA, indexB) => {
    const listCopy = [...services];
    const itemA = listCopy[indexA];
    const itemB = listCopy[indexB];

    try {
      await Promise.all([
        api.put(`/services/${itemA._id}`, { order: itemB.order }),
        api.put(`/services/${itemB._id}`, { order: itemA.order }),
      ]);
      fetchServices();
    } catch (error) {
      Swal.fire("Error", "Reorder nahi ho saka, dobara try karo", "error");
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    swapOrder(index, index - 1);
  };

  const handleMoveDown = (index) => {
    if (index === services.length - 1) return;
    swapOrder(index, index + 1);
  };

  const handleDelete = async (service) => {
    const confirm = await Swal.fire({
      title: `Delete "${service.title}"?`,
      text: "Ye action wapas nahi ho sakta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/services/${service._id}`);
      Swal.fire("Deleted", "Service removed successfully", "success");
      fetchServices();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          onClick={() => navigate("/admin/services/add")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add Service
        </button>
      </div>

      {search && (
        <p className="text-gray-400 text-sm mb-3">
          Reorder arrows sirf full list (bina search) mein kaam karte hain
        </p>
      )}

      {loading ? (
        <div className="text-center text-gray-400 text-base py-10">Loading services...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-10">No services found</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((service, index) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              {/* Reorder arrows */}
              {!search && (
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <MdArrowUpward className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === filtered.length - 1}
                    className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <MdArrowDownward className="text-lg" />
                  </button>
                </div>
              )}

              {/* Order badge */}
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-sm font-semibold shrink-0">
                {index + 1}
              </div>

              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                {service.image ? (
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl font-semibold">
                    {service.title?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-gray-800 truncate">{service.title}</h4>
                <p className="text-gray-500 text-sm truncate">{service.desc}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate("/admin/services/edit", { state: { service } })}
                  className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors"
                >
                  <MdOutlineEdit className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(service)}
                  className="p-2.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer transition-colors"
                >
                  <MdOutlineDelete className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesTable;