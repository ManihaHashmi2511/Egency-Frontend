import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import ImageDropzone from "../Components/ImageDropzone";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdArrowBack,
  MdOutlineTitle,
  MdOutlineDescription,
  MdOutlineEvent,
  MdOutlineSmartButton,
  MdOutlineLink,
} from "react-icons/md";

const toDateTimeLocal = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const AddEditComingSoon = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.banner || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    highlightText: editingItem?.highlightText || "",
    headingRest: editingItem?.headingRest || "EVENT COMING SOON!",
    description: editingItem?.description || "",
    eventDate: toDateTimeLocal(editingItem?.eventDate),
    buttonText: editingItem?.buttonText || "Register now!",
    buttonLink: editingItem?.buttonLink || "/contact",
    image: editingItem?.image || "",
    isActive: editingItem?.isActive || false,
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
        await api.put(`/coming-soon/${editingItem._id}`, form);
        Swal.fire("Updated", "Banner updated successfully", "success");
      } else {
        await api.post("/coming-soon", form);
        Swal.fire("Created", "Banner added successfully", "success");
      }
      navigate("/admin/coming-soon");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Banner" : "Add Banner"}>
      <button
        onClick={() => navigate("/admin/coming-soon")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-8 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to Coming Soon Banners
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <label className="text-base font-medium text-gray-600 block mb-2">Banner Image</label>
          <ImageDropzone
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
            aspect="aspect-square"
          />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">
                Highlight Text <span className="text-gray-400 font-normal text-sm">(red part)</span>
              </label>
              <div className="relative">
                <MdOutlineTitle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  name="highlightText"
                  value={form.highlightText}
                  onChange={handleChange}
                  required
                  placeholder="e.g. GRAPHIC DESIGN"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">Rest of Heading</label>
              <div className="relative">
                <MdOutlineTitle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  name="headingRest"
                  value={form.headingRest}
                  onChange={handleChange}
                  required
                  placeholder="e.g. EVENT COMING SOON!"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Description</label>
            <div className="relative">
              <MdOutlineDescription className="absolute left-3.5 top-3.5 text-gray-400 text-xl" />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              Event Date & Time <span className="text-gray-400 font-normal text-sm">(countdown target)</span>
            </label>
            <div className="relative">
              <MdOutlineEvent className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="datetime-local"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">Button Text</label>
              <div className="relative">
                <MdOutlineSmartButton className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  name="buttonText"
                  value={form.buttonText}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">Button Link</label>
              <div className="relative">
                <MdOutlineLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  name="buttonLink"
                  value={form.buttonLink}
                  onChange={handleChange}
                  placeholder="/contact"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-base font-medium text-gray-700">Set as Live Banner</p>
                <p className="text-gray-400 text-sm mt-0.5">Only one banner can be live at a time</p>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`w-12 h-7 rounded-full flex items-center px-1 cursor-pointer transition-colors ${
                  form.isActive ? "bg-red-600 justify-end" : "bg-gray-300 justify-start"
                }`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow" />
              </button>
            </label>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/coming-soon")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md shadow-red-200"
            >
              {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Banner"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditComingSoon;