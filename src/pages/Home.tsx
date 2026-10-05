import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Brain } from '../components/Brain'
import { ProjectTimeline } from '../components/ProjectTimeline'
import { SplitText, HoverLetters, SpotlightGrid, RotatingWords, Magnetic, Marquee, ScrollWords, Reveal, CountUp, SectionLabel, Scramble, EEGStrip } from '../components/motion'
import { EASE } from '../lib/ease'

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
          <Brain className="absolute inset-0 h-full w-full" />

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
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-gray-400 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-mint" />
            </span>
            <Scramble text="student · founder · researcher" delay={200} duration={900} />
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
                    <stop offset="0" stopColor="#6d9cff" />
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

          <motion.div
            className="mt-7 flex flex-wrap gap-2"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.45 } } }}
          >
            {[
              ['Cognitive science', '#5ef2c2'],
              ['Human-centered AI', '#6d9cff'],
              ['Behavior & decisions', '#b477ff'],
            ].map(([t, c]) => (
              <motion.span
                key={t}
                variants={{ hidden: { opacity: 0, y: 10, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ y: -2, borderColor: c }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-gray-300"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="beam group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-semibold text-dark-surface shadow-[0_0_40px_-8px_rgba(94,242,194,0.6)]"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-brand-blue to-brand-mint transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative">See my work</span>
                <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/40 hover:bg-white/5">
                About me
              </Link>
            </Magnetic>
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
            <span className="font-mono text-2xl text-brand-mint">{'</>'}</span>
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
    { to: 3000, suffix: '+', label: 'applicants for Ladders for Leaders. I was one of the ones picked.' },
    { to: 5000, prefix: '$', suffix: '+', label: 'saved at Compliance Watchdog by automating provider checks.' },
    { to: 50, suffix: '%+', label: 'less time spent on verification once the agent took over.' },
    { to: 3, label: "things I'm building at once. Probably too many. Not stopping." },
  ]
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <EEGStrip className="mb-10" color="#5ef2c2" />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} y={30} blur={false} className="group relative bg-dark-surface p-8 md:p-10">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-mint/0 to-brand-blue/0 transition-colors duration-700 group-hover:from-brand-mint/[0.05] group-hover:to-brand-blue/[0.04]" />
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
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/[0.07] px-6 py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#6d9cff33,#5ef2c233,#b477ff22,#6d9cff33)] blur-3xl" />
          <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
        </div>
        <Reveal>
          <span className="font-mono text-xs text-brand-mint">{'> open_to_collaborations = true'}</span>
        </Reveal>
        <h2 className="mx-auto mt-6 max-w-4xl text-5xl leading-[1.02] md:text-8xl">
          <SplitText text="Let's make something" inView stagger={0.025} />{' '}
          <span className="text-gradient">
            <SplitText text="real." inView delay={0.5} />
          </span>
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-gray-400">Research, a startup idea, an internship, or you just want to nerd out about how brains work. I'm in.</p>
        </Reveal>
        <Reveal delay={0.45} className="mt-12">
          <Magnetic strength={0.5}>
            <Link
              to="/contact"
              className="group relative inline-flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-semibold text-dark-surface md:h-44 md:w-44"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-gradient-to-br from-brand-blue to-brand-mint transition-transform duration-500 ease-out group-hover:scale-100" />
              <span className="relative flex flex-col items-center gap-1">
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
