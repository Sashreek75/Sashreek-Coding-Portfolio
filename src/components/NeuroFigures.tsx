import { motion } from 'framer-motion'

/* Small, hand-built scientific figures used instead of stock icons. */

const stroke = 'rgba(232,238,252,0.55)'

/** Receptive field: stimuli drift in, the center neuron only fires when one lands inside. */
export function FigReceptiveField({ color = '#6d9cff' }: { color?: string }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" aria-hidden>
      <motion.g style={{ originX: '120px', originY: '70px' }} animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
        {[58, 40, 22].map((r, i) => (
          <circle key={r} cx="120" cy="70" r={r} fill="none" stroke={stroke} strokeOpacity={0.25 + i * 0.2} strokeDasharray={i === 0 ? '2 5' : i === 1 ? '4 4' : undefined} />
        ))}
      </motion.g>
      {[
        { from: [20, 20], to: [112, 64], d: 0 },
        { from: [225, 40], to: [128, 72], d: 1.3 },
        { from: [40, 130], to: [86, 96], d: 2.6 },
      ].map((s, i) => (
        <motion.circle
          key={i}
          r="3"
          fill={i === 2 ? 'rgba(255,255,255,0.5)' : color}
          initial={{ cx: s.from[0], cy: s.from[1], opacity: 0 }}
          animate={{ cx: [s.from[0], s.to[0]], cy: [s.from[1], s.to[1]], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.7, delay: s.d, ease: 'easeIn' }}
        />
      ))}
      <motion.circle
        cx="120"
        cy="70"
        r="7"
        fill={color}
        animate={{ scale: [1, 1, 1.5, 1, 1, 1.5, 1], opacity: [0.6, 0.6, 1, 0.6, 0.6, 1, 0.6] }}
        transition={{ duration: 3.9, repeat: Infinity, times: [0, 0.5, 0.56, 0.62, 0.84, 0.9, 1] }}
        style={{ originX: '120px', originY: '70px' }}
      />
    </svg>
  )
}

/** Reflex arc: a fixed pathway, the same signal every time. */
export function FigReflexArc({ color = '#ffb36b' }: { color?: string }) {
  const path = 'M18 100 C 50 100, 60 40, 120 40 C 180 40, 190 100, 222 100'
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" aria-hidden>
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M18 100 l-8 -6 M18 100 l-8 6" stroke={stroke} strokeWidth="1.5" />
      <rect x="108" y="28" width="24" height="24" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="215" y="88" width="16" height="24" rx="8" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle r="4" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
        <animateMotion dur="1.8s" repeatCount="indefinite" path={path} />
      </circle>
      <text x="12" y="128" className="fill-gray-500 font-mono text-[9px]">input</text>
      <text x="104" y="20" className="fill-gray-500 font-mono text-[9px]">fixed rule</text>
      <text x="200" y="128" className="fill-gray-500 font-mono text-[9px]">output</text>
    </svg>
  )
}

/** Spike raster: record every trial, including the ones that didn't fire. */
const RASTER = [
  [14, 40, 52, 90, 141, 170, 205],
  [22, 61, 98, 120, 188],
  [],
  [9, 33, 77, 104, 150, 162, 214],
  [48, 130, 199],
  [27, 70, 112, 158, 181, 222],
]
export function FigRaster({ color = '#5ef2c2' }: { color?: string }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" aria-hidden>
      {RASTER.map((row, r) => (
        <g key={r}>
          <line x1="8" x2="232" y1={18 + r * 20} y2={18 + r * 20} stroke="rgba(255,255,255,0.05)" />
          {row.map((x) => (
            <line key={x} x1={8 + x} x2={8 + x} y1={11 + r * 20} y2={25 + r * 20} stroke={r === 2 ? stroke : color} strokeWidth="1.6" />
          ))}
          {r === 2 && (
            <text x="96" y={21 + r * 20} className="fill-gray-500 font-mono text-[9px]">
              no response (kept)
            </text>
          )}
        </g>
      ))}
      <motion.line
        y1="4"
        y2="134"
        stroke={color}
        strokeOpacity="0.6"
        initial={{ x1: 8, x2: 8 }}
        animate={{ x1: [8, 232], x2: [8, 232] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  )
}

/** Dendritic tree: branches grow until they touch. */
const TREE = [
  'M120 132 L120 92',
  'M120 92 C 110 80, 92 74, 76 60',
  'M120 92 C 130 80, 148 74, 164 60',
  'M76 60 C 68 48, 60 40, 46 30',
  'M76 60 C 82 46, 88 36, 96 22',
  'M164 60 C 158 46, 152 36, 144 22',
  'M164 60 C 172 48, 180 40, 194 30',
  'M46 30 L34 20',
  'M194 30 L206 20',
  'M96 22 C 108 14, 132 14, 144 22',
]
export function FigDendrites({ color = '#b477ff' }: { color?: string }) {
  return (
    <svg viewBox="0 0 240 140" className="h-full w-full" aria-hidden>
      {TREE.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={i === TREE.length - 1 ? color : stroke}
          strokeWidth={i === TREE.length - 1 ? 2 : 1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.35, 0.85, 1], repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
      <motion.circle
        cx="120"
        cy="16"
        r="4"
        fill={color}
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.5, 0.5, 1.4, 1, 0.5] }}
        transition={{ duration: 5, times: [0, 0.4, 0.5, 0.85, 1], repeat: Infinity, delay: 1.2 }}
        style={{ originX: '120px', originY: '16px' }}
      />
      <circle cx="120" cy="132" r="5" fill="rgba(232,238,252,0.8)" />
    </svg>
  )
}
