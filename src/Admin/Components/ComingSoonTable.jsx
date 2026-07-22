import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdCheckCircle,
  MdRadioButtonUnchecked,
} from "react-icons/md";

const ComingSoonTable = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await api.get("/coming-soon");
      setBanners(res.data);
    } catch (error) {
      console.log("Coming Soon fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleActivate = async (banner) => {
    try {
      await api.put(`/coming-soon/${banner._id}`, { isActive: true });
      Swal.fire("Activated", `"${banner.highlightText}" is now the live banner`, "success");
      fetchBanners();
    } catch (error) {
      Swal.fire("Error", "Could not activate banner", "error");
    }
  };

  const handleDelete = async (banner) => {
    const confirm = await Swal.fire({
      title: "Delete this banner?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/coming-soon/${banner._id}`);
      Swal.fire("Deleted", "Banner removed successfully", "success");
      fetchBanners();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/admin/coming-soon/add")}
          className="flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl text-base font-medium transition-all shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add Banner
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-base py-14">Loading banners...</div>
      ) : banners.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-14">No banners created yet</div>
      ) : (
        <div className="flex flex-col gap-4">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className={`bg-white rounded-2xl border p-5 flex items-center gap-5 ${
                banner.isActive ? "border-emerald-300 bg-emerald-50/30" : "border-gray-100"
              }`}
            >
              <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                {banner.image ? (
                  <img src={banner.image} alt={banner.highlightText} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl font-semibold">
                    {banner.highlightText?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-semibold text-gray-800 truncate">
                    {banner.highlightText} {banner.headingRest}
                  </h4>
                  {banner.isActive && (
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium shrink-0">
                      <MdCheckCircle className="text-sm" /> Live
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">{banner.description}</p>
                <p className="text-gray-400 text-xs mt-1">
                  Target: {new Date(banner.eventDate).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!banner.isActive && (
                  <button
                    onClick={() => handleActivate(banner)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <MdRadioButtonUnchecked className="text-lg" /> Activate
                  </button>
                )}
                <button
                  onClick={() => navigate("/admin/coming-soon/edit", { state: { banner } })}
                  className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors"
                >
                  <MdOutlineEdit className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(banner)}
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

export default ComingSoonTable;