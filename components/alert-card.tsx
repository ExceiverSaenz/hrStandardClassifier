"use client";

import { cn } from "@/lib/utils";

interface AlertCardProps {
  initials: string;
  name: string;
  department: string;
  location: string;
  severity: "High" | "Medium";
  timestamp: string;
  message: string;
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
        color
      )}
    >
      {initials}
    </div>
  );
}

function SeverityBadge({ severity }: { severity: "High" | "Medium" }) {
  return (
    <span
      className={cn(
        "rounded-md px-2.5 py-1 text-xs font-medium",
        severity === "High"
          ? "bg-destructive/20 text-destructive"
          : "bg-warning/20 text-warning"
      )}
    >
      {severity}
    </span>
  );
}

const avatarColors = [
  "bg-amber-600 text-amber-50",
  "bg-blue-600 text-blue-50",
  "bg-emerald-600 text-emerald-50",
  "bg-purple-600 text-purple-50",
  "bg-rose-600 text-rose-50",
  "bg-cyan-600 text-cyan-50",
];

function getAvatarColor(initials: string) {
  const index = initials.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export function AlertCard({
  initials,
  name,
  department,
  location,
  severity,
  timestamp,
  message,
}: AlertCardProps) {
  return (
    <article className="rounded-xl bg-card p-4">
      <header className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={initials} color={getAvatarColor(initials)} />
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {department} · {location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SeverityBadge severity={severity} />
        </div>
      </header>

      <blockquote className="mb-3 rounded-lg border-l-2 border-muted bg-secondary/50 px-4 py-3">
        <p className="text-sm leading-relaxed text-foreground/90">
          {'"'}{message}{'"'}
        </p>
      </blockquote>

      <footer className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{timestamp}</span>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            False Positive
          </button>
          <button className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Escalate
          </button>
          <button className="rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Take Action
          </button>
        </div>
      </footer>
    </article>
  );
}
