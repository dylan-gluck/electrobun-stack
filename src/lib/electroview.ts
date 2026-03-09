import { Electroview } from "electrobun/view";
import type { RPC } from "@/bun/rpc";

const rpc = Electroview.defineRPC<RPC>({
  handlers: {
    requests: {},
    messages: {},
  },
});

// Guard instantiation: Electroview requires the Electrobun runtime.
// In browser dev mode (Vite HMR via localhost), the runtime is absent
// and the WebSocket connection will fail.
const isElectrobun = typeof window !== "undefined" && "electrobun" in window;

export const electroview = isElectrobun ? new Electroview({ rpc }) : null;
