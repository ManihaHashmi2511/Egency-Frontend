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
  MdOutlinePerson,
  MdOutlineBadge,
  MdOutlineCategory,
  MdOutlineAccessTime,
  MdOutlineLocalOffer,
  MdClose,
  MdOutlineDragIndicator,
  MdOutlineTitle as MdHeading,
  MdOutlineNotes,
  MdDeleteOutline,
} from "react-icons/md";

const emptyBlock = (type) => ({ type, text: "" });

const AddEditBlogPost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editingItem = location.state?.blog || null;
  const isEditMode = Boolean(editingItem);

  const [form, setForm] = useState({
    title: editingItem?.title || "",
    desc: editingItem?.desc || "",
    image: editingItem?.image || "",
    author: editingItem?.author || "",
    authorImg: editingItem?.authorImg || "",
    authorRole: editingItem?.authorRole || "",
    category: editingItem?.category || "",
    readTime: editingItem?.readTime || "",
    date: editingItem?.date || "",
    featured: editingItem?.featured || false,
    tags: editingItem?.tags || [],
    content: editingItem?.content?.length > 0 ? editingItem.content : [emptyBlock("paragraph")],
  });

  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleanTag = tagInput.trim().replace(",", "");
      if (cleanTag && !form.tags.includes(cleanTag)) {
        setForm({ ...form, tags: [...form.tags, cleanTag] });
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const addBlock = (type) => {
    setForm({ ...form, content: [...form.content, emptyBlock(type)] });
  };

  const updateBlockText = (index, text) => {
    const updated = [...form.content];
    updated[index] = { ...updated[index], text };
    setForm({ ...form, content: updated });
  };

  const removeBlock = (index) => {
    setForm({ ...form, content: form.content.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await api.put(`/blogs/${editingItem._id}`, form);
        Swal.fire("Updated", "Blog post updated successfully", "success");
      } else {
        await api.post("/blogs", form);
        Swal.fire("Created", "Blog post added successfully", "success");
      }
      navigate("/admin/blog");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title={isEditMode ? "Edit Blog Post" : "Add Blog Post"}>
      <button
        onClick={() => navigate("/admin/blog")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-base mb-8 cursor-pointer transition-colors"
      >
        <MdArrowBack className="text-xl" /> Back to Blog
      </button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-base font-medium text-gray-600 block mb-2">Cover Image</label>
              <ImageDropzone
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                aspect="aspect-video"
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-base font-medium text-gray-700">Featured Post</p>
                  <p className="text-gray-400 text-sm mt-0.5">Will be highlighted on the home page</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, featured: !form.featured })}
                  className={`w-12 h-7 rounded-full flex items-center px-1 cursor-pointer transition-colors ${
                    form.featured ? "bg-red-600 justify-end" : "bg-gray-300 justify-start"
                  }`}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </label>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
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
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">Short Description</label>
              <div className="relative">
                <MdOutlineDescription className="absolute left-3.5 top-3.5 text-gray-400 text-xl" />
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Short summary shown on the blog card..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">Category</label>
                <div className="relative">
                  <MdOutlineCategory className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g. Web Design"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-gray-600 block mb-1.5">Read Time</label>
                <div className="relative">
                  <MdOutlineAccessTime className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="readTime"
                    value={form.readTime}
                    onChange={handleChange}
                    placeholder="e.g. 5 min read"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">Publish Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="text-base font-medium text-gray-600 block mb-1.5">Tags</label>
              <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-red-400">
                <MdOutlineLocalOffer className="text-gray-400 text-xl" />
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-sm"
                  >
                    #{tag}
                    <MdClose
                      onClick={() => removeTag(tag)}
                      className="cursor-pointer hover:text-red-800"
                    />
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type & press Enter"
                  className="flex-1 min-w-30 outline-none text-base py-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-5">Author Info</h4>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-28 shrink-0">
              <ImageDropzone
                value={form.authorImg}
                onChange={(url) => setForm({ ...form, authorImg: url })}
                shapeClass="rounded-full"
              />
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">Author Name</label>
                <div className="relative">
                  <MdOutlinePerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1.5">Author Role</label>
                <div className="relative">
                  <MdOutlineBadge className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    name="authorRole"
                    value={form.authorRole}
                    onChange={handleChange}
                    placeholder="e.g. Content Writer"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-lg font-semibold text-gray-800">Blog Content</h4>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addBlock("heading")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <MdHeading className="text-lg" /> Add Heading
              </button>
              <button
                type="button"
                onClick={() => addBlock("paragraph")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 cursor-pointer transition-colors"
              >
                <MdOutlineNotes className="text-lg" /> Add Paragraph
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {form.content.map((block, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4">
                <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
                  <MdOutlineDragIndicator className="text-gray-300 text-xl" />
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      block.type === "heading" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {block.type === "heading" ? "H" : "P"}
                  </span>
                </div>

                {block.type === "heading" ? (
                  <input
                    type="text"
                    value={block.text}
                    onChange={(e) => updateBlockText(index, e.target.value)}
                    placeholder="Heading text..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                ) : (
                  <textarea
                    value={block.text}
                    onChange={(e) => updateBlockText(index, e.target.value)}
                    placeholder="Paragraph text..."
                    rows={4}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                  />
                )}

                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="p-2.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer transition-colors h-fit shrink-0"
                >
                  <MdDeleteOutline className="text-xl" />
                </button>
              </div>
            ))}

            {form.content.length === 0 && (
              <p className="text-gray-400 text-base text-center py-8 border border-dashed border-gray-200 rounded-2xl">
                No content blocks yet — start with "Add Paragraph" or "Add Heading" above
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/blog")}
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 text-base font-medium hover:bg-gray-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md shadow-red-200"
          >
            {submitting ? "Saving..." : isEditMode ? "Save Changes" : "Publish Blog Post"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AddEditBlogPost;