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
    department: "Ventas",
    location: "Monterrey",
    severity: "Alta" as const,
    timestamp: "hace 23 min",
    message:
      "Oye inútil, si no cumples la meta te voy a reportar con todos. Eres un completo fracaso y no mereces estar aquí.",
  },
  {
    initials: "ML",
    name: "María L.",
    department: "Soporte",
    location: "CDMX",
    severity: "Media" as const,
    timestamp: "hace 1 h",
    message:
      "Estás fallando otra vez en todo. Ya me cansé de cubrir tus errores frente al cliente.",
  },
  {
    initials: "JT",
    name: "Jorge T.",
    department: "TI",
    location: "Guadalajara",
    severity: "Alta" as const,
    timestamp: "hace 2 h",
    message:
      "Nadie te soporta en el equipo. Todos hablan mal de ti a tus espaldas y yo lo confirmo.",
  },
  {
    initials: "AP",
    name: "Ana P.",
    department: "Finanzas",
    location: "MTY",
    severity: "Media" as const,
    timestamp: "hace 3 h",
    message:
      "Este reporte está lleno de errores de nuevo. ¿En serio no puedes hacer nada bien?",
  },
  {
    initials: "RG",
    name: "Roberto G.",
    department: "Logística",
    location: "CDMX",
    severity: "Media" as const,
    timestamp: "hace 5 h",
    message:
      "No te molestes en opinar, nadie quiere escucharte en esta reunión.",
  },
];

export function ReviewQueue() {
  return (
    <main className="flex-1 overflow-auto bg-card/50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Cola de revisión
          </h1>
          <p className="text-sm text-muted-foreground">
            38 alertas pendientes · ordenadas por severidad
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          Ver patrones
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <StatCard value="12" label="Severidad alta" variant="danger" />
        <StatCard value="26" label="Severidad media" variant="warning" />
        <StatCard value="4.2h" label="Tiempo prom. respuesta" variant="default" />
      </div>

      <div className="mb-6 flex gap-2">
        <FilterButton label="Todas" active />
        <FilterButton label="Alta" />
        <FilterButton label="Media" />
        <FilterButton label="Escaladas" />
      </div>

      <div className="flex flex-col gap-4">
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </div>
    </main>
  );
}
