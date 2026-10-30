import { useState } from 'react'
import { Logo } from '../../components/Logo'
import type { SkillGroup } from '../../content/types'
import styles from './SkillGroupCard.module.css'

/** One tab stop per group; arrow keys move between skills (roving tabindex). */
export function SkillGroupCard({ group }: { group: SkillGroup }) {
  const [active, setActive] = useState(0)
  const count = group.skills.length

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: count - 1,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    const next = (keys[event.key] + count) % count
    setActive(next)
    event.currentTarget.querySelectorAll<HTMLElement>('li')[next]?.focus()
  }

  return (
    <section className={styles.card} aria-labelledby={`skill-${group.id}`}>
      <h3 id={`skill-${group.id}`} className={styles.title}>
        {group.title}
      </h3>
      <ul className={styles.list} onKeyDown={onKeyDown}>
        {group.skills.map((skill, i) => (
          <li
            key={skill.name}
            className={styles.skill}
            data-primary={skill.primary || undefined}
            tabIndex={i === active ? 0 : -1}
            onFocus={() => setActive(i)}
          >
            {skill.icon && <Logo name={skill.icon} />}
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
