import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProtectedRoute({ children, requiredPermission, requiredRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You don't have permission to access this page.",
      confirmButtonColor: "#d80712",
    });
    return <Navigate to="/admin/dashboard" />;
  }

  if (requiredPermission && user.role !== "superadmin") {
    if (!user.permissions?.includes(requiredPermission)) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You don't have permission to access this module.",
        confirmButtonColor: "#d80712",
      });
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return children;
}