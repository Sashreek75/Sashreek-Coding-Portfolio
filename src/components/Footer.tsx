import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { LINKS } from '../data'
import { Magnetic } from './motion'
import { EASE } from '../lib/ease'

function useClock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(i)
  }, [])
  return t.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: 'numeric', minute: '2-digit', second: '2-digit' })
}

export function Footer() {
  const time = useClock()
  const name = 'SASHREEK'
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-6 pb-8 pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="max-w-md text-3xl leading-tight md:text-4xl"
            >
              Got an idea that's a little too big? <span className="text-gradient">Good.</span> Let's talk.
            </motion.h3>
            <Magnetic className="mt-8">
              <a
                href={`mailto:${LINKS.email}`}
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 py-3 pl-6 pr-3 text-white transition-colors hover:border-white/30"
              >
                {LINKS.email}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-dark-surface transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </Magnetic>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
            <div>
              <div className="label mb-4">Pages</div>
              <ul className="space-y-2">
                {[
                  ['Home', '/'],
                  ['Work', '/projects'],
                  ['About', '/about'],
                  ['Toolbox', '/skills'],
                  ['Contact', '/contact'],
                ].map(([n, p]) => (
                  <li key={p}>
                    <Link to={p} className="group relative inline-block text-sm text-gray-400 transition-colors hover:text-white">
                      {n}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="label mb-4">Elsewhere</div>
              <ul className="space-y-2">
                {[
                  ['GitHub', LINKS.github],
                  ['LinkedIn', LINKS.linkedin],
                  ['Devpost', LINKS.devpost],
                ].map(([n, h]) => (
                  <li key={n}>
                    <a href={h} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white">
                      {n}
                      <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="label mb-4">My time</div>
              <div className="font-mono text-sm text-white tabular-nums">{time}</div>
              <div className="mt-1 text-xs text-gray-600">Central Time</div>
            </div>
          </div>
        </div>

        {/* Giant name */}
        <div className="relative mt-20 select-none overflow-hidden" aria-hidden>
          <div className="flex justify-between font-display text-[14vw] font-extrabold leading-[0.8] tracking-tighter md:text-[15.5vw] xl:text-[15rem]">
            {name.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="text-outline inline-block transition-colors duration-500 hover:text-white/90"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.06 }}
                whileHover={{ y: '-8%' }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-gray-600 md:flex-row">
          <span>© {new Date().getFullYear()} Sashreek Pinjala</span>
          <span>Built by me, with probably too many animations.</span>
        </div>
      </div>
    </footer>
  )
}
