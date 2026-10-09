import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FigReceptiveField, FigReflexArc, FigRaster, FigDendrites } from '../components/NeuroFigures'
import { SplitText, Reveal, TiltCard, SectionLabel, Magnetic } from '../components/motion'
import { EASE } from '../lib/ease'
import { TIMELINE } from '../data'

const BELIEFS = [
  {
    Fig: FigReceptiveField,
    color: '#6d9cff',
    title: 'Watch before you judge',
    body: "Understand what someone is actually doing before deciding what's wrong. The same behavior can be a distraction for one person and deep focus for another.",
    cap: 'receptive field: the center only fires on what lands inside',
  },
  {
    Fig: FigReflexArc,
    color: '#ffb36b',
    title: 'Deterministic where it matters',
    body: "When the stakes are high, I don't want a clever model improvising. Fixed rules on the critical path, flexibility everywhere else.",
    cap: 'reflex arc: same input, same pathway, every time',
  },
  {
    Fig: FigRaster,
    color: '#5ef2c2',
    title: 'Let ideas fail honestly',
    body: "I'd rather build a test my idea can genuinely fail than one that's rigged to pass. Negative results are still results.",
    cap: 'spike raster: the silent trial stays in the data',
  },
  {
    Fig: FigDendrites,
    color: '#b477ff',
    title: 'Everything connects',
    body: "Cognitive science, AI, business, sales. I'm into too many things, and my best ideas come from where the branches touch.",
    cap: 'dendritic tree: growth until two branches meet',
  },
]

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[11px] top-2 h-full w-px bg-white/[0.07] md:left-1/2" />
      <motion.div className="absolute left-[11px] top-2 h-full w-px origin-top bg-gradient-to-b from-brand-blue via-brand-purple to-brand-amber md:left-1/2" style={{ scaleY: h }} />
      <div className="space-y-14 md:space-y-20">
        {TIMELINE.map((t, i) => {
          const left = i % 2 === 0
          return (
            <div key={i} className="relative grid md:grid-cols-2 md:gap-16">
              <motion.span
                className="absolute left-[5px] top-2 z-10 h-[13px] w-[13px] rounded-full border-2 border-dark-surface bg-brand-blue md:left-1/2 md:-translate-x-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-30%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 14 }}
              >
                <motion.span className="absolute inset-0 rounded-full bg-brand-blue" animate={{ scale: [1, 2.4], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity }} />
              </motion.span>
              <motion.div
                className={`pl-10 md:pl-0 ${left ? 'md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4'}`}
                initial={{ opacity: 0, x: left ? -60 : 60, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <div className="font-mono text-sm text-brand-blue">{t.when}</div>
                <h3 className="mt-2 text-2xl md:text-3xl">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-400">{t.body}</p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Basketball() {
  // a bounce, plotted: each arc a little lower than the last
  const path = 'M10 110 Q 45 -10, 80 110 Q 108 20, 136 110 Q 158 50, 180 110 Q 196 75, 212 110 Q 222 95, 232 110'
  return (
    <svg viewBox="0 0 240 130" className="h-36 w-64" aria-hidden>
      <line x1="4" x2="236" y1="111" y2="111" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 4" />
      <motion.path
        d={path}
        fill="none"
        stroke="rgba(255,179,107,0.45)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      />
      <circle r="7" fill="#ff9a4d" style={{ filter: 'drop-shadow(0 0 8px rgba(255,154,77,0.6))' }}>
        <animateMotion dur="3.2s" repeatCount="indefinite" path={path} />
      </circle>
      <text x="6" y="126" className="fill-gray-500 font-mono text-[9px]">t →</text>
    </svg>
  )
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bigY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <div className="pb-32">
      {/* Header */}
      <section ref={heroRef} className="relative overflow-hidden px-6 pb-24 pt-36 md:pt-48">
        <motion.div style={{ y: bigY }} className="pointer-events-none absolute -right-10 top-24 select-none font-display text-[30vw] font-extrabold leading-none text-white/[0.025]">
          me.
        </motion.div>
        <div className="relative mx-auto max-w-7xl">
          <Reveal y={16}>
            <span className="label">About</span>
          </Reveal>
          <h1 className="mt-6 max-w-5xl text-5xl leading-[0.95] md:text-7xl">
            <SplitText text="The longer" stagger={0.03} />{' '}
            <span className="text-gradient">
              <SplitText text="version." delay={0.3} stagger={0.04} />
            </span>
          </h1>
          <div className="mt-16 grid gap-10 md:grid-cols-12">
            <Reveal delay={0.4} className="md:col-span-7">
              <div className="space-y-5 text-base leading-relaxed text-gray-300 md:text-[17px]">
                <p>
                  I'm Sashreek. I started coding in 2022 with a Flappy Bird clone that barely worked, and I've been building ever since. Somewhere along the way I realized the thing I actually care about isn't code. It's people, and why they do (or don't do) what they set out to do.
                </p>
                <p className="text-gray-400">
                  What pulls me in is where the brain and software overlap: attention, motivation, habits, and how people make decisions under pressure. I read about cognitive science the way some people follow sports, and then I try to build something with what I learn.
                </p>
                <p className="text-gray-400">I care about technology that respects how people actually think. It should be honest, calm when things get stressful, and earn its place in someone's day. Lately I've also gotten into the business side: how ideas become products, and how products become companies.</p>
              </div>
            </Reveal>
            <Reveal delay={0.55} className="md:col-span-5">
              <div className="card-border relative overflow-hidden rounded-xl bg-dark-card/70 p-8">
                <div className="label mb-6">Quick facts</div>
                <dl className="space-y-5">
                  {[
                    ['Into', 'Cognitive science'],
                    ['Also into', 'Human-centered AI'],
                    ['Thinking about', 'Attention & motivation'],
                    ['Building with', 'TypeScript & Python'],
                    ['Certified', 'PCEP (Python Institute)'],
                    ['Off-screen', 'Basketball'],
                  ].map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.07, ease: EASE }}
                      className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-gray-500">{k}</dt>
                      <dd className="text-right text-sm font-medium text-white">{v}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionLabel index="01">Timeline</SectionLabel>
          <h2 className="mb-20 text-5xl md:text-6xl">
            <SplitText text="How it's gone so far" inView stagger={0.02} />
          </h2>
          <Timeline />
        </div>
      </section>

      {/* Beliefs */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="02">What I care about</SectionLabel>
          <h2 className="mb-14 text-5xl md:text-6xl">
            <SplitText text="A few things I believe" inView stagger={0.02} />
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} y={50} className="min-w-0">
                <TiltCard glow={b.color} max={4} className="card-border h-full overflow-hidden rounded-xl bg-dark-card/70">
                  <div className="relative h-48 border-b border-white/[0.06] bg-[#090b11] px-6 py-4">
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="relative h-full">
                      <b.Fig color={b.color} />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 border-b border-white/[0.06] px-7 py-2.5 font-mono text-[10.5px] text-gray-500">
                    <span className="shrink-0 whitespace-nowrap" style={{ color: b.color }}>fig. {String.fromCharCode(65 + i)}</span>
                    <span className="min-w-0 truncate">{b.cap}</span>
                  </div>
                  <div className="p-7 md:p-8">
                    <h3 className="text-2xl">{b.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-400">{b.body}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Off the keyboard */}
      <section className="px-6 py-24">
        <Reveal className="mx-auto max-w-7xl">
          <div className="card-border relative grid items-center gap-10 overflow-hidden rounded-xl bg-dark-card/70 p-10 md:grid-cols-[auto_1fr] md:p-14">
            <div className="mx-auto">
              <Basketball />
            </div>
            <div className="relative">
              <span className="label">Off the keyboard</span>
              <h3 className="mt-4 text-4xl md:text-5xl">Usually on a basketball court.</h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-400">
                It's where I go to think less.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 pt-16">
        <Reveal className="mx-auto max-w-7xl text-center">
          <h2 className="text-5xl md:text-7xl">That's me.</h2>
          <p className="mt-4 text-lg text-gray-400">Now come see the stuff.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link to="/projects" className="group inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-dark-surface transition-colors hover:bg-brand-mint">
                See my work <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="inline-flex min-h-12 items-center rounded-md border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40">
                Say hi
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
