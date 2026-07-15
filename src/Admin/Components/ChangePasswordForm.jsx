import { useState } from "react";
import api from "../../utils/api";
import Swal from "sweetalert2";
import { MdOutlineLock } from "react-icons/md";

const ChangePasswordForm = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      Swal.fire("Mismatch", "New password and confirm password don't match", "warning");
      return;
    }

    if (form.newPassword.length < 6) {
      Swal.fire("Too Short", "Password should be at least 6 characters", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await api.put("/users/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      Swal.fire("Success", "Password changed successfully", "success");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-base font-medium text-gray-600 flex items-center gap-1.5 mb-1.5">
            <MdOutlineLock className="text-gray-400 text-xl" /> Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="text-base font-medium text-gray-600 flex items-center gap-1.5 mb-1.5">
            <MdOutlineLock className="text-gray-400 text-xl" /> New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="text-base font-medium text-gray-600 flex items-center gap-1.5 mb-1.5">
            <MdOutlineLock className="text-gray-400 text-xl" /> Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-base font-medium disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;