import { useState } from 'react'
import { FaArrowRight, FaDownload, FaEnvelope } from 'react-icons/fa6'
import { SiReact, SiTypescript } from 'react-icons/si'
import avatar from '../../assets/ashish-avatar.jpg'
import { Button } from '../../components/Button'
import { Enter } from '../../components/Enter'
import { profile } from '../../content/profile'
import { site } from '../../content/site'
import { Counter } from '../../effects/Counter'
import { Magnetic } from '../../effects/Magnetic'
import { TypedText } from '../../effects/TypedText'
import styles from './Hero.module.css'

export function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.inner} container`}>
        <div className={styles.copy}>
          <Enter delay={0.1}>
            <p className={`${styles.hello} mono`}>
              <span aria-hidden="true">&gt; </span>hello, world. I&apos;m
            </p>
          </Enter>
          <Enter delay={0.2}>
            <h1 id="hero-title" className={`${styles.name} gradient-text`}>
              {profile.name}
            </h1>
          </Enter>
          <Enter delay={0.3}>
            <p className={styles.title}>{profile.title}</p>
            <p className={`${styles.focus} mono`}>
              <span aria-hidden="true" className={styles.prompt}>
                ${' '}
              </span>
              <TypedText items={profile.focusAreas} />
            </p>
          </Enter>
          <Enter delay={0.4}>
            <p className={styles.summary}>{profile.summary}</p>
          </Enter>
          <Enter delay={0.5}>
            <div className={styles.actions}>
              <Magnetic>
                <Button href="#projects">
                  View Work <FaArrowRight aria-hidden="true" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="ghost" href={site.resume.href} download={site.resume.fileName}>
                  <FaDownload aria-hidden="true" /> Download Resume
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="ghost" href="#contact">
                  <FaEnvelope aria-hidden="true" /> Contact
                </Button>
              </Magnetic>
            </div>
          </Enter>
        </div>

        <Enter delay={0.35} className={styles.visual}>
          <div className={styles.photoWrap}>
            <div className={styles.ring} aria-hidden="true" />
            {photoFailed ? (
              <div className={styles.initials} role="img" aria-label="Ashish Kumar">
                AK
              </div>
            ) : (
              <img
                className={styles.photo}
                src={avatar}
                alt="Portrait of Ashish Kumar, Lead Frontend Developer"
                width={420}
                height={420}
                fetchPriority="high"
                onError={() => setPhotoFailed(true)}
              />
            )}
            <span className={`${styles.floating} ${styles.floatA}`} aria-hidden="true">
              <SiReact />
            </span>
            <span className={`${styles.floating} ${styles.floatB}`} aria-hidden="true">
              <SiTypescript />
            </span>
          </div>

          <div className={`${styles.terminal} mono`} aria-hidden="true">
            <div className={styles.terminalBar}>
              <span />
              <span />
              <span />
              <em>~/portfolio</em>
            </div>
            <pre className={styles.terminalBody}>
              <span className={styles.dim}>$ </span>whoami{'\n'}
              <span className={styles.out}>ashish.kumar → lead-frontend-developer</span>
              {'\n'}
              <span className={styles.dim}>$ </span>cat stack.json{'\n'}
              <span className={styles.out}>
                {'{ "core": ["React 19", "TypeScript"],\n  "architecture": "Clean Architecture",\n  "ai": "GitHub Copilot" }'}
              </span>
            </pre>
          </div>
        </Enter>
      </div>

      <div className={`${styles.stats} container`}>
        <dl className={styles.statList}>
          {profile.stats.map((stat, i) => (
            <Enter key={stat.id} delay={0.6 + i * 0.1} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={`${styles.statValue} gradient-text`}>
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </Enter>
          ))}
        </dl>
      </div>
    </section>
  )
}
