"use client";

import { useState } from "react";
import { ArrowUpRight, Clock, User } from "lucide-react";
import { CaseDetail } from "./case-detail";

interface EscalatedCardProps {
  id: string;
  initials: string;
  name: string;
  department: string;
  location: string;
  timestamp: string;
  message: string;
  escalatedTo: string;
  reason: string;
  escalatedTime: string;
  previousAlerts: number;
  onViewDetails: () => void;
}

function EscalatedCard({
  initials,
  name,
  department,
  location,
  timestamp,
  message,
  escalatedTo,
  reason,
  escalatedTime,
  onViewDetails,
}: EscalatedCardProps) {
  return (
    <article className="rounded-xl border border-warning/30 bg-card p-5">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20 text-sm font-semibold text-warning">
            {initials}
          </div>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">
              {department} · {location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning">
          <Clock className="h-3 w-3" />
          {escalatedTime}
        </div>
      </div>

      <blockquote className="mb-4 border-l-2 border-warning/50 bg-warning/5 py-2 pl-4 text-sm text-foreground/90">
        &ldquo;{message}&rdquo;
      </blockquote>

      <div className="mb-4 rounded-lg bg-secondary/50 p-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Escalated to:</span>
          <span className="font-medium text-foreground">{escalatedTo}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-medium">Reason:</span> {reason}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{timestamp}</span>
        <div className="flex gap-2">
          <button 
            onClick={onViewDetails}
            className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            View Details
          </button>
          <button className="rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground transition-colors hover:bg-warning/90">
            Resolve
          </button>
        </div>
      </div>
    </article>
  );
}

const escalatedCases = [
  {
    id: "8472",
    initials: "CR",
    name: "Carlos R.",
    department: "Sales",
    location: "Monterrey",
    timestamp: "Escalated 2 hrs ago",
    message:
      "Hey idiot, if you don't meet the goal I'm going to report you to everyone. You're a complete failure and you don't deserve to be here.",
    escalatedTo: "Human Resources - Director",
    reason: "Repeated pattern of verbal aggression",
    escalatedTime: "In review 2h",
    previousAlerts: 3,
  },
  {
    id: "8471",
    initials: "JT",
    name: "Jorge T.",
    department: "IT",
    location: "Guadalajara",
    timestamp: "Escalated 5 hrs ago",
    message:
      "Nobody can stand you on the team. Everyone talks bad about you behind your back and I can confirm it.",
    escalatedTo: "IT Manager",
    reason: "Workplace bullying identified",
    escalatedTime: "In review 5h",
    previousAlerts: 1,
  },
  {
    id: "8470",
    initials: "LM",
    name: "Laura M.",
    department: "Marketing",
    location: "CDMX",
    timestamp: "Escalated 8 hrs ago",
    message:
      "Your work is so bad that you better not submit it. I'm embarrassed that you're on my team.",
    escalatedTo: "Marketing Director",
    reason: "Intimidation and belittlement",
    escalatedTime: "In review 8h",
    previousAlerts: 2,
  },
  {
    id: "8469",
    initials: "PG",
    name: "Pedro G.",
    department: "Operations",
    location: "MTY",
    timestamp: "Escalated 1 day ago",
    message:
      "If you make another mistake like that, I guarantee you won't last long here.",
    escalatedTo: "Human Resources - Investigation",
    reason: "Direct workplace threat",
    escalatedTime: "In review 1d",
    previousAlerts: 0,
  },
  {
    id: "8468",
    initials: "SM",
    name: "Sandra M.",
    department: "Customer Service",
    location: "GDL",
    timestamp: "Escalated 1 day ago",
    message:
      "You're the most incompetent person I've ever worked with. I don't know how you're still here.",
    escalatedTo: "CS Manager",
    reason: "Continuous harassment",
    escalatedTime: "In review 1d",
    previousAlerts: 4,
  },
];

export function EscalatedView() {
  const [selectedCase, setSelectedCase] = useState<typeof escalatedCases[0] | null>(null);

  if (selectedCase) {
    return (
      <CaseDetail
        onClose={() => setSelectedCase(null)}
        caseData={{
          id: selectedCase.id,
          employeeName: selectedCase.name,
          initials: selectedCase.initials,
          department: selectedCase.department,
          location: selectedCase.location,
          previousAlerts: selectedCase.previousAlerts,
        }}
      />
    );
  }

  return (
    <main className="flex-1 overflow-auto bg-card/50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Escalated Cases
          </h1>
          <p className="text-sm text-muted-foreground">
            5 cases under supervisor review
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          View Reports
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-warning">5</p>
          <p className="mt-1 text-sm text-muted-foreground">Active cases</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-foreground">12h</p>
          <p className="mt-1 text-sm text-muted-foreground">Avg. escalation time</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-success">3</p>
          <p className="mt-1 text-sm text-muted-foreground">Resolved today</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {escalatedCases.map((escalatedCase, index) => (
          <EscalatedCard 
            key={index} 
            {...escalatedCase} 
            onViewDetails={() => setSelectedCase(escalatedCase)}
          />
        ))}
      </div>
    </main>
  );
}
