import { useState } from 'react'
import { motion } from 'framer-motion'
import { SplitText, Reveal, SectionLabel } from '../components/motion'
import { EASE } from '../lib/ease'
import { SKILLS } from '../data'

/* A three-layer network: what I write in → what I build on → what comes out. */
const LAYERS = [
  { name: 'languages', x: 120, nodes: ['Python', 'TypeScript', 'JavaScript', 'Swift', 'Java'] },
  { name: 'frameworks', x: 300, nodes: ['React', 'React Native', 'PyTorch', 'Electron', 'FastAPI'] },
  { name: 'outputs', x: 455, nodes: ['research models', 'mobile apps', 'desktop agents', 'web platforms'] },
]
// which hidden units actually feed which outputs (hand-wired, not fully connected)
const WIRES: [number, number, number, number][] = [
  // [layerA, nodeA, layerB, nodeB]
  [0, 0, 1, 2], [0, 0, 1, 4], [0, 1, 1, 0], [0, 1, 1, 1], [0, 1, 1, 3], [0, 2, 1, 0], [0, 2, 1, 3], [0, 3, 1, 1], [0, 4, 1, 4],
  [1, 2, 2, 0], [1, 4, 2, 0], [1, 1, 2, 1], [1, 3, 2, 2], [1, 0, 2, 3], [1, 4, 2, 3], [1, 0, 2, 2],
]
const yOf = (count: number, i: number) => 60 + i * (260 / Math.max(1, count - 1))

function Network() {
  const [hover, setHover] = useState<string | null>(null)
  const pos = (l: number, n: number) => ({ x: LAYERS[l].x, y: yOf(LAYERS[l].nodes.length, n) })
  return (
    <svg viewBox="0 0 600 350" className="h-auto w-full" role="img" aria-label="Network of languages feeding frameworks feeding what I build">
      {LAYERS.map((l) => (
        <text key={l.name} x={l.x} y="24" textAnchor="middle" className="fill-gray-500 font-mono text-[10px] uppercase tracking-[0.2em]">
          {l.name}
        </text>
      ))}
      {WIRES.map(([la, na, lb, nb], k) => {
        const a = pos(la, na)
        const b = pos(lb, nb)
        const on = hover === `${la}-${na}` || hover === `${lb}-${nb}`
        const d = `M${a.x} ${a.y} C ${a.x + 70} ${a.y}, ${b.x - 70} ${b.y}, ${b.x} ${b.y}`
        return (
          <g key={k}>
            <motion.path
              d={d}
              fill="none"
              stroke={on ? '#5ef2c2' : 'rgba(232,238,252,0.16)'}
              strokeWidth={on ? 1.6 : 1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.3 + k * 0.04, ease: EASE }}
            />
            {k % 3 === 0 && (
              <circle r="2.6" fill="#5ef2c2">
                <animateMotion dur={`${2.2 + (k % 4) * 0.4}s`} begin={`${k * 0.25}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        )
      })}
      {LAYERS.map((l, li) =>
        l.nodes.map((n, ni) => {
          const { x, y } = pos(li, ni)
          const id = `${li}-${ni}`
          const on = hover === id
          const right = li === 2
          return (
            <g key={id} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(null)} className="cursor-default">
              <motion.circle
                cx={x}
                cy={y}
                r={on ? 7 : 5}
                fill={li === 2 ? '#5ef2c2' : '#0b0d14'}
                stroke={li === 2 ? '#5ef2c2' : '#e8eefc'}
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + li * 0.25 + ni * 0.05, type: 'spring', stiffness: 400, damping: 14 }}
                style={{ originX: `${x}px`, originY: `${y}px` }}
              />
              <text
                x={li === 1 ? x : right ? x + 14 : x - 14}
                y={li === 1 ? y - 12 : y + 4}
                textAnchor={li === 1 ? 'middle' : right ? 'start' : 'end'}
                paintOrder="stroke"
                stroke="#090b11"
                strokeWidth={li === 1 ? 4 : 0}
                className={`font-mono text-[11px] transition-colors ${on ? 'fill-white' : 'fill-gray-400'}`}
              >
                {n}
              </text>
            </g>
          )
        }),
      )}
    </svg>
  )
}

export default function Skills() {
  return (
    <div className="pb-32 pt-36 md:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal y={16}>
            <span className="font-mono text-xs text-gray-500">
              <span className="text-brand-mint">{'//'}</span> toolbox
            </span>
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
              Wired up the way I actually use it: languages feed frameworks, frameworks turn into things people use. Hover a node to trace its connections.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="lg:col-span-7">
          <div className="relative rounded-xl border border-white/[0.07] bg-[#090b11] p-4 md:p-6">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative">
              <Network />
            </div>
            <div className="relative mt-2 border-t border-white/[0.06] pt-3 font-mono text-[10.5px] text-gray-500">
              <span className="text-brand-mint">fig. 01</span> a small feed-forward network of my stack. Signals flow left to right.
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-28 max-w-7xl px-6">
        <SectionLabel index="02">full list</SectionLabel>
        <div className="border-t border-white/[0.08]">
          {SKILLS.map((g, i) => (
            <motion.div
              key={g.group}
              className="group relative grid gap-3 border-b border-white/[0.08] py-6 md:grid-cols-12 md:items-baseline"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-brand-mint transition-[width] duration-500 group-hover:w-full" />
              <div className="flex items-baseline gap-4 md:col-span-3">
                <span className="font-mono text-xs text-gray-600">0{i + 1}</span>
                <h3 className="font-display text-xl text-white">{g.group}</h3>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[17px] text-gray-400 md:col-span-9">
                {g.items.map((it, k) => (
                  <span key={it} className="transition-colors duration-200 hover:text-white">
                    {it}
                    {k < g.items.length - 1 && <span className="ml-2 text-gray-700">/</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
