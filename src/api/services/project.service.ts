import type { Project } from "../../lib/types/project";
import * as projectRepo from "../repositories/project.repository";

export function getProjects(): Project[] {
  return projectRepo.findAll();
}

export function getProject(id: string): Project | null {
  return projectRepo.findById(id);
}
