import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export default function Skills() {
  const categories = [
    { 
      name: "Frontend Architecture", 
      emoji: "📐",
      items: ["Python", "JavaScript", "TypeScript", "Java", "Swift", "HTML5"] 
    },
    { 
      name: "Frontend", 
      emoji: "🎨",
      items: ["React", "Next.js", "Tailwind CSS", "UI/UX Design", "Responsive Design"] 
    },
    { 
      name: "Backend & APIs", 
      emoji: "⚙️",
      items: ["Flask", "FastAPI", "API Design", "Secure API Design", "Web Security", "REST Architecture"] 
    },
    { 
      name: "Machine Learning & AI", 
      emoji: "🧠",
      items: ["TensorFlow", "PyTorch", "Scikit-Learn", "Deep Learning", "NLP", "Model Deployment"] 
    },
    { 
      name: "Data & Databases", 
      emoji: "🗄️",
      items: ["Pandas", "NumPy", "SQLite", "ORM Tools", "Data Pipelines", "Data Cleaning"] 
    },
    { 
      name: "Engineering & Problem Solving", 
      emoji: "🔧",
      items: ["System Design", "Data Structures & Algorithms", "Competitive Programming", "Problem Solving", "Debugging"] 
    },
    { 
      name: "Tools & Workflow", 
      emoji: "🛠️",
      items: ["Git & GitHub", "VS Code", "Technical Writing", "Communication", "Leadership"] 
    },
    { 
      name: "Mindset & Approach", 
      emoji: "🚀",
      items: ["Startup Mindset", "Systems Thinking", "Critical Thinking", "Innovation"] 
    },
  ]

  return (
    <div className="pt-32 px-6 min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-16 text-center text-white"
      >
        <h1 className="text-5xl md:text-6xl font-semibold font-display mb-4">
          Tech <span className="text-brand-purple">Arsenal</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base">
          Tools and technologies I use to build scalable, thoughtful systems.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 mb-20">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="p-8 rounded-2xl bg-dark-muted/30 border border-white/5 relative group hover:border-brand-blue/30 transition-all"
          >
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-purple/10 rounded-full blur-3xl group-hover:bg-brand-purple/20 transition-all" />
            <motion.div 
              className="w-12 h-12 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6 text-2xl select-none"
              whileHover={{ scale: 1.2, rotate: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {cat.emoji}
            </motion.div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-2 relative z-10">
              {cat.items.map((item, idx) => (
                <motion.span 
                  key={item} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.02] text-xs font-medium text-gray-400 transition-all border border-white/5 hover:border-brand-blue/50 hover:text-gray-200"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional context */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto p-10 rounded-xl bg-white/[0.02] border border-white/5"
      >
        <h3 className="text-xl font-semibold text-white mb-4">What I Focus On</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          My expertise spans full-stack development, AI/machine learning, and systems architecture. I'm passionate about building intelligent systems that solve real problems—whether that's leveraging deep learning for complex pattern recognition, designing scalable APIs, or crafting intuitive user experiences. I approach every project with systems thinking, competitive rigor, and a focus on sustainable, well-engineered solutions.
        </p>
      </motion.div>
    </div>
  )
}
