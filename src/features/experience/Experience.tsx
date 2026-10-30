import { useId, useRef, useState } from 'react'
import { AnimatePresence, m, useScroll } from 'motion/react'
import { FaChevronDown, FaLocationDot } from 'react-icons/fa6'
import { Chip } from '../../components/Chip'
import { Reveal } from '../../components/Reveal'
import { RichText } from '../../components/RichText'
import { Section } from '../../components/Section'
import { experience } from '../../content/experience'
import { projects } from '../../content/projects'
import type { Role } from '../../content/types'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Experience.module.css'

function RoleEntry({ role, defaultOpen }: { role: Role; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const reduced = useReducedMotion()
  const regionId = useId()
  const current = role.end === 'Present'

  const body = (
    <div className={styles.projects}>
      {role.projects.map((entry) => {
        const project = projects.find((p) => p.id === entry.projectId)
        return (
          <article key={entry.projectId} className={styles.project}>
            <h4 className={styles.projectName}>{project?.name ?? entry.projectId}</h4>
            <p className={styles.projectDesc}>{entry.description}</p>
            <ul className={styles.bullets}>
              {entry.bullets.map((bullet) => (
                <li key={bullet}>
                  <RichText text={bullet} />
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </div>
  )

  return (
    <li className={styles.entry}>
      <span className={styles.marker} data-current={current} aria-hidden="true" />
      <Reveal x={-16} y={0}>
        <div className={styles.card}>
          <h3 className={styles.roleHeading}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={open}
              aria-controls={regionId}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={styles.roleMain}>
                <span className={styles.roleTitle}>{role.title}</span>
                <span className={styles.company}>{role.company}</span>
              </span>
              <span className={styles.meta}>
                <span className={`${styles.dates} mono`}>
                  {role.start} – {role.end}
                  {current && <Chip tone="green">Current</Chip>}
                </span>
                <span className={styles.location}>
                  <FaLocationDot aria-hidden="true" /> {role.location}
                </span>
              </span>
              <FaChevronDown className={styles.chevron} data-open={open} aria-hidden="true" />
            </button>
          </h3>
          <div id={regionId}>
            {reduced ? (
              open && body
            ) : (
              <AnimatePresence initial={false}>
                {open && (
                  <m.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {body}
                  </m.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </Reveal>
    </li>
  )
}

export function Experience() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 65%', 'end 55%'] })

  return (
    <Section
      id="experience"
      index="02"
      eyebrow="experience"
      title={<>Where I&apos;ve <span className="gradient-text">shipped</span></>}
      intro="From internal tools to AI-powered SaaS: eight years of frontend delivery across Cognizant and Omnicom Media Group."
    >
      <div ref={wrapRef} className={styles.timeline}>
        <span className={styles.rail} aria-hidden="true">
          {reduced ? (
            <span className={styles.fillStatic} />
          ) : (
            <m.span className={styles.fill} style={{ scaleY: scrollYProgress }} />
          )}
        </span>
        <ol className={styles.list}>
          {experience.map((role, i) => (
            <RoleEntry key={role.id} role={role} defaultOpen={i === 0} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
