import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Section } from '../../components/Section'
import { projectCategories, projects } from '../../content/projects'
import type { Project } from '../../content/types'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

const ProjectDialog = lazy(() => import('./ProjectDialog'))

type Category = (typeof projectCategories)[number]

export function Projects({ items = projects }: { items?: Project[] }) {
  const [category, setCategory] = useState<Category>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const reduced = useReducedMotion()

  const visible = useMemo(
    () => (category === 'All' ? items : items.filter((p) => p.category === category)),
    [category, items],
  )

  const open = (project: Project, trigger: HTMLButtonElement) => {
    opener.current = trigger
    setSelected(project)
  }

  const close = () => {
    setSelected(null)
    opener.current?.focus()
  }

  const cards = visible.map((project) => <ProjectCard key={project.id} project={project} onOpen={(t) => open(project, t)} />)

  return (
    <Section
      id="projects"
      index="03"
      eyebrow="projects"
      title={<>Products I&apos;ve <span className="gradient-text">built</span></>}
      intro="A mix of AI-powered tools, analytics SaaS and consumer applications. Select a card for details."
    >
      <div className={styles.toolbar}>
        <div role="group" aria-label="Filter projects by category" className={styles.filters}>
          {projectCategories.map((name) => (
            <button
              key={name}
              type="button"
              className={styles.filter}
              aria-pressed={category === name}
              onClick={() => setCategory(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className={`${styles.count} mono`}>
          {`Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>No projects match this filter.</p>
      ) : reduced ? (
        <ul className={styles.grid}>
          {cards.map((card) => (
            <li key={card.key}>{card}</li>
          ))}
        </ul>
      ) : (
        <ul className={styles.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {cards.map((card) => (
              <m.li
                key={card.key}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {card}
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {selected && (
        <Suspense fallback={null}>
          <ProjectDialog project={selected} onClose={close} />
        </Suspense>
      )}
    </Section>
  )
}
