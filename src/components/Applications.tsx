"use client";

import { useState, useMemo } from "react";
import type { Application, Status } from "@/types";
import { Icon } from "./Icon";
import { StatusBadge } from "./ui";

const STATUSES: Status[] = ["Approved", "Rejected", "Pending"];

const APP_DATA: Application[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: "Ahmed Rahim",
  dept: "Cardiology Rotation",
  duration: "4 Weeks",
  deadline: "Mar 10",
  status: i === 0 || i === 1 ? "Approved" : i === 2 ? "Rejected" : "Pending",
}));

interface ApplicationsProps {
  onReview: (app: Application) => void;
}

export function Applications({ onReview }: ApplicationsProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");

  const filtered = useMemo(
    () =>
      APP_DATA.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) &&
          (!statusFilter || a.status === statusFilter)
      ),
    [search, statusFilter]
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex-1 sm:flex-none">
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-3.5 py-2 w-full sm:w-72 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
            <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="search"
              placeholder="Search Students"
              className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search students"
            />
          </div>
        </div>

        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-200 rounded-xl px-3.5 py-2 pr-9 text-sm text-gray-600 outline-none focus:border-teal-400 cursor-pointer w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | "")}
            aria-label="Filter by status"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Icon path="M19 9l-7 7-7-7" className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        <span className="text-sm text-gray-400">{filtered.length} results</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50/70 border-b border-gray-100">
              <tr>
                {["Students", "Department", "Duration", "Deadline", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t border-gray-50 hover:bg-teal-50/30">
                <td className="px-5 py-3.5 text-gray-800 font-medium">{a.name}</td>
                <td className="px-5 py-3.5 text-gray-600">{a.dept}</td>
                <td className="px-5 py-3.5 text-gray-600">{a.duration}</td>
                <td className="px-5 py-3.5 text-gray-600">{a.deadline}</td>
                <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
                <td className="px-5 py-3.5">
                  <button
                    type="button"
                    onClick={() => onReview(a)}
                    className="text-teal-500 hover:text-teal-700 text-sm font-semibold hover:underline underline-offset-2"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
