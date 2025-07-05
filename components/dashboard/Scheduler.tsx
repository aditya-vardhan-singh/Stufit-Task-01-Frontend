"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const SCHEDULE_DATA = [
  {
    date: "2024-07-21",
    time: "09:00 - 09:30",
    title: "Vision Screening",
    type: "upcoming",
    icon: "👁️",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    school: "Greenwood High",
  },
  {
    date: "2024-07-19",
    time: "11:00 - 11:30",
    title: "Dental Checkup",
    type: "past",
    icon: "🦷",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
    school: "Sunrise Public",
  },
  {
    date: "2024-08-03",
    time: "10:00 - 10:30",
    title: "Ear Health Seminar",
    type: "upcoming",
    icon: "👂",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    school: "Blue Valley",
  },
  {
    date: "2024-07-10",
    time: "08:00 - 08:30",
    title: "Fitness Camp",
    type: "past",
    icon: "🏃",
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
    school: "Greenwood High",
  },
];

export default function Scheduler({ schools }: { schools: { id: string, name: string }[] }) {
  const [schedulerTab, setSchedulerTab] = useState<"upcoming" | "past">("upcoming");
  const [school, setSchool] = useState(schools[0]?.id || "");

  const filteredSchedule = SCHEDULE_DATA.filter(
    (item) =>
      item.type === schedulerTab &&
      (school === "" || item.school === schools.find(s => s.id === school)?.name)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full max-w-6xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 flex flex-col mb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              schedulerTab === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-blue-100"
            }`}
            onClick={() => setSchedulerTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              schedulerTab === "past"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-blue-100"
            }`}
            onClick={() => setSchedulerTab("past")}
          >
            Past
          </button>
        </div>
        <div>
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
      <div className="flex flex-col gap-4">
        {filteredSchedule.length === 0 && (
          <div className="text-gray-400 dark:text-gray-500 text-center py-8">No {schedulerTab} events</div>
        )}
        {filteredSchedule.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-800`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl ${item.color}`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <div className="text-gray-900 dark:text-white font-medium">{item.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.date} &middot; {item.time}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{item.school}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
