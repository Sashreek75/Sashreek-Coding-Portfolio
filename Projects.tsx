import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export default function Projects() {
  const mainProject = {
    title: "PyQuest",
    category: "Learning Platform",
    description: "A professional learning ecosystem that bridges syntax learning and real-world engineering. Features adaptive challenges powered by GPT-4, real-time code analysis, and personalized learning paths based on cognitive science principles.",
    tags: ["React", "TypeScript", "Node.js", "GPT-4", "Framer Motion"],
    image: "/pyquest.png",
    link: "#",
    github: "https://github.com/Sashr/PyQuest"
  }

  const otherProjects = [
    {
      title: "Neural Career Ecosystem",
      description: "An AI-driven platform for career guidance that applies neuroscience principles to personalize professional development.",
      tags: ["Python", "Flask", "ML"],
      icon: "🧠"
    },
    {
      title: "Adaptive Learning Engine",
      description: "Real-time learning optimization system that adjusts difficulty and pacing based on cognitive load theory.",
      tags: ["TypeScript", "React", "Node.js"],
      icon: "⚡"
    }
  ]

  return (
    <div className="pt-32 px-6 min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-16 text-center text-white"
      >
        <h1 className="text-5xl md:text-6xl font-semibold font-display mb-4">
          Selected <span className="text-brand-blue">Work</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base">High-impact systems and platforms I've built.</p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative bg-dark-muted/30 rounded-2xl border border-white/5 overflow-hidden hover:border-brand-blue/20 transition-colors"
        >
          <div className="grid md:grid-cols-5 gap-0">
            <div className="relative overflow-hidden md:col-span-2 aspect-square md:aspect-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 group-hover:scale-110 transition-transform duration-700" />
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-5xl opacity-10">📚</div>
              </div>
              <img 
                src={mainProject.image} 
                alt={mainProject.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-overlay opacity-80"
              />
            </div>

            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
              <motion.div 
                className="inline-block text-xs font-medium text-brand-blue px-3 py-1 rounded bg-brand-blue/10 border border-brand-blue/20 mb-4 w-fit"
                whileHover={{ scale: 1.05 }}
              >
                Featured Project
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-semibold font-display mb-4 group-hover:text-brand-blue transition-colors text-white">
                {mainProject.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {mainProject.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {mainProject.tags.map(tag => (
                  <motion.span 
                    key={tag} 
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-400"
                    whileHover={{ borderColor: "rgba(109, 156, 255, 0.5)" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <motion.a 
                  href={mainProject.link} 
                  className="px-6 py-2.5 bg-white text-dark-surface font-semibold text-sm rounded-lg hover:bg-gray-100 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.a>
                <motion.a 
                  href={mainProject.github} 
                  className="font-medium text-gray-400 hover:text-brand-blue transition-colors text-sm flex items-center gap-2 group/link"
                  whileHover={{ x: 4 }}
                >
                  GitHub <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold font-display text-white mb-8"
          >
            Other <span className="text-gradient">Projects</span>
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-xl bg-dark-muted/30 border border-white/5 group hover:border-brand-blue/30 transition-all"
              >
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {project.icon}
                </motion.div>
                <h4 className="text-xl font-semibold text-white mb-3">{project.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium text-gray-500 bg-white/5 rounded border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Source Contributions */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold font-display text-white mb-8"
          >
            Open Source <span className="text-gradient">Contributions</span>
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "TensorFlow",
                description: "Contributed performance improvements to neural network optimization modules.",
                role: "Contributor",
                link: "https://github.com/tensorflow/tensorflow"
              },
              {
                name: "React Documentation",
                description: "Enhanced learning materials and examples for advanced patterns and hooks.",
                role: "Contributor",
                link: "https://github.com/facebook/react"
              }
            ].map((contrib, i) => (
              <motion.a
                key={contrib.name}
                href={contrib.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(109, 156, 255, 0.3)" }}
                className="p-6 rounded-xl bg-dark-muted/20 border border-white/5 hover:border-brand-blue/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white flex-1">{contrib.name}</h4>
                  <span className="text-xs font-medium text-brand-blue px-2.5 py-1 bg-brand-blue/10 rounded-full whitespace-nowrap ml-3">
                    {contrib.role}
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{contrib.description}</p>
                <div className="mt-4 text-xs text-gray-500 flex items-center gap-1 group">
                  View on GitHub <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-xl bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-purple/5 border border-dashed border-white/10 text-center"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-semibold text-white mb-2">More Coming Soon</h3>
          <p className="text-gray-400 text-sm">Currently architecting next-generation systems. Details coming soon.</p>
        </motion.div>
      </div>
    </div>
  )
}
