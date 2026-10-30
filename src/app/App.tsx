import { lazy, Suspense, useEffect, useState } from 'react'
import { MotionProvider } from '../components/MotionProvider'
import { Hero } from '../features/hero/Hero'
import { BelowFold } from './BelowFold'
import { Layout } from './Layout'

const AnimatedBackground = lazy(() => import('../effects/AnimatedBackground'))

/** Mounts the decorative background after first paint so it never competes with LCP. */
function DeferredBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      return () => window.cancelIdleCallback(handle)
    }
    const handle = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(handle)
  }, [])

  return ready ? (
    <Suspense fallback={null}>
      <AnimatedBackground />
    </Suspense>
  ) : null
}

export default function App() {
  return (
    <MotionProvider>
      <Layout background={<DeferredBackground />}>
        <Hero />
        <BelowFold />
      </Layout>
    </MotionProvider>
  )
}
