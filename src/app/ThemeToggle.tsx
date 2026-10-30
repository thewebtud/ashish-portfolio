import { useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme } from '../hooks/useTheme'
import styles from './ThemeToggle.module.css'

/**
 * Switches between light and dark. The aria-label names the action, so the state is announced
 * without aria-pressed. The tooltip repeats the label visually (hover and keyboard focus), can be
 * dismissed with Escape and stays visible while the pointer is over it (WCAG 1.4.13); it is
 * aria-hidden so screen readers do not hear the label twice.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const [dismissed, setDismissed] = useState(false)
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`

  return (
    <span className={styles.wrap} onMouseLeave={() => setDismissed(false)}>
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        onBlur={() => setDismissed(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setDismissed(true)
        }}
        aria-label={label}
        data-theme-toggle={theme}
      >
        {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
      </button>
      <span className={styles.tooltip} aria-hidden="true" data-testid="theme-tooltip" data-dismissed={dismissed || undefined}>
        {label}
      </span>
    </span>
  )
}
