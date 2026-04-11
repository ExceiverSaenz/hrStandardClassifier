"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2, XCircle, ArrowUp } from "lucide-react";

type ResolutionType = "falso_positivo" | "accion_tomada" | "escalado_resuelto";

interface ResueltoCardProps {
  initials: string;
  name: string;
  department: string;
  location: string;
  timestamp: string;
  message: string;
  resolucion: ResolutionType;
  resueltoPor: string;
  nota?: string;
}

function ResueltoCard({
  initials,
  name,
  department,
  location,
  timestamp,
  message,
  resolucion,
  resueltoPor,
  nota,
}: ResueltoCardProps) {
  const resolutionConfig = {
    falso_positivo: {
      label: "Falso positivo",
      icon: XCircle,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50",
    },
    accion_tomada: {
      label: "Acción tomada",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    escalado_resuelto: {
      label: "Escalado resuelto",
      icon: ArrowUp,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  };

  const config = resolutionConfig[resolucion];
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
          <span className="text-muted-foreground">Resuelto por: <span className="font-medium text-foreground">{resueltoPor}</span></span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        {nota && (
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium">Nota:</span> {nota}
          </p>
        )}
      </div>
    </article>
  );
}

const resueltos = [
  {
    initials: "FM",
    name: "Fernando M.",
    department: "Ventas",
    location: "MTY",
    timestamp: "hace 30 min",
    message: "Necesitas esforzarte más si quieres alcanzar tus metas este mes.",
    resolucion: "falso_positivo" as const,
    resueltoPor: "Ana García",
    nota: "Retroalimentación constructiva, no constituye acoso.",
  },
  {
    initials: "CR",
    name: "Carlos R.",
    department: "Ventas",
    location: "Monterrey",
    timestamp: "hace 1 h",
    message: "Si sigues así, voy a hablar con el director sobre tu desempeño.",
    resolucion: "accion_tomada" as const,
    resueltoPor: "Director de Ventas",
    nota: "Se aplicó advertencia formal. Sesión de mediación programada.",
  },
  {
    initials: "LR",
    name: "Luis R.",
    department: "Finanzas",
    location: "CDMX",
    timestamp: "hace 2 h",
    message: "Tu presentación de ayer fue un desastre total.",
    resolucion: "falso_positivo" as const,
    resueltoPor: "María López",
    nota: "Crítica directa pero no agresiva. Se recomienda capacitación en comunicación.",
  },
  {
    initials: "MG",
    name: "Miguel G.",
    department: "TI",
    location: "GDL",
    timestamp: "hace 3 h",
    message: "Eres un incompetente, todos lo sabemos pero nadie te lo dice.",
    resolucion: "escalado_resuelto" as const,
    resueltoPor: "RH - Investigación",
    nota: "Caso investigado. Sanción aplicada al agresor.",
  },
  {
    initials: "PT",
    name: "Patricia T.",
    department: "Marketing",
    location: "MTY",
    timestamp: "hace 4 h",
    message: "No me sorprende que hayas fallado otra vez.",
    resolucion: "accion_tomada" as const,
    resueltoPor: "Gerente de Marketing",
    nota: "Conversación privada realizada. Compromiso de mejora.",
  },
  {
    initials: "RV",
    name: "Ricardo V.",
    department: "Operaciones",
    location: "CDMX",
    timestamp: "hace 5 h",
    message: "¿Por qué te contrataron? Claramente no calificas para esto.",
    resolucion: "escalado_resuelto" as const,
    resueltoPor: "Director de Operaciones",
    nota: "Acción disciplinaria completada.",
  },
];

export function ResueltosView() {
  const falsosPositivos = resueltos.filter(r => r.resolucion === "falso_positivo").length;
  const accionesTomadas = resueltos.filter(r => r.resolucion === "accion_tomada").length;
  const escaladosResueltos = resueltos.filter(r => r.resolucion === "escalado_resuelto").length;

  return (
    <main className="flex-1 overflow-auto bg-card/50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Casos resueltos
          </h1>
          <p className="text-sm text-muted-foreground">
            124 casos resueltos en los últimos 30 días
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
          Exportar reporte
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </header>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-success">124</p>
          <p className="mt-1 text-sm text-muted-foreground">Total resueltos</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-muted-foreground">{falsosPositivos}</p>
          <p className="mt-1 text-sm text-muted-foreground">Falsos positivos</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-success">{accionesTomadas}</p>
          <p className="mt-1 text-sm text-muted-foreground">Acciones tomadas</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-4">
          <p className="text-3xl font-bold text-warning">{escaladosResueltos}</p>
          <p className="mt-1 text-sm text-muted-foreground">Escalados resueltos</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <button className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
          Todos
        </button>
        <button className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80">
          Falsos positivos
        </button>
        <button className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80">
          Acciones tomadas
        </button>
        <button className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/80">
          Escalados
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {resueltos.map((resuelto, index) => (
          <ResueltoCard key={index} {...resuelto} />
        ))}
      </div>
    </main>
  );
}
