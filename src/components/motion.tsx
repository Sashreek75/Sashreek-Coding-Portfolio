import { useEffect, useRef, useState } from 'react'
import type { ReactNode, CSSProperties, MouseEvent } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useVelocity,
  useAnimationFrame,
  animate,
  AnimatePresence,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { cn } from '../lib/utils'
import { EASE } from '../lib/ease'


/* ───────────────── Split text: letters rise from a mask ───────────────── */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  inView = false,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  inView?: boolean
}) {
  const words = text.split(' ')
  let idx = 0
  const trigger = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { initial: 'hidden', animate: 'show' }
  return (
    <motion.span className={cn('inline', className)} aria-label={text} {...trigger}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden>
          {w.split('').map((ch) => {
            const i = idx++
            return (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { y: '110%', rotate: 8, opacity: 0 },
                  show: {
                    y: '0%',
                    rotate: 0,
                    opacity: 1,
                    transition: { duration: 0.8, ease: EASE, delay: delay + i * stagger },
                  },
                }}
              >
                {ch}
              </motion.span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}

/* ───────────────── Reveal: generic fade/slide on scroll ───────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  x = 0,
  blur = true,
  once = true,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  blur?: boolean
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? 'blur(10px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────── Magnetic: element leans toward the cursor ───────────────── */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 })
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className={cn('inline-block', className)}>
      {children}
    </motion.div>
  )
}

/* ───────────────── Tilt card with a cursor spotlight ───────────────── */
export function TiltCard({
  children,
  className,
  glow = '#6d9cff',
  max = 8,
  onClick,
  style,
}: {
  children: ReactNode
  className?: string
  glow?: string
  max?: number
  onClick?: () => void
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(0, { stiffness: 160, damping: 18 })
  const ry = useSpring(0, { stiffness: 160, damping: 18 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const spot = useTransform(
    [mx, my] as MotionValue<number>[],
    ([a, b]: number[]) => `radial-gradient(520px circle at ${a}% ${b}%, ${glow}26, transparent 45%)`,
  )
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    mx.set(px * 100)
    my.set(py * 100)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100, ...style }}
      className={cn('group relative', className)}
      data-cursor={onClick ? 'open' : undefined}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spot }}
      />
      {children}
    </motion.div>
  )
}

/* ───────────────── Count up when visible ───────────────── */
export function CountUp({ to, prefix = '', suffix = '', duration = 2, className }: { to: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(v) })
    return () => c.stop()
  }, [inView, to, duration])
  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  )
}

/* ───────────────── Rotating words ───────────────── */
export function RotatingWords({ words, className, interval = 2600 }: { words: string[]; className?: string; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])
  return (
    <span className={cn('relative inline-grid overflow-hidden align-bottom', className)}>
      {/* reserve width of the longest phrase */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: '100%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ───────────────── Velocity marquee ───────────────── */
const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

export function Marquee({ children, baseVelocity = 3, className }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const dir = useRef(1)
  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) dir.current = -1
    else if (vf > 0) dir.current = 1
    moveBy += dir.current * moveBy * vf
    baseX.set(baseX.get() + moveBy)
  })
  return (
    <div className={cn('flex overflow-hidden whitespace-nowrap', className)}>
      <motion.div className="flex flex-nowrap gap-0" style={{ x }}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ───────────────── Scroll-linked word reveal ───────────────── */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{w}</Word>
      })}
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  const highlight = children.startsWith('*')
  const word = highlight ? children.replace(/\*/g, '') : children
  return (
    <span className="relative mr-[0.28em] mt-[0.1em]">
      <motion.span style={{ opacity, y }} className={cn('inline-block', highlight && 'text-gradient')}>
        {word}
      </motion.span>
    </span>
  )
}

/* ───────────────── Section label (code-comment style) ───────────────── */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <Reveal y={16} className="mb-6 flex items-center gap-3 font-mono text-xs">
      <span className="text-brand-mint">{'//'}</span>
      <span className="text-brand-blue">{index}</span>
      <motion.span
        className="h-px w-12 origin-left bg-gradient-to-r from-brand-blue to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      />
      <span className="uppercase tracking-[0.2em] text-gray-500">{children}</span>
    </Reveal>
  )
}

/* ───────────────── Scramble / decode text ───────────────── */
const GLYPHS = '01<>/{}[]#$%&*+=?ΔΣΨΩ'
export function Scramble({ text, delay = 0, duration = 900, className, inView = false }: { text: string; delay?: number; duration?: number; className?: string; inView?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true })
  const go = inView ? seen : true
  const [out, setOut] = useState(() => text.replace(/\S/g, ' '))
  useEffect(() => {
    if (!go) return
    let raf = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const t = (now - start - delay) / duration
      if (t < 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const reveal = Math.floor(Math.min(1, t) * text.length)
      setOut(
        text
          .split('')
          .map((ch, i) => (ch === ' ' ? ' ' : i < reveal ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(''),
      )
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [go, text, delay, duration])
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden className="whitespace-pre">{out}</span>
    </span>
  )
}

/* ───────────────── Live EEG strip (section divider) ───────────────── */
export function EEGStrip({ className, color = '#6d9cff' }: { className?: string; color?: string }) {
  const ref = useRef<SVGPathElement>(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let ph = 0
    const draw = () => {
      ph += 0.035
      let d = ''
      for (let x = 0; x <= 1200; x += 6) {
        const spike = Math.exp(-Math.pow(((x / 1200 + ph * 0.08) % 1) - 0.5, 2) / 0.0015)
        const y =
          30 +
          Math.sin(x * 0.045 + ph * 3) * 4 +
          Math.sin(x * 0.11 - ph * 5) * 2.5 +
          Math.sin(x * 0.013 + ph) * 3 +
          spike * Math.sin(x * 0.35) * 18
        d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`
      }
      ref.current?.setAttribute('d', d)
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className={cn('h-14 w-full', className)} aria-hidden>
      <defs>
        <linearGradient id={`eeg-${color}`} x1="0" x2="1">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="0.5" stopColor={color} stopOpacity="0.9" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path ref={ref} fill="none" stroke={`url(#eeg-${color})`} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
