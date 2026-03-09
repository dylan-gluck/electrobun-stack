import type { TaskPriority, TaskStatus } from "@/lib/types/task";

export function formatLabel(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const statusBadgeVariant: Record<
  TaskStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  todo: "outline",
  "in-progress": "secondary",
  "in-review": "outline",
  completed: "default",
};

export const priorityBadgeVariant: Record<
  TaskPriority,
  "default" | "secondary" | "outline" | "destructive"
> = {
  low: "outline",
  medium: "secondary",
  high: "default",
  critical: "destructive",
};
