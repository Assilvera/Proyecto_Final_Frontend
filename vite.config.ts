import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// Enable Sentry plugin only when required environment variables are present
		...(process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
			? [
					sentryVitePlugin({
						// Do not send telemetry from the build plugin
						telemetry: false,
					}),
				]
			: []),
	],
	build: {
		// Generate sourcemaps so Sentry can de-minify stack traces
		sourcemap: true,
	},
})