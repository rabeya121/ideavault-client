
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { FaComment, FaClock, FaLightbulb } from "react-icons/fa";
import useTitle from "@/hook/useTitle";

export default function MyInteractionsPage() {
  useTitle("My Interactions");
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/user/${user.email}`, {
          withCredentials: true,
        })
        .then(async (res) => {
          const commentsData = res.data;

          // প্রতিটা comment এর জন্য idea title নিয়ে আসি
          const enriched = await Promise.all(
            commentsData.map(async (comment) => {
              try {
                const ideaRes = await axios.get(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${comment.ideaId}`,
                );
                return { ...comment, ideaTitle: ideaRes.data.title };
              } catch {
                return { ...comment, ideaTitle: "Unknown Idea" };
              }
            }),
          );
          setComments(enriched);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              🤝 My Interactions
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Ideas you have commented on
            </p>
            {!loading && (
              <div className="mt-3 inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-4 py-1 rounded-full text-sm font-semibold">
                <FaComment /> Total Comments: {comments.length}
              </div>
            )}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : comments.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">💬</p>
              <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">
                No interactions yet!
              </p>
              <Link
                href="/ideas"
                className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
              >
                Explore Ideas
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-md transition overflow-hidden"
                >
                  {/* Idea Title Header */}
                  <div className="bg-purple-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
                    <span className="font-bold text-purple-700 dark:text-purple-300 text-lg">
                      {comment.ideaTitle}
                    </span>
                    <Link
                      href={`/ideas/${comment.ideaId}`}
                      className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg font-medium transition"
                    >
                      View Idea →
                    </Link>
                  </div>

                  {/* Comment Content */}
                  <div className="px-6 py-5 flex gap-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user?.name}&background=7c3aed&color=fff`}
                      className="w-9 h-9 rounded-full flex-shrink-0"
                      alt="avatar"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {user?.name}
                        </p>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <FaClock />
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}
