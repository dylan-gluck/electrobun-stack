export type TaskStatus = "todo" | "in-progress" | "in-review" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

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
  tags: string[];
  subtasks: Subtask[];
}
