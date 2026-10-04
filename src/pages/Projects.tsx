import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data'
import type { Project, Category } from '../data'
import { SplitText, Reveal, TiltCard } from '../components/motion'
import { EASE } from '../lib/ease'
import { ProjectCard, ProjectModal, StatusPill } from '../components/ProjectBits'
import { ProjectVisual } from '../components/Visuals'
import { cn } from '../lib/utils'

const FILTERS: ('All' | Category)[] = ['All', 'Building', 'Research', 'Work']

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [open, setOpen] = useState<Project | null>(null)
  const hero = PROJECTS[0]
  const list = PROJECTS.slice(1).filter((p) => filter === 'All' || p.category === filter)
  const showHero = filter === 'All' || filter === hero.category

  return (
    <div className="px-6 pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal y={16}>
              <span className="label">Projects & activities · {PROJECTS.length}</span>
            </Reveal>
            <h1 className="mt-6 text-6xl leading-[0.95] md:text-8xl">
              <SplitText text="Stuff I've" stagger={0.03} />
              <br />
              <span className="text-gradient">
                <SplitText text="built & done." delay={0.3} stagger={0.03} />
              </span>
            </h1>
          </div>
          <Reveal delay={0.5} className="md:col-span-4">
            <p className="text-lg leading-relaxed text-gray-400">
              A startup, a research project, an emergency app, and two internships. Click anything to dig in.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.6} y={20} className="mb-10">
          <LayoutGroup>
            <div className="inline-flex flex-wrap gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn('relative rounded-full px-5 py-2 text-sm font-medium transition-colors', filter === f ? 'text-dark-surface' : 'text-gray-400 hover:text-white')}
                >
                  {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        {/* Hero card */}
        <AnimatePresence mode="popLayout">
          {showHero && (
            <motion.div
              key="hero"
              layout
              initial={{ opacity: 0, y: 80, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="mb-6"
            >
              <TiltCard glow={hero.accent} max={2.5} onClick={() => setOpen(hero)} className="card-border cursor-pointer overflow-hidden rounded-[2rem] bg-dark-card/70">
                <div className="relative grid lg:grid-cols-12">
                  {/* animated gradient wash */}
                  <motion.div
                    className="pointer-events-none absolute -inset-1/2 opacity-60"
                    style={{ background: 'conic-gradient(from 0deg at 30% 40%, #ffb36b14, transparent 25%, #6d9cff14 50%, transparent 75%, #ffb36b14)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="relative flex flex-col p-8 md:p-12 lg:col-span-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusPill p={hero} />
                      <span className="rounded-full bg-brand-amber/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-amber">Featured</span>
                    </div>
                    <h2 className="mt-8 text-5xl leading-none md:text-7xl">
                      Synapse
                      <br />
                      <span className="text-gray-500">Adaptive</span>
                    </h2>
                    <p className="mt-6 text-2xl leading-snug text-white">{hero.tagline}</p>
                    <p className="mt-5 leading-relaxed text-gray-400">{hero.summary}</p>
                    <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-6">
                      {[
                        ['Role', 'Founder'],
                        ['Since', 'Jul 2026'],
                        ['Platform', 'Desktop'],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <div className="label text-[9px]">{k}</div>
                          <div className="mt-1 text-sm text-white">{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center gap-3 pt-10 text-sm font-medium text-white">
                      How it works
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-dark-surface transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                  <div className="relative h-96 p-3 lg:col-span-7 lg:h-auto lg:min-h-[560px]">
                    <ProjectVisual kind="synapse" big />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} onOpen={() => setOpen(p)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/10 p-10 text-center">
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
              animate={{ x: ['-100%', '400%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
            />
            <div className="relative font-display text-2xl text-white">There's always something new in the works.</div>
            <p className="relative mt-2 text-gray-500">The rough versions live on my GitHub first.</p>
          </div>
        </Reveal>
      </div>
      <ProjectModal p={open} onClose={() => setOpen(null)} />
    </div>
  )
}
