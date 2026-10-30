import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import styles from './Layout.module.css'

export function Layout({ children, background }: { children: ReactNode; background?: ReactNode }) {
  return (
    <>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      {background}
      <NavBar />
      <main id="main" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  )
}
