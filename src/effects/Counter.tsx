import { useEffect, useState } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/** Counts up once when first visible. Shows the final value immediately under reduced motion. */
export function Counter({ value, prefix = '', suffix = '', duration = 1400 }: CounterProps) {
  const reduced = useReducedMotion()
  const [ref, seen] = useInViewOnce<HTMLSpanElement>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (reduced || !seen) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCurrent(Math.round(easeOut(progress) * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, seen, value, duration])

  const shown = reduced ? value : current

  return (
    <span ref={ref}>
      <span className="visually-hidden">
        {prefix}
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {shown}
        {suffix}
      </span>
    </span>
  )
}
