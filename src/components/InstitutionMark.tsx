import { useState } from 'react'

/**
 * Shows an institution's official logo if the file exists in /public/logos,
 * otherwise falls back to a plain text chip.
 * Drop the official file at: public/logos/stanford.png (or .svg — change `src`).
 */
export function InstitutionMark({ name, src, className = '' }: { name: string; src: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!failed) {
    return (
      <span className={`inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 shadow-[0_0_20px_rgba(177,39,45,0.35)] ${className}`}>
        <img src={src} alt={`${name} logo`} className="h-4 w-auto" onError={() => setFailed(true)} />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#8c1515]">{name}</span>
      </span>
    )
  }
  return (
    <span className={`rounded-full bg-[#b1272d] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(177,39,45,0.5)] ${className}`}>
      {name}
    </span>
  )
}
