import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  const interests = [
    { label: "Neurocognitive Systems", icon: "🧠" },
    { label: "AI-Powered Learning", icon: "🤖" },
    { label: "Systems Architecture", icon: "🏗️" },
    { label: "Human-AI Interaction", icon: "🔗" },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="/systems_builder.png" 
            alt="Systems Architecture" 
            className="w-full h-full object-cover opacity-20 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-surface via-transparent to-dark-surface" />
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-brand-blue text-xs font-medium mb-8 backdrop-blur-md"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              Builder with intent
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-semibold leading-tight mb-6 font-display text-white">
              I build <span className="text-gradient">intelligent systems</span> <br /> that amplify human potential.
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed px-4">
              Combining neuroscience, AI, and systems thinking to architect platforms that genuinely matter. I focus on the intersection of cognitive science and technology—where elegant engineering meets human understanding.
            </p>

            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed px-4">
              Currently exploring: adaptive learning systems, human-AI collaboration patterns, and scaling intelligence.
            </p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/projects"
                className="px-8 py-3 bg-white text-dark-surface font-semibold text-sm rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 hover:scale-105"
              >
                Explore My Work →
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white/[0.03] text-white font-semibold text-sm rounded-xl border border-white/10 hover:bg-white/[0.08] transition-all backdrop-blur-md active:scale-95 hover:scale-105"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-dark-muted/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold font-display text-white mb-6">Who I Am</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                I'm a high school student and builder obsessed with understanding how systems work—whether that's how humans learn, how AI models reason, or how algorithms scale. My journey is rooted in curiosity, software engineering, and a deep interest in cognitive science.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                I love to architect experiences and systems that leverage cognitive science to make learning, decision-making, and human-computer interaction more natural and effective. I'm focused on building foundational systems that solve real problems.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: "10+", label: "Projects Built", description: "Learning applications and foundational systems" },
              { number: "2+", label: "Years Coding", description: "In Python, JS/TS, and AI/ML concepts" },
              { number: "100%", label: "Commitment", description: "To excellence and continuous learning" },
              { number: "∞", label: "Potential", description: "Always exploring new frontiers" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/30 transition-all text-center group"
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold font-display text-brand-blue mb-2 group-hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.15 }}
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-1">{stat.label}</h3>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold font-display text-white mb-12 text-center"
          >
            Areas of <span className="text-gradient">Focus</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {interests.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/30 transition-all group cursor-default flex items-center gap-4"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-brand-blue transition-colors">{item.label}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="py-24 px-6 bg-dark-muted/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-display text-white leading-tight">Philosophy of a <br /><span className="text-brand-purple">Systems Builder</span></h2>
            <p className="text-gray-400 text-base leading-relaxed">
              At my core, I think like an architect. I break down problems, question their existence, and design something fundamentally better. Whether it's healthcare, career development, or learning, I'm drawn to meaningful complexity.
            </p>
            <div className="space-y-6 pt-6">
              <motion.div 
                className="flex items-start gap-4 border-l-2 border-brand-purple/50 pl-5 group cursor-default"
                whileHover={{ x: 8 }}
              >
                <div>
                  <h4 className="font-semibold text-white mb-1 text-brand-purple text-sm">Strategic Design</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Solutions that rethink entire ecosystems, prioritizing intent over ego.</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-start gap-4 border-l-2 border-brand-blue/50 pl-5 group cursor-default"
                whileHover={{ x: 8 }}
              >
                <div>
                  <h4 className="font-semibold text-white mb-1 text-brand-blue text-sm">Operational Scaling</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Every solution designed to perform under real-world pressure and scale.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div 
              className="aspect-square glass rounded-3xl overflow-hidden relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                 <motion.div 
                   className="text-7xl mb-8 opacity-50 group-hover:opacity-100 transition-opacity"
                   animate={{ rotate: [0, 5, -5, 0] }}
                   transition={{ duration: 4, repeat: Infinity }}
                 >
                   ⚙️
                 </motion.div>
                 <p className="text-lg font-semibold text-white leading-relaxed">"True engineering satisfies curiosity.<br /> Meaningful building satisfies purpose."</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Arena (Basketball & Life) */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold font-display mb-6 text-white">
            In <span className="text-gradient">The Arena</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">Where strategy meets execution. Beyond the code, I find drive in competition and elite performance.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            { 
              emoji: "🏆", 
              title: "Strategic Execution", 
              desc: "Drawing inspiration from elite performance. Vision, timing, and controlled excellence." 
            },
            { 
              emoji: "⚡", 
              title: "Performance Under Pressure", 
              desc: "Making crucial decisions when stakes are highest. Real-time optimization at scale." 
            },
            { 
              emoji: "🧮", 
              title: "Competitive Drive", 
              desc: "Satisfied with nothing less than excellence in every system I build." 
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-dark-muted/40 border border-white/5 group hover:border-brand-blue/30 transition-all text-left relative overflow-hidden flex flex-col justify-between h-[300px]"
            >
              <motion.div 
                className="text-5xl opacity-15 group-hover:opacity-40 transition-opacity"
                whileHover={{ scale: 1.2 }}
              >
                {item.emoji}
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-dark-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-display text-white mb-4">What Others <span className="text-gradient">Say</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Feedback from collaborators and those who've worked with me.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                quote: "Exceptional ability to translate complex concepts into elegant solutions. A true systems thinker.",
                author: "Technical Lead",
                role: "At AI Startup"
              },
              {
                quote: "Brings a unique perspective combining neuroscience with engineering. Incredibly thoughtful and purposeful.",
                author: "Product Manager",
                role: "EdTech Company"
              },
              {
                quote: "Problem-solving approach is strategic and meticulous. Always thinking about scalability and real impact.",
                author: "Co-Founder",
                role: "Research Initiative"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/30 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <motion.span
                      key={j}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="text-brand-blue"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-24 px-6 bg-dark-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold font-display text-white mb-4">Featured <span className="text-gradient">Work</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">High-agency systems that drive intellectual growth and real-world expertise.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-dark-muted/30 rounded-2xl border border-white/5 overflow-hidden group hover:border-brand-blue/20 transition-colors"
          >
            <div className="grid md:grid-cols-3 gap-0">
              <div className="relative overflow-hidden md:col-span-1 aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 group-hover:scale-110 transition-transform duration-700" />
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-6xl opacity-10">📚</div>
                </div>
              </div>

              <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-block text-xs font-medium text-brand-blue px-3 py-1 rounded bg-brand-blue/10 border border-brand-blue/20 mb-6 w-fit">
                  FEATURED PROJECT
                </div>
                
                <h3 className="text-3xl md:text-4xl font-semibold font-display mb-4 group-hover:text-brand-blue transition-colors text-white">PyQuest</h3>
                <p className="text-gray-400 text-base leading-relaxed mb-6">A world-class learning platform that bridges the gap between learning syntax and professional engineering. Features adaptive challenges powered by GPT-4 and real-time performance analysis.</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React", "TypeScript", "Node.js", "GPT-4"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link to="/projects" className="inline-flex items-center gap-2 font-semibold text-white hover:text-brand-blue transition-colors group/link">
                  View full details <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-brand-blue/10 via-transparent to-brand-purple/10 border border-white/5 rounded-3xl p-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight text-white">Ready to work together?</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">Whether you're exploring a new idea, building a system, or need strategic guidance—let's talk.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-white text-dark-surface font-semibold rounded-lg hover:bg-gray-100 transition-all active:scale-95 hover:scale-105">
              Start a conversation
            </Link>
            <a href="https://github.com/Sashr" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/[0.03] text-white font-semibold rounded-lg border border-white/10 hover:bg-white/[0.08] transition-all active:scale-95 hover:scale-105">
              View my GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
