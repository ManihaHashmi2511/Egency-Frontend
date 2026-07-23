import { useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdClose,
  MdOutlinePerson,
  MdOutlinePublic,
  MdOutlineImage,
  MdOutlineRateReview,
  MdStar,
  MdStarBorder,
} from "react-icons/md";

const TestimonialFormModal = ({ editingItem, onClose, onSuccess }) => {
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
      onSuccess();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="bg-linear-to-r from-[#1a1a1a] to-[#3d0e10] px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
              <MdOutlineRateReview className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              {isEditMode ? "Edit Testimonial" : "Add Testimonial"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white cursor-pointer transition-colors"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 flex flex-col gap-4">
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
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              Image URL
              <span className="text-gray-400 font-normal text-sm">Cloudinary is supported only for now </span>
            </label>
            <div className="relative">
              <MdOutlineImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
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

          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">Review</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
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
            {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add Testimonial"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialFormModal;