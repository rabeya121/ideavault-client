"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter,usePathname } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${pathname}`);
    }
  }, [user, loading]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  return children;
}