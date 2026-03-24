"use client";

import { useState, type ReactNode } from "react";
import type { Page } from "@/types";
import { Icon } from "./Icon";
import { Avatar, Logo } from "./ui";

interface NavItem {
  key: Page;
  label: string;
  iconPath: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard",    label: "Dashboard",    iconPath: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { key: "placements",   label: "Placements",   iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { key: "applications", label: "Applications", iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { key: "messages",     label: "Messages",     iconPath: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { key: "settings",     label: "Settings",     iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
];

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  navigate: (page: Page) => void;
}

export function Layout({ children, currentPage, navigate }: LayoutProps) {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const activeNav = currentPage === "application-detail" ? "applications" : currentPage;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col py-6 px-4 flex-shrink-0 shadow-sm transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <Logo />

        <nav className="flex-1 space-y-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => navigate(item.key)}
                aria-current={isActive ? "page" : undefined}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal-500 text-white shadow-md shadow-teal-200/60"
                    : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                <Icon path={item.iconPath} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => navigate("login")}
          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl font-medium"
        >
          <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          Log Out
        </button>
        
        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <Icon path="M6 18L18 6M6 6l12 12" className="w-5 h-5 text-gray-500" />
        </button>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4 lg:gap-6 z-10">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Open sidebar"
          >
            <Icon path="M4 6h16M4 12h16M4 18h16" className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex-1 lg:flex-none lg:w-80">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 w-full focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
              <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="search"
                placeholder="Search students..."
                className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search students"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4 lg:gap-6">
            <button
              type="button"
              className="relative p-2 rounded-xl hover:bg-gray-50"
              aria-label="Notifications"
            >
              <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" aria-hidden="true" />
            </button>

            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800 leading-tight">City Hospital</p>
                <p className="text-xs text-gray-400">Hospital Id: 20394</p>
              </div>
              <Avatar size="w-9 h-9" src="https://i.pravatar.cc/40?img=50" alt="City Hospital" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
