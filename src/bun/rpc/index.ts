import { BrowserView } from "electrobun/bun";
import type { AppRPC } from "../../lib/types/rpc";

export const rpc = BrowserView.defineRPC<AppRPC>({
  handlers: {
    requests: {},
    messages: {
      logToBun: ({ msg }) => console.log("[webview]", msg),
    },
  },
});
