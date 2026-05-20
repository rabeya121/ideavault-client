"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaEye, FaClock } from "react-icons/fa";

import useTitle from "@/hook/useTitle";

const categories = ["Tech", "Health", "AI", "Education", "Finance", "Food", "Environment", "Other"];

export default function MyIdeasPage() {

  useTitle("My Ideas");
  const { user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchMyIdeas = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/user/${user.email}`,
        { withCredentials: true }
      );
      setIdeas(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyIdeas();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${id}`, { withCredentials: true });
      toast.success("Idea deleted!");
      setDeleteModal(null);
      fetchMyIdeas();
    } catch (error) {
      toast.error("Failed to delete!");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${editModal}`,
        editData,
        { withCredentials: true }
      );
      toast.success("Idea updated!");
      setEditModal(null);
      fetchMyIdeas();
    } catch (error) {
      toast.error("Failed to update!");
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💡 My Ideas</h1>
            <p className="text-gray-500">Manage your submitted startup ideas</p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : ideas.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">💡</p>
              <p className="text-gray-500 text-xl mb-4">No ideas yet!</p>
              <a href="/add-idea" className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700">
                Add Your First Idea
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {ideas.map((idea) => (
                <div key={idea._id} className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-4 items-start md:items-center">

                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-purple-100 flex-shrink-0">
                    {idea.imageURL ? (
                      <img src={idea.imageURL} alt={idea.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">💡</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {idea.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{idea.title}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-1">{idea.shortDescription}</p>
                    <div className="flex gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><FaEye /> {idea.views} views</span>
                      <span className="flex items-center gap-1"><FaClock /> {new Date(idea.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditModal(idea._id); setEditData(idea); }}
                      className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-200 transition text-sm font-medium"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal(idea._id)}
                      className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition text-sm font-medium"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
            <p className="text-5xl mb-4">🗑️</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Idea?</h3>
            <p className="text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6">✏️ Edit Idea</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editData.title || ""}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <input
                  type="text"
                  value={editData.shortDescription || ""}
                  onChange={(e) => setEditData({ ...editData, shortDescription: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={editData.category || ""}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editData.imageURL || ""}
                  onChange={(e) => setEditData({ ...editData, imageURL: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditModal(null)}
                className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </PrivateRoute>
  );
}