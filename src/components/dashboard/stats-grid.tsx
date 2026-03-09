import { AlertTriangleIcon, CheckCircle2Icon, ClockIcon, ListTodoIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      sub: `+${inReviewTasks} in review`,
      icon: ListTodoIcon,
      destructive: false,
    },
    {
      label: "Completed",
      value: completedTasks,
      sub: `${completedPct}% of ${totalTasks} tasks`,
      icon: CheckCircle2Icon,
      destructive: false,
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      sub: `of ${totalTasks} tasks`,
      icon: ClockIcon,
      destructive: false,
    },
    {
      label: "Overdue",
      value: overdueTasks,
      sub: overdueTasks > 0 ? "needs attention" : "all on track",
      icon: AlertTriangleIcon,
      destructive: overdueTasks > 0,
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardDescription>{stat.label}</CardDescription>
            <stat.icon
              className={cn(
                "size-4 sm:size-5",
                stat.destructive ? "text-destructive" : "text-muted-foreground",
              )}
            />
          </CardHeader>
          <CardContent>
            <CardTitle
              className={cn(
                "text-xl tabular-nums sm:text-3xl",
                stat.destructive && "text-destructive",
              )}
            >
              {stat.value}
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
