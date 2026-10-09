import { Suspense, lazy, useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { NeuronMark } from '../components/NeuronMark'
import { ProjectTimeline } from '../components/ProjectTimeline'
import { SplitText, HoverLetters, SpotlightGrid, RotatingWords, Magnetic, Marquee, ScrollWords, Reveal, CountUp, SectionLabel, Scramble, EEGStrip } from '../components/motion'
import { EASE } from '../lib/ease'

// three.js is heavy, so the brain loads in its own chunk
const Brain = lazy(() => import('../components/Brain').then((m) => ({ default: m.Brain })))

/* small live readout in the hero HUD */
function Ticker() {
  const [n, setN] = useState(1482)
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + Math.floor(Math.random() * 9) - 3), 260)
    return () => clearInterval(t)
  }, [])
  return <span className="tabular-nums">{n.toLocaleString()}</span>
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const brainY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const brainScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden px-6 pt-28 md:pt-20">
      <SpotlightGrid />
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-4 md:grid-cols-12">
        {/* Brain */}
        <motion.div
          style={{ y: brainY, scale: brainScale, opacity: fade }}
          className="relative order-1 h-[46svh] md:order-2 md:col-span-6 md:h-[78svh]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <div className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle,rgba(109,156,255,0.18),transparent_65%)] blur-2xl" />
          <Suspense fallback={null}>
            <Brain className="absolute inset-0 h-full w-full" />
          </Suspense>

          {/* HUD frame */}
          {['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-l border-b', 'right-0 bottom-0 border-r border-b'].map((c, i) => (
            <motion.span
              key={c}
              className={`absolute h-6 w-6 border-white/30 ${c}`}
              initial={{ opacity: 0, scale: 1.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: EASE }}
            />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute left-3 top-3 font-mono text-[10px] leading-relaxed text-gray-500"
          >
            <div>
              <span className="text-brand-blue">●</span> left hemisphere: <span className="text-gray-300">neurons</span>
            </div>
            <div>
              <span className="text-brand-mint">■</span> right hemisphere: <span className="text-gray-300">circuits</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-3 right-3 text-right font-mono text-[10px] leading-relaxed text-gray-500"
          >
            <div>
              signals/s <span className="text-brand-mint"><Ticker /></span>
            </div>
            <div className="text-gray-400">
              click to fire
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-mint" /> firing
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 order-2 pb-16 md:order-1 md:col-span-6 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7 flex items-center gap-3 font-mono text-xs text-gray-500"
          >
            <span className="h-px w-8 bg-brand-mint" />
            <Scramble text="student / founder / researcher" delay={200} duration={900} className="text-gray-300" />
          </motion.div>

          <h1 className="font-display text-[17vw] font-bold leading-[0.9] tracking-[-0.05em] text-white sm:text-8xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem]">
            <HoverLetters text="Hi, I'm" delay={0.2} />
            <br />
            <span className="relative inline-block">
              <span className="text-gradient">
                <HoverLetters text="Sashreek." delay={0.5} />
              </span>
              {/* underline that draws in like a nerve signal */}
              <svg className="absolute -bottom-3 left-0 h-4 w-full overflow-visible" viewBox="0 0 400 16" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M0 8 L120 8 L135 2 L150 14 L165 8 L400 8"
                  fill="none"
                  stroke="url(#ul)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
                />
                <defs>
                  <linearGradient id="ul" x1="0" x2="1">
                    <stop offset="0" stopColor="#5ef2c2" />
                    <stop offset="1" stopColor="#5ef2c2" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
            className="mt-10 max-w-xl text-lg leading-snug text-gray-300 md:text-2xl"
          >
            I study how minds work, then write the code that helps them. Lately that means helping people{' '}
            <RotatingWords
              className="font-semibold text-white"
              words={['actually follow through.', 'make better decisions.', 'understand their own minds.', 'get unstuck.']}
            />
          </motion.p>

          <motion.p
            className="mt-6 font-mono text-xs leading-relaxed text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            interests: <span className="text-gray-300">cognitive science</span> / <span className="text-gray-300">human-centered AI</span> /{' '}
            <span className="text-gray-300">behavior &amp; decisions</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.2}>
              <a
                href="#work"
                className="group inline-flex min-h-12 items-center gap-3 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-dark-surface transition-colors duration-200 hover:bg-brand-mint"
              >
                See my work
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Link to="/about" className="group relative inline-flex min-h-12 items-center px-2 text-sm font-semibold text-white">
              About me
              <span className="absolute bottom-2.5 left-2 right-2 h-px origin-left scale-x-50 bg-white/40 transition-transform duration-300 group-hover:scale-x-100 group-hover:bg-brand-mint" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Band() {
  const names = ['Stanford Research', 'Synapse Adaptive', 'NeuroLabs', 'Compliance Watchdog', 'Universal Tech Movement']
  return (
    <section className="relative border-y border-white/[0.06] bg-dark-muted/60 py-6 backdrop-blur">
      <Marquee baseVelocity={-2.5}>
        {names.map((n) => (
          <span key={n} className="flex items-center font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
            <span className="px-8">{n}</span>
            <NeuronMark size={40} />
          </span>
        ))}
      </Marquee>
      <Marquee baseVelocity={2.5} className="mt-3">
        {['neurons', 'circuits', 'synapses', 'algorithms', 'cognition', 'code', 'behavior', 'models'].map((n) => (
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
    <section className="px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="01">who i am</SectionLabel>
        <ScrollWords
          className="font-display text-2xl font-medium leading-[1.3] tracking-tight text-white md:text-[2.1rem]"
          text="I'm a high schooler stuck between two obsessions: how the *mind* works, and how to *build* things. I'm drawn to the messy space between them: attention, motivation, decision-making, and why people don't do the things they know they should. I like turning those questions into *models,* and then turning the models into *software* people actually use."
        />
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-6 pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="flex justify-center">
            <SectionLabel index="02">projects & activities</SectionLabel>
          </div>
          <h2 className="text-5xl md:text-7xl">
            <SplitText text="Follow the signal" inView stagger={0.025} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-gray-400">Scroll down the axon. What I'm building comes first, then what I've already built.</p>
          </Reveal>
        </div>
        <ProjectTimeline />
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { k: 'applicants', to: 3000, suffix: '+', label: 'applied to Ladders for Leaders. I was one of the ones picked.' },
    { k: 'saved_usd', to: 5000, prefix: '$', suffix: '+', label: 'saved at Compliance Watchdog by automating provider checks.' },
    { k: 'time_cut', to: 50, suffix: '%+', label: 'less time spent on verification once the agents took over.' },
    { k: 'active_builds', to: 3, label: "things I'm building at once. Probably too many." },
  ]
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <EEGStrip className="mb-10" color="#5ef2c2" />
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} y={30} blur={false} className="relative bg-dark-surface p-7 md:p-9">
              <div className="mb-6 flex items-center justify-between font-mono text-[11px] text-gray-500">
                <span>{s.k}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand-mint/70" />
              </div>
              <div className="relative font-display text-5xl font-bold tracking-tight text-white md:text-6xl">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-gray-500">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="px-6 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03">say hi</SectionLabel>
        <h2 className="max-w-4xl text-5xl leading-[1] md:text-8xl">
          <SplitText text="Let's make something" inView stagger={0.025} />{' '}
          <span className="text-gradient">
            <SplitText text="real." inView delay={0.5} />
          </span>
        </h2>
        <div className="mt-12 grid gap-10 border-t border-white/[0.07] pt-10 md:grid-cols-2">
          <Reveal delay={0.2}>
            <p className="max-w-md text-lg text-gray-400">Research, a startup idea, an internship, or you just want to talk about how brains work. My inbox is open.</p>
          </Reveal>
          <Reveal delay={0.3} className="md:text-right">
            <Link to="/contact" className="group inline-flex items-baseline gap-3 font-display text-3xl font-semibold text-white md:text-4xl">
              <span className="relative">
                Get in touch
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-100 bg-white/20" />
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-brand-mint transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
              <ArrowUpRight size={30} className="text-brand-mint transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <EEGStrip className="mt-16" color="#5ef2c2" />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Band />
      <Intro />
      <Work />
      <Stats />
      <CTA />
    </>
  )
}
