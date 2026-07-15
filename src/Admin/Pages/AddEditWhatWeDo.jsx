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
  MdOutlineDashboardCustomize,
} from "react-icons/md";

const AddEditWhatWeDo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.card || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    title: editingItem?.title || "",
    desc: editingItem?.desc || "",
    image: editingItem?.image || "",
    order: editingItem?.order ?? 0,
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
        await api.put(`/what-we-do/${editingItem._id}`, form);
        Swal.fire("Updated", "Card updated successfully", "success");
      } else {
        await api.post("/what-we-do", form);
        Swal.fire("Created", "Card added successfully", "success");
      }
      navigate("/admin/what-we-do");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Card" : "Add Card"}>
      <button
        onClick={() => navigate("/admin/what-we-do")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-6 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to What We Do
      </button>

      <div className="bg-linear-to-r from-[#1a1a1a] to-[#3d0e10] rounded-2xl p-5 flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
          <MdOutlineDashboardCustomize className="text-white text-xl" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">
            {isEditMode ? "Editing Card" : "New What We Do Card"}
          </h3>
          <p className="text-white/60 text-sm">Will display on the home page section</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-base font-medium text-gray-600 block mb-2">Card Image</label>
          <ImageDropzone
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
          />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Title</label>
            <div className="relative">
              <MdOutlineTitle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Strategy & Planning"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="text-base font-medium text-gray-600 block mb-1.5">Description</label>
            <div className="relative h-full">
              <MdOutlineDescription className="absolute left-3.5 top-3.5 text-gray-400 text-xl" />
              <textarea
                name="desc"
                value={form.desc}
                onChange={handleChange}
                required
                rows={8}
                placeholder="Describe what this card is about..."
                className="w-full h-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-7">
            <button
              type="button"
              onClick={() => navigate("/admin/what-we-do")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md shadow-red-200"
            >
              {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Card"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditWhatWeDo;