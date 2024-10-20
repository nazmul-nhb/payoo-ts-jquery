import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
			crypto: "crypto-browserify",
			buffer: "buffer",
		},
	},
	optimizeDeps: {
		include: ["bcryptjs"],
	},
	build: { chunkSizeWarningLimit: 2048 },
});
