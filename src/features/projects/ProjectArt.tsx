import type { IconType } from 'react-icons'
import { FaBuilding, FaChartLine, FaCommentDots, FaMobileScreenButton, FaWandMagicSparkles } from 'react-icons/fa6'
import type { Project } from '../../content/types'
import styles from './ProjectArt.module.css'

const icons: Record<string, IconType> = {
  'q-cultural-insights': FaChartLine,
  'q-assist': FaCommentDots,
  'q-sparks': FaWandMagicSparkles,
  'telstra-prepaid': FaMobileScreenButton,
  'boost-prepaid': FaMobileScreenButton,
  'asset-management': FaBuilding,
}

/** Generic illustrative tile; deliberately contains no proprietary visuals. */
export function ProjectArt({ project, large = false }: { project: Project; large?: boolean }) {
  const Icon = icons[project.id] ?? FaChartLine
  return (
    <div className={`${styles.art} ${styles[project.accent]} ${large ? styles.large : ''}`} aria-hidden="true">
      <span className={styles.grid} />
      <Icon className={styles.icon} />
    </div>
  )
}
