"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Clock, User } from "lucide-react";

interface EscaladoCardProps {
  initials: string;
  name: string;
  department: string;
  location: string;
  timestamp: string;
  message: string;
  escaladoA: string;
  motivo: string;
  tiempoEscalado: string;
}

function EscaladoCard({
  initials,
  name,
  department,
  location,
  timestamp,
  message,
  escaladoA,
  motivo,
  tiempoEscalado,
}: EscaladoCardProps) {
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
          {tiempoEscalado}
        </div>
      </div>

      <blockquote className="mb-4 border-l-2 border-warning/50 bg-warning/5 py-2 pl-4 text-sm text-foreground/90">
        &ldquo;{message}&rdquo;
      </blockquote>

      <div className="mb-4 rounded-lg bg-secondary/50 p-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Escalado a:</span>
          <span className="font-medium text-foreground">{escaladoA}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-medium">Motivo:</span> {motivo}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{timestamp}</span>
        <div className="flex gap-2">
          <button className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Ver historial
          </button>
          <button className="rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground transition-colors hover:bg-warning/90">
            Resolver
          </button>
        </div>
      </div>
    </article>
  );
}

const escalados = [
  {
    initials: "CR",
    name: "Carlos R.",
    department: "Ventas",
    location: "Monterrey",
    timestamp: "Escalado hace 2 h",
    message:
      "Oye inútil, si no cumples la meta te voy a reportar con todos. Eres un completo fracaso y no mereces estar aquí.",
    escaladoA: "Recursos Humanos - Director",
    motivo: "Patrón repetido de agresión verbal",
    tiempoEscalado: "En revisión 2h",
  },
  {
    initials: "JT",
    name: "Jorge T.",
    department: "TI",
    location: "Guadalajara",
    timestamp: "Escalado hace 5 h",
    message:
      "Nadie te soporta en el equipo. Todos hablan mal de ti a tus espaldas y yo lo confirmo.",
    escaladoA: "Gerente de TI",
    motivo: "Bullying laboral identificado",
    tiempoEscalado: "En revisión 5h",
  },
  {
    initials: "LM",
    name: "Laura M.",
    department: "Marketing",
    location: "CDMX",
    timestamp: "Escalado hace 8 h",
    message:
      "Tu trabajo es tan malo que mejor ni lo entregues. Me da vergüenza que estés en mi equipo.",
    escaladoA: "Director de Marketing",
    motivo: "Intimidación y menosprecio",
    tiempoEscalado: "En revisión 8h",
  },
  {
    initials: "PG",
    name: "Pedro G.",
    department: "Operaciones",
    location: "MTY",
    timestamp: "Escalado hace 1 día",
    message:
      "Si vuelves a cometer un error así, te aseguro que no vas a durar aquí mucho tiempo.",
    escaladoA: "Recursos Humanos - Investigación",
    motivo: "Amenaza laboral directa",
    tiempoEscalado: "En revisión 1d",
  },
  {
    initials: "SM",
    name: "Sandra M.",
    department: "Atención al Cliente",
    location: "GDL",
    timestamp: "Escalado hace 1 día",
    message:
      "Eres la persona más incompetente con la que he trabajado. No sé cómo sigues aquí.",
    escaladoA: "Gerente de AC",
    motivo: "Hostigamiento continuo",
    tiempoEscalado: "En revisión 1d",
  },
];

export function EscaladosView() {
  return (
    <main className="flex-1 overflow-auto bg-card/50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Casos escalados
          </h1>
          <p className="text-sm text-muted-foreground">
            5 casos en revisión por supervisores
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          Ver reportes
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-warning">5</p>
          <p className="mt-1 text-sm text-muted-foreground">Casos activos</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-foreground">12h</p>
          <p className="mt-1 text-sm text-muted-foreground">Tiempo prom. escalado</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-success">3</p>
          <p className="mt-1 text-sm text-muted-foreground">Resueltos hoy</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {escalados.map((escalado, index) => (
          <EscaladoCard key={index} {...escalado} />
        ))}
      </div>
    </main>
  );
}
