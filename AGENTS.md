# Electrobun

This is an `electrobun` project, NOT `electron`.

- Docs available at: https://blackboard.sh/electrobun/docs/
- BrowserWindow: https://blackboard.sh/electrobun/docs/apis/browser-window/
- BrowserView: https://blackboard.sh/electrobun/docs/apis/browser-view/
- Events: https://blackboard.sh/electrobun/docs/apis/events/
- Build config: https://blackboard.sh/electrobun/docs/apis/cli/build-configuration/
- Utility funcitons: https://blackboard.sh/electrobun/docs/apis/utils/
- Global context menu: https://blackboard.sh/electrobun/docs/apis/context-menu/
- Native application menu: https://blackboard.sh/electrobun/docs/apis/application-menu/
- Native system-tray actions: https://blackboard.sh/electrobun/docs/apis/tray/
- Update app version: https://blackboard.sh/electrobun/docs/apis/updater/
- Webview tag: https://blackboard.sh/electrobun/docs/apis/browser/electrobun-webview-tag/

# Dev Commands

- Oxlint/Oxfmt/Typecheck: `bun run ci`
- Build: `bun run build`
- Add package: `bun add <package>`
- Preview app: Use `agent-browser` (http://localhost:5173/)

# Conventions

- Principals: SOC, DRY, SOLID
- Controller / Service / Repository architecture: `src/api/`
- Front-end Hooks: Queries / Mutations: `src/hooks/`
- RPC bi-directional communication with `bun` instance: `src/bun/rpc.ts`
- Types, organized by entity: `src/types/`
- Tanstack router page views: `src/app/routes/`
- Components organized by view: `src/components/`
- Shadcn UI components: `src/components/ui/`
