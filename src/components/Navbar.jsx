"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaSun,
  FaMoon,
} from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!!");
    setDropdownOpen(false);
    router.push("/");
  };

  const getAvatar = () => {
    if (user?.photoURL && user.photoURL.startsWith("http")) {
      return user.photoURL;
    }
    return "/images/user.png";
  };

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `font-medium transition pb-1 ${
      isActive(path)
        ? "text-purple-600  border-purple-600"
        : "text-gray-700 hover:text-purple-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-600">
          💡 IdeaVault
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/ideas" className={linkClass("/ideas")}>
            Ideas
          </Link>
          {user && (
            <>
              <Link href="/add-idea" className={linkClass("/add-idea")}>
                Add Idea
              </Link>
              <Link href="/my-ideas" className={linkClass("/my-ideas")}>
                My Ideas
              </Link>
              <Link
                href="/my-interactions"
                className={linkClass("/my-interactions")}
              >
                My Interactions
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-gray-600 text-xl" />
              )}
            </button>
          )}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-purple-50 dark:bg-gray-700 px-3 py-1.5 rounded-full border border-purple-200 dark:border-gray-500 hover:bg-purple-100 dark:hover:bg-gray-600 transition"
              >
                <img 
                  referrerPolicy="no-referrer"
                  src={getAvatar()}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 dark:text-purple-600text-gray-700 dark:text-gray-200 font-medium text-sm ">
                  {user.name}
                </span>
                <FaChevronDown className="text-gray-400 text-xs" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-purple-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUser className="text-purple-500" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 transition border-t"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={linkClass("/")}
          >
            Home
          </Link>
          <Link
            href="/ideas"
            onClick={() => setMenuOpen(false)}
            className={linkClass("/ideas")}
          >
            Ideas
          </Link>
          {user && (
            <>
              <Link
                href="/add-idea"
                onClick={() => setMenuOpen(false)}
                className={linkClass("/add-idea")}
              >
                Add Idea
              </Link>
              <Link
                href="/my-ideas"
                onClick={() => setMenuOpen(false)}
                className={linkClass("/my-ideas")}
              >
                My Ideas
              </Link>
              <Link
                href="/my-interactions"
                onClick={() => setMenuOpen(false)}
                className={linkClass("/my-interactions")}
              >
                My Interactions
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className={linkClass("/profile")}
              >
                Profile
              </Link>
            </>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-left text-red-500 flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="text-purple-600">
                Login
              </Link>
              <Link href="/register" className="text-purple-600">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
