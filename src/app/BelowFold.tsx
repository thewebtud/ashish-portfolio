import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { sections } from './sections'

const loaders = {
  about: lazy(() => import('../features/about/About').then((m) => ({ default: m.About }))),
  experience: lazy(() => import('../features/experience/Experience').then((m) => ({ default: m.Experience }))),
  projects: lazy(() => import('../features/projects/Projects').then((m) => ({ default: m.Projects }))),
  skills: lazy(() => import('../features/skills/Skills').then((m) => ({ default: m.Skills }))),
  education: lazy(() => import('../features/education/Education').then((m) => ({ default: m.Education }))),
  contact: lazy(() => import('../features/contact/Contact').then((m) => ({ default: m.Contact }))),
}

const below = sections.filter((s) => s.id !== 'home')

function whenIdle(callback: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const handle = window.requestIdleCallback(callback, { timeout: 300 })
    return () => window.cancelIdleCallback(handle)
  }
  const handle = setTimeout(callback, 50)
  return () => clearTimeout(handle)
}

/** Reveals one more section each time the main thread is idle, so no single task is long. */
function useIdleSequence(total: number) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (count >= total) return
    return whenIdle(() => setCount((c) => c + 1))
  }, [count, total])
  return count
}

function Placeholder({ id }: { id: string }) {
  return <div id={id} style={{ minHeight: '60vh' }} aria-hidden="true" />
}

/** Renders nothing; its effect reports that the sibling section inside the same Suspense boundary has loaded. */
function LoadedSignal({ id, onLoaded }: { id: string; onLoaded: (id: string) => void }) {
  useEffect(() => onLoaded(id), [id, onLoaded])
  return null
}

/** Below-the-fold sections load as separate chunks after the hero has painted. */
export function BelowFold() {
  const ready = useIdleSequence(below.length)
  const [loaded, setLoaded] = useState<string[]>([])
  const scrolled = useRef(false)

  const markLoaded = useCallback((id: string) => setLoaded((prev) => (prev.includes(id) ? prev : [...prev, id])), [])

  // Content renders progressively, so the browser's native hash scroll runs too early.
  // Scroll once the target and every section above it are real, so heights have settled.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (scrolled.current || !id) return
    const index = below.findIndex((s) => s.id === id)
    if (index < 0) return
    if (below.slice(0, index + 1).every((s) => loaded.includes(s.id))) {
      scrolled.current = true
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    }
  }, [loaded])

  return (
    <>
      {below.map(({ id }, i) => {
        if (i >= ready) return <Placeholder key={id} id={id} />
        const Section = loaders[id as keyof typeof loaders]
        return (
          <Suspense key={id} fallback={<Placeholder id={id} />}>
            <Section />
            <LoadedSignal id={id} onLoaded={markLoaded} />
          </Suspense>
        )
      })}
    </>
  )
}
