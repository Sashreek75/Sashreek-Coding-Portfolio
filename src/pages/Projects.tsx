import { SplitText, Reveal, EEGStrip } from '../components/motion'
import { ProjectTimeline } from '../components/ProjectTimeline'
import { PROJECTS } from '../data'

export default function Projects() {
  return (
    <div className="px-6 pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal y={16}>
              <span className="font-mono text-xs text-gray-500">
                <span className="text-brand-mint">{'//'}</span> projects & activities · {PROJECTS.length}
              </span>
            </Reveal>
            <h1 className="mt-6 text-6xl leading-[0.95] md:text-8xl">
              <SplitText text="Stuff I've" stagger={0.03} />
              <br />
              <span className="text-gradient">
                <SplitText text="built & done." delay={0.3} stagger={0.03} />
              </span>
            </h1>
          </div>
          <Reveal delay={0.5} className="md:col-span-4">
            <p className="text-lg leading-relaxed text-gray-400">
              What I'm building now sits at the top, and what I've already built is further down the stem. Click any card to dig in.
            </p>
          </Reveal>
        </div>
        <EEGStrip className="mb-8" />
        <ProjectTimeline detailed />
      </div>
    </div>
  )
}
