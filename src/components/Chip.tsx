import type { ReactNode } from 'react'
import styles from './Chip.module.css'

interface ChipProps {
  children: ReactNode
  tone?: 'default' | 'cyan' | 'violet' | 'green' | 'amber'
  className?: string
}

export function Chip({ children, tone = 'default', className }: ChipProps) {
  return <span className={`${styles.chip} ${styles[tone]} mono ${className ?? ''}`}>{children}</span>
}
