"use client";

import { RouterProvider } from "@heroui/react";
import { AuthProvider } from "@/context/AuthContext";


export default function Providers({ children }) {
  return (
    <AuthProvider>
      <RouterProvider>
        {children}
      </RouterProvider>
    </AuthProvider>
  );
}