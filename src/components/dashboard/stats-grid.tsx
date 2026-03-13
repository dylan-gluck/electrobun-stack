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

      {/* Stats row */}
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 px-4 py-2.5">
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold tabular-nums text-foreground">{completedTasks}</span>
          <span className="text-primary">{" "}done</span>
          <span className="ml-1 text-xs tabular-nums text-muted-foreground">({completedPct}%)</span>
        </span>
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold tabular-nums text-foreground">{inProgressTasks}</span>
          {" "}active
        </span>
        {overdueTasks > 0 && (
          <span className="text-sm text-muted-foreground">
            <span className={cn("font-semibold tabular-nums", "text-destructive")}>{overdueTasks}</span>
            <span className="text-destructive">{" "}overdue</span>
          </span>
        )}
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold tabular-nums text-foreground">{totalTasks}</span>
          {" "}total
          {inReviewTasks > 0 && (
            <span className="ml-1 text-xs tabular-nums text-muted-foreground">+{inReviewTasks} review</span>
          )}
        </span>
      </div>
    </div>
  );
}
