import { ChevronRightIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavSubItem {
  title: string;
  url: string;
}

interface NavItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
  items?: NavSubItem[];
  badge?: string;
}

export function NavMain({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length ? (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((sub) => (
                      <SidebarMenuSubItem key={sub.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={sub.url}>
                            <span>{sub.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                <Link to={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
