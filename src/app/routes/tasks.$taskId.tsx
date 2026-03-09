import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { taskQueryOptions } from "@/hooks/queries/tasks";
import { projectsQueryOptions } from "@/hooks/queries/projects";
import type { TaskPriority, TaskStatus } from "@/lib/types/task";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CalendarIcon, UserIcon, FlagIcon, CircleDotIcon } from "lucide-react";
import { format } from "date-fns";

export const Route = createFileRoute("/tasks/$taskId")({
  component: TaskDetailPage,
});

const statusVariant: Record<TaskStatus, "default" | "secondary" | "outline" | "destructive"> = {
  todo: "secondary",
  "in-progress": "default",
  "in-review": "outline",
  completed: "secondary",
};

const priorityVariant: Record<TaskPriority, "default" | "secondary" | "outline" | "destructive"> = {
  low: "secondary",
  medium: "outline",
  high: "default",
  critical: "destructive",
};

function renderDescription(markdown: string) {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc pl-6 space-y-1 text-muted-foreground">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>,
      );
      listItems = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      continue;
    }

    flushList();

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-base font-semibold mt-4 mb-1">
          {line.slice(4)}
        </h3>,
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-lg font-semibold mt-4 mb-1">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-muted-foreground">
          {line}
        </p>,
      );
    }
  }

  flushList();
  return elements;
}

function TaskDetailPage() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId));
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  if (!task) {
    return (
      <>
        <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear py-3">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" search={{ projectId: undefined }}>
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Task not found</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-muted-foreground">Task not found.</p>
        </div>
      </>
    );
  }

  const project = projects.find((p) => p.id === task.projectId);

  return (
    <>
      <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear py-3">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/" search={{ projectId: task.projectId }}>
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{task.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{task.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <CircleDotIcon className="size-4 text-muted-foreground" />
                <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
              </div>
              <div className="flex items-center gap-1.5">
                <FlagIcon className="size-4 text-muted-foreground" />
                <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
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

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">{renderDescription(task.description)}</CardContent>
        </Card>

        <div>
          <Link
            to="/"
            search={{ projectId: task.projectId }}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to {project?.name ?? "Dashboard"}
          </Link>
        </div>
      </div>
    </>
  );
}
