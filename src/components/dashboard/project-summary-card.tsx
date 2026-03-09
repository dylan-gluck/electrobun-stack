import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatLabel } from "@/lib/format";
import { teamQueryOptions } from "@/hooks/queries/team";
import type { Project } from "@/lib/types/project";
import type { Task } from "@/lib/types/task";

function getInitials(name: string): string {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]![0] : "";
  return (first + last).toUpperCase();
}

interface ProjectSummaryCardProps {
  project: Project;
  tasks: Task[];
}

export function ProjectSummaryCard({ project, tasks }: ProjectSummaryCardProps) {
  const { data: allMembers } = useSuspenseQuery(teamQueryOptions);
  const members = allMembers.filter((m) => project.teamMemberIds.includes(m.id));
  const visible = members.slice(0, 5);
  const remaining = members.length - visible.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col gap-3 border-l-4 pl-4" style={{ borderLeftColor: project.color }}>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight">{project.name}</h2>
        <Badge variant="secondary">{formatLabel(project.status)}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{project.description}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="size-4" />
          <span>
            {format(new Date(project.startDate), "MMM d")} &ndash;{" "}
            {format(new Date(project.targetDate), "MMM d, yyyy")}
          </span>
        </div>
        <AvatarGroup>
          {visible.map((member) => (
            <Avatar key={member.id} size="sm">
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
          ))}
          {remaining > 0 && <AvatarGroupCount>+{remaining}</AvatarGroupCount>}
        </AvatarGroup>
      </div>
      <div className="flex items-center gap-3">
        <Progress value={progress} className="flex-1" />
        <span className="text-sm font-medium tabular-nums">
          {completedTasks}/{totalTasks} tasks ({progress}%)
        </span>
      </div>
    </div>
  );
}
