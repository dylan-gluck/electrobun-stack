import type { Task } from "@/lib/types/task";
import * as taskRepo from "@/api/repositories/task.repository";

export function getTasksByProject(projectId: string): Task[] {
  return taskRepo.findByProjectId(projectId);
}

export function getTask(id: string): Task | null {
  return taskRepo.findById(id);
}
