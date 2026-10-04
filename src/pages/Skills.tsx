import { motion } from 'framer-motion'
import { SplitText, Reveal, TiltCard, Marquee } from '../components/motion'
import { EASE } from '../lib/ease'
import { SKILLS } from '../data'

const ORBITS = [
  { r: 120, dur: 22, items: ['Python', 'TypeScript', 'React'] },
  { r: 190, dur: 34, items: ['React Native', 'PyTorch', 'Flask', 'Electron'] },
  { r: 260, dur: 48, items: ['NumPy', 'Expo', 'FastAPI', 'Tailwind', 'Git'] },
]
const COLORS = ['#6d9cff', '#b477ff', '#5ef2c2', '#ffb36b', '#ff6b8b', '#6d9cff']

function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[580px] scale-[0.62] sm:scale-90 md:scale-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple font-display text-xl font-bold text-dark-surface"
          animate={{ boxShadow: ['0 0 30px #6d9cff55', '0 0 70px #b477ff88', '0 0 30px #6d9cff55'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          SP
        </motion.div>
      </div>
      {ORBITS.map((o, oi) => (
        <motion.div
          key={oi}
          className="absolute left-1/2 top-1/2 rounded-full border border-white/[0.07]"
          style={{ width: o.r * 2, height: o.r * 2, marginLeft: -o.r, marginTop: -o.r }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: oi % 2 ? -360 : 360 }}
          transition={{ scale: { duration: 1, delay: 0.3 + oi * 0.15, ease: EASE }, opacity: { duration: 1, delay: 0.3 + oi * 0.15 }, rotate: { duration: o.dur, repeat: Infinity, ease: 'linear' } }}
        >
          {o.items.map((it, i) => {
            const a = (i / o.items.length) * Math.PI * 2
            return (
              <div key={it} className="absolute" style={{ left: o.r + Math.cos(a) * o.r, top: o.r + Math.sin(a) * o.r }}>
                <motion.div
                  className="glass -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-xs text-gray-200"
                  animate={{ rotate: oi % 2 ? 360 : -360 }}
                  transition={{ duration: o.dur, repeat: Infinity, ease: 'linear' }}
                  whileHover={{ scale: 1.2 }}
                >
                  {it}
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <div className="pb-32 pt-36 md:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <Reveal y={16}>
            <span className="label">Toolbox</span>
          </Reveal>
          <h1 className="mt-6 text-6xl leading-[0.95] md:text-8xl">
            <SplitText text="What I" stagger={0.03} />
            <br />
            <span className="text-gradient">
              <SplitText text="build with." delay={0.25} stagger={0.03} />
            </span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-gray-400">
              The languages and tools I reach for, roughly sorted. I pick whatever gets the thing working, then learn whatever I'm missing.
            </p>
          </Reveal>
        </div>
        <div className="-my-16 lg:my-0">
          <Orbit />
        </div>
      </div>

      <div className="my-24 border-y border-white/[0.06] py-5">
        <Marquee baseVelocity={-2}>
          {SKILLS.flatMap((s) => s.items).map((it) => (
            <span key={it} className="flex items-center px-6 font-display text-2xl font-medium text-gray-500 md:text-3xl">
              {it}
              <span className="ml-12 h-1.5 w-1.5 rounded-full bg-brand-purple/60" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.1} y={50}>
            <TiltCard glow={COLORS[i]} className="card-border h-full overflow-hidden rounded-3xl bg-dark-card/70 p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl">{s.group}</h3>
                <span className="font-mono text-xs" style={{ color: COLORS[i] }}>
                  0{i + 1}
                </span>
              </div>
              <motion.div
                className="mt-2 h-px origin-left"
                style={{ background: `linear-gradient(90deg, ${COLORS[i]}, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
              />
              <motion.div
                className="mt-6 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              >
                {s.items.map((it) => (
                  <motion.span
                    key={it}
                    variants={{ hidden: { opacity: 0, y: 14, scale: 0.8 }, show: { opacity: 1, y: 0, scale: 1 } }}
                    whileHover={{ y: -3, borderColor: COLORS[i], color: '#fff' }}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-sm text-gray-400"
                  >
                    {it}
                  </motion.span>
                ))}
              </motion.div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
