import type { RPCSchema } from "electrobun/bun";

export type AppRPC = {
  bun: RPCSchema<{
    requests: {
      // Add bun-side request handlers here
      // getItems: { params: { filter?: string }; response: Item[] };
    };
    messages: {
      logToBun: { msg: string };
    };
  }>;
  webview: RPCSchema<{
    requests: {
      // Add webview-side request handlers here
    };
    messages: {
      // Add webview-side message handlers here
    };
  }>;
};
