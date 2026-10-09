import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react'
import { SplitText, Reveal, Magnetic } from '../components/motion'
import { EASE } from '../lib/ease'
import { LINKS } from '../data'
import { cn } from '../lib/utils'

const ROWS = [
  { label: 'Email', value: LINKS.email, href: `mailto:${LINKS.email}`, color: '#6d9cff' },
  { label: 'LinkedIn', value: 'sashreek-pinjala', href: LINKS.linkedin, color: '#b477ff' },
  { label: 'GitHub', value: 'Sashreek75', href: LINKS.github, color: '#5ef2c2' },
  { label: 'Devpost', value: 'sashforapps', href: LINKS.devpost, color: '#ffb36b' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked; the mailto link still works */
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!form.name.trim()) er.name = "What's your name?"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'That email looks off'
    if (form.message.trim().length < 10) er.message = 'Say a little more'
    setErrors(er)
    if (Object.keys(er).length) return
    // Opens the visitor's email app with everything filled in
    const subject = encodeURIComponent(`Hey Sashreek, it's ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <div className="px-6 pb-32 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <Reveal y={16}>
          <span className="label">Contact</span>
        </Reveal>
        <h1 className="mt-6 text-[17vw] font-bold leading-[0.85] tracking-[-0.05em] md:text-[11rem]">
          <SplitText text="Say" stagger={0.05} />{' '}
          <span className="text-gradient">
            <SplitText text="hi." delay={0.2} stagger={0.06} />
          </span>
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-gray-400">
            Research, startups, internships, or just a good conversation about how brains work. My inbox is open and I actually read it.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          {/* Big link rows */}
          <div className="min-w-0 lg:col-span-7">
            {ROWS.map((r, i) => (
              <motion.a
                key={r.label}
                href={r.href}
                target={r.label === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: EASE }}
                className="group relative flex items-center justify-between gap-4 overflow-hidden border-b border-white/[0.08] py-7 first:border-t"
              >
                <span
                  className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100"
                  style={{ background: `linear-gradient(90deg, ${r.color}14, transparent)` }}
                />
                <div className="relative flex min-w-0 items-center gap-4 transition-transform duration-500 group-hover:translate-x-4 md:gap-5">
                  <span className="w-8 shrink-0 font-mono text-xs" style={{ color: r.color }}>
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="label text-[10px]">{r.label}</div>
                    <div className="mt-1 truncate font-display text-lg text-white sm:text-xl md:text-3xl">{r.value}</div>
                  </div>
                </div>
                <div className="relative flex shrink-0 items-center gap-2">
                  {r.label === 'Email' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        copy()
                      }}
                      className="hidden h-11 w-11 items-center justify-center rounded-md border border-white/10 text-gray-400 sm:flex transition-colors hover:text-white"
                      aria-label="Copy email"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check size={16} className="text-emerald-400" />
                          </motion.span>
                        ) : (
                          <motion.span key="n" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy size={16} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/[0.04] text-white transition-colors duration-200 group-hover:bg-brand-mint group-hover:text-dark-surface">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="min-w-0 lg:col-span-5"
          >
            <form onSubmit={onSubmit} className="card-border relative overflow-hidden rounded-xl bg-dark-card/70 p-8" noValidate>
              <h3 className="relative text-2xl">Or write it here</h3>
              <p className="relative mt-1 text-sm text-gray-500">It'll open your email app with this filled in.</p>
              <div className="relative mt-8 space-y-6">
                {(
                  [
                    ['name', 'Your name', 'text'],
                    ['email', 'Your email', 'email'],
                  ] as const
                ).map(([k, ph, type]) => (
                  <Field key={k} error={errors[k]}>
                    <input
                      name={k}
                      type={type}
                      value={form[k]}
                      onChange={onChange}
                      placeholder=" "
                      className="peer w-full border-b border-white/10 bg-transparent pb-3 pt-6 text-white outline-none transition-colors focus:border-transparent"
                    />
                    <FloatingLabel>{ph}</FloatingLabel>
                  </Field>
                ))}
                <Field error={errors.message}>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    placeholder=" "
                    className="peer w-full resize-none border-b border-white/10 bg-transparent pb-3 pt-6 text-white outline-none transition-colors focus:border-transparent"
                  />
                  <FloatingLabel>What's on your mind?</FloatingLabel>
                </Field>
              </div>
              <Magnetic className="relative mt-8 w-full" strength={0.15}>
                <button type="submit" className="group relative flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-white py-4 text-sm font-semibold text-dark-surface transition-colors duration-200 hover:bg-brand-mint">
                  <span className="relative">Send it</span>
                  <Send size={15} className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Magnetic>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative mt-4 text-center text-sm text-emerald-400"
                  >
                    Your email app should be opening. Talk soon!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            className="glass fixed bottom-8 left-1/2 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white"
          >
            <Check size={15} className="text-emerald-400" /> Email copied
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Field({ children, error }: { children: React.ReactNode; error?: string }) {
  return (
    <div className="relative">
      <div className="group relative">
        {children}
        <span
          className={cn(
            'pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-purple transition-transform duration-500 peer-focus:scale-x-100',
            error && 'scale-x-100 from-rose-500 to-rose-400',
          )}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-rose-400">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function FloatingLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="pointer-events-none absolute left-0 top-6 origin-left text-gray-500 transition-all duration-300 peer-focus:top-0 peer-focus:scale-75 peer-focus:text-brand-blue peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-75">
      {children}
    </label>
  )
}
