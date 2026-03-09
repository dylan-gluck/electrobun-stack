import { LayoutDashboardIcon } from "lucide-react";
import type * as React from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useActiveProject } from "@/lib/context/active-project";
import { NavMain } from "@/components/global/nav-main";
import { NavUser } from "@/components/global/nav-user";
import { NavProjects } from "@/components/global/nav-projects";
import { projectsQueryOptions } from "@/hooks/queries/projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const { activeProjectId: contextProjectId } = useActiveProject();
  const activeProjectId = contextProjectId ?? projects[0]?.id ?? "";

  const navItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboardIcon />,
      isActive: true,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavProjects projects={projects} activeProjectId={activeProjectId} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
