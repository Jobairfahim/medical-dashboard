"use client";

import { useState } from "react";
import type { Page, Placement } from "@/types";
import { Icon } from "./Icon";
import { Toggle } from "./ui";
import { PlacementModal } from "./PlacementModal";

interface DashboardProps {
  navigate: (page: Page) => void;
}

const INITIAL_PLACEMENTS: Placement[] = [
  { id: 1, dept: "Cardiology", seats: "3/5", duration: "4 Weeks", deadline: "Mar 10", active: true },
  { id: 2, dept: "Cardiology", seats: "3/5", duration: "4 Weeks", deadline: "Mar 10", active: false },
  { id: 3, dept: "Cardiology", seats: "3/5", duration: "4 Weeks", deadline: "Mar 10", active: true },
];

const NOTIFICATIONS = [
  { text: "Your application APP1023 is currently processing.", time: "2h ago" },
  { text: "Your Business Studies application has been approved.", time: "1d ago" },
  { text: "Your application APP1023 is currently processing.", time: "2h ago" },
  { text: "You have received a new message.", time: "2d ago" },
  { text: "Your Business Studies application has been approved.", time: "1d ago" },
];

export function Dashboard({ navigate }: DashboardProps) {
  const [showModal, setShowModal] = useState(false);
  const [placements, setPlacements] = useState<Placement[]>(INITIAL_PLACEMENTS);

  const togglePlacement = (id: number) => {
    setPlacements((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  };

  const deletePlacement = (id: number) => {
    setPlacements((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden h-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
          alt="Hospital corridor"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex items-center px-8"
          style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.88) 0%, rgba(20,184,166,0.65) 100%)" }}
        >
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Welcome back, City Hospital 👋</h1>
            <p className="text-teal-100 text-xs max-w-md leading-relaxed">
              This is your dashboard where you can manage your applications, track their status, and update your account information.
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4">
        {(
          [
            { icon: "📋", value: "05", label: "Active Placements" },
            { icon: "📄", value: "02", label: "Total Applications" },
            { icon: "✅", value: "02", label: "Accepted" },
            { icon: "⏰", value: "01", label: "Pending" },
          ] as const
        ).map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 leading-none mb-0.5">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Recent placements */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
            <Icon path="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" className="w-4 h-4 text-teal-500" />
            Recent Placements
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Department", "Seats", "Duration", "Deadline", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {placements.map((p) => (
                <tr key={p.id} className="border-t border-gray-50 group">
                  <td className="py-2.5 text-gray-700 font-medium">{p.dept}</td>
                  <td className="py-2.5 text-gray-600">{p.seats}</td>
                  <td className="py-2.5 text-gray-600">{p.duration}</td>
                  <td className="py-2.5 text-gray-600">{p.deadline}</td>
                  <td className="py-2.5">
                    <Toggle on={p.active} onToggle={() => togglePlacement(p.id)} label={`Toggle ${p.dept}`} />
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100">
                      <button type="button" className="text-teal-500 hover:text-teal-700 p-0.5 rounded" aria-label="Edit">
                        <Icon path="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </button>
                      <button type="button" onClick={() => deletePlacement(p.id)} className="text-red-400 hover:text-red-600 p-0.5 rounded" aria-label="Delete">
                        <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Quick actions */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-teal-200/50">
                <Icon path="M12 4v16m8-8H4" className="w-3.5 h-3.5" /> Create Placement
              </button>
              <button type="button" onClick={() => navigate("applications")}
                className="flex items-center gap-2 bg-teal-900 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2 rounded-xl">
                <Icon path="M15 12a3 3 0 11-6 0 3 3 0 016 0z" className="w-3.5 h-3.5" /> View Total Applications
              </button>
              <button type="button" onClick={() => navigate("settings")}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl">
                <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" className="w-3.5 h-3.5" />
                Account Settings
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
            <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="w-4 h-4 text-teal-500" />
            Notifications
          </h2>
          <ul className="space-y-3">
            {NOTIFICATIONS.map((n, i) => (
              <li key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <p className="text-xs text-gray-700 leading-relaxed">{n.text}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showModal && <PlacementModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
