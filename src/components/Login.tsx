"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate async auth
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl shadow-teal-100/60 flex overflow-hidden max-w-2xl w-full border border-gray-100 flex-col md:flex-row">
        {/* Left panel */}
        <div className="hidden lg:block w-5/12 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/login.png"
            alt="Medical professionals collaborating"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white text-sm font-medium opacity-90">
              Connecting healthcare talent with leading institutions
            </p>
          </div> */}
        </div>

        {/* Right form */}
        <div className="w-full lg:w-7/12 p-6 sm:p-8 flex flex-col justify-center">
          {/* Logo
          <div className="flex items-center gap-2 mb-7">
            <div className="w-12 h-12">
              <img src="/images/logo.png" alt="LumieraMed" className="w-full h-full object-contain center" />
            </div>
          </div> */}

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">Welcome Back!</h1>
          <p className="text-gray-500 text-sm mb-7 leading-relaxed">
            This is your medical dashboard where you can manage your applications, track their status, and update your account information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-gray-50/80 focus-within:border-teal-400 focus-within:bg-white focus-within:ring-3 focus-within:ring-teal-100">
                <Icon
                  path="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  className="w-4 h-4 text-gray-400 mr-2.5 flex-shrink-0"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl px-3.5 py-2.5 bg-gray-50/80 focus-within:border-teal-400 focus-within:bg-white focus-within:ring-3 focus-within:ring-teal-100">
                <Icon
                  path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  className="w-4 h-4 text-gray-400 mr-2.5 flex-shrink-0"
                />
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-transparent text-sm outline-none flex-1 text-gray-700 placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 ml-1"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  <Icon
                    path={showPass
                      ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      : "M15 12a3 3 0 11-6 0 3 3 0 016 0z"}
                    path2={showPass ? undefined : "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline underline-offset-2">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-200"
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  Login
                  <Icon path="M17 8l4 4m0 0l-4 4m4-4H3" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
