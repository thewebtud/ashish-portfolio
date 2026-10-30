import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Section } from '../../components/Section'
import { skillGroups } from '../../content/skills'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SkillGroupCard } from './SkillGroupCard'
import styles from './Skills.module.css'

export function Skills() {
  const [selected, setSelected] = useState<string>('all')
  const reduced = useReducedMotion()
  const visible = selected === 'all' ? skillGroups : skillGroups.filter((g) => g.id === selected)
  const options = [{ id: 'all', title: 'All' }, ...skillGroups.map(({ id, title }) => ({ id, title }))]

  return (
    <Section
      id="skills"
      index="04"
      eyebrow="skills"
      title={<>The <span className="gradient-text">stack</span> I work with</>}
      intro="React and TypeScript at the core, backed by strong engineering fundamentals, testing and observability."
    >
      <div role="group" aria-label="Filter skills by group" className={styles.filters}>
        {options.map(({ id, title }) => (
          <button
            key={id}
            type="button"
            className={styles.filter}
            aria-pressed={selected === id}
            onClick={() => setSelected(id)}
          >
            {title}
          </button>
        ))}
      </div>

      {reduced ? (
        <ul className={styles.grid}>
          {visible.map((group) => (
            <li key={group.id}>
              <SkillGroupCard group={group} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((group) => (
              <m.li
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <SkillGroupCard group={group} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </Section>
  )
}
