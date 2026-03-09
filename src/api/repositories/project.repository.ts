import type { Project } from "../../lib/types/project";
import projectsJson from "../../lib/data/projects.json";

const projects = projectsJson as Project[];

export function findAll(): Project[] {
  return projects;
}

export function findById(id: string): Project | null {
  return projects.find((p) => p.id === id) ?? null;
}
