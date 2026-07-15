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
  MdOutlineDashboardCustomize,
} from "react-icons/md";

const WhatWeDoTable = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCards = async () => {
    try {
      setLoading(true);
      const res = await api.get("/what-we-do");
      setCards(res.data);
    } catch (error) {
      console.log("What We Do fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const filtered = cards.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  const swapOrder = async (indexA, indexB) => {
    const itemA = cards[indexA];
    const itemB = cards[indexB];
    try {
      await Promise.all([
        api.put(`/what-we-do/${itemA._id}`, { order: itemB.order }),
        api.put(`/what-we-do/${itemB._id}`, { order: itemA.order }),
      ]);
      fetchCards();
    } catch (error) {
      Swal.fire("Error", "Reorder nahi ho saka, dobara try karo", "error");
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    swapOrder(index, index - 1);
  };

  const handleMoveDown = (index) => {
    if (index === cards.length - 1) return;
    swapOrder(index, index + 1);
  };

  const handleDelete = async (card) => {
    const confirm = await Swal.fire({
      title: `Delete "${card.title}"?`,
      text: "Ye action wapas nahi ho sakta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/what-we-do/${card._id}`);
      Swal.fire("Deleted", "Card removed successfully", "success");
      fetchCards();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div>
      {/* Header bar with icon accent */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center shadow-md shadow-red-200">
          <MdOutlineDashboardCustomize className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">What We Do Cards</h3>
          <p className="text-gray-400 text-sm">Home page ke "What We Do" section ke cards</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          onClick={() => navigate("/admin/what-we-do/add")}
          className="flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-all shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add Card
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-base py-10">Loading cards...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-10">No cards found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((card, index) => (
            <div
              key={card._id}
              className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Order badge */}
              <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold flex items-center justify-center">
                {index + 1}
              </div>

              {/* Reorder controls - top right, appear cleanly */}
              {!search && (
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
                    disabled={index === filtered.length - 1}
                    className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <MdArrowDownward className="text-sm" />
                  </button>
                </div>
              )}

              {/* Image with gradient overlay */}
              <div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-50 to-red-100 text-red-400 text-3xl font-semibold">
                    {card.title?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2">{card.desc}</p>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => navigate("/admin/what-we-do/edit", { state: { card } })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium cursor-pointer transition-colors border border-gray-200"
                  >
                    <MdOutlineEdit className="text-lg" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(card)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm font-medium cursor-pointer transition-colors border border-red-100"
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

export default WhatWeDoTable;