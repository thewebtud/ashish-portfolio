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

const logos: Record<IconKey, { Icon: IconType; color: string }> = {
  react: { Icon: SiReact, color: '#61dafb' },
  typescript: { Icon: SiTypescript, color: '#3b9dff' },
  javascript: { Icon: SiJavascript, color: '#f7df1e' },
  redux: { Icon: SiRedux, color: '#a78bfa' },
  html5: { Icon: SiHtml5, color: '#f97316' },
  css: { Icon: SiCss, color: '#38bdf8' },
  sass: { Icon: SiSass, color: '#f472b6' },
  tailwind: { Icon: SiTailwindcss, color: '#22d3ee' },
  styledComponents: { Icon: SiStyledcomponents, color: '#f9a8d4' },
  bootstrap: { Icon: SiBootstrap, color: '#a78bfa' },
  chakra: { Icon: SiChakraui, color: '#2dd4bf' },
  mui: { Icon: SiMui, color: '#60a5fa' },
  axios: { Icon: SiAxios, color: '#a78bfa' },
  mysql: { Icon: SiMysql, color: '#38bdf8' },
  git: { Icon: SiGit, color: '#fb923c' },
  jest: { Icon: SiJest, color: '#f87171' },
  testingLibrary: { Icon: SiTestinglibrary, color: '#f87171' },
  webpack: { Icon: SiWebpack, color: '#7dd3fc' },
  docker: { Icon: SiDocker, color: '#38bdf8' },
  opentelemetry: { Icon: SiOpentelemetry, color: '#fbbf24' },
  reactRouter: { Icon: SiReactrouter, color: '#f87171' },
  githubCopilot: { Icon: SiGithubcopilot, color: '#e8ecf8' },
}

/** Decorative brand logo; the skill name is always rendered next to it as text. */
export function Logo({ name, size = '1.25em' }: { name: IconKey; size?: string }) {
  const { Icon, color } = logos[name]
  return <Icon aria-hidden="true" focusable="false" style={{ color, width: size, height: size }} />
}
