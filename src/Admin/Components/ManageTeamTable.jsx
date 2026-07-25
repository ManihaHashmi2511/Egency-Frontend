import { useEffect, useState } from "react";
import api from "../../utils/api";
import StaffFormModal from "./StaffFormModal";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import {
  MdSearch,
  MdOutlinePersonAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdCircle,
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdKeyboardArrowDown,
} from "react-icons/md";

const ITEMS_PER_PAGE = 7;

const ROLE_STYLES = {
  superadmin: "bg-purple-100 text-purple-700",
  admin: "bg-red-100 text-red-700",
  user: "bg-emerald-100 text-emerald-700",
  student: "bg-amber-100 text-amber-700",
};

const ManageTeamTable = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/staff");
      setStaff(res.data);
    } catch (error) {
      console.log("Staff fetch error:", error);
      Swal.fire("Error", error.response?.data?.message || "Could not load staff list", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name?.toLowerCase().includes(search.toLowerCase()) ||
      member.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddClick = () => {
    setEditingStaff(null);
    setModalOpen(true);
  };

  const handleEditClick = (member) => {
    setEditingStaff(member);
    setModalOpen(true);
  };

  const handleDelete = async (member) => {
    if (member.role === "superadmin") {
      Swal.fire("Not Allowed", "Super Admin account cannot be deleted", "warning");
      return;
    }

    const confirm = await Swal.fire({
      title: `Delete ${member.name}?`,
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/users/staff/${member._id}`);
      Swal.fire("Deleted", "Staff member removed successfully", "success");
      fetchStaff();
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
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            <option value="all">All Roles</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="student">Student</option>
          </select>
          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer"
        >
          <MdOutlinePersonAdd className="text-xl" />
          Add Staff
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-base">Loading staff...</div>
        ) : filteredStaff.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-base">No staff found</div>
        ) : (
          <table className="w-full text-base">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-left">
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Contact</th>
                <th className="px-5 py-3.5 font-medium">Role</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Permissions</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStaff.map((member) => (
                <tr key={member._id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-gray-800">
                    <div className="flex items-center gap-3">
                      {member.profileImg ? (
                        <img
                          src={member.profileImg}
                          alt={member.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-semibold shrink-0">
                          {member.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {member.name}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <MdOutlineMailOutline className="text-gray-400 text-lg" />
                      {member.email}
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <MdOutlinePhone className="text-gray-400 text-lg" />
                        {member.phone}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        ROLE_STYLES[member.role] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full w-fit ${
                        member.status === "online"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <MdCircle
                        className={`text-[8px] ${
                          member.status === "online" ? "text-emerald-500" : "text-amber-500"
                        }`}
                      />
                      {member.status === "online" ? "Online" : "Offline"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-55">
                      {member.role === "superadmin" ? (
                        <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-600 text-sm">
                          All Access
                        </span>
                      ) : member.permissions?.length > 0 ? (
                        member.permissions.map((perm) => (
                          <span
                            key={perm}
                            className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-sm capitalize"
                          >
                            {perm}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-300 text-sm">None</span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(member)}
                        className="p-2.5 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors"
                      >
                        <MdOutlineEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(member)}
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

      <Pagination
        currentPage={currentPage}
        totalItems={filteredStaff.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {modalOpen && (
        <StaffFormModal
          editingStaff={editingStaff}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchStaff();
          }}
        />
      )}
    </div>
  );
};

export default ManageTeamTable;