import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Magnetic } from '../components/motion'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
      <div className="relative font-display text-[38vw] font-extrabold leading-none tracking-tighter text-white md:text-[16rem]">
        {['4', '0', '4'].map((d, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 120, opacity: 0, rotate: -20 }}
            animate={{ y: [0, -18, 0], opacity: 1, rotate: 0 }}
            transition={{
              y: { duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' },
              opacity: { delay: i * 0.1 },
              rotate: { type: 'spring', delay: i * 0.1 },
            }}
          >
            {i === 1 ? <span className="text-gradient">{d}</span> : d}
          </motion.span>
        ))}
        <motion.span
          className="absolute inset-0 text-brand-rose mix-blend-screen"
          animate={{ x: [0, -4, 3, 0], opacity: [0, 0.6, 0, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.2 }}
          aria-hidden
        >
          404
        </motion.span>
      </div>
      <h1 className="mt-4 text-3xl md:text-4xl">This page wandered off.</h1>
      <p className="mt-3 max-w-md text-gray-400">Synapse would've closed this tab by now. Let's get you somewhere real.</p>
      <div className="mt-10 flex gap-4">
        <Magnetic>
          <Link to="/" className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-dark-surface">
            Take me home
          </Link>
        </Magnetic>
        <Magnetic>
          <Link to="/projects" className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5">
            See projects
          </Link>
        </Magnetic>
      </div>
    </div>
  )
}
