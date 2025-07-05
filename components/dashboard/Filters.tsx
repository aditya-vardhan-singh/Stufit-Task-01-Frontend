"use client";
import React, { useState } from "react";

export default function Filters({ schools, sessions, years }: {
  schools: { id: string, name: string }[],
  sessions: { id: string, name: string }[],
  years: number[]
}) {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [session, setSession] = useState(sessions[0]?.id || "");
  const [year, setYear] = useState(years[0]);
  const [school, setSchool] = useState(schools[0]?.id || "");

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-900 dark:text-white mb-1">Date Range</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={dateRange.from}
            onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))}
            className="rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none"
          />
          <span className="text-gray-900 dark:text-white px-1">to</span>
          <input
            type="date"
            value={dateRange.to}
            onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))}
            className="rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-900 dark:text-white mb-1">Session</label>
        <select
          value={session}
          onChange={e => setSession(e.target.value)}
          className="rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none"
        >
          {sessions.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-900 dark:text-white mb-1">Year</label>
        <select
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none"
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-900 dark:text-white mb-1">School</label>
        <select
          value={school}
          onChange={e => setSchool(e.target.value)}
          className="rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none"
        >
          {schools.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
