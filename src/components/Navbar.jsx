// "use client";

// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const router = useRouter();

//   const handleLogout = async () => {
//     await logout();
//     toast.success("Logged out successfully!");
//     router.push("/");
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-purple-600">
//           💡 IdeaVault
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">
//             Home
//           </Link>
//           <Link href="/ideas" className="text-gray-700 hover:text-purple-600 font-medium">
//             Ideas
//           </Link>
//           {user && (
//             <>
//               <Link href="/add-idea" className="text-gray-700 hover:text-purple-600 font-medium">
//                 Add Idea
//               </Link>
//               <Link href="/my-ideas" className="text-gray-700 hover:text-purple-600 font-medium">
//                 My Ideas
//               </Link>
//               <Link href="/my-interactions" className="text-gray-700 hover:text-purple-600 font-medium">
//                 My Interactions
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Right Side */}
//         <div className="hidden md:flex items-center gap-3">
//           {user ? (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2"
//               >
//                 <img
//                   src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
//                   alt="profile"
//                   className="w-9 h-9 rounded-full border-2 border-purple-400"
//                 />
//                 <span className="text-gray-700 font-medium">{user.name}</span>
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
//                   <Link
//                     href="/profile"
//                     className="block px-4 py-2 text-gray-700 hover:bg-purple-50"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex gap-2">
//               <Link
//                 href="/login"
//                 className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/register"
//                 className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//               >
//                 Register
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
//           <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-700">Home</Link>
//           <Link href="/ideas" onClick={() => setMenuOpen(false)} className="text-gray-700">Ideas</Link>
//           {user && (
//             <>
//               <Link href="/add-idea" onClick={() => setMenuOpen(false)} className="text-gray-700">Add Idea</Link>
//               <Link href="/my-ideas" onClick={() => setMenuOpen(false)} className="text-gray-700">My Ideas</Link>
//               <Link href="/my-interactions" onClick={() => setMenuOpen(false)} className="text-gray-700">My Interactions</Link>
//             </>
//           )}
//           {user ? (
//             <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
//           ) : (
//             <div className="flex gap-2">
//               <Link href="/login" className="text-purple-600">Login</Link>
//               <Link href="/register" className="text-purple-600">Register</Link>
//             </div>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }   

"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    setDropdownOpen(false);
    router.push("/");
  };

    const getAvatar = (user) => {
    if (user?.image && user.image.startsWith("http")) {
      return user.image;
    }
    return "/images/user.png";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-purple-600">
          💡 IdeaVault
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
          <Link href="/ideas" className="text-gray-700 hover:text-purple-600 font-medium">Ideas</Link>
          {user && (
            <>
              <Link href="/add-idea" className="text-gray-700 hover:text-purple-600 font-medium">Add Idea</Link>
              <Link href="/my-ideas" className="text-gray-700 hover:text-purple-600 font-medium">My Ideas</Link>
              <Link href="/my-interactions" className="text-gray-700 hover:text-purple-600 font-medium">My Interactions</Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200 hover:bg-purple-100 transition"
              >
                <img
                  src={getAvatar()}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-700 font-medium text-sm">{user.name}</span>
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
              <Link href="/login" className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50">
                Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-700">Home</Link>
          <Link href="/ideas" onClick={() => setMenuOpen(false)} className="text-gray-700">Ideas</Link>
          {user && (
            <>
              <Link href="/add-idea" onClick={() => setMenuOpen(false)} className="text-gray-700">Add Idea</Link>
              <Link href="/my-ideas" onClick={() => setMenuOpen(false)} className="text-gray-700">My Ideas</Link>
              <Link href="/my-interactions" onClick={() => setMenuOpen(false)} className="text-gray-700">My Interactions</Link>
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="text-gray-700">Profile</Link>
            </>
          )}
          {user ? (
            <button onClick={handleLogout} className="text-left text-red-500 flex items-center gap-2">
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="text-purple-600">Login</Link>
              <Link href="/register" className="text-purple-600">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}