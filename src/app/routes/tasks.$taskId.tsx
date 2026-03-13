import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/global/page-header";
import { TaskMetaCard } from "@/components/tasks/task-meta-card";
import { TaskDescription } from "@/components/tasks/task-description";
import { TaskSubtasks } from "@/components/tasks/task-subtasks";
import { TaskActivity } from "@/components/tasks/task-activity";
import { TaskSidebarInfo } from "@/components/tasks/task-sidebar-info";
import { taskQueryOptions } from "@/hooks/queries/tasks";
import { projectsQueryOptions } from "@/hooks/queries/projects";
import { useActiveProject } from "@/lib/context/active-project";

export const Route = createFileRoute("/tasks/$taskId")({
  component: TaskDetailPage,
});

function TaskDetailPage() {
  const { taskId } = Route.useParams();
  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId));
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const { setActiveProjectId } = useActiveProject();

  useEffect(() => {
    if (task?.projectId) {
      setActiveProjectId(task.projectId);
    }
  }, [task?.projectId, setActiveProjectId]);

  if (!task) {
    return (
      <>
        <PageHeader>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Task not found</BreadcrumbPage>
          </BreadcrumbItem>
        </PageHeader>
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-muted-foreground">Task not found.</p>
        </div>
      </>
    );
  }

  const project = projects.find((p) => p.id === task.projectId);

  return (
    <>
      <PageHeader>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link to="/">{"Dashboard"}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{task.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </PageHeader>

      <main className="bg-background flex flex-1 flex-col gap-6 p-3 md:p-4 lg:p-6">
        <TaskMetaCard task={task} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <TaskDescription description={task.description} />
            <TaskSubtasks subtasks={task.subtasks} />
          </div>
          <div className="flex flex-col gap-6">
            <TaskSidebarInfo task={task} project={project} />
            <TaskActivity taskId={task.id} projectId={task.projectId} />
          </div>
        </div>
      </main>
    </>
  );
}
