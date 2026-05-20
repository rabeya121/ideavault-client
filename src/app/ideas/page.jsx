"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FaSearch, FaFilter, FaEye, FaUser, FaClock } from "react-icons/fa";
import useTitle from "@/hook/useTitle";

const categories = [
  "All",
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "Food",
  "Environment",
  "Other",
];

function IdeasContent() {
  useTitle("All Ideas");

  const searchParams = useSearchParams();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [dateFilter, setDateFilter] = useState(""); // ✅ এখানে

  const fetchIdeas = async (cat, searchText) => {
    // ✅ এখানে
    setLoading(true);
    try {
      let url = "http://localhost:8000/api/ideas?";
      if (searchText) url += `search=${searchText}&`;
      if (cat && cat !== "All") url += `category=${cat}&`;
      if (dateFilter) url += `date=${dateFilter}`;
      const res = await axios.get(url);
      setIdeas(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategory(cat);
      fetchIdeas(cat, "");
    } else {
      fetchIdeas("All", "");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchIdeas(category, search);
  }, [category]);

  const handleSearch = () => {
    fetchIdeas(category, search);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💡 All Ideas
          </h1>
          <p className="text-gray-500">
            Discover innovative startup ideas from our community
          </p>
          {category !== "All" && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-semibold">
                Filtering: {category}
              </span>
              <button
                onClick={() => setCategory("All")}
                className="text-sm text-red-400 hover:text-red-600"
              >
                ✕ Clear
              </button>
            </div>
          )}
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search ideas by title..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition flex items-center gap-2"
            >
              <FaSearch /> Search
            </button>
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                fetchIdeas(category, search);
              }}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Ideas Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : ideas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">💡</p>
            <p className="text-gray-500 text-xl">No ideas found!</p>
            <Link
              href="/add-idea"
              className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
            >
              Add First Idea
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function IdeaCard({ idea }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="h-48 bg-gradient-to-br from-purple-100 to-indigo-100 overflow-hidden">
        {idea.imageURL ? (
          <img
            referrerPolicy="no-referrer"
            src={idea.imageURL}
            alt={idea.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            💡
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
          {idea.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {idea.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {idea.shortDescription}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto mb-4">
          <span className="flex items-center gap-1">
            <FaUser /> {idea.authorName}
          </span>
          <span className="flex items-center gap-1">
            <FaEye /> {idea.views} views
          </span>
          <span className="flex items-center gap-1">
            <FaClock /> {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>
        <Link
          href={`/ideas/${idea._id}`}
          className="w-full text-center bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function IdeasPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <IdeasContent />
    </Suspense>
  );
}
