import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function About() {
  const milestones = [
    {
      year: "2022",
      title: "The First Line of Code",
      emoji: "🐦",
      description: "Started learning JavaScript from scratch. Built my first ever project—a scrappy Flappy Bird game. It was rough, but it ignited something: the love of coding and the hunger to solve problems from the ground up."
    },
    {
      year: "2024",
      title: "Python & Professional Foundations",
      emoji: "🐍",
      description: "Dove deep into Python. Earned my PCEP certification from the official Python Institute. Started building real full-stack applications designed to solve genuine problems in my community."
    },
    {
      year: "2024",
      title: "PyQuest: Learning Reimagined",
      emoji: "🎮",
      description: "Built PyQuest—a gamified learning app that transforms how people learn programming. Full-stack implementation with AI-powered features. This project crystallized my vision: technology should make learning irresistible."
    },
    {
      year: "2026",
      title: "Multi-AI & Advanced Systems",
      emoji: "🤖",
      description: "Now fully immersed in complex backend architecture, multi-AI integration, and AI research. Exploring robotics and intelligent systems. Building the future of human-AI collaboration."
    }
  ]

  const values = [
    {
      title: "Intent Over Cleverness",
      icon: "🎯",
      description: "Every line of code should serve a clear purpose. Complexity without purpose is the enemy of good design."
    },
    {
      title: "Deep Work",
      icon: "⚡",
      description: "Meaningful progress comes from sustained focus. I prioritize depth over breadth in both learning and building."
    },
    {
      title: "Problem-Driven Building",
      icon: "🔧",
      description: "Start with real problems, not technologies. Build solutions that matter to people, not solutions looking for problems."
    },
    {
      title: "Continuous Evolution",
      icon: "🌱",
      description: "Curiosity is non-negotiable. Always learning, always experimenting, always pushing boundaries in tech."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="pt-32 px-6 min-h-screen pb-20 bg-dark-surface">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto mb-20 text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          🚀
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-semibold font-display mb-6 text-white">
          From <span className="text-brand-blue">Zero</span> to <span className="text-gradient">Hero</span> 
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          A story of curiosity, problem-solving, and the relentless pursuit of building systems that matter.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-32">
        {/* Journey Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold font-display text-white"
          >
            The Journey
          </motion.h2>
          
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                whileHover={{ x: 8 }}
                className="flex gap-8 group"
              >
                {/* Timeline Dot */}
                <div className="flex flex-col items-center relative">
                  <motion.div 
                    className="w-5 h-5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple relative z-10 shadow-lg shadow-brand-blue/50"
                    whileHover={{ scale: 1.8, boxShadow: "0 0 30px rgba(109, 156, 255, 0.8)" }}
                    animate={{ 
                      boxShadow: [
                        "0 0 10px rgba(109, 156, 255, 0.5)",
                        "0 0 20px rgba(109, 156, 255, 0.8)",
                        "0 0 10px rgba(109, 156, 255, 0.5)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {i < milestones.length - 1 && (
                    <motion.div 
                      className="w-1 bg-gradient-to-b from-brand-blue via-brand-purple to-transparent mt-6"
                      style={{ height: "150px" }}
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-12 pt-1">
                  <motion.div
                    className="p-6 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-brand-blue/30 transition-all"
                    whileHover={{ 
                      backgroundColor: "rgba(255,255,255,0.05)",
                      y: -4
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <motion.div 
                        className="text-4xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {milestone.emoji}
                      </motion.div>
                      <div>
                        <motion.div 
                          className="text-xs font-bold text-brand-blue uppercase tracking-widest"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          {milestone.year}
                        </motion.div>
                        <h3 className="text-2xl font-semibold text-white group-hover:text-brand-blue transition-colors">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">{milestone.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold font-display text-white"
          >
            What Drives Me
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/5 hover:border-brand-blue/50 transition-all group relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-purple/0 group-hover:from-brand-blue/10 group-hover:to-brand-purple/10"
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="text-5xl mb-4 relative z-10"
                  animate={{ y: [0, -6, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
                >
                  {value.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm relative z-10">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative p-12 md:p-16 rounded-3xl border border-white/10 overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-dark-muted/5 to-brand-purple/5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 via-transparent to-brand-purple/20 opacity-0"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-semibold font-display text-white mb-10"
            >
              My Philosophy
            </motion.h2>
            
            <motion.div 
              className="space-y-8 text-gray-400 leading-relaxed text-lg"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.p variants={itemVariants}>
                I started with a Flappy Bird game that was "really scrappy." That first project taught me something invaluable: the act of building is the best teacher. Not reading documentation, not watching tutorials—actually building something and making it work.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                That love of coding, born from that humble beginning, led me to Python, to certifications, and ultimately to PyQuest. Each step wasn't about chasing technologies or frameworks. It was about solving genuine problems for my community and refusing to stop until the solution was elegant and functional.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                Today, I'm exploring multi-AI systems and robotics not because they're trendy—but because they represent the frontier of solving complex human problems. I want to be at the intersection where AI amplifies human capability rather than replacing it.
              </motion.p>
              
              <motion.p 
                variants={itemVariants}
                className="text-white text-xl font-semibold bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 p-6 rounded-xl border border-brand-blue/30"
              >
                Every project is a conversation between code, intention, and impact. I build to make someone's life better, smarter, or easier.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative text-center p-12 md:p-16 rounded-3xl border border-white/10 overflow-hidden"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-transparent to-brand-purple/10"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold text-white mb-6"
            >
              Ready to Build Something Great?
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg"
            >
              Whether it's a collaboration, a wild idea, or just a conversation about the future of tech—let's connect.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-block px-10 py-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-brand-blue/50 transition-all"
                >
                  Get in Touch
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/projects"
                  className="inline-block px-10 py-4 bg-white/[0.03] text-white font-semibold rounded-xl border border-white/10 hover:bg-white/[0.08] transition-all"
                >
                  See My Work
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
