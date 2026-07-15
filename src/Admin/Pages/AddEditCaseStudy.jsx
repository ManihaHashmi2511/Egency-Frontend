import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import GalleryDropzone from "../Components/GalleryDropzone";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdArrowBack,
  MdOutlineCloudUpload,
  MdOutlineTitle,
  MdOutlineCategory,
  MdOutlinePerson,
  MdOutlineSchedule,
  MdOutlineTrendingUp,
  MdOutlineLink,
  MdClose,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import ImageDropzone from "../Components/ImageDropzone";

const AddEditCaseStudy = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.caseStudy || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    title: editingItem?.title || "",
    category: editingItem?.category || "",
    desc: editingItem?.desc || "",
    about: editingItem?.about || "",
    image: editingItem?.image || "",
    client: editingItem?.client || "",
    duration: editingItem?.duration || "",
    result: editingItem?.result || "",
    order: editingItem?.order ?? 0,
    gallery: editingItem?.gallery || [],
    services: editingItem?.services || [],
  });

  const [serviceInput, setServiceInput] = useState("");
  const [preview, setPreview] = useState(editingItem?.image || null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // SERVICES chip input - Enter ya comma se add hota hai
  const handleServiceKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const clean = serviceInput.trim().replace(",", "");
      if (clean && !form.services.includes(clean)) {
        setForm({ ...form, services: [...form.services, clean] });
      }
      setServiceInput("");
    }
  };

  const removeService = (service) => {
    setForm({ ...form, services: form.services.filter((s) => s !== service) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await api.put(`/case-studies/${editingItem._id}`, form);
        Swal.fire("Updated", "Case study updated successfully", "success");
      } else {
        await api.post("/case-studies", form);
        Swal.fire("Created", "Case study added successfully", "success");
      }
      navigate("/admin/case-studies");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Case Study" : "Add Case Study"}>
      <button
        onClick={() => navigate("/admin/case-studies")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-8 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to Case Studies
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <label className="text-base font-medium text-gray-600 block mb-2">
              Cover Image
            </label>
            <ImageDropzone
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              aspect="aspect-video"
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">
                  Title
                </label>
                <div className="relative">
                  <MdOutlineTitle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <MdOutlineCategory className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Branding"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">
                  Client
                </label>
                <div className="relative">
                  <MdOutlinePerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="client"
                    value={form.client}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">
                  Duration
                </label>
                <div className="relative">
                  <MdOutlineSchedule className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3 months"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">
                Result Highlight
              </label>
              <div className="relative">
                <MdOutlineTrendingUp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  name="result"
                  value={form.result}
                  onChange={handleChange}
                  placeholder="e.g. 40% increase in brand recognition"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* SERVICES chip input */}
            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">
                Services Provided
              </label>
              <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-red-400">
                <MdOutlineMiscellaneousServices className="text-gray-400 text-xl" />
                {form.services.map((service) => (
                  <span
                    key={service}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-sm"
                  >
                    {service}
                    <MdClose
                      onClick={() => removeService(service)}
                      className="cursor-pointer hover:text-red-800"
                    />
                  </span>
                ))}
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyDown={handleServiceKeyDown}
                  placeholder="e.g. Logo Design, press Enter"
                  className="flex-1 min-w-35 outline-none text-base py-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              Short Description{" "}
              <span className="text-gray-400 font-normal text-sm">
                (for the grid card)
              </span>
            </label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>
          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              About{" "}
              <span className="text-gray-400 font-normal text-sm">
                (for the detail page)
              </span>
            </label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>
        </div>

        {/* GALLERY - drag-drop + URL */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Gallery Images
          </h4>
          <GalleryDropzone
            images={form.gallery}
            onChange={(newGallery) => setForm({ ...form, gallery: newGallery })}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/case-studies")}
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md shadow-red-200"
          >
            {submitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Add Case Study"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditCaseStudy;
