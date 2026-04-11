"use client";

import { cn } from "@/lib/utils";
import { Inbox, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ViewType } from "@/app/page";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  active?: boolean;
  variant?: "danger" | "warning" | "default";
  onClick: () => void;
}

function NavItem({ icon, label, count, active, variant = "default", onClick }: NavItemProps) {
  const badgeColors = {
    danger: "bg-destructive text-destructive-foreground",
    warning: "bg-warning text-warning-foreground",
    default: "bg-muted text-muted-foreground",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors",
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <span
        className={cn(
          "flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-semibold",
          badgeColors[variant]
        )}
      >
        {count}
      </span>
    </button>
  );
}

function ProgressRing({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="hsl(var(--muted))"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="hsl(var(--success))"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-success">{percentage}%</span>
      </div>
    </div>
  );
}

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-background p-4">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Bandeja
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        <NavItem
          icon={<Inbox className="h-4 w-4" />}
          label="Pendientes"
          count={38}
          active={activeView === "pendientes"}
          variant="danger"
          onClick={() => onViewChange("pendientes")}
        />
        <NavItem
          icon={<AlertTriangle className="h-4 w-4" />}
          label="Escalados"
          count={5}
          active={activeView === "escalados"}
          variant="warning"
          onClick={() => onViewChange("escalados")}
        />
        <NavItem
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Resueltos"
          count={124}
          active={activeView === "resueltos"}
          variant="default"
          onClick={() => onViewChange("resueltos")}
        />
      </nav>

      <div className="mt-auto">
        <div className="rounded-xl bg-card p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Hoy
          </p>
          <div className="flex flex-col items-center">
            <ProgressRing percentage={73} />
            <p className="mt-2 text-sm text-muted-foreground">alertas revisadas</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
