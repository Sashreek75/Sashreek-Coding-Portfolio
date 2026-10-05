import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { cn } from '../lib/utils'
import { Magnetic, ScrambleHover } from './motion'
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
          <Magnetic strength={0.25}>
            <Link to="/" className="group flex items-center gap-3" aria-label="Home">
              <motion.div
                className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple font-display text-sm font-bold text-dark-surface"
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                <motion.span
                  className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.7)_50%,transparent_70%)]"
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                />
                <span className="relative">SP</span>
              </motion.div>
              <span className="relative hidden h-6 overflow-hidden font-display text-base font-semibold leading-6 text-white sm:block">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">Sashreek</span>
                <span className="block text-brand-blue transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">Pinjala</span>
              </span>
            </Link>
          </Magnetic>

          {/* Desktop pill nav */}
          <nav
            className={cn(
              'hidden items-center gap-1 rounded-full p-1.5 transition-colors duration-500 md:flex',
              scrolled ? 'glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]' : 'border border-white/[0.06] bg-white/[0.02]',
            )}
            onMouseLeave={() => setHovered(null)}
          >
            {NAV.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onMouseEnter={() => setHovered(l.path)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                  active === l.path ? 'text-white' : 'text-gray-400 hover:text-white',
                )}
              >
                {active === l.path && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <ScrambleHover text={l.name} className="relative" />
                {pathname === l.path && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-blue" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic>
              <a
                href={`mailto:${LINKS.email}`}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-dark-surface"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Say hi
                </span>
              </a>
            </Magnetic>
          </div>

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
              className="flex gap-3"
            >
              {[
                { icon: Github, href: LINKS.github },
                { icon: Linkedin, href: LINKS.linkedin },
                { icon: Mail, href: `mailto:${LINKS.email}` },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="glass flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
