"use client";

import React, { useEffect, useState } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import Filters from "@/components/dashboard/Filters";
import Charts from "@/components/dashboard/Charts";
import Scheduler from "@/components/dashboard/Scheduler";
import { useDashboardStore } from "@/store/dashboardStore";
import { CalendarDate } from "@internationalized/date";

type RangeValue<T> = {
  start: T;
  end: T;
};

interface School {
  id: string;
  name: string;
}

interface Session {
  id: string;
  sessionName: string;
}

export const Dashboard = () => {
  const getDashboard = useDashboardStore((state) => state.getData);
  const getFilterDashboard = useDashboardStore(
    (state) => state.getFilteredData
  );
  const [categories, setCategories] = useState([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [years, setYears] = useState([]);

  // Filters
  const [dateRange, setDateRange] =
    React.useState<RangeValue<CalendarDate> | null>();
  const [session, setSession] = useState(sessions[0]?.id || "");
  const [year, setYear] = useState(String(years[0] || ""));
  const [school, setSchool] = useState<string>(schools[0]?.id || "");

  const applyFilters = async () => {
    const filters: any = {
      session,
      year,
      school,
    };
    if (dateRange) {
      filters.startDate = dateRange.start.toString(); // ISO format
      filters.endDate = dateRange.end.toString();
    }

    const data = await getFilterDashboard(filters);
    if (data) {
      setCategories(data.categories);
    }
  };

  const resetFilters = () => {
    setDateRange(null);
    setSchool("");
    setSession("");
    setYear("");
  };

  const handleSubmit = async () => {
    const data = await getDashboard();
    if (data) {
      setCategories(data.categories);
      setSchools(data.schools);
      setSessions(data.sessions);
      setYears(data.years);
      console.log("Sessions = ", data.sessions);
    }
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
        applyFilters={applyFilters}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <SummaryCards categories={categories} />
      <Charts categories={categories} />
      <Scheduler schools={schools} />
    </>
  );
};
