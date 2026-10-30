import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { subscribeToTheme } from '../theme/theme'
import styles from './AnimatedBackground.module.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DISTANCE = 130
const POINTER_RADIUS = 150
const FRAME_INTERVAL = 1000 / 30

interface Palette {
  dot: string
  line: string
  dotAlpha: number
  lineAlpha: number
}

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement)
  const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback
  return {
    dot: read('--particle-dot', '34, 211, 238'),
    line: read('--particle-line', '96, 165, 250'),
    dotAlpha: parseFloat(read('--particle-dot-alpha', '0.5')),
    lineAlpha: parseFloat(read('--particle-line-alpha', '0.22')),
  }
}

/** Particle network with pointer interaction. Decorative only; lazy-loaded after first paint. */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    const pointer = { x: -9999, y: -9999 }
    let frame = 0
    let last = 0
    let palette = readPalette()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.floor((width * height) / 22000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < LINK_DISTANCE) {
            ctx.strokeStyle = `rgba(${palette.line}, ${(1 - dist / LINK_DISTANCE) * palette.lineAlpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(${palette.dot}, ${palette.dotAlpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const p of particles) {
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist < POINTER_RADIUS && dist > 0) {
          const force = (1 - dist / POINTER_RADIUS) * 0.6
          p.x += (dx / dist) * force * 2
          p.y += (dy / dist) * force * 2
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (now - last < FRAME_INTERVAL) return
      last = now
      step()
      draw()
    }

    const start = () => {
      if (!frame && !reduced && !document.hidden) frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointer.x = event.clientX
      pointer.y = event.clientY
      glowRef.current?.style.setProperty('--px', `${event.clientX}px`)
      glowRef.current?.style.setProperty('--py', `${event.clientY}px`)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    // Pick up the new colours as soon as the theme changes; also repaints when animation is paused
    const unsubscribe = subscribeToTheme(() => {
      palette = readPalette()
      draw()
    })

    resize()
    start()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      unsubscribe()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.grid} />
      <div ref={glowRef} className={styles.glow} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
