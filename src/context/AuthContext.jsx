"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axios.get(`${API}/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data);
        setLoading(false);
      } catch {
        try {
          const session = await authClient.getSession();
          if (session?.data?.user) {
            const betterUser = session.data.user;
            const res = await axios.post(
              `${API}/auth/google-login`,
              {
                name: betterUser.name,
                email: betterUser.email,
                photoURL: betterUser.image,
              },
              { withCredentials: true },
            );
            setUser(res.data.user);
          }
        } catch (err) {
          // BetterAuth session নেই, ignore করো
          console.log("No session found");
        } finally {
          setLoading(false);
        }
      }
    };
    initAuth();
  }, []);

  // Register
  const register = async (name, email, password, photoURL) => {
    const res = await axios.post(
      `${API}/auth/register`,
      { name, email, password, photoURL },
      { withCredentials: true },
    );
    setUser(res.data.user);
    return res.data;
  };

  // Login
  const login = async (email, password) => {
    const res = await axios.post(
      `${API}/auth/login`,
      { email, password },
      { withCredentials: true },
    );
    setUser(res.data.user);
    return res.data;
  };

  // Google Login
  const googleLogin = async (userData) => {
    const res = await axios.post(`${API}/auth/google-login`, userData, {
      withCredentials: true,
    });
    setUser(res.data.user);
    return res.data;
  };

  // Logout
  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    await authClient.signOut().catch(() => {});
    setUser(null);
  };

  const getToken = async () => {
    try {
      const session = await authClient.getSession();
      return session?.data?.token || null;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        register,
        login,
        googleLogin,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
