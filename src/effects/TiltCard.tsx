import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './TiltCard.module.css'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

/**
 * Pointer-driven 3D tilt with a cursor-following glow. Tilt only applies to mouse/pen input;
 * keyboard focus shows the same glow via :focus-within, so nothing depends on hover.
 */
export function TiltCard({ children, className, maxTilt = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const reduced = useReducedMotion()

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const { clientX, clientY } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top) / rect.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      if (!reduced) {
        el.style.setProperty('--rx', `${(0.5 - y) * maxTilt * 2}deg`)
        el.style.setProperty('--ry', `${(x - 0.5) * maxTilt * 2}deg`)
      }
    })
  }

  const reset = () => {
    cancelAnimationFrame(frame.current)
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={ref} className={`${styles.tilt} ${className ?? ''}`} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  )
}
