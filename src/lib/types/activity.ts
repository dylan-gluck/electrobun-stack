export type ActivityAction =
  | "created"
  | "updated"
  | "completed"
  | "commented"
  | "assigned"
  | "moved";

export interface Activity {
  id: string;
  projectId: string;
  taskId?: string;
  taskTitle?: string;
  user: string;
  action: ActivityAction;
  detail: string;
  timestamp: string;
}
