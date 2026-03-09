export type TaskStatus = "todo" | "in-progress" | "in-review" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  description: string;
  createdAt: string;
}
