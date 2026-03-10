import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatLabel } from "@/lib/format";
import { teamQueryOptions } from "@/hooks/queries/team";
import type { Project } from "@/lib/types/project";

function getInitials(name: string): string {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]![0] : "";
  return (first + last).toUpperCase();
}

interface ProjectSummaryCardProps {
  project: Project;
}

export function ProjectSummaryCard({ project }: ProjectSummaryCardProps) {
  const { data: allMembers } = useSuspenseQuery(teamQueryOptions);
  const members = allMembers.filter((m) => project.teamMemberIds.includes(m.id));
  const visible = members.slice(0, 5);
  const remaining = members.length - visible.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold tracking-tight">{project.name}</h2>
        <Badge
          variant="secondary"
          style={{ backgroundColor: project.color, color: "white", borderColor: "transparent" }}
        >
          {formatLabel(project.status)}
        </Badge>
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
    </div>
  );
}
