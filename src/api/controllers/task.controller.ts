import type { Task } from "@/lib/types/task";
import * as taskService from "@/api/services/task.service";

export function getTasksByProject({ projectId }: { projectId: string }): Task[] {
  return taskService.getTasksByProject(projectId);
}

export function getTask({ id }: { id: string }): Task | null {
  return taskService.getTask(id);
}
