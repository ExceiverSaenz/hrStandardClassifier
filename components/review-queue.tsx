"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { AlertCard } from "./alert-card";

interface StatCardProps {
  value: string;
  label: string;
  variant: "danger" | "warning" | "default";
}

function StatCard({ value, label, variant }: StatCardProps) {
  const colors = {
    danger: "text-destructive",
    warning: "text-warning",
    default: "text-foreground",
  };

  return (
    <div className="rounded-xl bg-secondary/50 p-4">
      <p className={cn("text-3xl font-bold", colors[variant])}>{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  active?: boolean;
}

function FilterButton({ label, active }: FilterButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "bg-secondary text-foreground hover:bg-secondary/80"
      )}
    >
      {label}
    </button>
  );
}

const alerts = [
  {
    initials: "CR",
    name: "Carlos R.",
    department: "Sales",
    location: "Monterrey",
    severity: "High" as const,
    timestamp: "23 min ago",
    message:
      "Hey idiot, if you don't meet the goal I'm going to report you to everyone. You're a complete failure and you don't deserve to be here.",
  },
  {
    initials: "ML",
    name: "Maria L.",
    department: "Support",
    location: "CDMX",
    severity: "Medium" as const,
    timestamp: "1 hr ago",
    message:
      "You're failing again at everything. I'm tired of covering up your mistakes in front of the client.",
  },
  {
    initials: "JT",
    name: "Jorge T.",
    department: "IT",
    location: "Guadalajara",
    severity: "High" as const,
    timestamp: "2 hrs ago",
    message:
      "Nobody can stand you on the team. Everyone talks bad about you behind your back and I can confirm it.",
  },
  {
    initials: "AP",
    name: "Ana P.",
    department: "Finance",
    location: "MTY",
    severity: "Medium" as const,
    timestamp: "3 hrs ago",
    message:
      "This report is full of errors again. Can you seriously not do anything right?",
  },
  {
    initials: "RG",
    name: "Roberto G.",
    department: "Logistics",
    location: "CDMX",
    severity: "Medium" as const,
    timestamp: "5 hrs ago",
    message:
      "Don't bother giving your opinion, nobody wants to hear you in this meeting.",
  },
];

export function ReviewQueue() {
  return (
    <main className="flex-1 overflow-auto bg-card/50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Review Queue
          </h1>
          <p className="text-sm text-muted-foreground">
            38 pending alerts · sorted by severity
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          View Patterns
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <StatCard value="12" label="High severity" variant="danger" />
        <StatCard value="26" label="Medium severity" variant="warning" />
        <StatCard value="4.2h" label="Avg. response time" variant="default" />
      </div>

      <div className="mb-6 flex gap-2">
        <FilterButton label="All" active />
        <FilterButton label="High" />
        <FilterButton label="Medium" />
        <FilterButton label="Escalated" />
      </div>

      <div className="flex flex-col gap-4">
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </div>
    </main>
  );
}
