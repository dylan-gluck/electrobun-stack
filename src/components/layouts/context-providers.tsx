import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
