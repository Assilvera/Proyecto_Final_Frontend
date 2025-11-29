type EventParams = Record<string, unknown>

declare global {
	interface Window {
		dataLayer?: unknown[]
		gtag?: (...args: unknown[]) => void
	}
}

let isInitialized = false

function loadGtagScript(measurementId: string): Promise<void> {
	return new Promise((resolve, reject) => {
		// Avoid duplicating the script
		const existing = document.querySelector<HTMLScriptElement>(`script[src*="www.googletagmanager.com/gtag/js?id="]`)
		if (existing) {
			resolve()
			return
		}

		const script = document.createElement('script')
		script.async = true
		script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
		script.onload = () => resolve()
		script.onerror = () => reject(new Error('Failed to load gtag.js'))
		document.head.appendChild(script)
	})
}

export async function initAnalytics(): Promise<void> {
	if (isInitialized) return
	const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
	if (!measurementId) {
		// GA not configured; no-op
		return
	}

	// Initialize dataLayer and gtag stub immediately
	window.dataLayer = window.dataLayer || []
	window.gtag =
		window.gtag ||
		function gtagShim(...args: unknown[]) {
			;(window.dataLayer as unknown[]).push(args)
		}

	// Load the GA script
	try {
		await loadGtagScript(measurementId)
	} catch {
		// If script fails to load, keep graceful no-op behavior
		return
	}

	// Initialize GA
	window.gtag('js', new Date())
	window.gtag('config', measurementId, {
		send_page_view: false, // we'll manage pageviews manually to avoid duplicates
	})

	isInitialized = true
}

export function trackPageView(path: string): void {
	const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
	if (!measurementId || !window.gtag) return
	window.gtag('event', 'page_view', {
		page_path: path,
	})
}

export function trackEvent(action: string, params?: EventParams): void {
	const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
	if (!measurementId || !window.gtag) return
	window.gtag('event', action, params ?? {})
}


