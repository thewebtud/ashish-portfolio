import type { IconType } from 'react-icons'
import { FaBolt, FaFlaskVial, FaPeopleGroup, FaRobot, FaSitemap, FaUniversalAccess } from 'react-icons/fa6'
import { Section } from '../../components/Section'
import { Reveal } from '../../components/Reveal'
import { profile } from '../../content/profile'
import { TiltCard } from '../../effects/TiltCard'
import styles from './About.module.css'

const icons: Record<string, IconType> = {
  Architecture: FaSitemap,
  Quality: FaFlaskVial,
  Performance: FaBolt,
  'AI-assisted delivery': FaRobot,
  Collaboration: FaPeopleGroup,
  Accessibility: FaUniversalAccess,
}

export function About() {
  const { paragraphs, strengths } = profile.about

  return (
    <Section id="about" index="01" eyebrow="about" title={<>Engineering with <span className="gradient-text">intent</span></>}>
      <div className={styles.layout}>
        <div className={styles.text}>
          {paragraphs.map((text, i) => (
            <Reveal key={text} delay={i * 0.08}>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <ul className={styles.grid}>
          {strengths.map((item, i) => {
            const Icon = icons[item.title] ?? FaSitemap
            return (
              <li key={item.title}>
                <Reveal delay={i * 0.06} className={styles.reveal}>
                  <TiltCard className={styles.card}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon />
                    </span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardText}>{item.text}</p>
                  </TiltCard>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
