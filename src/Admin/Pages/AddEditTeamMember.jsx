import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import ImageDropzone from "../Components/ImageDropzone";
import api from "../../utils/api";
import Swal from "sweetalert2";
import { MdArrowBack, MdOutlinePerson, MdOutlineBadge, MdOutlineLink } from "react-icons/md";

const AddEditTeamMember = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.member || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    name: editingItem?.name || "",
    role: editingItem?.role || "",
    linkedin: editingItem?.linkedin || "",
    image: editingItem?.image || "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await api.put(`/team/${editingItem._id}`, form);
        Swal.fire("Updated", "Team member updated successfully", "success");
      } else {
        await api.post("/team", form);
        Swal.fire("Created", "Team member added successfully", "success");
      }
      navigate("/admin/team");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Team Member" : "Add Team Member"}>
      <button
        onClick={() => navigate("/admin/team")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-6 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to Team Members
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-base font-medium text-gray-600 block mb-2">Photo</label>
          <ImageDropzone
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Name</label>
            <div className="relative">
              <MdOutlinePerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Role / Designation</label>
            <div className="relative">
              <MdOutlineBadge className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                placeholder="e.g. Frontend Developer"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">LinkedIn URL</label>
            <div className="relative">
              <MdOutlineLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/team")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Team Member"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditTeamMember;