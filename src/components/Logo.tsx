import type { IconType } from 'react-icons'
import {
  SiAxios,
  SiBootstrap,
  SiChakraui,
  SiCss,
  SiDocker,
  SiGit,
  SiGithubcopilot,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMui,
  SiMysql,
  SiOpentelemetry,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiStyledcomponents,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiWebpack,
} from 'react-icons/si'
import type { IconKey } from '../content/types'

const logos: Record<IconKey, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  redux: SiRedux,
  html5: SiHtml5,
  css: SiCss,
  sass: SiSass,
  tailwind: SiTailwindcss,
  styledComponents: SiStyledcomponents,
  bootstrap: SiBootstrap,
  chakra: SiChakraui,
  mui: SiMui,
  axios: SiAxios,
  mysql: SiMysql,
  git: SiGit,
  jest: SiJest,
  testingLibrary: SiTestinglibrary,
  webpack: SiWebpack,
  docker: SiDocker,
  opentelemetry: SiOpentelemetry,
  reactRouter: SiReactrouter,
  githubCopilot: SiGithubcopilot,
}

/**
 * Decorative brand logo; the skill name is always rendered next to it as text.
 * Colours come from the `--logo-*` theme tokens so each theme can pick a legible shade.
 */
export function Logo({ name, size = '1.25em' }: { name: IconKey; size?: string }) {
  const Icon = logos[name]
  return <Icon aria-hidden="true" focusable="false" style={{ color: `var(--logo-${name})`, width: size, height: size }} />
}
