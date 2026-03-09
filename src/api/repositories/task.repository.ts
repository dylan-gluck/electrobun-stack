import type { Task } from "../../lib/types/task";
import tasksJson from "../../lib/data/tasks.json";

const tasks = tasksJson as Task[];

export function findByProjectId(projectId: string): Task[] {
  return tasks.filter((t) => t.projectId === projectId);
}

export function findById(id: string): Task | null {
  return tasks.find((t) => t.id === id) ?? null;
}
