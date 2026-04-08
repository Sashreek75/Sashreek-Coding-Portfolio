import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <motion.nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-dark-surface/70 backdrop-blur-lg border-b border-white/5 py-3" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-dark-surface text-sm font-bold"
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              S
            </motion.div>
            <span className="hidden sm:inline text-lg font-semibold font-display text-white">Sashreek</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <Link
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 relative group",
                  location.pathname === link.path ? "text-brand-blue" : "text-gray-400 hover:text-white"
                )}
              >
                {link.name}
                <motion.span 
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-blue to-brand-purple",
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  )}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <motion.a
              href="https://github.com/Sashreek75?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/[0.03] text-sm font-medium text-white hover:bg-white/[0.08] transition-all border border-white/10 ml-4"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-white p-2 text-sm font-medium"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 md:hidden bg-dark-surface/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 pt-20"
      >
        <motion.button
          className="absolute top-6 right-6 text-white p-2 text-2xl"
          onClick={() => setIsMenuOpen(false)}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </motion.button>
        {navLinks.map((link, i) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-3xl font-semibold font-display hover:text-brand-blue transition-colors",
                location.pathname === link.path ? "text-brand-blue" : "text-white"
              )}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  )
}
