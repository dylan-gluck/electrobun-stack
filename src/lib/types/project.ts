export type ProjectStatus = "active" | "on-hold" | "completed";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  color: string;
  teamMemberIds: string[];
  startDate: string;
  targetDate: string;
}
