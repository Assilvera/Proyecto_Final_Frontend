import React from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App'
import { initAnalytics, trackPageView } from './utils/analytics'

// ========= SENTRY =========
const dsn = import.meta.env.VITE_SENTRY_DSN
console.log('🔎 Sentry DSN from env:', dsn)


if (dsn) {
  Sentry.init({
    dsn,
    integrations: [
      // Versiones nuevas de Sentry (v8+)
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  })
} else {
  console.warn('Sentry DSN not set, skipping Sentry.init')
}

// Hook de prueba seguro
;(window as any).__sentryTest = () => {
  if (!dsn) {
    console.warn('Sentry DSN not set, cannot send test error')
    return
  }
  Sentry.captureException(new Error('Sentry manual test'))
}

// ========= GOOGLE ANALYTICS =========
if (typeof window !== 'undefined') {
  initAnalytics()
  trackPageView(window.location.pathname + window.location.search)
}

// ========= RENDER APP =========
const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container missing (#root)')
}

createRoot(container).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
)
