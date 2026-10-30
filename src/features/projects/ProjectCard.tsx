import { FaArrowRight } from 'react-icons/fa6'
import { Chip } from '../../components/Chip'
import type { Project } from '../../content/types'
import { TiltCard } from '../../effects/TiltCard'
import { ProjectArt } from './ProjectArt'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  onOpen: (trigger: HTMLButtonElement) => void
}

const MAX_CHIPS = 4

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const extra = project.stack.length - MAX_CHIPS
  return (
    <TiltCard className={styles.tilt}>
      <article className={styles.card}>
        <ProjectArt project={project} />
        <div className={styles.badges}>
          {project.badges.map((badge) => (
            <Chip key={badge} tone={badge === 'AI' ? 'violet' : 'cyan'}>
              {badge}
            </Chip>
          ))}
          {!(project.badges as string[]).includes(project.category) && <Chip>{project.category}</Chip>}
        </div>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.tagline}>{project.tagline}</p>
        <ul className={styles.stack} aria-label="Key technologies">
          {project.stack.slice(0, MAX_CHIPS).map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <Chip>+{extra}</Chip>
            </li>
          )}
        </ul>
        <button type="button" className={styles.open} onClick={(event) => onOpen(event.currentTarget)}>
          View details <FaArrowRight aria-hidden="true" />
          <span className="visually-hidden"> of {project.name}</span>
        </button>
      </article>
    </TiltCard>
  )
}
