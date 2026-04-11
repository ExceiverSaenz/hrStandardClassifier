"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ReviewQueue } from "@/components/review-queue";
import { EscaladosView } from "@/components/escalados-view";
import { ResueltosView } from "@/components/resueltos-view";

export type ViewType = "pendientes" | "escalados" | "resueltos";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ViewType>("pendientes");

  return (
    <div className="flex h-screen">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      {activeView === "pendientes" && <ReviewQueue />}
      {activeView === "escalados" && <EscaladosView />}
      {activeView === "resueltos" && <ResueltosView />}
    </div>
  );
}
