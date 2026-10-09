import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '../lib/utils'
import { ScrambleHover } from './motion'
import { NeuronMark } from './NeuronMark'
import { EASE } from '../lib/ease'
import { LINKS } from '../data'

const NAV = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Toolbox', path: '/skills' },
  { name: 'Contact', path: '/contact' },
]

export function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [logoHover, setLogoHover] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 240 && !open)
    setScrolled(v > 30)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const active = hovered ?? pathname

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
        animate={{ y: hidden ? -110 : 0 }}
        initial={{ y: -110 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="Home" onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)}>
            <NeuronMark size={34} hover={logoHover} />
            <span className="hidden font-display text-[17px] font-semibold tracking-tight text-white sm:block">
              sashreek<span className="text-brand-mint">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className={cn(
              'hidden items-center gap-1 rounded-xl px-2 py-1 transition-colors duration-500 md:flex',
              scrolled && 'bg-[#07080c]/80 ring-1 ring-white/[0.06] backdrop-blur-xl',
            )}
            onMouseLeave={() => setHovered(null)}
          >
            {NAV.map((l, i) => (
              <Link
                key={l.path}
                to={l.path}
                onMouseEnter={() => setHovered(l.path)}
                className={cn(
                  'relative flex items-baseline gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-200',
                  pathname === l.path ? 'text-white' : 'text-gray-400 hover:text-white',
                )}
              >
                <span className={cn('font-mono text-[10px]', pathname === l.path ? 'text-brand-mint' : 'text-gray-600')}>0{i + 1}</span>
                <ScrambleHover text={l.name} />
                {active === l.path && (
                  <motion.span
                    layoutId="nav-line"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-brand-mint shadow-[0_0_8px_#5ef2c2]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <a
            href={`mailto:${LINKS.email}`}
            className="group hidden items-center gap-2 font-mono text-xs text-gray-300 transition-colors hover:text-white md:flex"
          >
            <span className="relative">
              get in touch
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-brand-mint transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="glass relative z-[60] flex h-11 w-11 items-center justify-center rounded-full md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <motion.span className="absolute h-[1.5px] w-5 bg-white" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} />
            <motion.span className="absolute h-[1.5px] w-5 bg-white" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-[#07080c] px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 38px) 38px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {NAV.map((l, i) => (
                <div key={l.path} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      to={l.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tight',
                        pathname === l.path ? 'text-gradient' : 'text-white',
                      )}
                    >
                      <span className="font-mono text-xs text-gray-600">0{i + 1}</span>
                      {l.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-gray-400"
            >
              {[
                { label: 'github', href: LINKS.github },
                { label: 'linkedin', href: LINKS.linkedin },
                { label: 'email', href: `mailto:${LINKS.email}` },
              ].map(({ label, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-1 text-white">
                  {label} <ArrowUpRight size={14} className="text-brand-mint" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
