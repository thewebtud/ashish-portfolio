import { useEffect, useRef, useState } from 'react'

export interface SectionPosition {
  id: string
  top: number
}

/** The active section is the last one whose top has crossed the threshold. */
export function findActiveSection(positions: SectionPosition[], threshold: number): string | null {
  let active: string | null = positions.length ? positions[0].id : null
  for (const { id, top } of positions) {
    if (top <= threshold) active = id
  }
  return active
}

export function useScrollSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)
  const frame = useRef(0)

  useEffect(() => {
    const update = () => {
      frame.current = 0
      const positions = ids
        .map((id) => {
          const el = document.getElementById(id)
          return el ? { id, top: el.getBoundingClientRect().top } : null
        })
        .filter((p): p is SectionPosition => p !== null)
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      const next = nearBottom && positions.length ? positions[positions.length - 1].id : findActiveSection(positions, window.innerHeight * 0.35)
      setActive(next)
    }
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update)
    }
    frame.current = requestAnimationFrame(update)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [ids])

  return active
}
