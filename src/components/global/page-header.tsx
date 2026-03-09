import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface PageHeaderProps {
  children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex shrink-0 items-center gap-2 border-b border-border/50 bg-background/50 py-3 backdrop-blur-md transition-[width,height] ease-linear">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2" />
        <Breadcrumb>
          <BreadcrumbList>{children}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
