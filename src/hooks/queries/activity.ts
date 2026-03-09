import { queryOptions } from "@tanstack/react-query";
import type { Activity } from "@/lib/types/activity";

async function fetchActivities(projectId: string): Promise<Activity[]> {
  const mod = await import("@/lib/data/activity.json");
  return (mod.default as Activity[]).filter((a) => a.projectId === projectId);
}

async function fetchAllActivities(): Promise<Activity[]> {
  const mod = await import("@/lib/data/activity.json");
  return mod.default as Activity[];
}

export function projectActivityQueryOptions(projectId: string) {
  return queryOptions({
    queryKey: ["activity", { projectId }],
    queryFn: () => fetchActivities(projectId),
    enabled: !!projectId,
  });
}

export const allActivityQueryOptions = queryOptions({
  queryKey: ["activity"],
  queryFn: fetchAllActivities,
});
