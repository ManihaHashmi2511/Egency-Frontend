import { useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdClose,
  MdOutlinePerson,
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineLock,
  MdOutlineBadge,
  MdKeyboardArrowDown,
} from "react-icons/md";

const PERMISSION_MODULES = [
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
  });
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      {/* OUTER WRAPPER - overflow-hidden yahan hai, isliye corners hamesha rounded rahenge chahe scrollbar aaye ya na aaye */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* HEADER - dark+red gradient, brand theme match */}
        <div className="bg-linear-to-r from-[#1a1a1a] to-[#3d0e10] px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <MdOutlineBadge className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              {isEditMode ? "Edit Staff Member" : "Add Staff Member"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white cursor-pointer transition-colors"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        {/* SCROLLABLE FORM AREA */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 flex flex-col gap-4">
          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Full Name</label>
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
            <label className="text-base font-medium text-gray-600 block mb-1.5">Email</label>
            <div className="relative">
              <MdOutlineMailOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Phone</label>
            <div className="relative">
              <MdOutlinePhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              Password {isEditMode && <span className="text-gray-400 font-normal text-sm">(leave blank to keep current)</span>}
            </label>
            <div className="relative">
              <MdOutlineLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required={!isEditMode}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Role</label>
            {/* CUSTOM DROPDOWN: appearance-none se native arrow hataya, apna chevron icon lagaya - ab overflow nahi karega */}
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="student">Student</option>
              </select>
              <MdKeyboardArrowDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
            </div>
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

        {/* FOOTER - form ke bahar, scroll se independent, hamesha visible */}
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