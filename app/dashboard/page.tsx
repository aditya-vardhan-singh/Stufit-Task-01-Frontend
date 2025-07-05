import React from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import Filters from "@/components/dashboard/Filters";
import Charts from "@/components/dashboard/Charts";
import Scheduler from "@/components/dashboard/Scheduler";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/dashboard/data`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch dashboard data");
  }
  const data = response.data;
  const categories = data.categories;
  const schools = data.schools;
  const sessions = data.sessions;
  const years = data.years;

  return (
    <main className="min-h-screen flex flex-col items-center py-10 px-2 pb-24">
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Health Dashboard
        </h1>
      </div>
      <Filters schools={schools} sessions={sessions} years={years} />
      <SummaryCards categories={categories} />
      <Charts categories={categories} />
      <Scheduler schools={schools} />
    </main>
  );
}
