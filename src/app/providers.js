"use client";
import { RouterProvider } from "@heroui/react";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <RouterProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}