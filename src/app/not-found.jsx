"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import useTitle from "@/hook/useTitle";

export default function NotFound() {
  useTitle("Not Found");
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-9xl font-extrabold text-purple-600">404</p>
        <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Page Not Found!</h1>
        <p className="text-gray-500 mb-8">Oops! The page you are looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition font-semibold"
        >
          <FaHome /> Go Back Home
        </Link>
      </div>
    </div>
  );
}