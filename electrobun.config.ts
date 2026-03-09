import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "Electrobun Shadcn-ui",
		identifier: "reacttailwindvite.electrobun.dev",
		version: "0.0.1",
	},
	build: {
		// Vite builds to dist/, we copy from there
		copy: {
			"dist/index.html": "views/mainview/index.html",
			"dist/assets": "views/mainview/assets",
		},
		// Ignore Vite output in watch mode — HMR handles view rebuilds separately
		// @ts-expect-error
		watchIgnore: ["dist/**"],
		mac: {
			codesign: true,
			notarize: true,
			bundleCEF: false,
			icons: "icon.iconset",
		},
		linux: {
			bundleCEF: true,
		},
		win: {
			bundleCEF: true,
		},
	},
} satisfies ElectrobunConfig;
