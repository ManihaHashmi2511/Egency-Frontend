import { useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import ImageDropzone from "./ImageDropzone";
import { MdClose, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const PERMISSION_MODULES = [
  { key: "comingsoon", label: "Coming Soon Banner" },
  { key: "testimonials", label: "Testimonials" },
  { key: "team", label: "Team Members" },
  { key: "faqs", label: "FAQs" },
  { key: "services", label: "Services" },
  { key: "whatwedo", label: "What We Do" },
  { key: "blog", label: "Blog" },
  { key: "portfolio", label: "Portfolio" },
  { key: "casestudies", label: "Case Studies" },
  { key: "contact", label: "Contact Messages" },
];

const StaffFormModal = ({ editingStaff, onClose, onSuccess }) => {
  const isEditMode = Boolean(editingStaff);

  const [form, setForm] = useState({
    name: editingStaff?.name || "",
    email: editingStaff?.email || "",
    phone: editingStaff?.phone || "",
    password: "",
    role: editingStaff?.role || "user",
    permissions: editingStaff?.permissions || [],
    profileImg: editingStaff?.profileImg || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePermission = (key) => {
    setForm((prev) => {
      const alreadySelected = prev.permissions.includes(key);
      return {
        ...prev,
        permissions: alreadySelected
          ? prev.permissions.filter((p) => p !== key)
          : [...prev.permissions, key],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = { ...form };
      if (isEditMode && !payload.password) {
        delete payload.password;
      }

      if (isEditMode) {
        await api.put(`/users/staff/${editingStaff._id}`, payload);
        Swal.fire("Updated", "Staff member updated successfully", "success");
      } else {
        await api.post("/users/staff", payload);
        Swal.fire("Created", "Staff member added successfully", "success");
      }

      onSuccess();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <h3 className="text-xl font-semibold text-gray-800">
            {isEditMode ? "Edit Staff Member" : "Add Staff Member"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <MdClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 flex flex-col gap-4">
          <div>
            <label className="text-base font-medium text-gray-600 block mb-2">Profile Picture</label>
            <div className="w-24">
              <ImageDropzone
                value={form.profileImg}
                onChange={(url) => setForm({ ...form, profileImg: url })}
                shapeClass="rounded-full"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              {isEditMode ? "New Password" : "Password"}{" "}
              {isEditMode && <span className="text-gray-400 font-normal text-sm">(leave blank to keep current)</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required={!isEditMode}
                className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <MdOutlineVisibilityOff className="text-xl" /> : <MdOutlineVisibility className="text-xl" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-2">Module Permissions</label>
            <div className="grid grid-cols-2 gap-2">
              {PERMISSION_MODULES.map((mod) => {
                const checked = form.permissions.includes(mod.key);
                return (
                  <label
                    key={mod.key}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                      checked
                        ? "bg-red-50 border-red-300 text-red-700"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePermission(mod.key)}
                      className="accent-red-600 cursor-pointer"
                    />
                    {mod.label}
                  </label>
                );
              })}
            </div>
          </div>
        </form>

        <div className="flex gap-3 p-6 pt-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffFormModal;