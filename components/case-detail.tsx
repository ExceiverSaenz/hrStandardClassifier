"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  AlertTriangle, 
  User, 
  MessageSquare, 
  Clock, 
  ShieldAlert,
  UserCheck,
  ChevronDown,
  Save
} from "lucide-react";

interface CaseDetailProps {
  onClose: () => void;
  caseData?: {
    id: string;
    employeeName: string;
    initials: string;
    department: string;
    location: string;
    previousAlerts: number;
  };
}

function AuditTimeline() {
  const events = [
    {
      id: 1,
      type: "system",
      title: "System Flagged",
      description: "PII Detection + Toxicity",
      time: "2 hours ago",
      icon: ShieldAlert,
      color: "text-destructive",
    },
    {
      id: 2,
      type: "human",
      title: "Human Review",
      description: "Alicia R. escalated the case",
      time: "1 hour ago",
      icon: UserCheck,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border ${event.color}`}>
              <event.icon className="h-4 w-4" />
            </div>
            {index < events.length - 1 && (
              <div className="h-full w-px bg-border" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <p className="font-medium text-foreground">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <p className="mt-1 text-xs text-muted-foreground">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseDetail({ onClose, caseData }: CaseDetailProps) {
  const [status, setStatus] = useState("under-investigation");
  const [notes, setNotes] = useState("");

  const defaultCase = {
    id: "8472",
    employeeName: "Carlos M.",
    initials: "CM",
    department: "Sales",
    location: "Monterrey",
    previousAlerts: 3,
  };

  const currentCase = caseData || defaultCase;

  const messages = [
    {
      id: 1,
      sender: "Carlos M.",
      content: "I need to pay this now.",
      flagged: false,
      time: "2:34 PM",
    },
    {
      id: 2,
      sender: "Carlos M.",
      content: "My number is 4532 1122 3344 5566, do it fast or I'll fire you for being useless.",
      flagged: true,
      flagReasons: ["PII Detected", "Threatening Language"],
      time: "2:35 PM",
    },
  ];

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">
              CASE #{currentCase.id}
            </h1>
            <span className="rounded-full bg-destructive/20 px-3 py-1 text-xs font-semibold text-destructive">
              Escalated
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Case Details */}
        <div className="flex w-1/2 flex-col border-r border-border">
          {/* Employee Info */}
          <div className="border-b border-border p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20 text-lg font-semibold text-destructive">
                {currentCase.initials}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">
                  {currentCase.employeeName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentCase.department} · {currentCase.location}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                    <AlertTriangle className="h-3 w-3" />
                    Repeat Offender ({currentCase.previousAlerts} previous alerts)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Context */}
          <div className="flex-1 overflow-auto p-6">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Conversation Context</h3>
            </div>
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-lg border p-4 ${
                    message.flagged
                      ? "border-destructive bg-destructive/10"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {message.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{message.content}</p>
                  {message.flagged && message.flagReasons && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.flagReasons.map((reason, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Audit & Resolution */}
        <div className="flex w-1/2 flex-col">
          {/* Audit Trail */}
          <div className="border-b border-border p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Audit Trail</h3>
            </div>
            <AuditTimeline />
          </div>

          {/* Resolution Form */}
          <div className="flex-1 p-6">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Resolution Form</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-border bg-card px-4 py-2.5 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="under-investigation">Under Investigation</option>
                    <option value="warning-issued">Warning Issued</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  HR Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter resolution notes..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <Save className="h-4 w-4" />
                Save Resolution
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
