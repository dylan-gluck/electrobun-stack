import {
  ArrowRightLeftIcon,
  CheckCircle2Icon,
  MessageSquareIcon,
  PencilIcon,
  PlusCircleIcon,
  UserPlusIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { projectActivityQueryOptions } from "@/hooks/queries/activity";
import type { ActivityAction } from "@/lib/types/activity";

interface ActivityFeedProps {
  projectId: string;
}

const actionIcons: Record<ActivityAction, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  completed: CheckCircle2Icon,
  created: PlusCircleIcon,
  updated: PencilIcon,
  commented: MessageSquareIcon,
  assigned: UserPlusIcon,
  moved: ArrowRightLeftIcon,
};

export function ActivityFeed({ projectId }: ActivityFeedProps) {
  const { data: activities } = useSuspenseQuery(projectActivityQueryOptions(projectId));
  const recent = activities.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>{activities.length} events</CardDescription>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <div className="flex flex-col">
            {recent.map((activity, index) => {
              const Icon = actionIcons[activity.action];
              return (
                <div key={activity.id}>
                  {index > 0 && <Separator />}
                  <div className="flex items-start gap-3 py-2">
                    <div className="mt-0.5 rounded-full bg-muted p-1.5">
                      <Icon className="size-3.5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.detail}</span>
                      </p>
                      {activity.taskTitle && (
                        <p className="truncate text-xs text-muted-foreground">
                          {activity.taskTitle}
                        </p>
                      )}
                    </div>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
