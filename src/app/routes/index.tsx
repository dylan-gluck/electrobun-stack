import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/global/page-header";
import { ProjectSummaryCard } from "@/components/dashboard/project-summary-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { projectsQueryOptions } from "@/hooks/queries/projects";
import { projectTasksQueryOptions } from "@/hooks/queries/tasks";
import { useActiveProject } from "@/lib/context/active-project";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { activeProjectId: contextProjectId } = useActiveProject();
  const navigate = useNavigate();

  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  const activeProject = projects.find((p) => p.id === contextProjectId) ?? projects[0];

  const { data: tasks } = useSuspenseQuery(projectTasksQueryOptions(activeProject?.id ?? ""));

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;

  return (
    <>
      <PageHeader>
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </PageHeader>

      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {activeProject && <ProjectSummaryCard project={activeProject} />}

        <StatsGrid
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          inProgressTasks={inProgressTasks}
        />

        <TasksTable
          tasks={tasks}
          onTaskClick={(taskId) => navigate({ to: "/tasks/$taskId", params: { taskId } })}
        />
      </div>
    </>
  );
}
