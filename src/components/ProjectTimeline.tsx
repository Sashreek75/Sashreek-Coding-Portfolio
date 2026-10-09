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
  const building = PROJECTS.filter((p) => p.phase === 'building')
  const built = PROJECTS.filter((p) => p.phase === 'built')

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

      <PhaseHeader
        kind="building"
        title="Building"
        code="// firing now"
        sub="What I'm working on right now. The signal's still travelling."
      />
      <div className="space-y-20 md:space-y-28">
        {building.map((p, i) => (
          <Branch key={p.id} p={p} fig={i + 1} side={i % 2 === 0 ? 'right' : 'left'} detailed={detailed} onOpen={() => setOpen(p)} />
        ))}
      </div>

      <PhaseHeader
        kind="built"
        title="Built"
        code="// consolidated to long-term memory"
        sub="Finished work: research, internships, and the projects that got me here."
      />
      <div className="space-y-20 md:space-y-28">
        {built.map((p, i) => (
          <Branch key={p.id} p={p} fig={i + 1 + building.length} side={(i + building.length) % 2 === 0 ? 'right' : 'left'} detailed={detailed} onOpen={() => setOpen(p)} />
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

function PhaseHeader({ kind, title, code, sub }: { kind: 'building' | 'built'; title: string; code: string; sub: string }) {
  const live = kind === 'building'
  const color = live ? '#5ef2c2' : '#6d9cff'
  return (
    <motion.div
      className="relative py-20 pl-14 md:pl-0 md:text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
    >
      {/* soma: a larger node where the phase begins */}
      <motion.span
        className="absolute left-5 top-[92px] z-30 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-dark-surface md:left-1/2 md:top-[86px]"
        style={{ borderColor: color, boxShadow: `0 0 24px ${color}66` }}
        variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 14 } } }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
        {[0, 1].map((k) => (
          <motion.span
            key={k}
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${color}` }}
            animate={{ scale: [1, live ? 2.8 : 2], opacity: [0.7, 0] }}
            transition={{ duration: live ? 1.4 : 3, repeat: Infinity, delay: k * (live ? 0.7 : 1.5), ease: 'easeOut' }}
          />
        ))}
      </motion.span>
      <motion.div
        className="relative z-20 inline-block rounded-3xl bg-dark-surface/90 px-6 py-4 backdrop-blur md:mt-10"
        variants={{ hidden: { opacity: 0, y: 30, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE, delay: 0.2 } } }}
      >
        <div className="font-mono text-xs" style={{ color }}>
          {code}
        </div>
        <h3 className="mt-2 font-display text-5xl font-bold tracking-tight md:text-7xl">
          {title}
          {live && (
            <motion.span className="ml-2 inline-block h-3 w-3 rounded-full align-middle" style={{ background: color }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          )}
        </h3>
        <p className="mt-3 max-w-md text-gray-400 md:mx-auto">{sub}</p>
      </motion.div>
    </motion.div>
  )
}

function Branch({ p, fig, side, detailed, onOpen }: { p: Project; fig: number; side: 'left' | 'right'; detailed: boolean; onOpen: () => void }) {
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
        {/* signal travelling from the stem into the card */}
        <circle r="3.5" fill="white" style={{ filter: `drop-shadow(0 0 6px ${p.accent})` }}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M0 0 C 40 0, 45 60, 100 60" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1" />
        </circle>
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
        className={cn('min-w-0 pl-14', right ? 'md:col-start-2 md:row-start-1 md:pl-24' : 'md:col-start-1 md:row-start-1 md:pl-0 md:pr-24')}
        variants={{
          hidden: { opacity: 0, x: right ? 60 : -60, filter: 'blur(12px)' },
          show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE, delay: 0.45 } },
        }}
      >
        <TiltCard glow={p.accent} max={4} onClick={onOpen} className="card-border cursor-pointer overflow-hidden rounded-xl bg-dark-card/80">
          {/* generated image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-110">
            <motion.img
              src={p.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
              variants={{
                hidden: { clipPath: 'inset(0 100% 0 0)', scale: 1.25 },
                show: { clipPath: 'inset(0 0% 0 0)', scale: 1, transition: { duration: 1.2, ease: EASE, delay: 0.55 } },
              }}
            />
            </div>
            {/* fine scanlines for a screen-like texture */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_3px)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/10 to-transparent" />
            {/* scan line on hover */}
            <div
              className="absolute inset-x-0 h-24 -translate-y-full opacity-0 transition-none group-hover:animate-[scan_1.8s_ease-in-out_infinite] group-hover:opacity-100"
              style={{ background: `linear-gradient(to bottom, transparent, ${p.accent}33, transparent)` }}
            />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-sm border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-gray-200 backdrop-blur">
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

          <div className="flex items-baseline gap-2 border-b border-white/[0.06] px-6 py-2.5 font-mono text-[10.5px] text-gray-500 md:px-7">
            <span className="shrink-0 whitespace-nowrap" style={{ color: p.accent }}>fig. {String(fig).padStart(2, '0')}</span>
            <span className="min-w-0 truncate">{p.figure}</span>
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
            <p className="mt-3 text-sm leading-relaxed text-gray-400">{p.summary}</p>
            {detailed && (
              <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                {p.points.slice(0, 3).map((pt, k) => (
                  <motion.li
                    key={k}
                    className="flex gap-3 text-[13px] leading-relaxed text-gray-400"
                    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { delay: 0.9 + k * 0.1, ease: EASE } } }}
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent, boxShadow: `0 0 8px ${p.accent}` }} />
                    {pt}
                  </motion.li>
                ))}
                {p.points.length > 3 && <li className="pl-[18px] font-mono text-[11px] text-gray-600">+{p.points.length - 3} more inside →</li>}
              </ul>
            )}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {p.tags.slice(0, detailed ? 4 : 3).map((t) => (
                  <span key={t} className="rounded-sm border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-gray-500">
                    {t}
                  </span>
                ))}
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 text-white transition-colors duration-200 group-hover:border-transparent group-hover:bg-brand-mint group-hover:text-dark-surface">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </motion.div>
  )
}
