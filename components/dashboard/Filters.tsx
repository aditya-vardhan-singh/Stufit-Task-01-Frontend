"use client";
import React, { useState } from "react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import { DateRangePicker } from "@heroui/date-picker";

export default function Filters({
  schools,
  sessions,
  years,
}: {
  schools: { id: string; name: string }[];
  sessions: { id: string; name: string }[];
  years: number[];
}) {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [session, setSession] = useState(sessions[0]?.id || "");
  const [year, setYear] = useState(String(years[0] || ""));
  const [school, setSchool] = useState<string>(schools[0]?.id || "");

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="flex flex-col">
        <DateRangePicker
          showMonthAndYearPickers={true}
          className="max-w-xs"
          label="Stay duration"
          variant="bordered"
        />
      </div>
      <div className="flex flex-col">
        <Select
          className="max-w-xs"
          label="Session"
          placeholder="Select a session"
          variant="bordered"
          selectedKeys={new Set([session])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0]; // assuming single selection
            setSession(String(selected));
          }}
        >
          {sessions.map((session) => (
            <SelectItem key={session.id}>{session.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col">
        <Select
          className="max-w-xs"
          label="Year"
          placeholder="Select an year"
          variant="bordered"
          selectedKeys={new Set([year])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0];
            setYear(String(selected));
          }}
        >
          {years.map((year) => (
            <SelectItem key={year.toString()} textValue={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col">
        <Select
          className="max-w-xs"
          label="School"
          placeholder="Select a school"
          variant="bordered"
          selectedKeys={new Set([school])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0]; // assuming single selection
            setSchool(String(selected));
          }}
        >
          {schools.map((school) => (
            <SelectItem key={school.id}>{school.name}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
