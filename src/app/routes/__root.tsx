import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { AppSidebar } from "@/components/global/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/lib/context/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
