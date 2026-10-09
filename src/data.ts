export const LINKS = {
  email: 'sashforapps@gmail.com',
  github: 'https://github.com/Sashreek75?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/sashreek-pinjala-948685365/',
  devpost: 'https://devpost.com/sashforapps/challenges',
}

export type Category = 'Building' | 'Research' | 'Work'
export type Visual = 'synapse' | 'discern' | 'neuro' | 'verify' | 'utm' | 'pyquest' | 'eeg'
export type Phase = 'building' | 'built'

export interface Project {
  id: string
  title: string
  role: string
  org?: string
  dates: string
  category: Category
  status: string
  tagline: string
  summary: string
  points: string[]
  tags: string[]
  accent: string
  visual: Visual
  image: string
  kicker: string
  phase: Phase
  figure: string
  badge?: string
  note?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'neurolabs',
    figure: 'Multichannel EEG with an ictal burst crossing the event marker.',
    phase: 'building',
    image: '/projects/neuro.jpg',
    kicker: 'Mobile app',
    title: 'NeuroLabs',
    role: 'Creator',
    dates: 'Oct 2026',
    category: 'Building',
    status: 'Shipping',
    tagline: 'A deterministic, offline-first seizure response system for caregivers.',
    summary:
      "During a seizure, the caregiver's cognitive load spikes at exactly the moment they need to act correctly, so the interface has to carry the decision-making. One SEIZURE action drops the app into an event state machine: an accurate event timer starts, a 1–2 s camera capture records what the seizure looks like for later clinical review, and a versioned first-aid protocol walks through each step with button-only inputs. Nobody types during an emergency.",
    points: [
      'Three-layer architecture: a deterministic, versioned protocol layer with no AI in it, an event-state layer that tracks onset, duration and observations, and an optional personalization layer that can only choose or rephrase actions the protocol already permits.',
      'Hard escalation thresholds no AI layer can override. A seizure running past 5 minutes, the operational cutoff for status epilepticus, triggers the emergency path.',
      'Guidance drawn from Epilepsy Foundation, CDC and ILAE material and stored as updatable protocol data, not hard-coded strings.',
      'Local-first: the emergency flow runs with no network, no backend, no login and no LLM call. If anything optional fails, it falls back to the deterministic protocol.',
      'Post-ictal recovery mode, event history, a personal Seizure Action Plan kept clearly separate from general guidance, and a structured event report exported as a PDF for a neurologist.',
      "Built for the Congressional App Challenge, so it has to make sense to someone opening it for the first time.",
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'State machines', 'Offline-first'],
    accent: '#ff6b8b',
    visual: 'neuro',
    note: "NeuroLabs isn't a medical device. It doesn't diagnose, and it doesn't replace emergency services or a neurologist.",
  },
  {
    id: 'epilepsy',
    figure: 'Spectrogram and channel traces across a seizure window.',
    phase: 'building',
    image: '/projects/eeg.jpg',
    kicker: 'Research',
    title: 'Epilepsy Research',
    role: 'Seizure detection under distribution shift',
    dates: '2026 — now',
    category: 'Research',
    status: 'Researching',
    tagline: 'Characterizing how seizure-detection models behave under distribution shift.',
    summary:
      "Before anyone proposes a reliable cross-dataset seizure detector, we need to understand exactly how shifts in the data change a model's output: switching datasets, changing which patients are in them, the recording environment, and the other components of distribution shift. Paper after paper flags the same gap, which is that models struggle to generalize to unseen patients and to data that differs from what they were trained on. My research targets that gap by empirically evaluating detection models on imperfect, variable data and mapping the trends and failure patterns that emerge.",
    points: [
      'Research question: which factors and EEG representations break detection systems under distribution shift, which stay invariant, and why?',
      'The gap: generalizing to unseen patients and out-of-distribution data is a well-documented weak point in seizure detection.',
      "Why it matters: clinics won't have perfect data on an epilepsy-prone patient, and seizures can be stochastic. A model that only works in a clean, structured setup with perfect data isn't reliable in the real world.",
      'The approach: systematically vary the components of distribution shift (the dataset, the patients within it, the recording environment) and measure how model output changes with each one.',
      'The goal: identify the trends and patterns behind failure under shift, as groundwork that has to come before any claim of cross-dataset reliability.',
    ],
    tags: ['EEG', 'Seizure detection', 'Distribution shift', 'Invariance'],
    accent: '#c084fc',
    visual: 'eeg',
  },
  {
    id: 'synapse',
    figure: 'Attention drifting, then pulled back to a single point of focus.',
    phase: 'building',
    image: '/projects/synapse.jpg',
    kicker: 'Startup',
    title: 'Synapse Adaptive',
    role: 'Founder',
    dates: 'Jul 2026 — now',
    category: 'Building',
    status: 'Building',
    tagline: 'A context-aware intervention agent that lives in a floating orb.',
    summary:
      "Synapse is a native desktop app with no dashboard and no chat window. Its whole interface is an orb at the edge of the screen. Behind it is one unified state, combining your goals, live screen context, memory and behavioral history, that decides when to intervene, how hard to push, and when to back off. It's built for anyone with embarrassingly big goals, starting with me.",
    points: [
      "Watch-first detection: it observes what you're actually doing on a site before flagging anything, so YouTube for PSAT prep or focus music isn't counted as distraction. It never blocks by domain name alone.",
      'The intervention loop: when you drift, the orb expands and asks why. A valid reason earns an exact timed pass. No reason within 15 seconds and the tab closes. The countdown pauses while it evaluates your answer.',
      'Infers working, on-break and done-for-the-day states from context, and grants real breaks after sustained effort instead of punishing them.',
      'Hard user controls: /pause releases all control of the machine, /reset hands it back.',
      'Electron app plus an invisible browser helper extension that reports URLs and holds or closes tabs, with a thin cloud relay so no API key ships inside the installer. Mac support is a top priority.',
    ],
    tags: ['Electron', 'TypeScript', 'Browser extension', 'LLM agents', 'Context modeling'],
    accent: '#ffb36b',
    visual: 'synapse',
  },
  {
    id: 'discern',
    figure: 'Six layers of candidate states, with one diagnosed path lit.',
    phase: 'built',
    image: '/projects/discern.jpg',
    kicker: 'Research',
    badge: 'Stanford',
    title: 'Stanford Cognitive Science Research',
    role: 'DISCERN',
    org: 'Stanford cognitive science',
    dates: 'Sep 2026',
    category: 'Research',
    status: 'Done',
    tagline: 'Formalizing adaptive intervention selection as a sequential decision problem.',
    summary:
      "Most interventions for self-regulation are one-size-fits-all. DISCERN asks whether a general adaptive framework can infer which latent self-regulatory bottleneck is actually limiting goal-directed behavior, then select an intervention matched to that bottleneck. I model it as a sequential decision process and evaluate it on a synthetic benchmark where the ground-truth bottleneck is known, so diagnosis is directly measurable.",
    points: [
      'Six latent bottlenecks: goal ambiguity, task scope and overload, distraction, timing and resource mismatch, competing priorities, and failure to learn from outcomes.',
      'Data comes from mathematically specified scenarios rather than an external dataset, which gives known latent ground truth for every simulated agent.',
      "The benchmark is built so the framework can genuinely fail. The simulator isn't tuned in DISCERN's favor, and questionable design choices get flagged instead of quietly shipped.",
      'Run through staged gates: a sanity run, pre-run checks, a frozen preregistration, then the full benchmark against baselines that include a diagnosis-only policy.',
      'Negative results get reported, not engineered away. The contribution is framed as formalization and computational evaluation, not as proof of efficacy in humans.',
    ],
    tags: ['Python', 'Sequential decision-making', 'Computational modeling', 'Preregistration'],
    accent: '#5ef2c2',
    visual: 'discern',
  },
  {
    id: 'utm',
    figure: '3,000+ applicants, one selected node.',
    phase: 'built',
    image: '/projects/utm.jpg',
    kicker: 'Internships',
    title: 'Universal Tech Movement',
    role: 'Business Intern + Tech Intern',
    dates: 'Jun 2026 — now',
    category: 'Work',
    status: 'Done',
    tagline: 'Business development training plus internal ops tooling on the Web Application Team.',
    summary:
      "Selected for the Ladders for Leaders program out of 3,000+ applicants, which meant training directly with Devin Voorsanger on how companies get built, pitched and sold. A month later I joined UTM Technology & Service's Web Application Team to build internal tooling.",
    points: [
      'Business: practical business, communication and sales across SaaS, GovTech and digital equity. UTM has raised $32M, created 400+ jobs and launched 100+ startups.',
      'Tech: built an internal operations platform that consolidates workflows, check-ins and customer service into one system for the team.',
      'Seeing operational friction up close fed straight into how I designed Synapse.',
    ],
    tags: ['Full-stack', 'Internal tooling', 'Sales', 'Ladders for Leaders'],
    accent: '#b477ff',
    visual: 'utm',
  },
  {
    id: 'compliance',
    figure: 'Verification traces converging on a verified provider.',
    phase: 'built',
    image: '/projects/verify.jpg',
    kicker: 'Internship',
    title: 'Compliance Watchdog',
    role: 'AI Intern',
    dates: 'Jun — Jul 2026',
    category: 'Work',
    status: 'Done',
    tagline: 'An agentic orchestration layer for healthcare provider credentialing.',
    summary:
      'Before a provider can treat patients, they have to clear primary-source verification against a stack of federal and state registries. I helped build an agentic AI system that orchestrates those checks across the credentialing and provider-verification lifecycle, turning a manual, lookup-heavy workflow into one automated pipeline.',
    points: [
      'An orchestration layer that dispatches and coordinates verification across NPI (the NPPES registry), OIG exclusions (LEIE), SAM.gov debarment records and state license boards.',
      'Saved $5,000+ and cut verification turnaround by more than 50%.',
      'Agents handle the lookups so the team can focus on white-glove customer service.',
    ],
    tags: ['Agentic AI', 'Orchestration', 'Primary-source verification', 'Healthcare'],
    accent: '#6d9cff',
    visual: 'verify',
  },
  {
    id: 'pyquest',
    figure: 'A level path: six solved, three to go.',
    phase: 'built',
    image: '/projects/pyquest.jpg',
    kicker: 'App',
    title: 'PyQuest',
    role: 'Creator',
    dates: '2024',
    category: 'Building',
    status: 'Done',
    tagline: 'A gamified, full-stack app for learning to code.',
    summary:
      "My first serious full-stack build. PyQuest turns learning programming into a progression system of levels, challenges and feedback loops, so practice feels less like homework and more like a game. It's also where I first got hooked on the cognitive side of learning: motivation, reward and why people keep going (or quit).",
    points: [
      'Level-based progression with challenges that unlock as you go.',
      'Full-stack implementation, from the challenge content to the progress tracking behind it.',
      'Designed around motivation and feedback loops instead of just content delivery.',
    ],
    tags: ['Python', 'Full-stack', 'Gamification', 'Learning science'],
    accent: '#7dd3fc',
    visual: 'pyquest',
  },
]

