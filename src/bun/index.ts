import { BrowserWindow, Updater } from "electrobun/bun";
import { rpc } from "./rpc";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

async function getAppUrl(): Promise<string> {
  const channel = await Updater.localInfo.channel();
  if (channel === "dev") {
    try {
      await fetch(DEV_SERVER_URL, { method: "HEAD" });
      console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
      return DEV_SERVER_URL;
    } catch {
      console.log("Vite dev server not running. Run 'bun run dev:hmr' for HMR support.");
    }
  }
  return "views://app/index.html";
}

const url = await getAppUrl();

// @ts-expect-error
const _mainWindow = new BrowserWindow({
  title: "Electrobun-Shadcn",
  titleBarStyle: "hiddenInset",
  transparent: true,
  styleMask: { borderless: false },
  rpc,
  url,
});
