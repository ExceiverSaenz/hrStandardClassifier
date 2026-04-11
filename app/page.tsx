"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ReviewQueue } from "@/components/review-queue";
import { EscalatedView } from "@/components/escalated-view";
import { ResolvedView } from "@/components/resolved-view";

export type ViewType = "pending" | "escalated" | "resolved";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<ViewType>("pending");

  return (
    <div className="flex h-screen">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      {activeView === "pending" && <ReviewQueue />}
      {activeView === "escalated" && <EscalatedView />}
      {activeView === "resolved" && <ResolvedView />}
    </div>
  );
}
