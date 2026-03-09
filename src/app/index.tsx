import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "@/styles/global.css";
import "@/lib/electroview"; // Initialize Electroview early (enables drag regions)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "always", // RPC is local IPC — always available
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      networkMode: "always",
    },
  },
});

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  context: { queryClient },
  history: hashHistory,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
