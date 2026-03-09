import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projectsQueryOptions } from "@/hooks/queries/projects";
import { projectTasksQueryOptions } from "@/hooks/queries/tasks";
import type { TaskPriority, TaskStatus } from "@/lib/types/task";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    projectId: typeof search.projectId === "string" ? search.projectId : undefined,
  }),
  component: DashboardPage,
});

function formatLabel(value: string): string {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function statusBadgeVariant(status: TaskStatus): "default" | "secondary" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "secondary";
    case "in-review":
    case "todo":
      return "outline";
  }
}

function priorityBadgeVariant(
  priority: TaskPriority,
): "destructive" | "default" | "secondary" | "outline" {
  switch (priority) {
    case "critical":
      return "destructive";
    case "high":
      return "default";
    case "medium":
      return "secondary";
    case "low":
      return "outline";
  }
}

function DashboardPage() {
  const { projectId: searchProjectId } = Route.useSearch();
  const navigate = useNavigate();

  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  const activeProject = projects.find((p) => p.id === searchProjectId) ?? projects[0];

  const { data: tasks } = useSuspenseQuery(projectTasksQueryOptions(activeProject?.id ?? ""));

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;

  return (
    <>
      <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear py-3">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {activeProject && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle>{activeProject.name}</CardTitle>
                <Badge variant="secondary">{formatLabel(activeProject.status)}</Badge>
              </div>
              <CardDescription>{activeProject.description}</CardDescription>
            </CardHeader>
          </Card>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-2xl">{totalTasks}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-2xl">{completedTasks}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-2xl">{inProgressTasks}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No tasks found for this project.
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task) => (
                    <TableRow
                      key={task.id}
                      className="cursor-pointer"
                      onClick={() =>
                        navigate({ to: "/tasks/$taskId", params: { taskId: task.id } })
                      }
                    >
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant={statusBadgeVariant(task.status)}>
                          {formatLabel(task.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={priorityBadgeVariant(task.priority)}>
                          {formatLabel(task.priority)}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{format(new Date(task.dueDate), "MMM d, yyyy")}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
