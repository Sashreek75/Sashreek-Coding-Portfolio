import { motion } from 'framer-motion'

/**
 * Personal mark: a small neuron. Dendrites draw in on load,
 * and a signal runs down the axon on hover.
 */
const DENDRITES = [
  'M15 14 C 12 11, 9 9, 5 8',
  'M9 9 L 7 5',
  'M15 14 C 13 16, 9 17, 4 19',
  'M15 14 C 15 10, 16 7, 15 3',
  'M15 7 L 18 4',
  'M15 14 C 18 12, 21 10, 24 9',
]
const AXON = 'M15 14 C 18 17, 21 20, 27 27'

export function NeuronMark({ size = 32, hover = false, className }: { size?: number; hover?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" className={className} aria-hidden>
      {DENDRITES.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#e8eefc"
          strokeWidth={1.3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
        />
      ))}
      <motion.path
        d={AXON}
        stroke="#5ef2c2"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      {/* axon terminals */}
      <circle cx="27" cy="27" r="1.6" fill="#5ef2c2" />
      <circle cx="24.5" cy="28.5" r="1" fill="#5ef2c2" opacity="0.7" />
      <circle cx="28.5" cy="24.5" r="1" fill="#5ef2c2" opacity="0.7" />
      {/* soma */}
      <motion.circle
        cx="15"
        cy="14"
        r="3.4"
        fill="#e8eefc"
        animate={{ scale: hover ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: '15px 14px' }}
      />
      {/* action potential on hover */}
      {hover && (
        <motion.circle r="1.8" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 3px #5ef2c2)' }}>
          <animateMotion dur="0.7s" repeatCount="indefinite" path={AXON} />
        </motion.circle>
      )}
    </svg>
  )
}
