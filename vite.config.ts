import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
	server: {
		host: "localhost",
		port: 8099,
		strictPort: true,
	},
	build: {
		outDir: "build",
	},
	plugins: [react(), tsconfigPaths()],
}));
