import { queryOptions } from "@tanstack/react-query";
import { electroview } from "@/lib/electroview";
import type { Task } from "@/lib/types/task";

async function fetchTasksByProject(projectId: string): Promise<Task[]> {
  if (electroview) {
    return electroview.rpc!.request.getTasksByProject({ projectId });
  }
  const mod = await import("@/lib/data/tasks.json");
  return (mod.default as Task[]).filter((t) => t.projectId === projectId);
}

async function fetchTask(id: string): Promise<Task | null> {
  if (electroview) {
    return electroview.rpc!.request.getTask({ id });
  }
  const mod = await import("@/lib/data/tasks.json");
  return (mod.default as Task[]).find((t) => t.id === id) ?? null;
}

export function projectTasksQueryOptions(projectId: string) {
  return queryOptions({
    queryKey: ["tasks", { projectId }],
    queryFn: () => fetchTasksByProject(projectId),
    enabled: !!projectId,
  });
}

export function taskQueryOptions(taskId: string) {
  return queryOptions({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask(taskId),
    enabled: !!taskId,
  });
}
