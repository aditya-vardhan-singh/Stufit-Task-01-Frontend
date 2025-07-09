"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Dashboard } from "@/components/dashboard/Dashboard";

export default function DashboardPage() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      // if (!isLoggedIn) {
      //   router.replace("/login");
      // } else {
      //   setLoading(false);
      // }
      const ok = await checkAuth();
      if (!ok) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    verify();
  }, []);

  if (loading) return null; // or a spinner if needed

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-2 pb-24">
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Health Dashboard
        </h1>
      </div>
      <Dashboard />
    </main>
  );
}
