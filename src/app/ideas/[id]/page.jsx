
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import PrivateRoute from "@/components/PrivateRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { FaUser, FaEye, FaClock, FaTag, FaEdit, FaTrash } from "react-icons/fa";
import useTitle from "@/hook/useTitle";

export default function IdeaDetailsPage() {
  useTitle("Idea Details");

  const { id } = useParams();
  const { user, getToken } = useAuth(); // ← getToken add করো
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchIdea = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${id}`);
      setIdea(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdea();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }
    try {
      const token = await getToken(); // ← token নাও
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments`,
        { ideaId: id, userEmail: user.email, userName: user.name, text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` }, // ← add করো
          withCredentials: true
        }
      );
      toast.success("Comment added!");
      setCommentText("");
      fetchComments();
    } catch (error) {
      toast.error("Failed to add comment!");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = await getToken(); // ← token নাও
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // ← add করো
          withCredentials: true
        }
      );
      toast.success("Comment deleted!");
      fetchComments();
    } catch (error) {
      toast.error("Failed to delete comment!");
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const token = await getToken(); // ← token নাও
      await axios.put(
        `/api/comments/${commentId}`,
        { text: editText },
        {
          headers: { Authorization: `Bearer ${token}` }, // ← add করো
          withCredentials: true
        }
      );
      toast.success("Comment updated!");
      setEditingComment(null);
      fetchComments();
    } catch (error) {
      toast.error("Failed to update comment!");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Idea Card */}
          {idea && (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
              {/* Image */}
              {idea.imageURL && (
                <img src={idea.imageURL} alt={idea.title} className="w-full h-64 object-cover" />
              )}

              <div className="p-8">
                {/* Category & Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
                    {idea.category}
                  </span>
                  {idea.tags?.map((tag, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <FaTag className="text-xs" /> {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{idea.title}</h1>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1"><FaUser /> {idea.authorName}</span>
                  <span className="flex items-center gap-1"><FaEye /> {idea.views} views</span>
                  <span className="flex items-center gap-1"><FaClock /> {new Date(idea.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Short Description */}
                <p className="text-gray-600 text-lg mb-6">{idea.shortDescription}</p>

                {/* Detailed Description */}
                {idea.detailedDescription && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">📋 Details</h2>
                    <p className="text-gray-600">{idea.detailedDescription}</p>
                  </div>
                )}

                {/* Problem & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {idea.problemStatement && (
                    <div className="bg-red-50 rounded-2xl p-4">
                      <h3 className="font-bold text-red-600 mb-2">❗ Problem</h3>
                      <p className="text-gray-600 text-sm">{idea.problemStatement}</p>
                    </div>
                  )}
                  {idea.proposedSolution && (
                    <div className="bg-green-50 rounded-2xl p-4">
                      <h3 className="font-bold text-green-600 mb-2">✅ Solution</h3>
                      <p className="text-gray-600 text-sm">{idea.proposedSolution}</p>
                    </div>
                  )}
                </div>

                {/* Extra Info */}
                <div className="flex flex-wrap gap-4">
                  {idea.targetAudience && (
                    <div className="bg-blue-50 rounded-xl px-4 py-2 text-sm">
                      <span className="font-semibold text-blue-600">🎯 Target: </span>
                      <span className="text-gray-600">{idea.targetAudience}</span>
                    </div>
                  )}
                  {idea.estimatedBudget && (
                    <div className="bg-yellow-50 rounded-xl px-4 py-2 text-sm">
                      <span className="font-semibold text-yellow-600">💰 Budget: </span>
                      <span className="text-gray-600">{idea.estimatedBudget}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              💬 Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            <div className="flex gap-3 mb-8">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=7c3aed&color=fff`}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
                >
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            {comments.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No comments yet. Be the first!</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex gap-3 p-4 bg-gray-50 rounded-2xl">
                    <img
                      src={`https://ui-avatars.com/api/?name=${comment.userName}&background=7c3aed&color=fff`}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      alt="avatar"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-800">{comment.userName}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {editingComment === comment._id ? (
                        <div>
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-sm"
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleEditComment(comment._id)}
                              className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-purple-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingComment(null)}
                              className="bg-gray-200 text-gray-600 px-4 py-1 rounded-lg text-sm hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600 text-sm">{comment.text}</p>
                      )}
                    </div>

                    {/* Edit/Delete - only own comments */}
                    {user?.email === comment.userEmail && editingComment !== comment._id && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => { setEditingComment(comment._id); setEditText(comment.text); }}
                          className="text-blue-400 hover:text-blue-600 p-1"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-400 hover:text-red-600 p-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </PrivateRoute>
  );
}