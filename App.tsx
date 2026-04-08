import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'

// ── Components ──

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Sashreek75?tab=repositories' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sashreek-pinjala-948685365/' },
    { name: 'Devpost', url: 'https://devpost.com/sashforapps/challenges' },
  ]

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 border-t border-white/5 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-8 pb-8 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <motion.div className="text-xl font-semibold font-display text-white flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-dark-surface text-sm font-bold">S</div>
              <span>Sashreek</span>
            </motion.div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed">Building systems that bridge intelligence and intention.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:items-end gap-4"
          >
            <div className="flex gap-6">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ color: '#6d9cff', y: -2 }}
                  className="text-sm font-medium text-gray-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <motion.div 
              className="flex items-center gap-2 opacity-50 text-xs"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div 
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-medium">Available for work</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-600"
        >
          <p>© 2024 Sashreek. Crafted with intent and code.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// ── Main App ──

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen bg-dark-surface text-gray-300 selection:bg-brand-blue selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
              <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
