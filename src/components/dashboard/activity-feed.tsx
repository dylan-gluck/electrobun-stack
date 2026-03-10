import { UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectActivityQueryOptions } from "@/hooks/queries/activity";

interface ActivityFeedProps {
  projectId: string;
}

export function ActivityFeed({ projectId }: ActivityFeedProps) {
  const { data: activities } = useSuspenseQuery(projectActivityQueryOptions(projectId));
  const recent = activities.slice(0, 8);

  return (
    <Card className="min-h-0">
      <CardHeader className="flex shrink-0 flex-row items-center gap-3">
        <CardTitle>Recent Activity</CardTitle>
        <Badge variant="secondary">{activities.length}</Badge>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto">
        {recent.length === 0 ? (
          <p className="text-muted-foreground text-sm">No recent activity.</p>
        ) : (
          <ul className="flex flex-col divide-y">
            {recent.map((activity) => (
              <li key={activity.id} className="flex flex-col gap-1 py-2.5 first:pt-0 last:pb-0">
                <p className="text-foreground truncate text-sm leading-snug font-medium">
                  {activity.detail}
                </p>
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1">
                    <UserIcon className="size-3 shrink-0" />
                    <span>{activity.user}</span>
                  </span>
                  <span className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
