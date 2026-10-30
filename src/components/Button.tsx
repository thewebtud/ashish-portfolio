import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  download?: string
  external?: boolean
  onClick?: () => void
  className?: string
  'aria-label'?: string
}

export function Button({
  children,
  variant = 'primary',
  href,
  download,
  external,
  onClick,
  className,
  ...rest
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${className ?? ''}`
  if (href) {
    return (
      <a
        className={classes}
        href={href}
        download={download}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
