import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight, Target, Hammer, Brain, Repeat } from 'lucide-react'
import { SplitText, Reveal, TiltCard, SectionLabel, Magnetic } from '../components/motion'
import { EASE } from '../lib/ease'
import { TIMELINE } from '../data'

const BELIEFS = [
  { icon: Target, color: '#6d9cff', title: 'Start with a real problem', body: "Every project I'm proud of started because something annoyed me or someone I knew was struggling. Never because a framework looked cool." },
  { icon: Hammer, color: '#ffb36b', title: 'Build it, then learn', body: 'Tutorials only got me so far. Shipping something broken and fixing it taught me more than anything else.' },
  { icon: Brain, color: '#5ef2c2', title: 'Be honest about results', body: "In research and in products. If something didn't work, I'd rather know, and say so, than pretend it did." },
  { icon: Repeat, color: '#b477ff', title: 'Stay curious', body: "Cognitive science, AI, business, sales. I'm into way too many things, and that's how the best ideas end up connecting." },
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
  return (
    <div className="relative h-40 w-40">
      <motion.div
        className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#ff9a4d] to-[#c4561c] shadow-[0_0_40px_rgba(255,154,77,0.35)]"
        animate={{ y: [0, 88, 0], scaleY: [1, 1, 0.8, 1], scaleX: [1, 1, 1.15, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: [0.33, 0, 0.67, 1], times: [0, 0.48, 0.5, 1] }}
      >
        <svg viewBox="0 0 64 64" className="h-full w-full opacity-60">
          <path d="M32 0v64M0 32h64M10 10c12 12 12 32 0 44M54 10c-12 12-12 32 0 44" stroke="#3a1a08" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-2 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-black/60 blur-sm"
        animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: [0.33, 0, 0.67, 1] }}
      />
    </div>
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
          <h1 className="mt-6 max-w-5xl text-6xl leading-[0.95] md:text-8xl">
            <SplitText text="The longer" stagger={0.03} />{' '}
            <span className="text-gradient">
              <SplitText text="version." delay={0.3} stagger={0.04} />
            </span>
          </h1>
          <div className="mt-16 grid gap-10 md:grid-cols-12">
            <Reveal delay={0.4} className="md:col-span-7">
              <div className="space-y-6 text-lg leading-relaxed text-gray-300 md:text-xl">
                <p>
                  I'm Sashreek. I started coding in 2022 with a Flappy Bird clone that barely worked, and I've been building ever since. Somewhere along the way I realized the thing I actually care about isn't code. It's people, and why they do (or don't do) what they set out to do.
                </p>
                <p className="text-gray-400">
                  That's why I'm researching self-regulation with Stanford professor Ashish Mehta. It's why I started Synapse, because I get distracted way too easily myself. And it's why NeuroLabs exists: in an emergency, knowing what to do isn't enough if you freeze.
                </p>
                <p className="text-gray-400">This summer I also got my first real taste of industry, building agentic AI for healthcare credentialing and learning sales and business from people who've launched 100+ startups.</p>
              </div>
            </Reveal>
            <Reveal delay={0.55} className="md:col-span-5">
              <div className="card-border relative overflow-hidden rounded-3xl bg-dark-card/70 p-8">
                <div className="label mb-6">Quick facts</div>
                <dl className="space-y-5">
                  {[
                    ['Building', 'Synapse Adaptive'],
                    ['Researching', 'DISCERN · Stanford'],
                    ['Shipping', 'NeuroLabs'],
                    ['Interning', 'Universal Tech Movement'],
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
              <Reveal key={b.title} delay={i * 0.08} y={50}>
                <TiltCard glow={b.color} className="card-border h-full overflow-hidden rounded-3xl bg-dark-card/70 p-8 md:p-10">
                  <motion.div
                    className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `${b.color}18`, color: b.color }}
                    whileHover={{ rotate: [0, -12, 12, 0], scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <b.icon size={24} />
                  </motion.div>
                  <h3 className="text-2xl">{b.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-400">{b.body}</p>
                  <div className="absolute bottom-6 right-8 font-display text-6xl font-bold text-white/[0.03]">0{i + 1}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Off the keyboard */}
      <section className="px-6 py-24">
        <Reveal className="mx-auto max-w-7xl">
          <div className="card-border relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-dark-card/70 p-10 md:grid-cols-[auto_1fr] md:p-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-amber/10 blur-3xl" />
            <div className="mx-auto">
              <Basketball />
            </div>
            <div className="relative">
              <span className="label">Off the keyboard</span>
              <h3 className="mt-4 text-4xl md:text-5xl">Usually on a basketball court.</h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-400">
                It's where I go to think less. Also where I learned that showing up when you don't feel like it is most of the game.
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
              <Link to="/projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-dark-surface">
                See my work <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="inline-flex items-center rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white hover:bg-white/5">
                Say hi
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
