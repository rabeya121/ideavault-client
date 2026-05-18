"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:8000/api";

  // Check if user is logged in
  useEffect(() => {
    axios
      .get(`${API}/auth/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Register
  const register = async (name, email, password, photoURL) => {
    const res = await axios.post(
      `${API}/auth/register`,
      { name, email, password, photoURL },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data;
  };

  // Login
  const login = async (email, password) => {
    const res = await axios.post(
      `${API}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data;
  };

  // Google Login
  const googleLogin = async (userData) => {
    const res = await axios.post(
      `${API}/auth/google-login`,
      userData,
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data;
  };

  // Logout
  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}