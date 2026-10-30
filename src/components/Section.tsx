import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: string
  children: ReactNode
}

export function Section({ id, index, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <Reveal className={styles.heading}>
          <p className={`${styles.eyebrow} mono`} aria-hidden="true">
            <span className={styles.index}>{index}</span> // {eyebrow}
          </p>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
