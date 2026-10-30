import { useEffect, useRef } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { Chip } from '../../components/Chip'
import { experience } from '../../content/experience'
import type { Project } from '../../content/types'
import { ProjectArt } from './ProjectArt'
import styles from './ProjectDialog.module.css'

interface ProjectDialogProps {
  project: Project
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const role = experience.find((r) => r.id === project.roleId)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
    closeRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  const close = () => ref.current?.close()

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          close()
        }
      }}
    >
      <div className={styles.content}>
        <button ref={closeRef} type="button" className={styles.close} onClick={close} aria-label="Close project details">
          <FaXmark aria-hidden="true" />
        </button>

        <ProjectArt project={project} large />

        <div className={styles.badges}>
          {project.badges.map((badge) => (
            <Chip key={badge} tone={badge === 'AI' ? 'violet' : 'cyan'}>
              {badge}
            </Chip>
          ))}
          {!(project.badges as string[]).includes(project.category) && <Chip>{project.category}</Chip>}
        </div>

        <h3 id="project-dialog-title" className={styles.title}>
          {project.name}
        </h3>
        <p className={`${styles.employer} mono`}>
          {project.employer}
          {role ? ` · ${role.title}` : ''}
        </p>
        <p className={styles.summary}>{project.summary}</p>

        <h4 className={styles.heading}>My role</h4>
        <p className={styles.role}>{project.myRole}</p>

        <h4 className={styles.heading}>Highlights</h4>
        <ul className={styles.highlights}>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h4 className={styles.heading}>Tech stack</h4>
        <ul className={styles.stack}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <Chip tone="cyan">{tech}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}
