import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import ImageDropzone from "../Components/ImageDropzone";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdArrowBack,
  MdOutlinePerson,
  MdOutlinePublic,
  MdStar,
  MdStarBorder,
} from "react-icons/md";

const AddEditTestimonial = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.testimonial || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    name: editingItem?.name || "",
    country: editingItem?.country || "",
    rating: editingItem?.rating || 5,
    review: editingItem?.review || "",
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
        await api.put(`/testimonials/${editingItem._id}`, form);
        Swal.fire("Updated", "Testimonial updated successfully", "success");
      } else {
        await api.post("/testimonials", form);
        Swal.fire("Created", "Testimonial added successfully", "success");
      }
      navigate("/admin/testimonials");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Testimonial" : "Add Testimonial"}>
      <button
        onClick={() => navigate("/admin/testimonials")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-6 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to Testimonials
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
            <label className="text-base font-medium text-gray-600 block mb-1.5">Country</label>
            <div className="relative">
              <MdOutlinePublic className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Rating</label>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-fit">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className="cursor-pointer"
                >
                  {n <= form.rating ? (
                    <MdStar className="text-amber-400 text-3xl" />
                  ) : (
                    <MdStarBorder className="text-gray-300 text-3xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <label className="text-base font-medium text-gray-600 block mb-1.5">Review</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              required
              rows={8}
              className="w-full h-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>

          <div className="flex gap-3 mt-7">
            <button
              type="button"
              onClick={() => navigate("/admin/testimonials")}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Testimonial"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditTestimonial;