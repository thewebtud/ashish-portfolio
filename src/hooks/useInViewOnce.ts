import { useEffect, useRef, useState } from 'react'

/** Returns true after the element has entered the viewport once. */
export function useInViewOnce<T extends Element>(rootMargin = '0px') {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [seen, rootMargin])

  return [ref, seen] as const
}
