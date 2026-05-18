"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser, FaImage, FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", email: "", photoURL: "", password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Must include an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must include a lowercase letter";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(formData.password);
    if (error) { toast.error(error); return; }
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.photoURL);
      toast.success("Registration successful!");
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">💡 IdeaVault</h1>
          <p className="text-gray-500 mt-2">Create your account</p>
        </div>

        <div className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (optional)</label>
            <div className="relative">
              <FaImage className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Enter photo URL"
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 chars, uppercase & lowercase"
                className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : "Register"}
          </button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-400">OR</span>
            </div>
          </div>

          {/* Google */}
          <button className="w-full border border-gray-300 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img src="https://www.google.com/favicon.ico" alt="google" className="w-5 h-5" />
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}