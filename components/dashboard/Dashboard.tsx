"use client";

import React, { useEffect, useState } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import Filters from "@/components/dashboard/Filters";
import Charts from "@/components/dashboard/Charts";
import Scheduler from "@/components/dashboard/Scheduler";
import { useDashboardStore } from "@/store/dashboardStore";

interface School {
  id: string;
  name: string;
}

interface Session {
  id: string;
  name: string;
}


export const Dashboard = () => {
  const getDashboard = useDashboardStore((state) => state.getData);
  const [categories, setCategories] = useState([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [years, setYears] = useState([]);

  // Filters
  const [session, setSession] = useState(sessions[0]?.id || "");
  const [year, setYear] = useState(String(years[0] || ""));
  const [school, setSchool] = useState<string>(schools[0]?.id || "");

  const applyFilters = async () => {
    // call axios to get filtered data
    return;
  };

  const resetFilters = () => {
    setSchool("");
    setSession("");
    setYear("");
    console.log("Filters reset successfully");
  };

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
      <Filters
        schools={schools}
        school={school}
        setSchool={setSchool}
        sessions={sessions}
        session={session}
        setSession={setSession}
        years={years}
        year={year}
        setYear={setYear}
        resetFilters={resetFilters}
      />
      <SummaryCards categories={categories} />
      <Charts categories={categories} />
      <Scheduler schools={schools} />
    </>
  );
};
