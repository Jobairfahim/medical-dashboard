"use client";

import { useState } from "react";
import type { Page, Application } from "@/types";
import { Login } from "./Login";
import { Layout } from "./Layout";
import { Dashboard } from "./Dashboard";
import { Placements } from "./Placements";
import { Applications } from "./Applications";
import { ApplicationDetail } from "./ApplicationDetail";
import { Messages } from "./Messages";
import { Settings } from "./Settings";

export function AppShell() {
  const [page, setPage] = useState<Page>("login");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const navigate = (p: Page) => {
    setPage(p);
    if (p !== "application-detail") setSelectedApp(null);
  };

  if (page === "login") {
    return <Login onLogin={() => navigate("dashboard")} />;
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard navigate={navigate} />;
      case "placements":
        return <Placements />;
      case "applications":
        return <Applications onReview={(app) => { setSelectedApp(app); navigate("application-detail"); }} />;
      case "application-detail":
        return selectedApp
          ? <ApplicationDetail app={selectedApp} onBack={() => navigate("applications")} />
          : <Applications onReview={(app) => { setSelectedApp(app); navigate("application-detail"); }} />;
      case "messages":
        return <Messages />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard navigate={navigate} />;
    }
  };

  return (
    <Layout currentPage={page} navigate={navigate}>
      {renderPage()}
    </Layout>
  );
}
