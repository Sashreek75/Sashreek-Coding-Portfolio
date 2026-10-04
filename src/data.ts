export const LINKS = {
  email: 'sashforapps@gmail.com',
  github: 'https://github.com/Sashreek75?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/sashreek-pinjala-948685365/',
  devpost: 'https://devpost.com/sashforapps/challenges',
}

export type Category = 'Building' | 'Research' | 'Work'
export type Visual = 'synapse' | 'discern' | 'neuro' | 'verify' | 'utm'

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
  note?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'synapse',
    title: 'Synapse Adaptive',
    role: 'Founder',
    dates: 'Jul 2026 — now',
    category: 'Building',
    status: 'Building',
    tagline: 'The accountability partner for anyone with embarrassingly big goals.',
    summary:
      "Synapse is a little orb that lives on the edge of your screen. It stays quiet while you work. Wander off to something distracting and it asks one honest question: why are you here? Give it a real reason and you get your break. Don't, and the tab closes itself in 15 seconds.",
    points: [
      'No dashboard, no chat window. The orb is the whole app.',
      "It watches what you're actually doing before it says anything. YouTube for PSAT prep isn't a distraction.",
      "Knows the difference between slacking off and needing a break after three hours of real work.",
      "Started it because I get distracted easily, and nothing out there understood why I'd opened that tab.",
    ],
    tags: ['Desktop app', 'Electron', 'TypeScript', 'AI'],
    accent: '#ffb36b',
    visual: 'synapse',
  },
  {
    id: 'discern',
    title: 'DISCERN',
    role: 'Cognitive science research',
    org: 'with Stanford professor Ashish Mehta',
    dates: '2026 — now',
    category: 'Research',
    status: 'Researching',
    tagline: "Figure out why someone's stuck before deciding how to help.",
    summary:
      "Most productivity advice hands everyone the same fix. DISCERN starts with a different question: what's actually holding this person back? Unclear goals, too much on their plate, distraction, bad timing, competing priorities, or not learning from what happened last time. Then it picks the intervention that fits.",
    points: [
      'Framed adaptive intervention selection as a sequential decision problem.',
      "Built a synthetic benchmark where the real bottleneck is known, so the framework can be checked, and can genuinely fail.",
      'Preregistered the experiment before running it, and kept the results that didn\'t go my way.',
      'Working on it under Stanford professor Ashish Mehta.',
    ],
    tags: ['Python', 'Computational modeling', 'Simulation', 'Cognitive science'],
    accent: '#5ef2c2',
    visual: 'discern',
  },
  {
    id: 'neurolabs',
    title: 'NeuroLabs',
    role: 'Creator',
    dates: '2026',
    category: 'Building',
    status: 'Shipping',
    tagline: 'Know what to do when a seizure happens.',
    summary:
      "When someone has a seizure, the people next to them have seconds to get it right, and most have no idea what to do. NeuroLabs turns a phone into a calm guide. One huge button starts seizure mode, a timer starts running, and clear first-aid steps walk you through it.",
    points: [
      "One tap into seizure mode: accurate timer, quick camera capture, and button-only questions. Nobody should be typing during an emergency.",
      'Tells you when it\'s time to call for help, like when a seizure goes past 5 minutes.',
      'Recovery mode, history, and an event report you can export as a PDF for a neurologist.',
      'Works fully offline with no login. No AI makes emergency calls. The steps are fixed and based on Epilepsy Foundation, CDC and ILAE guidance.',
      'Built for the Congressional App Challenge.',
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'Offline-first'],
    accent: '#ff6b8b',
    visual: 'neuro',
    note: "NeuroLabs isn't a medical device and doesn't replace emergency services or a doctor.",
  },
  {
    id: 'compliance',
    title: 'Compliance Watchdog',
    role: 'AI Intern',
    dates: 'Jun — Jul 2026',
    category: 'Work',
    status: 'Done',
    tagline: 'Taught an AI agent to do the paperwork nobody wants to do.',
    summary:
      "Before a healthcare provider can see patients, someone has to check them against a stack of government databases. I helped build an agentic AI system that runs those checks on its own, so the team could spend their time on customers instead of lookups.",
    points: [
      'Automated NPI, OIG, SAM and license verification through one orchestration layer.',
      'Saved the company $5,000+.',
      'Cut verification time by more than half.',
      'Freed the team up for the white-glove customer service they\'re known for.',
    ],
    tags: ['Agentic AI', 'Orchestration', 'Healthcare'],
    accent: '#6d9cff',
    visual: 'verify',
  },
  {
    id: 'utm',
    title: 'Universal Tech Movement',
    role: 'Business Intern + Tech Intern',
    dates: 'Jun 2026 — now',
    category: 'Work',
    status: 'Ongoing',
    tagline: 'Picked out of 3,000+ applicants. Stayed for two jobs.',
    summary:
      "I got into the Ladders for Leaders program, which put me next to Devin Voorsanger learning how real businesses get built and sold. A month in, I joined the Web Application Team too.",
    points: [
      'Business: learned practical business, communication and sales from Devin Voorsanger. UTM has raised $32M, created 400+ jobs and launched 100+ startups.',
      'Tech: built an internal operations platform for UTM Technology & Service that pulls workflows, check-ins and customer service into one place.',
      'Watching people juggle all of that is a big part of what got me building Synapse.',
    ],
    tags: ['Web apps', 'Operations', 'Sales', 'Ladders for Leaders'],
    accent: '#b477ff',
    visual: 'utm',
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
    title: 'PyQuest',
    body: 'A gamified app for learning to code. My first time thinking hard about how people learn, which turned out to be the thread running through everything after it.',
  },
  {
    when: 'Jun 2026',
    title: 'Two internships at once',
    body: 'AI Intern at Compliance Watchdog, and Business Intern at Universal Tech Movement through Ladders for Leaders (3,000+ applicants).',
  },
  {
    when: 'Jul 2026',
    title: 'Started Synapse Adaptive',
    body: 'Joined UTM\'s Web Application Team, and started building the accountability partner I wished I had.',
  },
  {
    when: '2026',
    title: 'Stanford research',
    body: 'Started DISCERN, a cognitive science research project on adaptive self-regulation, under Stanford professor Ashish Mehta.',
  },
  {
    when: 'Oct 2026',
    title: 'NeuroLabs, rebuilt',
    body: 'Threw out the old version and rebuilt NeuroLabs from scratch as a seizure emergency-response app for caregivers.',
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
