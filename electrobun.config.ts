import type { ElectrobunConfig } from "electrobun";

export default {
  app: {
    name: "Electrobun-Shadcn",
    identifier: "shadcn.electrobun.dev",
    version: "0.0.1",
  },
  build: {
    copy: {
      dist: "views/app",
    },
    // @ts-expect-error
    watchIgnore: ["dist/**"],
    mac: {
      codesign: false,
      notarize: false,
      bundleCEF: false,
      icons: "assets/icon.iconset",
    },
    linux: { bundleCEF: true },
    win: { bundleCEF: true },
  },
} satisfies ElectrobunConfig;
