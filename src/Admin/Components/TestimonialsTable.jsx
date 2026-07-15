import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdSearch,
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdStar,
  MdStarBorder,
  MdOutlinePublic,
  MdKeyboardArrowDown,
} from "react-icons/md";

const TestimonialsTable = () => {
  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch (error) {
      console.log("Testimonials fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filtered = testimonials.filter((t) => {
    const matchesSearch =
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.country?.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter === "all" || t.rating === Number(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const handleDelete = async (item) => {
    const confirm = await Swal.fire({
      title: `Delete testimonial from ${item.name}?`,
      text: "Ye action wapas nahi ho sakta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/testimonials/${item._id}`);
      Swal.fire("Deleted", "Testimonial removed successfully", "success");
      fetchTestimonials();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) =>
        n <= rating ? (
          <MdStar key={n} className="text-amber-400 text-xl" />
        ) : (
          <MdStarBorder key={n} className="text-gray-300 text-xl" />
        )
      )}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by name or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="relative">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>

        <button
          onClick={() => navigate("/admin/testimonials/add")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto thin-scroll">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-base">Loading testimonials...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-base">No testimonials found</div>
        ) : (
          <table className="w-full text-base">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-left">
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Country</th>
                <th className="px-5 py-3.5 font-medium">Rating</th>
                <th className="px-5 py-3.5 font-medium">Review</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-800">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-base font-semibold">
                          {item.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {item.name}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MdOutlinePublic className="text-gray-400 text-lg" />
                      {item.country}
                    </span>
                  </td>

                  <td className="px-5 py-4">{renderStars(item.rating)}</td>

                  <td className="px-5 py-4 text-gray-500 max-w-xs truncate">{item.review}</td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          navigate("/admin/testimonials/edit", { state: { testimonial: item } })
                        }
                        className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors"
                      >
                        <MdOutlineEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer transition-colors"
                      >
                        <MdOutlineDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestimonialsTable;