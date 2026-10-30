import { useEffect, useRef, useState } from 'react'
import { FaBars, FaDownload, FaXmark } from 'react-icons/fa6'
import { site } from '../content/site'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { sectionIds, sections } from './sections'
import { ThemeToggle } from './ThemeToggle'
import styles from './NavBar.module.css'

export function NavBar() {
  const active = useScrollSpy(sectionIds)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={styles.header}>
      <div className={`${styles.bar} container`}>
        <a href="#home" className={`${styles.brand} mono`} aria-label="Ashish Kumar, back to top">
          <span className={styles.bracket}>&lt;</span>
          Ashish
          <span className={styles.bracket}> /&gt;</span>
        </a>

        <nav id="primary-nav" aria-label="Primary" className={styles.nav} data-open={open}>
          <ul className={styles.list}>
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.link}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className={styles.resumeItem}>
              <a
                href={site.resume.href}
                download={site.resume.fileName}
                className={styles.resume}
                onClick={() => setOpen(false)}
              >
                <FaDownload aria-hidden="true" /> Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>

        <ThemeToggle />

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
