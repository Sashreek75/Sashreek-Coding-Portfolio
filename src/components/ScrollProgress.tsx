import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTopButton, setShowTopButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setScrollProgress(scrolled)
      setShowTopButton(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-blue to-brand-purple z-50"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showTopButton ? 1 : 0,
          scale: showTopButton ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
        title="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </>
  )
}
