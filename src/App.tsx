import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Cursor, NeuronTrail, Preloader, ScrollProgress, Ambient } from './components/Chrome'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'

const TITLES: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Work',
  '/about': 'About',
  '/skills': 'Toolbox',
  '/contact': 'Contact',
}

const CURTAIN = [0.76, 0, 0.24, 1] as const
let firstPage = true

function Page({ children, title }: { children: ReactNode; title: string }) {
  // the very first page load already has the preloader, so skip the curtain there
  const [isFirst] = useState(() => firstPage)
  useEffect(() => {
    firstPage = false
  }, [])
  return (
    <>
      <motion.div initial={{ opacity: isFirst ? 1 : 0 }} animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.4 } }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
        {children}
      </motion.div>
      {/* curtain that sweeps up over the old page */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-[#0d0f17]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: CURTAIN }}
      />
      {/* curtain that lifts off the new page, with its name */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90] flex origin-top items-center justify-center bg-[#0d0f17]"
        initial={{ scaleY: isFirst ? 0 : 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: CURTAIN, delay: 0.15 }}
      >
        <motion.span
          className="font-display text-5xl font-semibold text-white md:text-7xl"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.35 }}
        >
          {title}
        </motion.span>
      </motion.div>
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const title = TITLES[location.pathname] ?? '404'
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page title={title}><Home /></Page>} />
        <Route path="/projects" element={<Page title={title}><Projects /></Page>} />
        <Route path="/skills" element={<Page title={title}><Skills /></Page>} />
        <Route path="/about" element={<Page title={title}><About /></Page>} />
        <Route path="/contact" element={<Page title={title}><Contact /></Page>} />
        <Route path="*" element={<Page title={title}><NotFound /></Page>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('sp-loaded')
    } catch {
      return true
    }
  })
  const done = useCallback(() => {
    try {
      sessionStorage.setItem('sp-loaded', '1')
    } catch {
      /* ignore */
    }
    setLoading(false)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>
        <Ambient />
        <NeuronTrail />
        <Cursor />
        <ScrollProgress />
        <div className="relative flex min-h-screen flex-col text-gray-300">
          <Navbar />
          <main className="flex-grow">
            {!loading && <AnimatedRoutes />}
          </main>
          <Footer />
        </div>
      </Router>
    </MotionConfig>
  )
}
