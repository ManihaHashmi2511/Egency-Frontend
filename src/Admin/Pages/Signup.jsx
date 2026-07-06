import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { IoCreateOutline } from "react-icons/io5";
import { FaCode, FaNodeJs, FaReact } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/signup`,
        formData,
      );
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been created successfully.",
        confirmButtonColor: "#6366f1",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE — Form 35% */}
      <div className="w-full md:w-[35%] bg-gray-50 flex flex-col justify-center px-8 py-6">
        {/* Card */}
        <div className="p-8 shadow-xl multi-border">
          {/* Title  */}
          <h2 className="text-3xl font-bold text-center flex items-center justify-center text-gray-800 mb-4">
            Create Account
            <span>
              <IoCreateOutline className="ml-2 text-3xl" />
            </span>
          </h2>

          <div className="h-0.5 w-full bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full mb-6"></div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition text-gray-700"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition text-gray-700"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-1 block">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="01234567890"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition text-gray-700"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition text-gray-700"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 cursor-pointer rounded-xl bg-linear-to-r from-purple-500 to-blue-500 text-white font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Link  */}
            <p className="text-center text-gray-500 mt-2">
              Already have account?{" "}
              <Link
                to="/login"
                className="text-[#ebadbb] hover:text-purple-400 font-semibold"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE — Image 65% */}
      <div
        className="hidden md:block md:w-[65%] relative right-side-img"
        style={{
          backgroundImage: `url('/side-img.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-linear-to-br from-purple-600/40 to-blue-600/40"></div> */}

        {/* Text on Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-12">
          <h2 className="text-4xl font-bold text-center leading-tight drop-shadow-lg">
            Build Amazing <br />
            <span className="text-yellow-300 flex items-center">
              Web Apps <FaCode className="ml-4 text-white" />
            </span>
          </h2>
          <p className="mt-4 text-center text-white/80 text-lg max-w-md drop-shadow">
            Join thousands of developers and start your journey today!
          </p>

          {/* Badges */}
          <div className="flex gap-3 mt-8 flex-wrap justify-center">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <FaReact className="mr-2 text-[16px] text-blue-500" /> React
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <FaNodeJs className="mr-2 text-[16px] text-green-500" /> Node.js
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <SiMongodb className="mr-2 text-[16px] text-green-500" /> MongoDB
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <RiTailwindCssFill className="mr-2 text-[16px] text-blue-500" />{" "}
              Tailwind
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
