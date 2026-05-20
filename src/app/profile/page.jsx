"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaImage, FaSave } from "react-icons/fa";
import useTitle from "@/hook/useTitle";

export default function ProfilePage() {
  useTitle("Profile");

  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || "",
  });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/update-profile`,
        formData,
        { withCredentials: true },
      );
      setUser(res.data.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">👤 My Profile</h1>
            <p className="text-gray-500 mt-1">
              Manage your account information
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            {/* Avatar */}
            {/* <div className="flex justify-center mb-8">
              <div className="relative">
                <img referrerPolicy="no-referrer"
                  src={formData.photoURL && formData.photoURL.startsWith("http")
                    ? formData.photoURL
                    : `https://ui-avatars.com/api/?name=${user?.name}&background=7c3aed&color=fff&size=128`
                  }
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-purple-200"
                />
              </div>
            </div> */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div
                  className="w-28 h-28 rounded-full border-4 border-purple-200"
                  style={{
                    backgroundImage: `url(${
                      formData.photoURL && formData.photoURL.startsWith("http")
                        ? formData.photoURL
                        : `https://ui-avatars.com/api/?name=${user?.name}&background=7c3aed&color=fff&size=128`
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Email (readonly) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Photo URL
                </label>
                <div className="relative">
                  <FaImage className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={formData.photoURL}
                    onChange={(e) =>
                      setFormData({ ...formData, photoURL: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
