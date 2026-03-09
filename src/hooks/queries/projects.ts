import { queryOptions } from "@tanstack/react-query";
import { electroview } from "@/bun/electroview";
import type { Project } from "@/lib/types/project";

async function fetchProjects(): Promise<Project[]> {
  if (electroview) {
    return electroview.rpc!.request.getProjects({});
  }
  const mod = await import("@/lib/data/projects.json");
  return mod.default as Project[];
}

export const projectsQueryOptions = queryOptions({
  queryKey: ["projects"],
  queryFn: fetchProjects,
});
