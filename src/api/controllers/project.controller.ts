import type { Project } from "../../lib/types/project";
import * as projectService from "../services/project.service";

export function getProjects(): Project[] {
  return projectService.getProjects();
}
