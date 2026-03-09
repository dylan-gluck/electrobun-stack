import { Link } from "@tanstack/react-router";

interface TaskBackLinkProps {
  projectName?: string;
}

export function TaskBackLink({ projectName }: TaskBackLinkProps) {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to {projectName ?? "Dashboard"}
      </Link>
    </div>
  );
}
