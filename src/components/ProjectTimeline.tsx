import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data'
import type { Project } from '../data'
import { TiltCard } from './motion'
import { InstitutionMark } from './InstitutionMark'
import { ProjectModal, StatusPill } from './ProjectBits'
import { EASE } from '../lib/ease'
import { cn } from '../lib/utils'

/**
 * The "axon": a white stem that grows as you scroll. Each project sprouts
 * from it on a dendrite-like branch, and the node fires when you reach it.
 */
export function ProjectTimeline({ detailed = false }: { detailed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Project | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 65%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const clip = useTransform(progress, (v) => `inset(0 0 ${Math.max(0, 100 - v * 100)}% 0)`)
  const tip = useTransform(progress, (v) => `${Math.min(100, v * 100)}%`)

  return (
    <div ref={ref} className="relative">
      {/* stem track */}
      <div className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-white/[0.07] md:left-1/2" />
      {/* grown stem with impulses travelling down it */}
      <motion.div className="absolute bottom-0 left-5 top-0 w-[3px] -translate-x-1/2 md:left-1/2" style={{ clipPath: clip }}>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white/70 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 h-24 w-[5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-brand-mint to-transparent"
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: i * 1.5 }}
          />
        ))}
      </motion.div>
      {/* growing tip */}
      <motion.div className="pointer-events-none absolute left-5 z-20 -translate-x-1/2 -translate-y-1/2 md:left-1/2" style={{ top: tip }}>
        <span className="block h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.55),0_0_50px_16px_rgba(94,242,194,0.25)]" />
      </motion.div>

      {/* origin */}
      <div className="relative flex items-center pb-16 pl-14 md:justify-center md:pl-0">
        <span className="absolute left-5 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-white md:left-1/2" />
        <span className="relative z-30 mt-6 rounded-full border border-white/10 bg-dark-surface px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-400 md:mt-8">
          newest first
        </span>
      </div>

      <div className="space-y-20 md:space-y-28">
        {PROJECTS.map((p, i) => (
          <Branch key={p.id} p={p} side={i % 2 === 0 ? 'right' : 'left'} detailed={detailed} onOpen={() => setOpen(p)} />
        ))}
      </div>

      {/* end of the axon */}
      <div className="relative pb-4 pl-14 pt-24 md:pl-0 md:text-center">
        <motion.span
          className="absolute left-5 top-24 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white md:left-1/2"
          animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0.5)', '0 0 0 14px rgba(255,255,255,0)'] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <div className="pt-10 font-mono text-sm text-gray-500">
          <span className="text-brand-mint">{'>'}</span> next_project.load()
          <motion.span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-brand-mint" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
        </div>
      </div>

      <ProjectModal p={open} onClose={() => setOpen(null)} />
    </div>
  )
}

function Branch({ p, side, detailed, onOpen }: { p: Project; side: 'left' | 'right'; detailed: boolean; onOpen: () => void }) {
  const right = side === 'right'
  return (
    <motion.div
      className="relative grid md:grid-cols-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-25% 0px -25% 0px' }}
    >
      {/* synapse node on the stem */}
      <motion.div
        className="absolute left-5 top-[86px] z-10 -translate-x-1/2 md:left-1/2"
        variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 500, damping: 15 } } }}
      >
        <span className="relative block h-4 w-4 rounded-full border-2 border-dark-surface" style={{ background: p.accent, boxShadow: `0 0 18px ${p.accent}` }}>
          <motion.span
            className="absolute -inset-1 rounded-full"
            style={{ border: `1px solid ${p.accent}` }}
            animate={{ scale: [1, 2.6], opacity: [0.8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        </span>
      </motion.div>

      {/* dendrite branch */}
      <svg
        viewBox="0 0 100 120"
        className={cn(
          'absolute left-5 top-[94px] h-[110px] w-9 overflow-visible md:h-[120px] md:w-24',
          !right && 'md:left-auto md:right-1/2 md:-scale-x-100',
          right && 'md:left-1/2',
        )}
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M0 0 C 40 0, 45 60, 100 60"
          fill="none"
          stroke="white"
          strokeOpacity="0.85"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.7, ease: EASE, delay: 0.1 } } }}
        />
        {/* little spines off the branch */}
        <motion.path
          d="M38 22 C 48 18, 52 8, 62 6"
          fill="none"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, delay: 0.5 } } }}
        />
        <motion.path
          d="M55 50 C 60 70, 70 88, 82 96"
          fill="none"
          stroke="white"
          strokeOpacity="0.25"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, delay: 0.6 } } }}
        />
        <motion.circle
          cx="100"
          cy="60"
          r="3"
          fill={p.accent}
          variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: 0.75, type: 'spring' } } }}
        />
      </svg>

      {/* date, on the far side of the stem (desktop) */}
      <motion.div
        className={cn('hidden pt-[70px] md:block', right ? 'col-start-1 row-start-1 pr-20 text-right' : 'col-start-2 row-start-1 pl-20')}
        variants={{ hidden: { opacity: 0, x: right ? 30 : -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.3 } } }}
      >
        <div className="font-mono text-sm" style={{ color: p.accent }}>
          {p.dates}
        </div>
        <div className="mt-2 font-display text-5xl font-bold tracking-tight text-white/[0.07] lg:text-6xl">{p.kicker}</div>
      </motion.div>

      {/* card */}
      <motion.div
        className={cn('pl-14', right ? 'md:col-start-2 md:row-start-1 md:pl-24' : 'md:col-start-1 md:row-start-1 md:pl-0 md:pr-24')}
        variants={{
          hidden: { opacity: 0, x: right ? 60 : -60, filter: 'blur(12px)' },
          show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE, delay: 0.45 } },
        }}
      >
        <TiltCard glow={p.accent} max={4} onClick={onOpen} className="card-border cursor-pointer overflow-hidden rounded-3xl bg-dark-card/80">
          {/* generated image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/10 to-transparent" />
            {/* scan line on hover */}
            <div
              className="absolute inset-x-0 h-24 -translate-y-full opacity-0 transition-none group-hover:animate-[scan_1.8s_ease-in-out_infinite] group-hover:opacity-100"
              style={{ background: `linear-gradient(to bottom, transparent, ${p.accent}33, transparent)` }}
            />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-gray-200 backdrop-blur">
                {p.kicker}
              </span>
              {p.badge && <InstitutionMark name={p.badge} src="/logos/stanford.png" />}
            </div>
            <div className="absolute bottom-3 left-5 md:hidden">
              <span className="font-mono text-xs" style={{ color: p.accent }}>
                {p.dates}
              </span>
            </div>
          </div>

          <div className="relative p-6 md:p-7">
            <div className="mb-3">
              <StatusPill p={p} />
            </div>
            <h3 className="text-2xl leading-tight md:text-3xl">{p.title}</h3>
            <div className="mt-1.5 text-sm font-medium" style={{ color: p.accent }}>
              {p.role}
              {p.org && <span className="text-gray-500"> · {p.org}</span>}
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-300">{p.tagline}</p>
            {detailed && <p className="mt-3 text-sm leading-relaxed text-gray-500">{p.summary}</p>}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {p.tags.slice(0, detailed ? 4 : 3).map((t) => (
                  <span key={t} className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-gray-500">
                    {t}
                  </span>
                ))}
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-dark-surface">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </motion.div>
  )
}
