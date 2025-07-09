"use client";
import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

const COLORS = [
  "#2563eb", "#6366f1", "#f59e42", "#10b981", "#f43f5e", "#fbbf24", "#3b82f6", "#a21caf"
];

export default function Charts({ categories }: { categories: any[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedCategory = categories[selectedIdx];

  // Calculate total diagnoses for percentage
  const totalDiagnoses = categories.reduce((sum, c) => sum + c.count, 0);

  const barData = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        label: "Diagnoses Count",
        data: categories.map(c => c.count),
        backgroundColor: COLORS,
        borderRadius: 12,
        borderSkipped: false,
        hoverBackgroundColor: COLORS.map(c => c + "cc"),
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Diagnoses by Category",
        color: "#2563eb",
        font: { size: 20, weight: "bold" },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const value = ctx.parsed.y;
            const percent = ((value / totalDiagnoses) * 100).toFixed(1);
            return `Count: ${value} (${percent}%)`;
          },
        },
        backgroundColor: "#2563eb",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#6366f1",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280", font: { weight: "bold", size: 14 } },
        grid: { color: "#e5e7eb" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#222", font: { size: 13 } },
        grid: { color: "#e5e7eb" },
      },
    },
    onClick: (_evt: any, elements: any) => {
      if (elements.length > 0) setSelectedIdx(elements[0].index);
    },
  };

  // Pie chart: add percentage and count to labels
  const totalCategory = selectedCategory
    ? selectedCategory.diseases.reduce((sum: number, d: any) => sum + d.count, 0)
    : 0;

  const doughnutData = selectedCategory
    ? {
        labels: selectedCategory.diseases.map(
          (d: any) =>
            `${d.name} (${d.count}, ${((d.count / totalCategory) * 100).toFixed(1)}%)`
        ),
        datasets: [
          {
            data: selectedCategory.diseases.map((d: any) => d.count),
            backgroundColor: COLORS,
            borderWidth: 2,
            hoverOffset: 16,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const doughnutOptions = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#6b7280",
          font: { weight: "bold", size: 13 },
          padding: 18,
          boxWidth: 18,
        },
      },
      title: {
        display: true,
        text: selectedCategory
          ? `${selectedCategory.name} - Disease Types`
          : "Category - Disease Types",
        color: "#2563eb",
        font: { size: 18, weight: "bold" },
        padding: { bottom: 10 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const label = ctx.label || "";
            const value = ctx.parsed;
            return `${label}: ${value}`;
          },
        },
        backgroundColor: "#6366f1",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#2563eb",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
      datalabels: {
        display: true,
        color: "#222",
        font: { weight: "bold" },
        formatter: (value: number, ctx: any) => {
          const percent = ((value / totalCategory) * 100).toFixed(1);
          return `${percent}%`;
        },
      },
    },
  };

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 flex flex-col"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Diagnoses by Category
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Total: {totalDiagnoses}
          </span>
        </div>
        <Bar data={barData} options={barOptions as any} height={280} />
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {categories.map((cat, idx) => (
            <button
              key={cat.name}
              className={`px-4 py-1 rounded-full text-xs font-medium transition ${
                idx === selectedIdx
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-100"
              }`}
              onClick={() => setSelectedIdx(idx)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="col-span-2 md:col-span-1 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 flex flex-col"
      >
        <div className="flex items-center justify-between mb-2 w-full">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {selectedCategory ? selectedCategory.name : "Category"} - Disease Types
          </h2>
          <span className="text-xs text-gray-500 dark:text-white">
            Total: {totalCategory}
          </span>
        </div>
        {selectedCategory && selectedCategory.diseases.length > 0 ? (
          <Doughnut data={doughnutData} options={doughnutOptions as any} height={260} />
        ) : (
          <div className="text-gray-400 text-center py-12">No data available</div>
        )}
        {selectedCategory && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Disease Breakdown
            </h3>
            <ul className="space-y-1">
              {selectedCategory.diseases.map((d: any, i: number) => (
                <li key={d.name} className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-800 dark:text-gray-100 font-medium">
                    {d.name}
                  </span>
                  <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                    {d.count} ({((d.count / totalCategory) * 100).toFixed(1)}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
