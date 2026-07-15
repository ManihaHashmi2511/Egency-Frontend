import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Swal from "sweetalert2";
import {
  MdSearch,
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineDelete,
  MdKeyboardArrowDown,
  MdStar,
  MdOutlineAccessTime,
} from "react-icons/md";

const BlogPostsTable = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.log("Blogs fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // unique categories nikal ke filter dropdown banate hain, dynamic taake har naye category add hone pe khud-b-khud aa jaye
  const categories = [...new Set(blogs.map((b) => b.category).filter(Boolean))];

  const filtered = blogs.filter((b) => {
    const matchesSearch =
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
    const matchesFeatured =
      featuredFilter === "all" ||
      (featuredFilter === "featured" && b.featured) ||
      (featuredFilter === "regular" && !b.featured);
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const handleDelete = async (blog) => {
    const confirm = await Swal.fire({
      title: `Delete "${blog.title}"?`,
      text: "Ye action wapas nahi ho sakta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/blogs/${blog._id}`);
      Swal.fire("Deleted", "Blog removed successfully", "success");
      fetchBlogs();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div>
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="relative flex-1">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-xl border border-gray-200 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          >
            <option value="all">All Posts</option>
            <option value="featured">Featured Only</option>
            <option value="regular">Regular Only</option>
          </select>
          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
        </div>

        <button
          onClick={() => navigate("/admin/blog/add")}
          className="flex items-center gap-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl text-base font-medium transition-all shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 cursor-pointer"
        >
          <MdOutlineAdd className="text-xl" />
          Add Blog Post
        </button>
      </div>

      {/* BLOG GRID */}
      {loading ? (
        <div className="text-center text-gray-400 text-base py-14">Loading blog posts...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 text-base py-14">No blog posts found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <div
              key={blog._id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-video bg-gray-100 relative overflow-hidden">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-50 to-red-100 text-red-400 text-3xl font-semibold">
                    {blog.title?.charAt(0).toUpperCase()}
                  </div>
                )}

                {blog.featured && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-400 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                    <MdStar className="text-sm" /> Featured
                  </div>
                )}

                {blog.category && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {blog.category}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{blog.title}</h4>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{blog.desc}</p>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {blog.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Author + meta */}
                <div className="flex items-center justify-between mb-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2.5">
                    {blog.authorImg ? (
                      <img
                        src={blog.authorImg}
                        alt={blog.author}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-semibold">
                        {blog.author?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-gray-800 text-sm font-medium">{blog.author}</p>
                      <p className="text-gray-400 text-xs">{blog.date}</p>
                    </div>
                  </div>

                  {blog.readTime && (
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <MdOutlineAccessTime className="text-sm" /> {blog.readTime}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/admin/blog/edit", { state: { blog } })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium cursor-pointer transition-colors border border-gray-200"
                  >
                    <MdOutlineEdit className="text-lg" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg hover:bg-red-50 text-red-600 text-sm font-medium cursor-pointer transition-colors border border-red-100"
                  >
                    <MdOutlineDelete className="text-lg" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostsTable;