"use client";

import { useState } from "react";
import { ChevronDown, TrendingUp, AlertCircle, ShieldAlert, Tag } from "lucide-react";

function DonutChart() {
  const segments = [
    { label: "PII Leak", percentage: 55, color: "hsl(var(--destructive))" },
    { label: "Toxicity", percentage: 30, color: "hsl(var(--warning))" },
    { label: "Insults", percentage: 15, color: "hsl(var(--accent))" },
  ];

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercentage = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <svg className="h-40 w-40 -rotate-90 transform" viewBox="0 0 150 150">
          {segments.map((segment, index) => {
            const strokeDasharray = (segment.percentage / 100) * circumference;
            const strokeDashoffset = -cumulativePercentage * circumference / 100;
            cumulativePercentage += segment.percentage;

            return (
              <circle
                key={index}
                cx="75"
                cy="75"
                r={radius}
                stroke={segment.color}
                strokeWidth="20"
                fill="none"
                strokeDasharray={`${strokeDasharray} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm text-muted-foreground">
              {segment.percentage}% {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AmbiguityBar() {
  const rulesPercentage = 70;
  const ambiguousPercentage = 30;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Rules (Tier 1)</span>
        <span className="font-medium text-success">{rulesPercentage}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-success transition-all duration-500"
          style={{ width: `${rulesPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Ambiguous (BERT Tier 2)</span>
        <span className="font-medium text-warning">{ambiguousPercentage}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-warning transition-all duration-500"
          style={{ width: `${ambiguousPercentage}%` }}
        />
      </div>
    </div>
  );
}

function TrendingKeywords() {
  const keywords = [
    { word: "credit card", severity: "high" },
    { word: "password", severity: "high" },
    { word: "useless", severity: "medium" },
    { word: "incompetent", severity: "medium" },
    { word: "SSN", severity: "high" },
    { word: "fire you", severity: "medium" },
    { word: "bank account", severity: "high" },
    { word: "idiot", severity: "low" },
  ];

  const severityColors = {
    high: "bg-destructive/20 text-destructive border-destructive/30",
    medium: "bg-warning/20 text-warning border-warning/30",
    low: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${severityColors[keyword.severity as keyof typeof severityColors]}`}
        >
          {keyword.word}
        </span>
      ))}
    </div>
  );
}

function DepartmentHeatmap() {
  const departments = [
    { name: "Sales", alerts: 45, level: "critical" },
    { name: "Support", alerts: 32, level: "high" },
    { name: "IT", alerts: 18, level: "medium" },
    { name: "Finance", alerts: 12, level: "low" },
    { name: "Logistics", alerts: 8, level: "low" },
    { name: "Marketing", alerts: 5, level: "minimal" },
  ];

  const levelColors = {
    critical: "bg-destructive/80 border-destructive",
    high: "bg-destructive/50 border-destructive/70",
    medium: "bg-warning/50 border-warning/70",
    low: "bg-warning/30 border-warning/50",
    minimal: "bg-muted border-border",
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {departments.map((dept, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center rounded-lg border p-3 transition-all hover:scale-105 ${levelColors[dept.level as keyof typeof levelColors]}`}
        >
          <span className="text-xs font-medium text-foreground">{dept.name}</span>
          <span className="text-lg font-bold text-foreground">{dept.alerts}</span>
        </div>
      ))}
    </div>
  );
}

interface PatternsAnalyticsProps {
  onClose: () => void;
}

export function PatternsAnalytics({ onClose }: PatternsAnalyticsProps) {
  const [dateRange, setDateRange] = useState("last-7-days");

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">Pattern Analysis</h1>
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-card px-4 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-90-days">Last 90 days</option>
              <option value="custom">Custom range</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          Back to Queue
        </button>
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Rule Breakdown */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              <h2 className="font-semibold text-foreground">Rule Breakdown</h2>
            </div>
            <DonutChart />
          </div>

          {/* Ambiguity vs Certainty */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <h2 className="font-semibold text-foreground">Ambiguity vs Certainty</h2>
            </div>
            <AmbiguityBar />
          </div>

          {/* Trending Keywords */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <Tag className="h-5 w-5 text-accent" />
              <h2 className="font-semibold text-foreground">Trending Keywords</h2>
            </div>
            <TrendingKeywords />
          </div>

          {/* Department Heatmap */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Department Heatmap</h2>
            </div>
            <DepartmentHeatmap />
          </div>
        </div>
      </div>
    </div>
  );
}
