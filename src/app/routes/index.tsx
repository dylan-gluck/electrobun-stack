import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/global/page-header";
import { ProjectSummaryCard } from "@/components/dashboard/project-summary-card";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { TaskVelocityChart } from "@/components/dashboard/task-velocity-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
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
  const inReviewTasks = tasks.filter((t) => t.status === "in-review").length;
  const overdueTasks = tasks.filter(
    (t) => t.status !== "completed" && new Date(t.dueDate) < new Date(),
  ).length;

  return (
    <>
      <PageHeader>
        <BreadcrumbItem>
          <BreadcrumbPage>{activeProject?.name ?? "Dashboard"}</BreadcrumbPage>
        </BreadcrumbItem>
      </PageHeader>

      <div className="bg-background flex min-w-0 flex-1 flex-col gap-6 p-4">
        {activeProject && <ProjectSummaryCard project={activeProject} tasks={tasks} />}

        <StatsGrid
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          inProgressTasks={inProgressTasks}
          inReviewTasks={inReviewTasks}
          overdueTasks={overdueTasks}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TaskVelocityChart />
          {activeProject && <ActivityFeed projectId={activeProject.id} />}
        </div>

        <TasksTable
          tasks={tasks}
          onTaskClick={(taskId) => navigate({ to: "/tasks/$taskId", params: { taskId } })}
        />
      </div>
    </>
  );
}
