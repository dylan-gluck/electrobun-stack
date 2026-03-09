import {
  BarChart3Icon,
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  PlugIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";
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

const platformItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: <LayoutDashboardIcon />,
    isActive: true,
  },
  {
    title: "Analytics",
    url: "#",
    icon: <BarChart3Icon />,
    items: [
      { title: "Overview", url: "#" },
      { title: "Reports", url: "#" },
      { title: "Real-time", url: "#" },
    ],
  },
  {
    title: "Team",
    url: "#",
    icon: <UsersIcon />,
    items: [
      { title: "Members", url: "#" },
      { title: "Roles", url: "#" },
      { title: "Activity", url: "#" },
    ],
  },
];

const workspaceItems = [
  {
    title: "Calendar",
    url: "#",
    icon: <CalendarIcon />,
  },
  {
    title: "Documents",
    url: "#",
    icon: <FileTextIcon />,
  },
  {
    title: "Integrations",
    url: "#",
    icon: <PlugIcon />,
    badge: "3",
  },
];

const settingsItems = [
  {
    title: "General",
    url: "#",
    icon: <SettingsIcon />,
  },
  {
    title: "Notifications",
    url: "#",
    icon: <BellIcon />,
  },
  {
    title: "Security",
    url: "#",
    icon: <ShieldIcon />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);
  const { activeProjectId: contextProjectId } = useActiveProject();
  const activeProjectId = contextProjectId ?? projects[0]?.id ?? "";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavProjects projects={projects} activeProjectId={activeProjectId} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Platform" items={platformItems} />
        <NavMain label="Workspace" items={workspaceItems} />
        <NavMain label="Settings" items={settingsItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
