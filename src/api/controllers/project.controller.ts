import type { Project } from "@/lib/types/project";
import * as projectService from "@/api/services/project.service";

export function getProjects(): Project[] {
  return projectService.getProjects();
}
