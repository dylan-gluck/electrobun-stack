import { AlertTriangleIcon, CheckCircle2Icon, ClockIcon, ListTodoIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatsGridProps {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  inReviewTasks: number;
  overdueTasks: number;
}

export function StatsGrid({
  totalTasks,
  completedTasks,
  inProgressTasks,
  inReviewTasks,
  overdueTasks,
}: StatsGridProps) {
  const completedPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressPct = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const overduePct = totalTasks > 0 ? Math.round((overdueTasks / totalTasks) * 100) : 0;

  return (
    <div className="overflow-hidden bg-card ring-1 ring-foreground/10">
      {/* Progress bar */}
      <div className="flex h-1.5 w-full">
        <div
          className="bg-primary transition-all duration-500"
          style={{ width: `${completedPct}%` }}
        />
        <div
          className="bg-chart-2/60 transition-all duration-500"
          style={{ width: `${inProgressPct}%` }}
        />
        {overdueTasks > 0 && (
          <div
            className="bg-destructive transition-all duration-500"
            style={{ width: `${overduePct}%` }}
          />
        )}
        <div className="flex-1 bg-muted/50" />
      </div>

      {/* Stats row — 2-col mobile, 4-col desktop, 1px borders between cells */}
      <div className="grid grid-cols-2 border-t border-border/60 lg:grid-cols-4 [&>*+*]:border-l [&>*+*]:border-border/60 [&>*:nth-child(3)]:max-lg:border-l-0 [&>*:nth-child(n+3)]:max-lg:border-t [&>*:nth-child(n+3)]:max-lg:border-border/60">
        <StatCell
          icon={CheckCircle2Icon}
          value={completedTasks}
          label="Done"
          pct={`${completedPct}%`}
          accent="primary"
        />
        <StatCell
          icon={ClockIcon}
          value={inProgressTasks}
          label="Active"
          pct={`${inProgressPct}%`}
        />
        <StatCell
          icon={AlertTriangleIcon}
          value={overdueTasks}
          label="Overdue"
          pct={overdueTasks > 0 ? "action needed" : "on track"}
          accent={overdueTasks > 0 ? "destructive" : undefined}
        />
        <StatCell
          icon={ListTodoIcon}
          value={totalTasks}
          label="Total"
          pct={`+${inReviewTasks} review`}
        />
      </div>
    </div>
  );
}

function StatCell({
  icon: Icon,
  value,
  label,
  pct,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  pct: string;
  accent?: "primary" | "destructive";
}) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 transition-colors hover:bg-muted/30">
      <Icon
        className={cn(
          "size-3.5 shrink-0",
          accent === "primary" && "text-primary",
          accent === "destructive" && "text-destructive",
          !accent && "text-muted-foreground",
        )}
      />
      <span
        className={cn(
          "text-lg font-semibold tabular-nums leading-none tracking-tight",
          accent === "destructive" && "text-destructive",
        )}
      >
        {value}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="ml-auto text-[11px] tabular-nums text-muted-foreground/60">{pct}</span>
    </div>
  );
}
