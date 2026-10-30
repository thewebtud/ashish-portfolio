import { FaGraduationCap } from 'react-icons/fa6'
import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { education } from '../../content/education'
import styles from './Education.module.css'

export function Education() {
  return (
    <Section id="education" index="05" eyebrow="education" title={<>Where it <span className="gradient-text">started</span></>}>
      <ul className={styles.list}>
        {education.map((item) => (
          <li key={item.institution}>
            <Reveal>
              <div className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  <FaGraduationCap />
                </span>
                <div>
                  <h3 className={styles.school}>{item.institution}</h3>
                  <p className={styles.degree}>{item.degree}</p>
                  <p className={`${styles.meta} mono`}>
                    {item.years} · {item.city}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
