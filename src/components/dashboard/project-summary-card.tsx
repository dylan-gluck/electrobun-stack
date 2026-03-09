import type { Project } from "@/lib/types/project";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatLabel } from "@/lib/format";

interface ProjectSummaryCardProps {
  project: Project;
}

export function ProjectSummaryCard({ project }: ProjectSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle>{project.name}</CardTitle>
          <Badge variant="secondary">{formatLabel(project.status)}</Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
