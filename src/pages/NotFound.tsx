import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 px-6 pb-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center"
      >
        <motion.h1 
          className="text-7xl md:text-8xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          404
        </motion.h1>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Page Not Found</h2>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist. But hey, let's get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 bg-white text-dark-surface font-semibold rounded-lg hover:bg-gray-100 transition-all active:scale-95 hover:scale-105"
          >
            Back Home
          </Link>
          <Link
            to="/projects"
            className="px-8 py-3 bg-white/[0.03] text-white font-semibold rounded-lg border border-white/10 hover:bg-white/[0.08] transition-all active:scale-95 hover:scale-105"
          >
            View Projects
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
