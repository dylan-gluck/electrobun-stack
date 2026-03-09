import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/lib/types/task";
import type { Project } from "@/lib/types/project";
import { format } from "date-fns";
import { formatLabel, statusBadgeVariant, priorityBadgeVariant } from "@/lib/format";

interface TaskSidebarInfoProps {
  task: Task;
  project?: Project;
}

export function TaskSidebarInfo({ task, project }: TaskSidebarInfoProps) {
  const items = [
    {
      label: "Status",
      value: <Badge variant={statusBadgeVariant[task.status]}>{formatLabel(task.status)}</Badge>,
    },
    {
      label: "Priority",
      value: (
        <Badge variant={priorityBadgeVariant[task.priority]}>{formatLabel(task.priority)}</Badge>
      ),
    },
    {
      label: "Assignee",
      value: <span className="text-sm">{task.assignee}</span>,
    },
    {
      label: "Due Date",
      value: <span className="text-sm">{format(new Date(task.dueDate), "MMM d, yyyy")}</span>,
    },
    {
      label: "Created",
      value: <span className="text-sm">{format(new Date(task.createdAt), "MMM d, yyyy")}</span>,
    },
    {
      label: "Project",
      value: project ? (
        <span className="text-sm">{project.name}</span>
      ) : (
        <span className="text-sm text-muted-foreground">Unknown</span>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                {item.value}
              </div>
              {i < items.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
