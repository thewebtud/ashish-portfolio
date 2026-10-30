import type { CSSProperties, ReactNode } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './Reveal.module.css'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  x?: number
  className?: string
}

/** Animates children into view the first time they enter the viewport (CSS-driven, plays once). */
export function Reveal({ children, delay = 0, y = 28, x = 0, className }: RevealProps) {
  const reduced = useReducedMotion()
  const [ref, seen] = useInViewOnce<HTMLDivElement>('0px 0px -10% 0px')

  if (reduced) return <div className={className}>{children}</div>

  const style = { '--reveal-delay': `${delay}s`, '--reveal-x': `${x}px`, '--reveal-y': `${y}px` } as CSSProperties
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${seen ? styles.visible : ''} ${className ?? ''}`}
      data-reveal={seen ? 'visible' : 'pending'}
      style={style}
    >
      {children}
    </div>
  )
}
