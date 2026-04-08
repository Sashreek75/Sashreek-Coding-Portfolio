import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    { title: "EMAIL", value: "sashforapps@gmail.com", link: "mailto:sashforapps@gmail.com" },
    { title: "GITHUB", value: "github.com/Sashreek75", link: "https://github.com/Sashreek75?tab=repositories" },
    { title: "LINKEDIN", value: "sashreek-pinjala", link: "https://www.linkedin.com/in/sashreek-pinjala-948685365/" },
    { title: "DEVPOST", value: "sashforapps", link: "https://devpost.com/sashforapps/challenges" },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
      setFormState({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }, 800)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="pt-32 px-6 min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-16 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-semibold font-display mb-4 text-white">
          Let's <span className="text-gradient">Talk</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
          Whether you're exploring a new idea, need strategic consulting, or want to collaborate—I'm interested in meaningful conversations.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-start">
        {/* Contact Methods */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 space-y-6"
        >
          <div>
            <h3 className="text-lg font-semibold font-display text-white mb-2">Reach out</h3>
            <p className="text-gray-400 text-sm">Choose your preferred way to connect.</p>
          </div>
          
          <div className="space-y-3">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="group"
              >
                <a
                  href={item.link}
                  className="block p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-brand-blue/30 hover:bg-white/[0.05] transition-all"
                >
                  <div className="text-xs font-medium text-gray-500 mb-1">{item.title}</div>
                  <div className="text-sm font-semibold text-white group-hover:text-brand-blue transition-colors flex items-center justify-between">
                    {item.value}
                    {item.title === "EMAIL" && (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault()
                          copyToClipboard(item.value)
                        }}
                        className="text-xs opacity-0 group-hover:opacity-100"
                        title="Copy to clipboard"
                      >
                        📋
                      </motion.button>
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-6 border-t border-white/5"
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div 
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="text-xs font-medium text-gray-500">Available</div>
            </div>
            <p className="text-xs text-gray-600">Actively exploring collaborations and building interesting systems.</p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-3 p-8 rounded-2xl bg-dark-muted/30 border border-white/5"
        >
          <h3 className="text-lg font-semibold font-display text-white mb-6">Send a message</h3>
          
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
            >
              ✓ Thank you! I'll get back to you soon.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div 
              className="grid gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="text-xs font-medium text-gray-500">Name</label>
              <input 
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name" 
                className={cn(
                  "p-3 bg-white/[0.02] border rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 bg-transparent outline-none transition-all placeholder:text-gray-600 text-white text-sm",
                  errors.name ? "border-red-500/50" : "border-white/5"
                )}
              />
              {errors.name && (
                <motion.p className="text-xs text-red-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div 
              className="grid gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label className="text-xs font-medium text-gray-500">Email</label>
              <input 
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="your@email.com" 
                className={cn(
                  "p-3 bg-white/[0.02] border rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 bg-transparent outline-none transition-all placeholder:text-gray-600 text-white text-sm",
                  errors.email ? "border-red-500/50" : "border-white/5"
                )}
              />
              {errors.email && (
                <motion.p className="text-xs text-red-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div 
              className="grid gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="text-xs font-medium text-gray-500">Message</label>
              <textarea 
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4} 
                placeholder="What's on your mind?" 
                className={cn(
                  "p-3 bg-white/[0.02] border rounded-lg focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/20 bg-transparent outline-none transition-all placeholder:text-gray-600 resize-none text-white text-sm leading-relaxed",
                  errors.message ? "border-red-500/50" : "border-white/5"
                )}
              />
              {errors.message && (
                <motion.p className="text-xs text-red-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.message}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white text-dark-surface font-semibold rounded-lg hover:bg-gray-100 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
