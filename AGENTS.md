# Coding Conventions

## Platform

This is an **Electrobun** desktop application. Electrobun is NOT Electron.
Do not use Electron APIs, patterns, or assumptions.

- Full API reference: https://blackboard.sh/electrobun/llms.txt
- Getting started: https://blackboard.sh/electrobun/docs/

## URLs

- Use `views://` for bundled assets (e.g., `views://app/index.html`).
- These are filesystem-backed with no server-side rewrite — hash routing is required.

### Vite

Plugin order matters: `TanStackRouterVite` must come before `react()` in the plugins array.
Vite root is `src/app` — TanStack Router plugin paths (`routesDirectory`, `generatedRouteTree`) are relative to that root, not the project root.

## RPC

Typed bidirectional RPC between browser and Bun process.

### Type Contract

All RPC types live in `src/lib/types/rpc.ts`. Both sides share the `AppRPC` type:

```ts
export type AppRPC = {
  bun: RPCSchema<{ requests: { ... }; messages: { ... } }>;
  webview: RPCSchema<{ requests: { ... }; messages: { ... } }>;
};
```

### Bun Side

Handlers in `src/bun/rpc/index.ts` using `BrowserView.defineRPC<AppRPC>()`.

## File Organization

| Path                 | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `src/app/`           | SPA entry, routes, generated route tree      |
| `src/bun/`           | Main process (BrowserWindow, RPC handlers)   |
| `src/components/ui/` | shadcn/ui primitives                         |
| `src/components/`    | App-level components (sidebar, nav, layouts) |
| `src/hooks/`         | React hooks                                  |
| `src/lib/`           | Utilities, Electroview singleton, types      |
| `src/styles/`        | Global CSS / Tailwind theme                  |
