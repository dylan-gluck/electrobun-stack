import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { formatLabel, priorityBadgeVariant, statusBadgeVariant } from "@/lib/format";
import type { Task } from "@/lib/types/task";

interface TaskMetaCardProps {
  task: Task;
}

export function TaskMetaCard({ task }: TaskMetaCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant={statusBadgeVariant[task.status]}>{formatLabel(task.status)}</Badge>
        <Badge variant={priorityBadgeVariant[task.priority]}>{formatLabel(task.priority)}</Badge>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{task.title}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <UserIcon className="size-3.5" />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="size-3.5" />
          <span>Due {format(new Date(task.dueDate), "MMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ClockIcon className="size-3.5" />
          <span>Created {format(new Date(task.createdAt), "MMM d, yyyy")}</span>
        </div>
      </div>
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
