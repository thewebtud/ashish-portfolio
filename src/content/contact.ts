import { site } from './site'

export interface ContactDetails {
  email: string
  phones: string[]
  linkedin: string
  github?: string
}

const decode = (value: string) => atob(value)

export function getContactDetails(): ContactDetails {
  return {
    email: decode(site.encodedEmail),
    phones: site.encodedPhones.map(decode),
    linkedin: site.linkedin,
    github: site.github,
  }
}

export function formatPhone(phone: string): string {
  return `+91-${phone}`
}

export function phoneHref(phone: string): string {
  return `tel:+91${phone}`
}
