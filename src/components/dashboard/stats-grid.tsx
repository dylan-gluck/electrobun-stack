import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsGridProps {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
}

export function StatsGrid({ totalTasks, completedTasks, inProgressTasks }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardDescription>Total Tasks</CardDescription>
          <CardTitle className="text-2xl">{totalTasks}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Completed</CardDescription>
          <CardTitle className="text-2xl">{completedTasks}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>In Progress</CardDescription>
          <CardTitle className="text-2xl">{inProgressTasks}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
