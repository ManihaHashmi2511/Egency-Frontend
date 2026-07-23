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
  MdOutlineHelpOutline,
} from "react-icons/md";

const FAQsTable = () => {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/faqs");
      setFaqs(res.data);
    } catch (error) {
      console.log("FAQs fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const filtered = faqs.filter(
    (f) =>
      f.question?.toLowerCase().includes(search.toLowerCase()) ||
      f.answer?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (faq) => {
    const confirm = await Swal.fire({
      title: "Delete this FAQ?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/faqs/${faq._id}`);
      Swal.fire("Deleted", "FAQ removed successfully", "success");
      fetchFaqs();
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
            placeholder="Search questions or answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          onClick={() => navigate("/admin/faqs/add")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-base py-10">Loading FAQs...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-10">No FAQs found</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((faq) => {
            const isOpen = expandedId === faq._id;
            return (
              <div
                key={faq._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <div
                  onClick={() => toggleExpand(faq._id)}
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <MdOutlineHelpOutline className="text-xl" />
                    </div>
                    <p className="text-base font-medium text-gray-800">{faq.question}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/admin/faqs/edit", { state: { faq } });
                      }}
                      className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors"
                    >
                      <MdOutlineEdit className="text-xl" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(faq);
                      }}
                      className="p-2.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer transition-colors"
                    >
                      <MdOutlineDelete className="text-xl" />
                    </button>
                    <MdKeyboardArrowDown
                      className={`text-2xl text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {isOpen && (
                  <div className="px-5 pb-4 pl-15">
                    <p className="text-gray-500 text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FAQsTable;