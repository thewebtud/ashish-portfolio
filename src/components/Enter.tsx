import type { CSSProperties, ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './Enter.module.css'

interface EnterProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Page-load entrance (CSS animation, plays on mount). Total choreography stays under 2s. */
export function Enter({ children, delay = 0, y = 20, className }: EnterProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  const style = { '--enter-delay': `${delay}s`, '--enter-y': `${y}px` } as CSSProperties
  return (
    <div className={`${styles.enter} ${className ?? ''}`} style={style}>
      {children}
    </div>
  )
}
