// "use client";

// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { authClient } from "@/lib/auth-client";
// import useTitle from "@/hook/useTitle";

// export default function LoginPage() {
//   useTitle("Login");

//   const { login, googleLogin } = useAuth();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await login(formData.email, formData.password);
//       toast.success("Login successful!");
//       router.push("/");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     setGoogleLoading(true);

//     try {
//       const data = await authClient.signIn.social({
//         provider: "google",
//         callbackURL: "/",
//       });

//       if (data?.user) {
//         await googleLogin({
//           name: data.user.name,
//           email: data.user.email,
//           photoURL: data.user.image,
//         });

//         toast.success("Google login successful!");
//         router.push("/");
//       }
//     } catch (error) {
//       toast.error("Google login failed!");
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">

//       {/* Hidden fake fields (autofill blocker trick) */}
//       <input type="text" name="fake_user" style={{ display: "none" }} />
//       <input type="password" name="fake_pass" style={{ display: "none" }} />

//       <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 w-full max-w-md">

//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-purple-600">
//             💡 IdeaVault
//           </h1>
//           <p className="text-gray-500 mt-2">
//             Welcome back! Please login.
//           </p>
//         </div>

//         {/* FORM */}
//         <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>

//             <div className="relative">
//               <FaEnvelope className="absolute left-3 top-3 text-gray-400" />

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 autoComplete="username"
//                 className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>

//             <div className="relative">
//               <FaLock className="absolute left-3 top-3 text-gray-400" />

//               <input
//                 type={showPass ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 autoComplete="new-password"
//                 className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPass(!showPass)}
//                 className="absolute right-3 top-3 text-gray-400"
//               >
//                 {showPass ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           {/* Forgot Password */}
//           <div className="text-right">
//             <button type="button" className="text-sm text-purple-500 hover:underline">
//               Forgot Password?
//             </button>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
//           >
//             {loading ? (
//               <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//             ) : (
//               "Login"
//             )}
//           </button>

//           {/* Divider */}
//           <div className="relative my-2">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-200"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="bg-white px-2 text-gray-400">OR</span>
//             </div>
//           </div>

//           {/* Google Login */}
//           <button
//             type="button"
//             onClick={handleGoogleLogin}
//             disabled={googleLoading}
//             className="w-full border border-gray-300 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition disabled:opacity-50"
//           >
//             {googleLoading ? (
//               <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
//             ) : (
//               <>
//                 <img
//                   src="https://www.google.com/favicon.ico"
//                   alt="google"
//                   className="w-5 h-5"
//                 />
//                 <span className="font-medium text-gray-700">
//                   Continue with Google
//                 </span>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Register */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-purple-600 font-medium hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }     

"use client";

import { useState, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import useTitle from "@/hook/useTitle";
import LoadingSpinner from "@/components/LoadingSpinner";

function LoginContent() {
  useTitle("Login");

  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Login successful!");
      router.push(redirect);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect,
      });
      if (data?.user) {
        await googleLogin({
          name: data.user.name,
          email: data.user.email,
          photoURL: data.user.image,
        });
        toast.success("Google login successful!");
        router.push(redirect);
      }
    } catch (error) {
      toast.error("Google login failed!");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 w-full max-w-md">

        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-600">💡 IdeaVault</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Please login.</p>
        </div>

        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="username"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Pass*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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

          {/* Forgot Pass */}
          <div className="text-right">
            <button type="button" className="text-sm text-purple-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : "Login"}
          </button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-400 text-sm">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full border border-gray-300 dark:border-gray-600 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
          >
            {googleLoading ? (
              <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" alt="google" className="w-5 h-5" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Continue with Google</span>
              </>
            )}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-purple-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginContent />
    </Suspense>
  );
}
