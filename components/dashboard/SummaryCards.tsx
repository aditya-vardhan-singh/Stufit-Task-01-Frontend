import React from "react";

export default function SummaryCards({ categories }: { categories: any[] }) {
  const summary = [
    {
      label: "Categories",
      value: categories.length,
      icon: "📂",
      color: "from-blue-600 to-indigo-500",
    },
    {
      label: "Total Diagnoses",
      value: categories.reduce((sum, c) => sum + c.count, 0),
      icon: "🩺",
      color: "from-indigo-500 to-blue-600",
    },
    {
      label: "Total Diseases",
      value: categories.reduce((sum, c) => sum + c.diseases.length, 0),
      icon: "🦠",
      color: "from-blue-400 to-indigo-400",
    },
    {
      label: "Most Common",
      value: (() => {
        let max = { name: "", count: 0 };

        categories.forEach((c) =>
          c.diseases.forEach((d: { count: number; name: string }) => {
            if (d.count > max.count) max = { name: d.name, count: d.count };
          })
        );
        return max.name;
      })(),
      icon: "🏆",
      color: "from-indigo-400 to-blue-400",
    },
  ];

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {summary.map((card) => (
        <div
          key={card.label}
          className={`bg-gradient-to-tr ${card.color} rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[110px]`}
          style={{
            backdropFilter: "blur(8px)",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="text-3xl mb-2">{card.icon}</div>
          <div className="text-2xl font-bold text-white">{card.value}</div>
          <div className="text-sm text-white/80">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
