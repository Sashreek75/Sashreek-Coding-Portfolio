import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShieldCheck, Clock, Camera, Phone } from 'lucide-react'
import type { Visual } from '../data'
import { EASE } from '../lib/ease'

function useCycle(steps: number, ms: number) {
  const [s, setS] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setS((p) => (p + 1) % steps), ms)
    return () => clearInterval(t)
  }, [steps, ms])
  return s
}

/* ───────────── Synapse: desktop with the orb at the edge ───────────── */
export function SynapseViz({ big = false }: { big?: boolean }) {
  // 0 quiet · 1 drift to youtube · 2 orb asks · 3 countdown · 4 tab closed
  const step = useCycle(5, 1900)
  const asking = step === 2 || step === 3
  const onYT = step >= 1 && step <= 3
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d14]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        <div className="ml-3 flex-1 overflow-hidden rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-gray-500">
          <AnimatePresence mode="wait">
            <motion.span
              key={step === 4 ? 'closed' : onYT ? 'yt' : 'doc'}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              className="block"
            >
              {step === 4 ? 'docs.google.com — research paper' : onYT ? 'youtube.com/watch?v=…' : 'docs.google.com — research paper'}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* page content */}
      <div className="relative p-5">
        <AnimatePresence mode="wait">
          {onYT ? (
            <motion.div key="yt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }} className="space-y-3">
              <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-rose-500/20 to-orange-400/10" />
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-10 flex-1 rounded-md bg-white/[0.04]" />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="doc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2.5">
              <div className="h-4 w-1/2 rounded bg-white/[0.12]" />
              {[92, 84, 96, 70, 88, 60].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-2.5 rounded bg-white/[0.05]"
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                />
              ))}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] text-emerald-300"
                >
                  <Check size={12} /> Tab closed. Back to it.
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The orb */}
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-3">
        <AnimatePresence>
          {asking && (
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className={`glass rounded-2xl p-3.5 text-left shadow-2xl ${big ? 'w-64' : 'w-52'}`}
            >
              <p className="text-[12px] leading-snug text-white">
                You're working on your research paper. <span className="text-brand-amber">Why YouTube?</span>
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-gray-300">Allow 10 min</span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-gray-300">Block</span>
              </div>
              {step === 3 && (
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full bg-brand-amber" initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 1.9, ease: 'linear' }} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative h-11 w-11 shrink-0">
          <motion.div
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#9fc0ff,#3c62c9_45%,#ff9a4d_95%)]"
            animate={{ scale: asking ? 1.15 : [1, 1.06, 1] }}
            transition={asking ? { type: 'spring' } : { duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-2 rounded-full border border-brand-amber/40"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <div className="absolute -inset-4 rounded-full bg-brand-blue/20 blur-xl" />
        </div>
      </div>
    </div>
  )
}

/* ───────────── DISCERN: find the bottleneck ───────────── */
const BOTTLENECKS = ['Unclear goal', 'Overload', 'Distraction', 'Bad timing', 'Competing priorities', 'Not learning']
export function DiscernViz() {
  const pick = useCycle(6, 2200)
  const R = 38
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0f10]">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {BOTTLENECKS.map((_, i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 2
          const x = 50 + Math.cos(a) * R
          const y = 50 + Math.sin(a) * R
          return (
            <motion.line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke={i === pick ? '#5ef2c2' : 'rgba(255,255,255,0.08)'}
              strokeWidth={i === pick ? 0.6 : 0.3}
              initial={false}
              animate={{ pathLength: i === pick ? [0, 1] : 1 }}
              transition={{ duration: 0.6 }}
            />
          )
        })}
        {/* scanning sweep */}
        <motion.g style={{ originX: '50px', originY: '50px' }} animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
          <path d="M50 50 L50 8 A42 42 0 0 1 80 20 Z" fill="url(#sweep)" />
        </motion.g>
        <defs>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5ef2c2" stopOpacity="0.18" />
            <stop offset="1" stopColor="#5ef2c2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      {BOTTLENECKS.map((b, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2
        const x = 50 + Math.cos(a) * R
        const y = 50 + Math.sin(a) * R
        const on = i === pick
        return (
          <motion.div
            key={b}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ scale: on ? 1.12 : 1 }}
          >
            <div
              className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-medium transition-colors duration-500 ${
                on ? 'border-brand-mint/60 bg-brand-mint/15 text-brand-mint shadow-[0_0_24px_rgba(94,242,194,0.35)]' : 'border-white/10 bg-black/40 text-gray-500'
              }`}
            >
              {b}
            </div>
          </motion.div>
        )
      })}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <motion.div
          className="h-12 w-12 rounded-full border border-brand-mint/50 bg-brand-mint/10"
          animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 0px #5ef2c200', '0 0 30px #5ef2c255', '0 0 0px #5ef2c200'] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-brand-mint/80">diagnose</div>
      </div>
    </div>
  )
}

/* ───────────── NeuroLabs: phone with the big button ───────────── */
const STEPS = ['Stay with them', 'Time it', 'Turn them on their side', 'Nothing in their mouth']
export function NeuroViz() {
  const [mode, setMode] = useState<'idle' | 'active'>('idle')
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const t = setInterval(() => {
      setMode((m) => (m === 'idle' ? 'active' : 'idle'))
      setSecs(0)
    }, 5200)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    if (mode !== 'active') return
    const t = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [mode])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-[#100a0d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,107,139,0.18),transparent_60%)]" />
      <motion.div
        className="relative h-[86%] max-h-[340px] aspect-[9/18] rounded-[2rem] border-[5px] border-[#22242c] bg-black p-3 shadow-2xl"
        initial={{ rotate: -4, y: 10 }}
        animate={{ rotate: [-4, 2, -4], y: [10, 0, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#22242c]" />
        <AnimatePresence mode="wait">
          {mode === 'idle' ? (
            <motion.div key="idle" className="flex h-[85%] flex-col items-center justify-center" exit={{ opacity: 0, scale: 0.9 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative flex items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute h-24 w-24 rounded-full border border-brand-rose/50"
                    animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
                  />
                ))}
                <motion.div
                  className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-[#ff6b8b] to-[#d93b5e] text-[11px] font-bold tracking-wider text-white shadow-[0_0_40px_rgba(255,107,139,0.5)]"
                  animate={{ scale: [1, 0.94, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity }}
                >
                  SEIZURE
                </motion.div>
              </div>
              <div className="mt-8 text-center text-[9px] text-gray-500">Tap if a seizure is happening</div>
            </motion.div>
          ) : (
            <motion.div key="active" className="flex h-[85%] flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between text-[8px] text-gray-500">
                <span className="flex items-center gap-1 text-brand-rose">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-rose" /> Seizure mode
                </span>
                <Camera size={10} />
              </div>
              <div className="mt-3 text-center font-mono text-3xl font-semibold tabular-nums text-white">
                {mm}:{ss}
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[8px] text-gray-500">
                <Clock size={8} /> call for help at 05:00
              </div>
              <div className="mt-4 space-y-1.5">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.35 }}
                    className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-2 py-1.5 text-[9px] text-gray-200"
                  >
                    <motion.span
                      className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.35, type: 'spring' }}
                    >
                      <Check size={7} />
                    </motion.span>
                    {s}
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-center gap-1 rounded-lg bg-brand-rose/90 py-1.5 text-[9px] font-semibold text-white">
                <Phone size={9} /> Call 911
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/* ───────────── Compliance Watchdog: verification pipeline ───────────── */
const CHECKS = ['NPI registry', 'OIG exclusions', 'SAM.gov', 'State license']
export function VerifyViz() {
  const step = useCycle(CHECKS.length + 2, 1100)
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0c14] p-6">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">agent · provider #2481</span>
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-brand-blue"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
      <div className="relative space-y-2.5">
        {CHECKS.map((c, i) => {
          const done = step > i
          const running = step === i
          return (
            <div key={c} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300 ${done ? 'bg-brand-blue text-dark-surface' : 'bg-white/[0.06] text-gray-600'}`}>
                {done ? (
                  <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}>
                    <Check size={13} strokeWidth={3} />
                  </motion.span>
                ) : running ? (
                  <motion.span className="h-3 w-3 rounded-full border-2 border-brand-blue border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                ) : (
                  <span className="text-[10px]">{i + 1}</span>
                )}
              </div>
              <span className={`flex-1 text-xs ${done ? 'text-white' : 'text-gray-500'}`}>{c}</span>
              <div className="h-1 w-16 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div className="h-full bg-brand-blue" animate={{ width: done ? '100%' : running ? '60%' : '0%' }} transition={{ duration: 0.6 }} />
              </div>
            </div>
          )
        })}
      </div>
      <AnimatePresence>
        {step >= CHECKS.length && (
          <motion.div
            initial={{ opacity: 0, scale: 1.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="absolute bottom-6 right-6 flex items-center gap-1.5 rounded-lg border-2 border-emerald-400/70 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-emerald-300"
          >
            <ShieldCheck size={14} /> Verified
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───────────── UTM: 3,000+ applicants → 1 ───────────── */
export function UtmViz() {
  const step = useCycle(2, 3200)
  const dots = Array.from({ length: 120 })
  const chosen = 67
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0a14] p-6">
      <div className="grid grid-cols-12 gap-2.5">
        {dots.map((_, i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full"
            animate={
              i === chosen
                ? { scale: step ? 2.2 : 1, backgroundColor: step ? '#b477ff' : 'rgba(255,255,255,0.25)', boxShadow: step ? '0 0 20px #b477ff' : '0 0 0px #b477ff' }
                : { opacity: step ? 0.08 : 0.35, scale: step ? 0.6 : 1, backgroundColor: 'rgba(255,255,255,1)' }
            }
            transition={{ duration: 0.8, delay: step ? (i % 12) * 0.02 + Math.floor(i / 12) * 0.02 : 0, ease: EASE }}
          />
        ))}
      </div>
      <motion.div
        className="absolute bottom-5 left-6 font-mono text-[10px] uppercase tracking-widest"
        animate={{ color: step ? '#b477ff' : '#6b7280' }}
      >
        {step ? '→ selected' : '3,000+ applicants'}
      </motion.div>
    </div>
  )
}

export function ProjectVisual({ kind, big }: { kind: Visual; big?: boolean }) {
  switch (kind) {
    case 'synapse':
      return <SynapseViz big={big} />
    case 'discern':
      return <DiscernViz />
    case 'neuro':
      return <NeuroViz />
    case 'verify':
      return <VerifyViz />
    case 'utm':
      return <UtmViz />
  }
}
