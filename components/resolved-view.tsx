"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, XCircle, ArrowUp } from "lucide-react";

type ResolutionType = "false_positive" | "action_taken" | "escalation_resolved";

interface ResolvedCardProps {
  initials: string;
  name: string;
  department: string;
  location: string;
  timestamp: string;
  message: string;
  resolution: ResolutionType;
  resolvedBy: string;
  note?: string;
}

function ResolvedCard({
  initials,
  name,
  department,
  location,
  timestamp,
  message,
  resolution,
  resolvedBy,
  note,
}: ResolvedCardProps) {
  const resolutionConfig = {
    false_positive: {
      label: "False Positive",
      icon: XCircle,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50",
    },
    action_taken: {
      label: "Action Taken",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    escalation_resolved: {
      label: "Escalation Resolved",
      icon: ArrowUp,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  };

  const config = resolutionConfig[resolution];
  const Icon = config.icon;

  return (
    <article className="rounded-xl border border-border/50 bg-card/50 p-5 opacity-80">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            {initials}
          </div>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">
              {department} · {location}
            </p>
          </div>
        </div>
        <div className={cn("flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium", config.bgColor, config.color)}>
          <Icon className="h-3 w-3" />
          {config.label}
        </div>
      </div>

      <blockquote className="mb-4 border-l-2 border-muted bg-muted/20 py-2 pl-4 text-sm text-foreground/70">
        &ldquo;{message}&rdquo;
      </blockquote>

      <div className="rounded-lg bg-secondary/30 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Resolved by: <span className="font-medium text-foreground">{resolvedBy}</span></span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        {note && (
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium">Note:</span> {note}
          </p>
        )}
      </div>
    </article>
  );
}

const resolvedCases = [
  {
    initials: "FM",
    name: "Fernando M.",
    department: "Sales",
    location: "MTY",
    timestamp: "30 min ago",
    message: "You need to try harder if you want to reach your goals this month.",
    resolution: "false_positive" as const,
    resolvedBy: "Ana Garcia",
    note: "Constructive feedback, does not constitute harassment.",
  },
  {
    initials: "CR",
    name: "Carlos R.",
    department: "Sales",
    location: "Monterrey",
    timestamp: "1 hr ago",
    message: "If you keep this up, I'm going to talk to the director about your performance.",
    resolution: "action_taken" as const,
    resolvedBy: "Sales Director",
    note: "Formal warning issued. Mediation session scheduled.",
  },
  {
    initials: "LR",
    name: "Luis R.",
    department: "Finance",
    location: "CDMX",
    timestamp: "2 hrs ago",
    message: "Your presentation yesterday was a total disaster.",
    resolution: "false_positive" as const,
    resolvedBy: "Maria Lopez",
    note: "Direct criticism but not aggressive. Communication training recommended.",
  },
  {
    initials: "MG",
    name: "Miguel G.",
    department: "IT",
    location: "GDL",
    timestamp: "3 hrs ago",
    message: "You're incompetent, everyone knows it but nobody tells you.",
    resolution: "escalation_resolved" as const,
    resolvedBy: "HR - Investigation",
    note: "Case investigated. Sanction applied to aggressor.",
  },
  {
    initials: "PT",
    name: "Patricia T.",
    department: "Marketing",
    location: "MTY",
    timestamp: "4 hrs ago",
    message: "I'm not surprised you failed again.",
    resolution: "action_taken" as const,
    resolvedBy: "Marketing Manager",
    note: "Private conversation held. Improvement commitment made.",
  },
  {
    initials: "RV",
    name: "Ricardo V.",
    department: "Operations",
    location: "CDMX",
    timestamp: "5 hrs ago",
    message: "Why did they hire you? You clearly don't qualify for this.",
    resolution: "escalation_resolved" as const,
    resolvedBy: "Operations Director",
    note: "Disciplinary action completed.",
  },
];

export function ResolvedView() {
  const falsePositives = resolvedCases.filter(r => r.resolution === "false_positive").length;
  const actionsTaken = resolvedCases.filter(r => r.resolution === "action_taken").length;
  const escalationsResolved = resolvedCases.filter(r => r.resolution === "escalation_resolved").length;

  return (
    <main className="flex-1 overflow-auto bg-card/50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Resolved Cases
          </h1>
          <p className="text-sm text-muted-foreground">
            124 cases resolved in the last 30 days
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          Export Report
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </header>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-success">124</p>
          <p className="mt-1 text-sm text-muted-foreground">Total resolved</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-muted-foreground">{falsePositives}</p>
          <p className="mt-1 text-sm text-muted-foreground">False positives</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-success">{actionsTaken}</p>
          <p className="mt-1 text-sm text-muted-foreground">Actions taken</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-warning">{escalationsResolved}</p>
          <p className="mt-1 text-sm text-muted-foreground">Escalations resolved</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <button className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
          All
        </button>
        <button className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80">
          False Positives
        </button>
        <button className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80">
          Actions Taken
        </button>
        <button className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80">
          Escalations
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {resolvedCases.map((resolvedCase, index) => (
          <ResolvedCard key={index} {...resolvedCase} />
        ))}
      </div>
    </main>
  );
}
