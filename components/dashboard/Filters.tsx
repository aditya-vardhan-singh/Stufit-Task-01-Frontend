"use client";
import React from "react";
import { Select, SelectItem } from "@heroui/select";
import { DateRangePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import { CalendarDate } from "@internationalized/date";

type RangeValue<T> = {
  start: T;
  end: T;
};

export default function Filters({
  schools,
  school,
  setSchool,
  sessions,
  session,
  setSession,
  years,
  year,
  setYear,
  resetFilters,
  applyFilters,
  dateRange,
  setDateRange,
}: {
  schools: { id: string; name: string }[];
  school: string;
  setSchool: React.Dispatch<any>;
  sessions: { id: string; sessionName: string }[];
  session: string;
  setSession: React.Dispatch<any>;
  years: number[];
  year: string;
  setYear: React.Dispatch<any>;
  resetFilters: () => void;
  applyFilters: () => void;
  dateRange: RangeValue<CalendarDate> | null | undefined;
  setDateRange: React.Dispatch<
    React.SetStateAction<RangeValue<CalendarDate> | null | undefined>
  >;
}) {
  return (
    <div className="w-full max-w-6xl mb-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <DateRangePicker
            showMonthAndYearPickers={true}
            label="Date Range"
            variant="bordered"
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
        <div className="flex flex-col items-center">
          <Select
            className=""
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
              <SelectItem key={session.id}>{session.sessionName}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col items-center">
          <Select
            className=""
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
        <div className="flex flex-col items-center">
          <Select
            className=""
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
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 md:col-start-1">
          <Button
            color="primary"
            variant="flat"
            className="w-full"
            onPress={applyFilters}
          >
            Apply
          </Button>
        </div>
        <div className="col-span-2">
          <Button
            color="danger"
            variant="flat"
            className="w-full"
            onPress={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
