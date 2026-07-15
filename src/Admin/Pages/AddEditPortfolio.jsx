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
  MdOutlineBuild,
  MdOutlineSchedule,
  MdOutlineCalendarToday,
  MdOutlineLink,
  MdOutlineCode,
  MdClose,
  MdAdd,
  MdBarChart,
  MdGroups,
  MdRocketLaunch,
  MdStar,
  MdGpsFixed,
  MdEmojiEvents,
} from "react-icons/md";
import ImageDropzone from "../Components/ImageDropzone";

const emptyResult = () => ({ number: "", label: "", icon: "chart" });

const ICON_OPTIONS = [
  { key: "chart", label: "Chart", Icon: MdBarChart },
  { key: "users", label: "Users", Icon: MdGroups },
  { key: "rocket", label: "Rocket", Icon: MdRocketLaunch },
  { key: "star", label: "Star", Icon: MdStar },
  { key: "bullseye", label: "Bullseye", Icon: MdGpsFixed },
  { key: "award", label: "Award", Icon: MdEmojiEvents },
];

const AddEditPortfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.project || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    title: editingItem?.title || "",
    category: editingItem?.category || "",
    image: editingItem?.image || "",
    client: editingItem?.client || "",
    tools: editingItem?.tools || "",
    duration: editingItem?.duration || "",
    year: editingItem?.year || "",
    liveUrl: editingItem?.liveUrl || "",
    githubUrl: editingItem?.githubUrl || "",
    challenge: editingItem?.challenge || "",
    solution: editingItem?.solution || "",
    order: editingItem?.order ?? 0,
    gallery: editingItem?.gallery || [],
    results:
      editingItem?.results?.length > 0 ? editingItem.results : [emptyResult()],
  });

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

  const updateResult = (index, field, value) => {
    const updated = [...form.results];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, results: updated });
  };

  const addResult = () => {
    setForm({ ...form, results: [...form.results, emptyResult()] });
  };

  const removeResult = (index) => {
    setForm({ ...form, results: form.results.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await api.put(`/portfolio/${editingItem._id}`, form);
        Swal.fire("Updated", "Project updated successfully", "success");
      } else {
        await api.post("/portfolio", form);
        Swal.fire("Created", "Project added successfully", "success");
      }
      navigate("/admin/portfolio");
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
    <AdminLayout title={isEditMode ? "Edit Project" : "Add Project"}>
      <button
        onClick={() => navigate("/admin/portfolio")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-8 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to Portfolio
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
                    placeholder="e.g. Web Development"
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
                  Tools Used
                </label>
                <div className="relative">
                  <MdOutlineBuild className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="tools"
                    value={form.tools}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
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

              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">
                  Year
                </label>
                <div className="relative">
                  <MdOutlineCalendarToday className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="e.g. 2025"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">
                  Live URL
                </label>
                <div className="relative">
                  <MdOutlineLink className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">
                  GitHub URL
                </label>
                <div className="relative">
                  <MdOutlineCode className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              Challenge
            </label>
            <textarea
              name="challenge"
              value={form.challenge}
              onChange={handleChange}
              rows={5}
              placeholder="What problem did the client face?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>
          <div>
            <label className="text-base font-medium text-gray-600 block mb-1.5">
              Solution
            </label>
            <textarea
              name="solution"
              value={form.solution}
              onChange={handleChange}
              rows={5}
              placeholder="How did you solve it?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            />
          </div>
        </div>

        {/* GALLERY - ab drag-drop + URL dono support karta hai */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Gallery Images
          </h4>
          <GalleryDropzone
            images={form.gallery}
            onChange={(newGallery) => setForm({ ...form, gallery: newGallery })}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-lg font-semibold text-gray-800">
              Results / Stats
            </h4>
            <button
              type="button"
              onClick={addResult}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 cursor-pointer transition-colors"
            >
              <MdAdd className="text-lg" /> Add Result
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {form.results.map((result, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center"
              >
                <input
                  type="text"
                  value={result.number}
                  onChange={(e) =>
                    updateResult(index, "number", e.target.value)
                  }
                  placeholder="e.g. 150%"
                  className="w-full md:w-28 px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="text"
                  value={result.label}
                  onChange={(e) => updateResult(index, "label", e.target.value)}
                  placeholder="e.g. Traffic Growth"
                  className="w-full flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />

                <div className="flex items-center gap-2 flex-wrap">
                  {ICON_OPTIONS.map(({ key, label, Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateResult(index, "icon", key)}
                      title={label}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                        result.icon === key
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <Icon className="text-lg" />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => removeResult(index)}
                  className="p-2.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer transition-colors shrink-0"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/portfolio")}
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
                : "Add Project"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditPortfolio;
