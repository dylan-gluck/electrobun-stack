import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowRightLeftIcon,
  CheckCircle2Icon,
  MessageSquareIcon,
  PencilIcon,
  PlusCircleIcon,
  UserPlusIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectActivityQueryOptions } from "@/hooks/queries/activity";
import type { ActivityAction } from "@/lib/types/activity";

const actionIcons: Record<ActivityAction, typeof CheckCircle2Icon> = {
  completed: CheckCircle2Icon,
  created: PlusCircleIcon,
  updated: PencilIcon,
  commented: MessageSquareIcon,
  assigned: UserPlusIcon,
  moved: ArrowRightLeftIcon,
};

interface TaskActivityProps {
  taskId: string;
  projectId: string;
}

export function TaskActivity({ taskId, projectId }: TaskActivityProps) {
  const { data: allActivities } = useSuspenseQuery(projectActivityQueryOptions(projectId));

  const activities = allActivities.filter((a) => a.taskId === taskId);

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No activity yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col gap-4 pl-6 before:absolute before:left-[9px] before:top-1 before:bottom-1 before:w-px before:bg-border">
          {activities.map((activity) => {
            const ActionIcon = actionIcons[activity.action];
            return (
              <div key={activity.id} className="flex flex-col gap-0.5">
                <div className="absolute left-0 mt-1.5 size-[18px] rounded-full bg-muted flex items-center justify-center">
                  <ActionIcon className="size-3 text-muted-foreground" />
                </div>
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.detail}</span>
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