export const TIMELINE = [
  {
    when: '2022',
    title: 'A really scrappy Flappy Bird',
    body: "Taught myself JavaScript and built a Flappy Bird clone. It was rough. It also made me realize I could just build things, and I haven't stopped since.",
  },
  {
    when: '2024',
    title: 'Python, properly',
    body: 'Went deep on Python and earned my PCEP certification from the Python Institute. Started building full-stack apps for problems I actually saw around me.',
  },
  {
    when: '2024',
    title: 'Thinking about how people learn',
    body: 'Built my first real app around learning to code, and got hooked on a bigger question: what actually makes people learn, focus and follow through?',
  },
  {
    when: '2026',
    title: 'Into the real world',
    body: 'First internships, in AI and in business. Learned how real teams ship software, and how ideas get pitched and sold.',
  },
  {
    when: '2026',
    title: 'Research + building',
    body: 'Started doing actual cognitive science research and building my own products, which turned out to be two sides of the same curiosity.',
  },
]

export const SKILLS = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Swift', 'HTML / CSS'] },
  { group: 'Web & mobile', items: ['React', 'React Native', 'Expo', 'Next.js', 'Tailwind', 'Framer Motion'] },
  { group: 'Backend & AI', items: ['Flask', 'FastAPI', 'REST APIs', 'Agentic AI', 'LLM orchestration', 'Electron'] },
  { group: 'ML & data', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'NumPy', 'Pandas', 'SQLite'] },
  { group: 'Research', items: ['Computational modeling', 'Simulation design', 'Preregistration', 'Statistics'] },
  { group: 'How I work', items: ['Git & GitHub', 'VS Code', 'Shipping early', 'Talking to users'] },
]
