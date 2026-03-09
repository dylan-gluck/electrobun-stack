import { CalendarIcon, CircleDotIcon, FlagIcon, UserIcon } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { priorityBadgeVariant, statusBadgeVariant } from "@/lib/format";
import type { Task } from "@/lib/types/task";

interface TaskMetaCardProps {
  task: Task;
}

export function TaskMetaCard({ task }: TaskMetaCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <CircleDotIcon className="size-4 text-muted-foreground" />
            <Badge variant={statusBadgeVariant[task.status]}>{task.status}</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <FlagIcon className="size-4 text-muted-foreground" />
            <Badge variant={priorityBadgeVariant[task.priority]}>{task.priority}</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <UserIcon className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{task.assignee}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {format(new Date(task.dueDate), "MMM d, yyyy")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
