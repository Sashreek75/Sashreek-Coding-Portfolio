import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { NeuralField } from '../components/NeuralField'
import { SplitText, RotatingWords, Magnetic, Marquee, ScrollWords, Reveal, CountUp, SectionLabel, TiltCard } from '../components/motion'
import { EASE } from '../lib/ease'
import { ProjectCard, ProjectModal, StatusPill } from '../components/ProjectBits'
import { SynapseViz } from '../components/Visuals'
import { PROJECTS, TIMELINE } from '../data'
import type { Project } from '../data'

const CHIPS = [
  { t: 'Stanford research', x: '8%', y: '24%', d: 1.2 },
  { t: 'React Native', x: '82%', y: '20%', d: 0.6 },
  { t: 'Agentic AI', x: '86%', y: '66%', d: 1.4 },
  { t: 'Cognitive science', x: '5%', y: '70%', d: 0.9 },
  { t: 'Founder @ Synapse', x: '70%', y: '84%', d: 1.1 },
]

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 220])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const onMove = (e: MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <section ref={ref} onMouseMove={onMove} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <NeuralField className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#07080c_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-surface to-transparent" />

      {/* floating chips with parallax */}
      {CHIPS.map((c, i) => (
        <FloatingChip key={c.t} chip={c} sx={sx} sy={sy} depth={(i % 3) + 1} />
      ))}

      <motion.div style={{ y, scale, opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-gray-300 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Student, founder, researcher. Usually building something.
        </motion.div>

        <h1 className="font-display text-[15vw] font-bold leading-[0.9] tracking-[-0.05em] text-white sm:text-8xl md:text-[9rem]">
          <SplitText text="Hi, I'm" delay={0.2} stagger={0.04} />
          <br />
          <span className="text-gradient">
            <SplitText text="Sashreek." delay={0.5} stagger={0.05} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          className="mx-auto mt-10 max-w-3xl text-xl leading-snug text-gray-300 md:text-3xl"
        >
          I build things that help people{' '}
          <RotatingWords
            className="font-medium text-white"
            words={['actually follow through.', 'stay calm in an emergency.', 'understand why they\'re stuck.', 'skip the busywork.']}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-semibold text-dark-surface"
            >
              <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative transition-colors group-hover:text-white">See what I'm building</span>
              <ArrowRight size={16} className="relative transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/5">
              The longer story
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <motion.span className="h-2 w-1 rounded-full bg-white" animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
        </div>
        <span className="label text-[9px]">scroll</span>
      </motion.div>
    </section>
  )
}

function FloatingChip({
  chip,
  sx,
  sy,
  depth,
}: {
  chip: (typeof CHIPS)[number]
  sx: ReturnType<typeof useSpring>
  sy: ReturnType<typeof useSpring>
  depth: number
}) {
  const x = useTransform(sx, (v) => v * depth * -40)
  const y = useTransform(sy, (v) => v * depth * -40)
  return (
    <motion.div className="pointer-events-none absolute z-[5] hidden lg:block" style={{ left: chip.x, top: chip.y, x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{ opacity: { delay: chip.d + 0.6 }, scale: { delay: chip.d + 0.6, type: 'spring' }, y: { duration: 4 + depth, repeat: Infinity, ease: 'easeInOut' } }}
        className="glass rounded-full px-4 py-2 font-mono text-[11px] text-gray-300"
      >
        {chip.t}
      </motion.div>
    </motion.div>
  )
}

function Band() {
  const names = ['Synapse Adaptive', 'DISCERN', 'NeuroLabs', 'Compliance Watchdog', 'Universal Tech Movement']
  return (
    <section className="relative -rotate-2 border-y border-white/[0.06] bg-dark-muted/60 py-6 backdrop-blur">
      <Marquee baseVelocity={-2.5}>
        {names.map((n) => (
          <span key={n} className="flex items-center font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
            <span className="px-8">{n}</span>
            <Sparkles className="text-brand-purple" size={28} />
          </span>
        ))}
      </Marquee>
      <Marquee baseVelocity={2.5} className="mt-3">
        {['curious', 'building', 'researching', 'shipping', 'learning', 'breaking things', 'fixing them'].map((n) => (
          <span key={n} className="text-outline px-8 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {n} ·
          </span>
        ))}
      </Marquee>
    </section>
  )
}

function Intro() {
  return (
    <section className="px-6 py-32 md:py-44">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="01">Who I am</SectionLabel>
        <ScrollWords
          className="font-display text-3xl font-medium leading-[1.25] tracking-tight text-white md:text-5xl"
          text="I'm a high school student who can't stop building. Right now that means a *startup,* *Stanford* research on why people get stuck, and an app that helps someone through a *seizure.* The thread through all of it? I care about the gap between knowing what to do and actually doing it."
        />
      </div>
    </section>
  )
}

function Featured({ onOpen }: { onOpen: (p: Project) => void }) {
  const synapse = PROJECTS[0]
  const rest = PROJECTS.slice(1, 3)
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="02">Right now</SectionLabel>
            <h2 className="text-5xl md:text-7xl">
              <SplitText text="What I'm working on" inView stagger={0.02} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-white">
              Everything I've done
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-dark-surface">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Hero card */}
        <Reveal y={80}>
          <TiltCard glow={synapse.accent} max={3} onClick={() => onOpen(synapse)} className="card-border cursor-pointer overflow-hidden rounded-[2rem] bg-dark-card/70">
            <div className="grid items-stretch gap-0 lg:grid-cols-2">
              <div className="relative flex flex-col justify-between p-8 md:p-12">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-amber/10 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusPill p={synapse} />
                    <span className="font-mono text-xs text-gray-500">{synapse.dates}</span>
                  </div>
                  <h3 className="mt-6 text-5xl md:text-6xl">{synapse.title}</h3>
                  <p className="mt-2 font-medium text-brand-amber">Founder</p>
                  <p className="mt-6 text-2xl leading-snug text-white">{synapse.tagline}</p>
                  <p className="mt-5 leading-relaxed text-gray-400">{synapse.summary}</p>
                </div>
                <div className="relative mt-10 flex items-center gap-3 text-sm font-medium text-white">
                  Read more
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-dark-surface transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
              <div className="h-80 p-3 lg:h-auto lg:min-h-[480px]">
                <SynapseViz big />
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onOpen={() => onOpen(p)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { to: 3000, suffix: '+', label: 'applicants for Ladders for Leaders. I was one of the ones picked.' },
    { to: 5000, prefix: '$', suffix: '+', label: 'saved at Compliance Watchdog by automating provider checks.' },
    { to: 50, suffix: '%+', label: 'less time spent on verification once the agent took over.' },
    { to: 3, label: 'things I\'m building at once. Probably too many. Not stopping.' },
  ]
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1} y={30} blur={false} className="group relative bg-dark-surface p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/0 to-brand-purple/0 transition-colors duration-700 group-hover:from-brand-blue/[0.06] group-hover:to-brand-purple/[0.04]" />
            <div className="relative font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="relative mt-4 text-sm leading-relaxed text-gray-500">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Journey() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  useEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-12 w-full max-w-7xl px-6">
          <SectionLabel index="03">How I got here</SectionLabel>
          <h2 className="text-5xl md:text-7xl">From Flappy Bird to Stanford</h2>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {TIMELINE.map((t, i) => (
            <div key={i} className="card-border group relative flex h-[340px] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-dark-card/70 p-8 sm:w-[420px]">
              <div className="absolute -right-6 -top-10 font-display text-[9rem] font-bold leading-none text-white/[0.03] transition-colors duration-700 group-hover:text-brand-blue/10">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="relative font-mono text-sm text-brand-blue">{t.when}</div>
              <div className="relative">
                <h3 className="text-3xl">{t.title}</h3>
                <p className="mt-4 leading-relaxed text-gray-400">{t.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
        <div className="mx-auto mt-12 w-full max-w-7xl px-6">
          <div className="h-px w-full bg-white/10">
            <motion.div className="h-px origin-left bg-gradient-to-r from-brand-blue to-brand-purple" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="px-6 py-32 md:py-44">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/[0.07] px-6 py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#6d9cff33,#b477ff33,#ffb36b22,#6d9cff33)] blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        </div>
        <Reveal>
          <span className="label">Open to collaborations</span>
        </Reveal>
        <h2 className="mx-auto mt-6 max-w-4xl text-5xl leading-[1.02] md:text-8xl">
          <SplitText text="Let's make something" inView stagger={0.025} />{' '}
          <span className="text-gradient">
            <SplitText text="real." inView delay={0.5} />
          </span>
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-gray-400">Research, a startup idea, an internship, or you just want to nerd out about cognitive science. I'm in.</p>
        </Reveal>
        <Reveal delay={0.45} className="mt-12">
          <Magnetic strength={0.5}>
            <Link
              to="/contact"
              className="group relative inline-flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-semibold text-dark-surface md:h-44 md:w-44"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple transition-transform duration-500 ease-out group-hover:scale-100" />
              <span className="relative flex flex-col items-center gap-1 transition-colors group-hover:text-white">
                Get in touch
                <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <>
      <Hero />
      <Band />
      <Intro />
      <Featured onOpen={setOpen} />
      <Stats />
      <Journey />
      <CTA />
      <ProjectModal p={open} onClose={() => setOpen(null)} />
    </>
  )
}
