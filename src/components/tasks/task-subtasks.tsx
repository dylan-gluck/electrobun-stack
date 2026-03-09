import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Subtask } from "@/lib/types/task";

interface TaskSubtasksProps {
  subtasks: Subtask[];
}

export function TaskSubtasks({ subtasks: initialSubtasks }: TaskSubtasksProps) {
  const [subtasks, setSubtasks] = useState(initialSubtasks);
  const completed = subtasks.filter((s) => s.completed).length;
  const total = subtasks.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  function toggleSubtask(id: string) {
    setSubtasks((prev) => prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)));
  }

  if (total === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-muted-foreground">Subtasks</h2>
        <span className="text-sm text-muted-foreground">
          {completed}/{total}
        </span>
      </div>
      <Progress value={percent} className="h-1.5 mb-3" />
      <div className="flex flex-col gap-1">
        {subtasks.map((subtask) => (
          <label
            key={subtask.id}
            className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() => toggleSubtask(subtask.id)}
            />
            <span
              className={cn("text-sm", subtask.completed && "line-through text-muted-foreground")}
            >
              {subtask.title}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
