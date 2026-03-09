import { BrowserView } from "electrobun/bun";
import type { RPCSchema } from "electrobun/bun";
import type { Project } from "@/lib/types/project";
import type { Task } from "@/lib/types/task";
import * as projectController from "@/api/controllers/project.controller";
import * as taskController from "@/api/controllers/task.controller";

export type RPC = {
  bun: RPCSchema<{
    requests: {
      getProjects: { params: Record<string, never>; response: Project[] };
      getTasksByProject: {
        params: { projectId: string };
        response: Task[];
      };
      getTask: { params: { id: string }; response: Task | null };
    };
    messages: {
      logToBun: { msg: string };
    };
  }>;
  webview: RPCSchema<{
    requests: {};
    messages: {};
  }>;
};

export const rpc = BrowserView.defineRPC<RPC>({
  handlers: {
    requests: {
      getProjects: projectController.getProjects,
      getTasksByProject: taskController.getTasksByProject,
      getTask: taskController.getTask,
    },
    messages: {
      logToBun: ({ msg }) => console.log("[webview]", msg),
    },
  },
});
