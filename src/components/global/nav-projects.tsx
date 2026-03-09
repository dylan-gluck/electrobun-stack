import { ChevronsUpDownIcon, FolderKanbanIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import type { Project } from "@/lib/types/project";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavProjects({
  projects,
  activeProjectId,
}: {
  projects: Project[];
  activeProjectId: string;
}) {
  const navigate = useNavigate();
  const activeProject = projects.find((p) => p.id === activeProjectId);

  if (!activeProject) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <FolderKanbanIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeProject.name}</span>
                <span className="truncate text-xs capitalize">{activeProject.status}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => navigate({ to: "/", search: { projectId: project.id } })}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <FolderKanbanIcon className="size-4" />
                </div>
                {project.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
