import type { ReactNode } from 'react'
import { LazyMotion } from 'motion/react'

// Feature bundle is loaded asynchronously so it stays out of the initial chunk.
const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default)

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
