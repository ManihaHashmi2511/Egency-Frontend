import { useEffect, useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import Pagination from "./Pagination";
import {
  MdSearch,
  MdOutlineDelete,
  MdCircle,
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdClose,
  MdOutlinePerson,
  MdKeyboardArrowDown,
} from "react-icons/md";

const ITEMS_PER_PAGE = 7;

const ContactMessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact");
      setMessages(res.data);
    } catch (error) {
      console.log("Contact messages fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filtered = messages.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unread" && !m.isRead) ||
      (statusFilter === "read" && m.isRead);
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const paginatedMessages = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await api.put(`/contact/${msg._id}`, { isRead: true });
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
        );
      } catch (error) {
        console.log("Mark as read error:", error);
      }
    }
  };

  const handleDelete = async (msg) => {
    const confirm = await Swal.fire({
      title: `Delete message from ${msg.name}?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/contact/${msg._id}`);
      Swal.fire("Deleted", "Message removed successfully", "success");
      setSelectedMessage(null);
      fetchMessages();
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
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-base py-14">Loading messages...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-14">No messages found</div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {paginatedMessages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => openMessage(msg)}
                className={`bg-white rounded-2xl border p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all ${
                  !msg.isRead ? "border-red-200 bg-red-50/30" : "border-gray-100"
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-base font-semibold shrink-0">
                  {msg.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {!msg.isRead && <MdCircle className="text-red-500 text-[8px] shrink-0" />}
                    <h4 className="text-base font-semibold text-gray-800 truncate">{msg.name}</h4>
                  </div>
                  <p className="text-gray-500 text-sm truncate">{msg.message}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-gray-400 text-sm">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg);
                  }}
                  className="p-2.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer transition-colors shrink-0"
                >
                  <MdOutlineDelete className="text-xl" />
                </button>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="bg-linear-to-r from-[#1a1a1a] to-[#3d0e10] px-6 py-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                  <MdOutlinePerson className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-white">{selectedMessage.name}</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-white/60 hover:text-white cursor-pointer transition-colors"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 text-gray-600 text-base">
                <MdOutlineMailOutline className="text-gray-400 text-xl" />
                {selectedMessage.email}
              </div>
              {selectedMessage.phone && (
                <div className="flex items-center gap-2 text-gray-600 text-base">
                  <MdOutlinePhone className="text-gray-400 text-xl" />
                  {selectedMessage.phone}
                </div>
              )}
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-700 text-base leading-relaxed">{selectedMessage.message}</p>
              </div>
              <p className="text-gray-400 text-sm">
                Received on {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 shrink-0">
              <a
                href={`mailto:${selectedMessage.email}`}
                className="flex-1 text-center py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-medium cursor-pointer transition-colors"
              >
                Reply via Email
              </a>
              <button
                onClick={() => handleDelete(selectedMessage)}
                className="px-6 py-2.5 rounded-xl border border-red-200 text-red-600 text-base font-medium hover:bg-red-50 cursor-pointer transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessagesTable;