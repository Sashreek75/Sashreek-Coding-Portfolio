import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Scramble } from './motion'

/* ───────────────── Custom cursor (desktop only) ───────────────── */
export function Cursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [mode, setMode] = useState<'default' | 'hover' | 'open'>('default')
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 })

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement | null
      const open = t?.closest('[data-cursor="open"]')
      const hov = t?.closest('a, button, input, textarea, [data-cursor]')
      setMode(open ? 'open' : hov ? 'hover' : 'default')
    }
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', d)
    window.addEventListener('pointerup', u)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', d)
      window.removeEventListener('pointerup', u)
    }
  }, [x, y, enabled])

  if (!enabled) return null
  const size = mode === 'open' ? 84 : mode === 'hover' ? 54 : 34
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-white/40 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          scale: down ? 0.8 : 1,
          backgroundColor: mode === 'open' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <AnimatePresence>
          {mode === 'open' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-mono text-[10px] font-medium uppercase tracking-widest text-black"
            >
              Open
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: mode === 'open' ? 0 : 1 }}
      />
    </>
  )
}

/* ───────────────── Preloader: an EEG trace boots the site ───────────────── */
// A heartbeat/EEG-ish path across a 1000×120 box
const EEG =
  'M0 60 L120 60 L150 58 L170 62 L190 60 L250 60 L265 52 L280 66 L295 60 L380 60 L395 20 L410 104 L425 8 L440 92 L455 44 L470 60 L560 60 L575 54 L590 64 L605 60 L700 60 L712 34 L724 86 L736 60 L820 60 L835 56 L850 63 L865 60 L1000 60'

const BOOT = ['booting cortex', 'mapping synapses', 'linking neurons ↔ circuits', 'ready']

export function Preloader({ onDone }: { onDone: () => void }) {
  const [line, setLine] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onDone()
      return
    }
    const timers = BOOT.map((_, i) => setTimeout(() => setLine(i + 1), 250 + i * 420))
    const end = setTimeout(onDone, 2350)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(end)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#030407]"
      initial={{ clipPath: 'inset(0% 0 0% 0)' }}
      exit={{ clipPath: 'inset(50% 0 50% 0)' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(circle,black,transparent_65%)]" />

      <div className="relative mb-6 font-display text-3xl font-bold tracking-[0.18em] text-white sm:text-5xl">
        <Scramble text="SASHREEK PINJALA" delay={300} duration={1100} />
      </div>

      {/* EEG trace */}
      <div className="relative w-[88vw] max-w-4xl">
        <svg viewBox="0 0 1000 120" className="h-24 w-full overflow-visible sm:h-28" preserveAspectRatio="none">
          <defs>
            <linearGradient id="eeg-g" x1="0" x2="1">
              <stop offset="0" stopColor="#6d9cff" stopOpacity="0" />
              <stop offset="0.25" stopColor="#6d9cff" />
              <stop offset="0.7" stopColor="#b477ff" />
              <stop offset="1" stopColor="#5ef2c2" />
            </linearGradient>
            <filter id="eeg-glow" x="-10%" y="-50%" width="120%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line x1="0" y1="60" x2="1000" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <motion.path
            d={EEG}
            fill="none"
            stroke="url(#eeg-g)"
            strokeWidth="2"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#eeg-glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: [0.45, 0, 0.2, 1], delay: 0.2 }}
          />
        </svg>
        {/* travelling impulse */}
        <motion.div
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_6px_rgba(94,242,194,0.7)]"
          initial={{ left: '0%', opacity: 0 }}
          animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, ease: [0.45, 0, 0.2, 1], delay: 0.2 }}
        />
      </div>

      <motion.div
        className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.45em] text-gray-500 sm:text-xs"
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.45em' }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        neuroscience <span className="text-brand-mint">×</span> computer science
      </motion.div>

      {/* boot log */}
      <div className="absolute bottom-8 left-6 space-y-1 font-mono text-[11px] text-gray-500 sm:left-10">
        {BOOT.slice(0, line).map((b, i) => (
          <motion.div key={b} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex gap-2">
            <span className="text-brand-mint">{'>'}</span>
            {b}
            <span className={i === BOOT.length - 1 ? 'text-brand-mint' : 'text-gray-700'}>{i === BOOT.length - 1 ? '✓' : '...ok'}</span>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-8 right-6 font-mono text-[11px] text-gray-700 sm:right-10">v2026.10</div>
    </motion.div>
  )
}

/* ───────────────── Scroll progress + back to top ───────────────── */
export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [show, setShow] = useState(false)
  useEffect(() => scrollY.on('change', (v) => setShow(v > 800)), [scrollY])
  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-brand-blue via-brand-purple to-brand-mint"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-white"
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

/* ───────────────── Ambient background: faint circuitry + neural glow ───────────────── */
export function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-[20%] -top-[20%] h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(109,156,255,0.10),transparent_60%)]" />
      <div
        className="absolute -bottom-[25%] -right-[15%] h-[65vmax] w-[65vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(94,242,194,0.07),transparent_60%)]"
        style={{ animationDelay: '-9s' }}
      />
      <div className="circuit-bg absolute inset-0 opacity-[0.5]" />
      <div className="absolute inset-0 noise opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}
