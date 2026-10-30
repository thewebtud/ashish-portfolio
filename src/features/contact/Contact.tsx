import type { ReactNode } from 'react'
import { FaDownload, FaEnvelope, FaGithub, FaLinkedinIn, FaPhone } from 'react-icons/fa6'
import { Button } from '../../components/Button'
import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { formatPhone, getContactDetails, phoneHref } from '../../content/contact'
import { site } from '../../content/site'
import { TiltCard } from '../../effects/TiltCard'
import styles from './Contact.module.css'

interface ChannelProps {
  icon: ReactNode
  label: string
  value: string
  href: string
  external?: boolean
}

function Channel({ icon, label, value, href, external }: ChannelProps) {
  return (
    <TiltCard className={styles.tilt}>
      <a
        className={styles.channel}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.text}>
          <span className={`${styles.label} mono`}>{label}</span>
          <span className={styles.value}>{value}</span>
        </span>
      </a>
    </TiltCard>
  )
}

function PhoneCard({ phones }: { phones: string[] }) {
  return (
    <TiltCard className={styles.tilt}>
      <div className={styles.channel}>
        <span className={styles.icon} aria-hidden="true">
          <FaPhone />
        </span>
        <span className={styles.text}>
          <span className={`${styles.label} mono`}>{phones.length > 1 ? 'Phones' : 'Phone'}</span>
          <ul className={styles.phones}>
            {phones.map((phone) => (
              <li key={phone}>
                <a className={styles.phoneLink} href={phoneHref(phone)}>
                  {formatPhone(phone)}
                </a>
              </li>
            ))}
          </ul>
        </span>
      </div>
    </TiltCard>
  )
}

export function Contact() {
  // Built at render time so the details are never literal strings in the built HTML
  const contact = getContactDetails()

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="contact"
      title={<>Let&apos;s build something <span className="gradient-text">great</span></>}
      intro="I'm open to new opportunities. Reach out by email, phone or LinkedIn, or grab my resume."
    >
      <ul className={styles.grid}>
        <li>
          <Reveal>
            <Channel icon={<FaEnvelope />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          </Reveal>
        </li>
        {contact.phones.length > 0 && (
          <li>
            <Reveal delay={0.06}>
              <PhoneCard phones={contact.phones} />
            </Reveal>
          </li>
        )}
        <li>
          <Reveal delay={0.18}>
            <Channel icon={<FaLinkedinIn />} label="LinkedIn" value="devnextcubical" href={contact.linkedin} external />
          </Reveal>
        </li>
        {contact.github && (
          <li>
            <Reveal delay={0.24}>
              <Channel icon={<FaGithub />} label="GitHub" value={contact.github.replace(/^https?:\/\//, '')} href={contact.github} external />
            </Reveal>
          </li>
        )}
      </ul>

      <Reveal className={styles.resume}>
        <Button href={site.resume.href} download={site.resume.fileName}>
          <FaDownload aria-hidden="true" /> Download Resume (PDF)
        </Button>
      </Reveal>
    </Section>
  )
}
