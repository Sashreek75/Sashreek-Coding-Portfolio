import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../data'
import { ProjectVisual } from './Visuals'
import { InstitutionMark } from './InstitutionMark'
import { TiltCard } from './motion'
import { EASE } from '../lib/ease'

export function StatusPill({ p }: { p: Project }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-gray-300 backdrop-blur">
      <span className="relative flex h-1.5 w-1.5">
        {p.status !== 'Done' && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: p.accent }} />}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
      </span>
      {p.status}
    </span>
  )
}

export function ProjectCard({ p, onOpen, index = 0 }: { p: Project; onOpen: () => void; index?: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
    >
      <TiltCard glow={p.accent} onClick={onOpen} className="card-border h-full cursor-pointer overflow-hidden rounded-3xl bg-dark-card/70" max={6}>
        <div className="relative h-64 overflow-hidden p-3 md:h-72">
          <div className="h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <ProjectVisual kind={p.visual} />
          </div>
        </div>
        <div className="relative p-6 pt-3 md:p-7 md:pt-4">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <StatusPill p={p} />
            <span className="font-mono text-[11px] text-gray-500">{p.dates}</span>
          </div>
          <h3 className="text-2xl md:text-[1.7rem]">{p.title}</h3>
          <div className="mt-1 text-sm font-medium" style={{ color: p.accent }}>
            {p.role}
            {p.org && <span className="text-gray-500"> · {p.org}</span>}
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-400">{p.tagline}</p>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {p.tags.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[11px] text-gray-500">
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
  )
}

export function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [p, onClose])

  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal
            aria-label={p.title}
            className="card-border relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-xl bg-[#0c0e15] md:rounded-xl"
            initial={{ y: 120, opacity: 0, scale: 0.94, rotateX: 10 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ y: 80, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            style={{ transformPerspective: 1200 }}
          >
            <button
              onClick={onClose}
              className="glass absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:rotate-90"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="h-72 p-3 md:h-96">
              <ProjectVisual kind={p.visual} big />
            </div>
            <div className="p-6 md:p-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-wrap items-center gap-3">
                <StatusPill p={p} />
                {p.badge && <InstitutionMark name={p.badge} src="/logos/stanford.png" />}
                <span className="font-mono text-xs text-gray-500">{p.dates}</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-4xl md:text-5xl">
                {p.title}
              </motion.h2>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-2 font-medium" style={{ color: p.accent }}>
                {p.role}
                {p.org && <span className="text-gray-500"> · {p.org}</span>}
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 text-lg leading-relaxed text-gray-300">
                {p.summary}
              </motion.p>
              <ul className="mt-8 space-y-3">
                {p.points.map((pt, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.07, ease: EASE }}
                    className="flex gap-4 text-[15px] leading-relaxed text-gray-400"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                    {pt}
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-sm border border-white/10 px-2.5 py-1 font-mono text-[11px] text-gray-400">
                    {t}
                  </span>
                ))}
              </motion.div>
              {p.note && <p className="mt-6 text-xs text-gray-600">{p.note}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
