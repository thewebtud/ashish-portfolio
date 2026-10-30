import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/** Nudges its child toward the pointer. Disabled for touch input and reduced motion. */
export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el || reduced || event.pointerType === 'touch') return
    const rect = el.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </span>
  )
}
