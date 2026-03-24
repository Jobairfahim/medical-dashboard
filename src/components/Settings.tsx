"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";

type SettingsTab = "profile" | "security";

interface HospitalProfile {
  name: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  description: string;
}

interface SecurityForm {
  current: string;
  newPass: string;
  confirm: string;
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:bg-white"
      />
    </div>
  );
}

type SaveState = "idle" | "saving" | "saved" | "error";

export function Settings() {
  const [tab, setTab] = useState<SettingsTab>("profile");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const [profile, setProfile] = useState<HospitalProfile>({
    name: "City General Hospital",
    email: "youremail@example.com",
    address: "123 Medical Center Drive, City, Country",
    phone: "+1 (555) 123-4567",
    website: "www.cityhospital.com",
    description: "",
  });

  const [security, setSecurity] = useState<SecurityForm>({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [securityError, setSecurityError] = useState<string>("");

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaveState("saving");
    await new Promise((r) => setTimeout(r, 700));
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2500);
  };

  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setSecurityError("");

    if (security.newPass.length < 8) {
      setSecurityError("New password must be at least 8 characters.");
      return;
    }
    if (security.newPass !== security.confirm) {
      setSecurityError("Passwords do not match.");
      return;
    }

    setSaveState("saving");
    await new Promise((r) => setTimeout(r, 700));
    setSecurity({ current: "", newPass: "", confirm: "" });
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2500);
  };

  const tabs: { key: SettingsTab; label: string }[] = [
    { key: "profile",  label: "Profile"  },
    { key: "security", label: "Security" },
  ];

  return (
    <div className="max-w-xl mx-auto">
      {/* Tab switcher */}
      <div className="flex gap-2 mb-6 bg-white border border-gray-200 rounded-xl p-1 w-fit">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => { setTab(key); setSaveState("idle"); setSecurityError(""); }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === key
                ? "bg-teal-500 text-white shadow-md shadow-teal-200/50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {tab === "profile" ? (
          <form onSubmit={handleProfileSave} noValidate>
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Hospital Profile</h2>
              <p className="text-sm text-gray-500 mt-0.5">Manage your hospital&apos;s public information</p>
            </div>

            <div className="px-6 py-5 space-y-4">
              <Field
                id="hospitalName"
                label="Hospital Name"
                value={profile.name}
                onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  id="email"
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
                  required
                />
                <Field
                  id="address"
                  label="Address"
                  value={profile.address}
                  onChange={(v) => setProfile((p) => ({ ...p, address: v }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  value={profile.phone}
                  onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
                  required
                />
                <Field
                  id="website"
                  label="Website"
                  type="url"
                  value={profile.website}
                  onChange={(v) => setProfile((p) => ({ ...p, website: v }))}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={profile.description}
                  onChange={(e) => setProfile((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Any specific requirements, interests, or details you'd like to share..."
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 bg-gray-50 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:bg-white resize-none"
                />
              </div>
            </div>

            <div className="px-6 pb-6">
              <SaveButton state={saveState} label="Save Changes" />
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordUpdate} noValidate>
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Security</h2>
              <p className="text-sm text-gray-500 mt-0.5">Update your account password</p>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Decorative section label */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <Icon path="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" className="w-3.5 h-3.5" />
                Change Password
              </div>

              <Field
                id="currentPassword"
                label="Current Password"
                type="password"
                value={security.current}
                onChange={(v) => setSecurity((s) => ({ ...s, current: v }))}
                required
              />
              <Field
                id="newPassword"
                label="New Password"
                type="password"
                value={security.newPass}
                onChange={(v) => setSecurity((s) => ({ ...s, newPass: v }))}
                required
                placeholder="Minimum 8 characters"
              />
              <Field
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={security.confirm}
                onChange={(v) => setSecurity((s) => ({ ...s, confirm: v }))}
                required
              />

              {/* Password strength indicator */}
              {security.newPass.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-500">Password strength</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => {
                      const strength = Math.min(
                        Math.floor(security.newPass.length / 3),
                        4
                      );
                      return (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-colors ${
                            level <= strength
                              ? strength <= 1
                                ? "bg-red-400"
                                : strength <= 2
                                ? "bg-amber-400"
                                : strength <= 3
                                ? "bg-teal-400"
                                : "bg-teal-600"
                              : "bg-gray-200"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Error message */}
              {securityError && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                  <Icon path="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-4 h-4 flex-shrink-0" />
                  {securityError}
                </div>
              )}
            </div>

            <div className="px-6 pb-6">
              <SaveButton state={saveState} label="Update Password" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface SaveButtonProps {
  state: SaveState;
  label: string;
}

function SaveButton({ state, label }: SaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={state === "saving" || state === "saved"}
      className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all disabled:cursor-default ${
        state === "saved"
          ? "bg-green-500 text-white shadow-green-200/50"
          : "bg-teal-500 hover:bg-teal-600 text-white shadow-teal-200/50"
      }`}
    >
      {state === "saving" ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Saving...
        </>
      ) : state === "saved" ? (
        <>
          <Icon path="M5 13l4 4L19 7" />
          Saved!
        </>
      ) : (
        <>
          {label}
          <Icon path="M17 8l4 4m0 0l-4 4m4-4H3" />
        </>
      )}
    </button>
  );
}
