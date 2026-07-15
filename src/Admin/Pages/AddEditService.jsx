import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import ImageDropzone from "../Components/ImageDropzone";
import api from "../../utils/api";
import Swal from "sweetalert2";
import { MdArrowBack, MdOutlineTitle, MdOutlineDescription } from "react-icons/md";

const AddEditService = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.service || null;
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
        await api.put(`/services/${editingItem._id}`, form);
        Swal.fire("Updated", "Service updated successfully", "success");
      } else {
        await api.post("/services", form);
        Swal.fire("Created", "Service added successfully", "success");
      }
      navigate("/admin/services");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Service" : "Add Service"}>
      <button
        onClick={() => navigate("/admin/services")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-6 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to Services
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-base font-medium text-gray-600 block mb-2">Service Image</label>
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
                placeholder="e.g. Web Development"
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
                placeholder="Describe this service..."
                className="w-full h-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-7">
            <button
              type="button"
              onClick={() => navigate("/admin/services")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditService;