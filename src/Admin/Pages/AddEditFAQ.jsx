import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import api from "../../utils/api";
import Swal from "sweetalert2";
import { MdArrowBack, MdOutlineHelpOutline, MdOutlineChatBubbleOutline } from "react-icons/md";

const AddEditFAQ = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.faq || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    question: editingItem?.question || "",
    answer: editingItem?.answer || "",
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
        await api.put(`/faqs/${editingItem._id}`, form);
        Swal.fire("Updated", "FAQ updated successfully", "success");
      } else {
        await api.post("/faqs", form);
        Swal.fire("Created", "FAQ added successfully", "success");
      }
      navigate("/admin/faqs");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit FAQ" : "Add FAQ"}>
      <button
        onClick={() => navigate("/admin/faqs")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-6 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to FAQs
      </button>

      <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
        <div>
          <label className="text-base font-medium text-gray-600 block mb-1.5">Question</label>
          <div className="relative">
            <MdOutlineHelpOutline className="absolute left-3.5 top-3.5 text-gray-400 text-xl" />
            <input
              type="text"
              name="question"
              value={form.question}
              onChange={handleChange}
              required
              placeholder="e.g. What services does Egency Digital offer?"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        <div>
          <label className="text-base font-medium text-gray-600 block mb-1.5">Answer</label>
          <div className="relative">
            <MdOutlineChatBubbleOutline className="absolute left-3.5 top-3.5 text-gray-400 text-xl" />
            <textarea
              name="answer"
              value={form.answer}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Write the answer here..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/faqs")}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Add FAQ"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditFAQ;