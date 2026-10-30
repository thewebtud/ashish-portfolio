import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme } from '../hooks/useTheme'
import styles from './ThemeToggle.module.css'

/** Switches between light and dark. The label names the action, so the state is announced without aria-pressed. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={`Switch to ${next} theme`} data-theme-toggle={theme}>
      {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
  )
}
