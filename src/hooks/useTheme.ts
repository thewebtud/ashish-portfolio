import { useSyncExternalStore } from 'react'
import { getTheme, subscribeToTheme, toggleTheme, type Theme } from '../theme/theme'

export function useTheme(): { theme: Theme; toggle: () => void } {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, () => 'dark' as Theme)
  return { theme, toggle: toggleTheme }
}
