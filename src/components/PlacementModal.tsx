"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Icon } from "./Icon";

interface PlacementModalProps {
  onClose: () => void;
}

const DEPARTMENTS = [
  "Cardiology Rotation",
  "Neurology",
  "Oncology",
  "Pediatrics",
  "Emergency Medicine",
  "Orthopedics",
];

export function PlacementModal({ onClose }: PlacementModalProps) {
  const [dept, setDept] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [seats, setSeats] = useState("");
  const [description, setDescription] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={dialogRef} className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 id="modal-title" className="text-xl font-bold text-gray-800">Placement Information</h2>
          <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600" aria-label="Close modal">
            <Icon path="M6 18L18 6M6 6l12 12" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dept" className="block text-sm font-medium text-gray-700 mb-1.5">Department <span className="text-red-400">*</span></label>
              <select
                id="dept"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              >
                <option value="">e.g. Cardiology Rotation</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1.5">Application Deadline <span className="text-red-400">*</span></label>
              <input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-gray-700" />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
              <input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-gray-700" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="duration" className="block text-xs font-medium text-gray-700 mb-1.5">Duration (Weeks) <span className="text-red-400">*</span></label>
                <input id="duration" type="number" min="1" placeholder="e.g. 4" value={duration} onChange={(e) => setDuration(e.target.value)} required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-gray-700" />
              </div>
              <div>
                <label htmlFor="seats" className="block text-xs font-medium text-gray-700 mb-1.5">Seats <span className="text-red-400">*</span></label>
                <input id="seats" type="number" min="1" placeholder="e.g. 5" value={seats} onChange={(e) => setSeats(e.target.value)} required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-gray-700" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1.5">Requirement &amp; Description</label>
            <textarea id="desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter placement requirements and description..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-gray-700 resize-none" />
          </div>

          <button type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-200/50 mt-2">
            Publish Placement
            <Icon path="M17 8l4 4m0 0l-4 4m4-4H3" />
          </button>
        </form>
      </div>
    </div>
  );
}
