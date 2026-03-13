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

## Design Context

### Users

Template/demo app showcasing Electrobun + React 19 + shadcn/ui for native macOS desktop apps. Target audience is developers evaluating or bootstrapping with this stack.

### Brand Personality

Clean, precise, technical — developer-focused engineering aesthetic, no-nonsense.

### Aesthetic Direction

- **References**: Linear (ultra-polished, keyboard-first), Raycast (native macOS feel, crisp), Vercel Dashboard (clean hierarchy), Notion (flexible, content-focused)
- **Visual tone**: Minimal flat design, zero border-radius, no drop shadows, subtle ring borders
- **Colors**: OKLch color space, green primary, neutral grays, warm red destructive
- **Typography**: Figtree Variable (UI), JetBrains Mono Variable (code/data). HTML defaults to monospace
- **Theme**: Dark/light/system via next-themes, high-contrast foreground/background

### Design Principles

1. **Precision over decoration** — No superfluous visual elements. Every pixel serves a purpose.
2. **Native-feeling** — Should feel like a proper macOS app, not a web page in a wrapper.
3. **Information density** — Maximize useful content per screen while maintaining readability.
4. **Keyboard-first** — Command palette, shortcuts, and keyboard navigation are first-class.
5. **Consistent restraint** — Zero radius, no shadows, subtle borders. Let content breathe through whitespace, not ornamentation.

### Accessibility

WCAG AA compliance. Good contrast ratios, keyboard navigation, screen reader support.
