"use client";

import { useState } from "react";
import type { Application } from "@/types";
import { Icon } from "./Icon";

interface ApplicationDetailProps {
  app: Application;
  onBack: () => void;
}

type DecisionStatus = "accepted" | "rejected" | null;

const DOCS = [
  { name: "Curriculum Vitae", size: "245 kB" },
  { name: "Passport Copy", size: "245 kB" },
  { name: "Academic Transcript", size: "261 kB" },
  { name: "Recommendation Letter", size: "243 kB" },
] as const;

interface InfoRowProps {
  icon: string;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm text-gray-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

export function ApplicationDetail({ app, onBack }: ApplicationDetailProps) {
  const [decision, setDecision] = useState<DecisionStatus>(null);

  const handleDecision = (status: "accepted" | "rejected") => {
    setDecision(status);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 text-sm font-medium group"
      >
        <span className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-teal-50 flex items-center justify-center">
          <Icon path="M15 19l-7-7 7-7" className="w-4 h-4" />
        </span>
        Go to back
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Decision banner */}
        {decision && (
          <div
            className={`px-8 py-3 text-sm font-semibold text-center ${
              decision === "accepted"
                ? "bg-teal-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {decision === "accepted"
              ? "✓ Application has been accepted"
              : "✗ Application has been rejected"}
          </div>
        )}

        <div className="p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left column – student info */}
            <div>
              <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://i.pravatar.cc/80?img=12"
                  alt="Ahmed Rahmin"
                  className="w-16 h-16 rounded-full object-cover mb-3 ring-4 ring-teal-50"
                />
                <h2 className="text-lg font-bold text-gray-800">Ahmed Rahmin</h2>
                <p className="text-sm text-gray-400 mt-0.5">Final Year</p>
              </div>

              <div className="space-y-3.5">
                <InfoRow icon="✉️" label="Email" value="ahmed.rahim@gmail.com" />
                <InfoRow icon="🏛️" label="University / Medical School" value="Ab university" />
                <InfoRow icon="📞" label="Phone Number" value="+88987954767" />
                <InfoRow icon="⏱️" label="Duration" value="6 months" />
                <InfoRow icon="📅" label="Start Date" value="12/2/2026" />
                <InfoRow icon="🌐" label="Language" value="English" />
                <InfoRow icon="📍" label="Preferred Cities" value="London" />
              </div>
            </div>

            {/* Right column – application info */}
            <div>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Preferred Specialty
                  </p>
                  <p className="text-base font-bold text-gray-800">Cardiology Rotation</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Application Date
                  </p>
                  <p className="font-semibold text-gray-800">1 Mar 2026</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Personal Statement
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                    I am a final-year medical student who is very interested in cardiology. I have
                    completed my internal medicine rotations and performed very well in cardiac
                    care. I am eager to learn from experienced cardiologists and gain practical,
                    hands-on experience in this field.
                  </p>
                </div>
              </div>

              {/* Submitted documents */}
              <div>
                <p className="text-sm font-bold text-gray-800 mb-3">Submitted Documents</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {DOCS.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 hover:border-teal-300 hover:bg-teal-50/30 group/doc"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon
                            path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            className="w-3.5 h-3.5 text-teal-600"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-700 truncate leading-tight">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-400">{doc.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-gray-400 group-hover/doc:text-teal-500 flex-shrink-0 ml-1 p-0.5"
                        aria-label={`Download ${doc.name}`}
                      >
                        <Icon
                          path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          className="w-3.5 h-3.5"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleDecision("rejected")}
              disabled={decision !== null}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                decision === "rejected"
                  ? "bg-red-500 text-white border-red-500"
                  : "border-red-300 text-red-500 hover:bg-red-50"
              }`}
            >
              <Icon path="M6 18L18 6M6 6l12 12" />
              Reject
            </button>
            <button
              type="button"
              onClick={() => handleDecision("accepted")}
              disabled={decision !== null}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                decision === "accepted"
                  ? "bg-teal-600 text-white shadow-teal-200/50"
                  : "bg-teal-500 hover:bg-teal-600 text-white shadow-teal-200/50"
              }`}
            >
              <Icon path="M5 13l4 4L19 7" />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
