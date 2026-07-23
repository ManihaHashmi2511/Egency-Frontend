import { useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import ImageDropzone from "./ImageDropzone";
import { MdOutlinePerson, MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";

const ProfileForm = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
    profileImg: storedUser.profileImg || "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.put("/users/profile", form);
      const updatedUser = { ...storedUser, ...res.data.update };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Swal.fire("Updated", "Profile updated successfully", "success");
      window.location.reload(); // Topbar mein naya avatar turant reflect ho jaye
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-base font-medium text-gray-600 block mb-2">Profile Picture</label>
          <div className="w-28">
            <ImageDropzone
              value={form.profileImg}
              onChange={(url) => setForm({ ...form, profileImg: url })}
              shapeClass="rounded-full"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5 mb-1.5">
            <MdOutlinePerson className="text-gray-400 text-lg" /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5 mb-1.5">
            <MdOutlineMailOutline className="text-gray-400 text-lg" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5 mb-1.5">
            <MdOutlinePhone className="text-gray-400 text-lg" /> Phone
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;