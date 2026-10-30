import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './TypedText.module.css'

interface TypedTextProps {
  items: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}

/** Types and deletes each item in a loop. Static, fully readable list under reduced motion. */
export function TypedText({ items, typeSpeed = 70, deleteSpeed = 35, pause = 1600 }: TypedTextProps) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden)

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (reduced || hidden) return
    const current = items[index]
    let delay = deleting ? deleteSpeed : typeSpeed
    if (!deleting && length === current.length) delay = pause
    const timer = setTimeout(() => {
      if (!deleting && length < current.length) {
        setLength(length + 1)
      } else if (!deleting) {
        setDeleting(true)
      } else if (length > 0) {
        setLength(length - 1)
      } else {
        setDeleting(false)
        setIndex((index + 1) % items.length)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [reduced, hidden, items, index, length, deleting, typeSpeed, deleteSpeed, pause])

  if (reduced) {
    return <span>{items.join(' · ')}</span>
  }

  return (
    <span>
      <span className="visually-hidden">{items.join(', ')}</span>
      <span aria-hidden="true" data-testid="typed-text">
        {items[index].slice(0, length)}
        <span className={styles.caret} />
      </span>
    </span>
  )
}
