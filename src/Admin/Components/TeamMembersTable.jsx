import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdSearch,
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdOutlineLink,
} from "react-icons/md";

const TeamMembersTable = () => {
  const navigate = useNavigate();

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await api.get("/team");
      setTeam(res.data);
    } catch (error) {
      console.log("Team fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const filtered = team.filter(
    (member) =>
      member.name?.toLowerCase().includes(search.toLowerCase()) ||
      member.role?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (member) => {
    const confirm = await Swal.fire({
      title: `Delete ${member.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/team/${member._id}`);
      Swal.fire("Deleted", "Team member removed successfully", "success");
      fetchTeam();
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
            placeholder="Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          onClick={() => navigate("/admin/team/add")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-base font-medium transition-colors cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add Team Member
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 text-base py-10">Loading team members...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-10">No team members found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="w-full aspect-square bg-gray-100">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-500 text-4xl font-semibold">
                    {member.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                <p className="text-gray-500 text-base">{member.role}</p>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-red-600 text-sm mt-2 hover:underline"
                  >
                    <MdOutlineLink className="text-base" /> LinkedIn
                  </a>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => navigate("/admin/team/edit", { state: { member } })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium cursor-pointer transition-colors border border-gray-200"
                  >
                    <MdOutlineEdit className="text-lg" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
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

export default TeamMembersTable;