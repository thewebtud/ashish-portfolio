import { FaArrowUp } from 'react-icons/fa6'
import { profile } from '../content/profile'
import { sections } from './sections'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  const backToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, '', window.location.pathname)
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={styles.copy}>
          &copy; {year} {profile.name}. Built with React &amp; TypeScript.
        </p>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            {sections.slice(1).map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#home" className={styles.top} onClick={backToTop}>
          <FaArrowUp aria-hidden="true" /> Back to top
        </a>
      </div>
    </footer>
  )
}
