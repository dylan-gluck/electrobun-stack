import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">Authentication</h1>
    </div>
  );
}
