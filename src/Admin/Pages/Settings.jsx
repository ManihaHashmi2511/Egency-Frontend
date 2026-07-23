import { useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import ManageTeamTable from "../Components/ManageTeamTable";
import ProfileForm from "../Components/ProfileForm";
import ChangePasswordForm from "../Components/ChangePasswordForm";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const isSuperAdmin = user.role === "superadmin";
  const canChangePassword = user.role !== "admin"; // Admin role password change nahi kar sakta

  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { key: "profile", label: "My Profile" },
    ...(canChangePassword ? [{ key: "password", label: "Change Password" }] : []),
    ...(isSuperAdmin ? [{ key: "team", label: "Manage Team" }] : []),
  ];

  return (
    <AdminLayout title="Settings">
      <div className="flex gap-2 border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-3 text-base font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === tab.key
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && <ProfileForm />}
      {activeTab === "password" && canChangePassword && <ChangePasswordForm />}
      {activeTab === "team" && isSuperAdmin && <ManageTeamTable />}
    </AdminLayout>
  );
};

export default Settings;