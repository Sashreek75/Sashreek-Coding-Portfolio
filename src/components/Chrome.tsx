import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { EASE } from '../lib/ease'

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

/* ───────────────── Preloader ───────────────── */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      onDone()
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1500
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  const words = ['curious', 'building', 'shipping', 'hi.']
  const wi = Math.min(words.length - 1, Math.floor(n / 26))
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#05060a]"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative flex h-16 items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={wi}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-display text-4xl font-semibold text-white md:text-5xl"
          >
            {words[wi]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
        <motion.div className="h-full bg-gradient-to-r from-brand-blue to-brand-purple" style={{ width: `${n}%` }} />
      </div>
      <div className="absolute bottom-8 right-8 font-display text-7xl font-bold text-white/10 md:text-9xl">{n}</div>
      <div className="absolute bottom-10 left-8 label">Sashreek Pinjala</div>
    </motion.div>
  )
}

/* ───────────────── Scroll progress + back to top ───────────────── */
export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [show, setShow] = useState(false)
  useEffect(() => scrollY.on('change', (v) => setShow(v > 600)), [scrollY])
  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-brand-blue via-brand-purple to-brand-amber"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 90 }}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white"
            aria-label="Back to top"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
              <motion.circle cx="24" cy="24" r="22" fill="none" stroke="url(#pg)" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
              <defs>
                <linearGradient id="pg">
                  <stop offset="0" stopColor="#6d9cff" />
                  <stop offset="1" stopColor="#b477ff" />
                </linearGradient>
              </defs>
            </svg>
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

/* ───────────────── Ambient background ───────────────── */
export function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-[20%] -top-[20%] h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(109,156,255,0.13),transparent_60%)]" />
      <div
        className="absolute -bottom-[25%] -right-[15%] h-[65vmax] w-[65vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(180,119,255,0.12),transparent_60%)]"
        style={{ animationDelay: '-9s' }}
      />
      <div className="absolute inset-0 noise opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}
