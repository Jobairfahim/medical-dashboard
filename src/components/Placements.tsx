"use client";

import { useState } from "react";
import type { Placement } from "@/types";
import { Icon } from "./Icon";
import { Toggle } from "./ui";
import { PlacementModal } from "./PlacementModal";

const INITIAL_DATA: Placement[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  dept: "Cardiology",
  seats: "3/5",
  duration: "4 Weeks",
  deadline: "Mar 10",
  active: i % 3 !== 1,
}));

export function Placements() {
  const [placements, setPlacements] = useState<Placement[]>(INITIAL_DATA);
  const [showModal, setShowModal] = useState(false);

  const toggleActive = (id: number) => {
    setPlacements((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const deletePlacement = (id: number) => {
    setPlacements((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" className="w-5 h-5 text-teal-500" />
          Total Placements
        </h1>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-teal-200/50"
        >
          <Icon path="M12 4v16m8-8H4" />
          Create Placement
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/70 border-b border-gray-100">
            <tr>
              {["Department", "Seats", "Duration", "Deadline", "Status", "Action"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {placements.map((p) => (
              <tr key={p.id} className="border-t border-gray-50 hover:bg-teal-50/30 group">
                <td className="px-5 py-3.5 text-gray-700 font-medium">{p.dept}</td>
                <td className="px-5 py-3.5 text-gray-600">{p.seats}</td>
                <td className="px-5 py-3.5 text-gray-600">{p.duration}</td>
                <td className="px-5 py-3.5 text-gray-600">{p.deadline}</td>
                <td className="px-5 py-3.5">
                  <Toggle on={p.active} onToggle={() => toggleActive(p.id)} label={`Toggle ${p.dept}`} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5 opacity-60 group-hover:opacity-100">
                    <button type="button" className="text-teal-500 hover:text-teal-700 p-0.5 rounded-lg hover:bg-teal-50" aria-label="Edit placement">
                      <Icon path="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </button>
                    <button type="button" onClick={() => deletePlacement(p.id)} className="text-red-400 hover:text-red-600 p-0.5 rounded-lg hover:bg-red-50" aria-label="Delete placement">
                      <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <PlacementModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
