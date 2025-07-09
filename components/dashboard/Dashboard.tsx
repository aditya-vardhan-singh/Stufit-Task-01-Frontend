"use client";

import React, { useEffect, useState } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import Filters from "@/components/dashboard/Filters";
import Charts from "@/components/dashboard/Charts";
import Scheduler from "@/components/dashboard/Scheduler";
import { useDashboardStore } from "@/store/dashboardStore";

export const Dashboard = () => {
  const getDashboard = useDashboardStore((state) => state.getData);
  const [categories, setCategories] = useState([]);
  const [schools, setSchools] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [years, setYears] = useState([]);

  const handleSubmit = async () => {
    const response = await getDashboard();
    if (response.status !== 200) {
      throw new Error("Failed to fetch dashboard data");
    }
    const data = response.data;
    setCategories(data.categories);
    setSchools(data.schools);
    setSessions(data.sessions);
    setYears(data.years);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <Filters schools={schools} sessions={sessions} years={years} />
      <SummaryCards categories={categories} />
      <Charts categories={categories} />
      <Scheduler schools={schools} />
    </>
  );
};
