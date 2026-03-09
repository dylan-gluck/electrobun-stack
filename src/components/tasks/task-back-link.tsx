import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskBackLinkProps {
  projectName?: string;
}

export function TaskBackLink({ projectName }: TaskBackLinkProps) {
  return (
    <Button variant="ghost" size="sm" asChild>
      <Link to="/">
        <ArrowLeftIcon data-icon="inline-start" />
        Back to {projectName ?? "Dashboard"}
      </Link>
    </Button>
  );
}
