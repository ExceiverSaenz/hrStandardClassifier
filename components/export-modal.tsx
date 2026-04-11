"use client";

import { useState } from "react";
import { X, Download, FileSpreadsheet, FileText, ShieldCheck } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState<"csv" | "pdf">("csv");
  const [maskPII, setMaskPII] = useState(true);
  const [severities, setSeverities] = useState({
    high: true,
    medium: true,
    low: false,
  });
  const [departments, setDepartments] = useState<string[]>(["all"]);

  const departmentOptions = [
    "All Departments",
    "Sales",
    "Support",
    "IT",
    "Finance",
    "Logistics",
    "Marketing",
  ];

  if (!isOpen) return null;

  const handleSeverityChange = (severity: keyof typeof severities) => {
    setSeverities((prev) => ({ ...prev, [severity]: !prev[severity] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Export Audit Data
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Date Range
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Start Date"
              />
            </div>
            <span className="flex items-center text-muted-foreground">to</span>
            <div className="flex-1">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>

        {/* Severity Filters */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Severity
          </label>
          <div className="flex gap-3">
            {(["high", "medium", "low"] as const).map((severity) => (
              <label
                key={severity}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={severities[severity]}
                  onChange={() => handleSeverityChange(severity)}
                  className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
                />
                <span className="text-sm capitalize text-foreground">
                  {severity}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Department
          </label>
          <select
            value={departments[0]}
            onChange={(e) => setDepartments([e.target.value])}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept.toLowerCase().replace(" ", "-")}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Format Toggle */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Export Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFormat("csv")}
              className={`flex items-center justify-center gap-3 rounded-lg border-2 p-4 transition-all ${
                format === "csv"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:border-muted-foreground"
              }`}
            >
              <FileSpreadsheet
                className={`h-6 w-6 ${
                  format === "csv" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <div className="text-left">
                <p
                  className={`font-medium ${
                    format === "csv" ? "text-primary" : "text-foreground"
                  }`}
                >
                  CSV
                </p>
                <p className="text-xs text-muted-foreground">Raw Data</p>
              </div>
            </button>
            <button
              onClick={() => setFormat("pdf")}
              className={`flex items-center justify-center gap-3 rounded-lg border-2 p-4 transition-all ${
                format === "pdf"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:border-muted-foreground"
              }`}
            >
              <FileText
                className={`h-6 w-6 ${
                  format === "pdf" ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <div className="text-left">
                <p
                  className={`font-medium ${
                    format === "pdf" ? "text-primary" : "text-foreground"
                  }`}
                >
                  PDF
                </p>
                <p className="text-xs text-muted-foreground">Executive Report</p>
              </div>
            </button>
          </div>
        </div>

        {/* PII Sanitization Toggle */}
        <div className="mb-6 rounded-lg border border-border bg-background p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-foreground">
                  Mask PII (Required for Compliance)
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Hides card numbers, SSN, and emails with [REDACTED]
                </p>
              </div>
            </div>
            <button
              onClick={() => setMaskPII(!maskPII)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                maskPII ? "bg-success" : "bg-muted"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  maskPII ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Generate Export
          </button>
        </div>
      </div>
    </div>
  );
}
