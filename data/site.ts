/* ==========================================================================
   Site content — the single source every section reads from.

   Kept as plain typed data so it can be swapped for a CMS later without
   touching the components. Numbers and copy mirror techcaddjalandhar.com;
   anything marked `TODO` is a placeholder for the PAN India rollout and must
   be confirmed before launch.
   ========================================================================== */

export const SITE = {
  name: 'techcadd',
  legalName: 'techcadd Computer Education',
  tagline: 'AI & Software Engineering training, across India',
  url: 'https://techcaddindia.com', // TODO: confirm production domain
  phone: '+91 98881 22254',
  phoneHref: 'tel:+919888122254',
  email: 'info@techcadd.com',
  hours: 'Mon – Sat, 9 AM – 7 PM',
  rating: { score: 4.9, reviews: 556 },
  socials: {
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    linkedin: 'https://www.linkedin.com/',
  },
}

/* ---------------------------------------------------------------- nav -- */

export type NavBadge = 'Hot' | 'Trending' | 'New'
export type NavLink = { label: string; href: string; badge?: NavBadge }

/** One numbered column of the Courses mega menu. */
export type NavColumn = { title: string; blurb: string; href: string; items: NavLink[] }

/** One icon tile of the Internship & Training panel. `icon` is a key into the map in Navbar.tsx. */
export type NavCard = NavLink & { icon: string }

/** One picture card of the About / Resources panels. */
export type NavFeatured = { title: string; href: string; image: string; tag: string; meta: string }

export type NavItem = {
  label: string
  href: string
  /** Small dropdown anchored under the item. */
  children?: { label: string; href: string; note?: string }[]
  /** Wide panel of numbered link columns (Courses). */
  columns?: NavColumn[]
  /** Wide panel of icon tiles (Internship & Training). */
  cards?: NavCard[]
  /** Wide panel: a link column beside three picture cards (About, Resources). */
  links?: NavLink[]
  linksTitle?: string
  featured?: NavFeatured[]
  cta?: { label: string; href: string }
}

/* Menu structure mirrors techcaddamritsar.com. Only eight courses have their
   own page so far (FEATURED_COURSES), so every other entry points at its
   category listing until its page exists.
   TODO: give each course and each training track its own page. */
const cat = (slug: string) => `/courses?category=${slug}`
const INTERNSHIP = '/certificate-programs'

export const NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    linksTitle: 'About',
    links: [
      { label: 'About techcadd', href: '/about' },
      { label: 'How We Train', href: '/about#how-it-works' },
      { label: 'Why techcadd', href: '/about#why-techcadd' },
    ],
    featured: [
      { title: 'About techcadd', href: '/about', image: '/images/course/campus1.webp', tag: 'Story', meta: '20 years of training' },
      { title: 'How We Train', href: '/about#how-it-works', image: '/images/course/classroom.webp', tag: 'Method', meta: 'Classroom to placement' },
      { title: 'Why techcadd', href: '/about#why-techcadd', image: '/images/course/lab.webp', tag: 'Purpose', meta: 'What sets us apart' },
    ],
    cta: { label: 'Talk to a counsellor', href: '/contact' },
  },
  {
    label: 'Courses',
    href: '/courses',
    columns: [
      {
        title: 'Programming',
        blurb: 'Core languages and full-stack engineering',
        href: cat('full-stack'),
        items: [
          { label: 'Python', href: '/courses/python-programming', badge: 'Hot' },
          { label: 'Java', href: cat('full-stack') },
          { label: 'C & C++', href: cat('full-stack') },
          { label: 'Kotlin', href: cat('full-stack'), badge: 'Trending' },
          { label: 'Web Designing', href: cat('full-stack') },
          { label: 'Web Development', href: cat('full-stack') },
          { label: 'MERN Stack', href: '/courses/full-stack-development', badge: 'Hot' },
          { label: 'MEAN Stack', href: cat('full-stack') },
          { label: 'PHP Full Stack', href: cat('full-stack') },
        ],
      },
      {
        title: 'AI & Data',
        blurb: 'Models, analytics and decision intelligence',
        href: cat('ai'),
        items: [
          { label: 'Artificial Intelligence', href: '/courses/ai-machine-learning', badge: 'Hot' },
          { label: 'Machine Learning', href: '/courses/ai-machine-learning', badge: 'Hot' },
          { label: 'Generative AI', href: '/courses/generative-agentic-ai' },
          { label: 'Agentic AI', href: '/courses/generative-agentic-ai', badge: 'New' },
          { label: 'Data Science', href: '/courses/data-science-analytics', badge: 'Trending' },
          { label: 'Data Analytics', href: '/courses/data-science-analytics', badge: 'Trending' },
          { label: 'Power BI', href: cat('data-science') },
          { label: 'Tableau', href: cat('data-science') },
        ],
      },
      {
        title: 'Digital Marketing',
        blurb: 'Growth, performance and commerce',
        href: cat('marketing'),
        items: [
          { label: 'Digital Marketing', href: '/courses/digital-marketing' },
          { label: 'Social Media Marketing', href: cat('marketing'), badge: 'Trending' },
          { label: 'Google Ads', href: cat('marketing') },
          { label: 'SEO', href: cat('marketing') },
          { label: 'WordPress', href: cat('marketing') },
          { label: 'Shopify', href: cat('marketing') },
          { label: 'Meta Ads', href: cat('marketing'), badge: 'New' },
        ],
      },
      {
        title: 'Cyber & Cloud',
        blurb: 'Secure, resilient infrastructure',
        href: cat('cyber'),
        items: [
          { label: 'Cybersecurity', href: '/courses/cybersecurity-ethical-hacking' },
          { label: 'Ethical Hacking', href: '/courses/cybersecurity-ethical-hacking', badge: 'Trending' },
          { label: 'Network Security', href: cat('cyber') },
          { label: 'SOC Analyst', href: cat('cyber'), badge: 'New' },
          { label: 'Cloud Computing', href: '/courses/cloud-devops' },
          { label: 'Linux', href: cat('cloud') },
          { label: 'AWS', href: cat('cloud'), badge: 'Hot' },
          { label: 'Microsoft Azure', href: cat('cloud') },
          { label: 'DevOps', href: '/courses/cloud-devops', badge: 'Trending' },
        ],
      },
      {
        title: 'More Courses',
        blurb: 'CADD, office, accounting and design',
        href: '/courses',
        items: [
          { label: 'Civil & Architecture CAD', href: '/courses', badge: 'New' },
          { label: 'Mechanical CAD & CAM', href: '/courses' },
          { label: 'Basic Computer', href: '/courses' },
          { label: 'Accounting & Tally', href: '/courses', badge: 'Hot' },
          { label: 'Graphics & Video', href: '/courses' },
        ],
      },
    ],
    cta: { label: 'Browse all courses', href: '/courses' },
  },
  {
    label: 'Internship & Training',
    href: INTERNSHIP,
    cards: [
      { label: 'Cloud Computing', href: INTERNSHIP, icon: 'cloud' },
      { label: 'Flutter App Development', href: INTERNSHIP, icon: 'mobile' },
      { label: 'MERN Stack', href: INTERNSHIP, icon: 'code' },
      { label: 'Agentic AI', href: INTERNSHIP, icon: 'zap', badge: 'New' },
      { label: 'Digital Marketing', href: INTERNSHIP, icon: 'trending' },
      { label: 'Data Analytics', href: INTERNSHIP, icon: 'chart' },
      { label: 'Data Science', href: INTERNSHIP, icon: 'database' },
      { label: 'Cyber Security', href: INTERNSHIP, icon: 'shield' },
      { label: 'Artificial Intelligence', href: INTERNSHIP, icon: 'cpu' },
      { label: 'Full Stack Development', href: INTERNSHIP, icon: 'layers' },
      { label: 'Basic Skill and Programs', href: INTERNSHIP, icon: 'book' },
      { label: 'Civil/Mechanical', href: INTERNSHIP, icon: 'tool' },
    ],
    cta: { label: 'See all training formats', href: INTERNSHIP },
  },
  { label: 'Services', href: '/services' },
  {
    label: 'Franchises',
    href: '/franchises',
    children: [
      { label: 'Open a Franchise', href: '/franchises', note: 'Partner with techcadd' },
      { label: 'Branches', href: '/branches', note: 'Centres across India' },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    linksTitle: 'Categories',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'AI at techcadd', href: '/ai' },
      { label: 'After 12th', href: '/after-12th' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Reviews', href: '/#testimonials' },
    ],
    featured: [
      { title: 'Blog', href: '/blog', image: '/images/course/classroom.webp', tag: 'Articles', meta: 'Latest' },
      { title: 'FAQ', href: '/#faq', image: '/images/course/lab.webp', tag: 'Answers', meta: 'Admissions' },
      { title: 'AI at techcadd', href: '/ai', image: '/images/categories/ai.webp', tag: 'Guide', meta: 'GenAI, agents, RAG' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

/* ------------------------------------------------------------- cities -- */

/**
 * `centre`  — a physical techcadd branch (from the Jalandhar site's branch list).
 * `online`  — a city served by live online batches.
 * TODO: the `online` list is a placeholder; replace with real enrolment data.
 */
export type City = {
  slug: string
  name: string
  state: string
  lat: number
  lon: number
  kind: 'centre' | 'online'
  hq?: boolean
}

export const CITIES: City[] = [
  { slug: 'jalandhar', name: 'Jalandhar', state: 'Punjab', lat: 31.33, lon: 75.58, kind: 'centre', hq: true },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Chandigarh', lat: 30.73, lon: 76.78, kind: 'centre' },
  { slug: 'mohali', name: 'Mohali', state: 'Punjab', lat: 30.7, lon: 76.72, kind: 'centre' },
  { slug: 'ludhiana', name: 'Ludhiana', state: 'Punjab', lat: 30.9, lon: 75.85, kind: 'centre' },
  { slug: 'phagwara', name: 'Phagwara', state: 'Punjab', lat: 31.22, lon: 75.77, kind: 'centre' },
  { slug: 'amritsar', name: 'Amritsar', state: 'Punjab', lat: 31.63, lon: 74.87, kind: 'centre' },
  { slug: 'hoshiarpur', name: 'Hoshiarpur', state: 'Punjab', lat: 31.53, lon: 75.91, kind: 'centre' },

  { slug: 'delhi', name: 'Delhi NCR', state: 'Delhi', lat: 28.61, lon: 77.21, kind: 'online' },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', lat: 26.91, lon: 75.79, kind: 'online' },
  { slug: 'dehradun', name: 'Dehradun', state: 'Uttarakhand', lat: 30.32, lon: 78.03, kind: 'online' },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.85, lon: 80.95, kind: 'online' },
  { slug: 'patna', name: 'Patna', state: 'Bihar', lat: 25.59, lon: 85.14, kind: 'online' },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', lat: 22.57, lon: 88.36, kind: 'online' },
  { slug: 'guwahati', name: 'Guwahati', state: 'Assam', lat: 26.14, lon: 91.74, kind: 'online' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', lat: 23.02, lon: 72.57, kind: 'online' },
  { slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.26, lon: 77.41, kind: 'online' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', lat: 19.08, lon: 72.88, kind: 'online' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', lat: 18.52, lon: 73.86, kind: 'online' },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', lat: 17.39, lon: 78.49, kind: 'online' },
  { slug: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', lat: 12.97, lon: 77.59, kind: 'online' },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', lat: 13.08, lon: 80.27, kind: 'online' },
  { slug: 'kochi', name: 'Kochi', state: 'Kerala', lat: 9.93, lon: 76.27, kind: 'online' },
]

export const CENTRES = CITIES.filter((c) => c.kind === 'centre')

/* -------------------------------------------------------------- stats -- */

export const STATS = [
  { value: 25000, suffix: '+', label: 'Engineers trained' },
  { value: 500, suffix: '+', label: 'Hiring partners' },
  { value: 100, suffix: '+', label: 'Technologies taught' },
  { value: 20, suffix: ' yrs', label: 'Of training excellence' },
]

/* ------------------------------------------------------------ courses -- */

export type Category = {
  slug: string
  title: string
  blurb: string
  image: string
  count: number
}

export const CATEGORIES: Category[] = [
  { slug: 'ai', title: 'Artificial Intelligence', blurb: 'Generative AI, agents, RAG and the tools shipping in production.', image: '/images/course/ai-category.png', count: 8 },
  { slug: 'full-stack', title: 'Full-Stack Development', blurb: 'MERN, Java and Python stacks — frontend to deployment.', image: '/images/course/full-stack-development-category.png', count: 9 },
  { slug: 'data-science', title: 'Data Science', blurb: 'Analytics, statistics and machine learning on real datasets.', image: '/images/course/data-science-category.png', count: 6 },
  { slug: 'cyber', title: 'Cybersecurity', blurb: 'Ethical hacking, network security and SOC fundamentals.', image: '/images/course/cyber-security-category.png', count: 4 },
  { slug: 'marketing', title: 'Digital Marketing', blurb: 'SEO, paid ads, social and AI-powered campaigns.', image: '/images/course/digital-marketing-category.png', count: 5 },
  { slug: 'cloud', title: 'Cloud & DevOps', blurb: 'AWS, Linux, Docker, Kubernetes and CI/CD pipelines.', image: '/images/course/cloud-computing-category.png', count: 5 },
]

export type Course = {
  slug: string
  title: string
  category: string
  duration: string
  mode: string
  highlight?: string
  image: string
  topics: string[]
}

export const FEATURED_COURSES: Course[] = [
  { slug: 'ai-machine-learning', title: 'AI & Machine Learning', category: 'ai', duration: '6 months', mode: 'Classroom + Online', highlight: 'Most enrolled', image: '/images/course/ai-category.png', topics: ['Python', 'TensorFlow', 'LLMs', 'MLOps'] },
  { slug: 'full-stack-development', title: 'Full-Stack Development', category: 'full-stack', duration: '6 months', mode: 'Classroom + Online', highlight: '92% placement rate', image: '/images/course/full-stack-development-category.png', topics: ['React', 'Node.js', 'MongoDB', 'Next.js'] },
  { slug: 'data-science-analytics', title: 'Data Science & Analytics', category: 'data-science', duration: '6 months', mode: 'Classroom + Online', image: '/images/course/data-science-category.png', topics: ['Pandas', 'SQL', 'Power BI', 'ML'] },
  { slug: 'cybersecurity-ethical-hacking', title: 'Cybersecurity & Ethical Hacking', category: 'cyber', duration: '4 months', mode: 'Classroom + Online', image: '/images/course/cyber-security-category.png', topics: ['Kali Linux', 'OWASP', 'Networking', 'SOC'] },
  { slug: 'digital-marketing', title: 'Digital Marketing', category: 'marketing', duration: '3 months', mode: 'Classroom + Online', image: '/images/course/digital-marketing-category.png', topics: ['SEO', 'Google Ads', 'Meta Ads', 'AI tools'] },
  { slug: 'cloud-devops', title: 'Cloud & DevOps', category: 'cloud', duration: '4 months', mode: 'Classroom + Online', image: '/images/course/cloud-computing-category.png', topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] },
  { slug: 'python-programming', title: 'Python Programming', category: 'full-stack', duration: '2 months', mode: 'Classroom + Online', image: '/images/categories/full-stack.webp', topics: ['Python', 'OOP', 'Django', 'Projects'] },
  { slug: 'generative-agentic-ai', title: 'Generative & Agentic AI', category: 'ai', duration: '4 months', mode: 'Classroom + Online', highlight: 'New batch', image: '/images/categories/ai.webp', topics: ['LLMs', 'RAG', 'LangChain', 'AI agents'] },
]

export const AI_TRACKS = [
  {
    title: 'AI Fundamentals',
    items: ['Generative AI', 'Artificial Intelligence', 'Prompt Engineering', 'ChatGPT & AI Tools'],
  },
  {
    title: 'AI Development',
    items: ['Agentic AI', 'RAG Development', 'AI-Powered Marketing', 'AI-Powered Courses'],
  },
]

/* ------------------------------------------------------ how it works -- */

export const STEPS = [
  { title: 'Career Counselling', text: 'A free one-to-one session maps your goals to the right track — in person or on a video call from anywhere in India.' },
  { title: 'Classroom & Lab', text: 'Small batches, daily practicals and mentor-led labs. Join at a centre or in a live online batch.' },
  { title: 'Live Project & Internship', text: 'Ship real client work with a team, and graduate with an internship letter and a portfolio.' },
  { title: 'Placement Drives', text: 'Mock interviews, resume reviews and drives with 500+ hiring partners nationwide.' },
]

/* -------------------------------------------------------- why techcadd -- */

export const WHY = [
  { title: 'Industry-Built Curriculum', text: 'Revised every intake against what hiring partners are screening for now — not a syllabus written three years ago.' },
  { title: 'Certified Trainers', text: 'Taught by certified professionals who still build and ship in the field they teach, so the examples come from this year.' },
  { title: 'Placement Support', text: 'CV clinics, mock interviews and introductions to our hiring partners — support that does not stop on the last day of class.' },
  { title: 'Flexible Batches', text: 'Morning, evening and weekend batches plus a live online option, so a job or a college timetable is not a reason to drop out.' },
]

export const MODULES = [
  'Industry Certificate',
  'Internship Letter',
  'Live Client Projects',
  'Doubt-Clearing Sessions',
  'Interview Preparation',
]

/* -------------------------------------------------------- testimonials -- */

export const TESTIMONIALS = [
  { name: 'Simranjeet Kaur', role: 'Full-Stack Developer', city: 'Jalandhar', quote: 'Live projects are what got me through my interviews. I could talk about real code I had shipped.' },
  { name: 'Harman Sidhu', role: 'Data Analyst', city: 'Ludhiana', quote: 'Doubt sessions after class were the difference. Nobody moved on until the concept clicked.' },
  { name: 'Aditya Verma', role: 'Software Engineer', city: 'Chandigarh', quote: 'My 45-day industrial training turned into a job offer from the same company.' },
  // TODO: replace with verified testimonials from online (non-Punjab) learners
  { name: 'Priya Nair', role: 'ML Engineer', city: 'Bengaluru (Online)', quote: 'The live online batch felt like a classroom — same mentors, same projects, same attention.' },
  { name: 'Rohit Deshmukh', role: 'Cloud Engineer', city: 'Pune (Online)', quote: 'The DevOps labs were hands-on from week one. I use the same pipeline setup at work today.' },
  { name: 'Ananya Das', role: 'Digital Marketer', city: 'Kolkata (Online)', quote: 'The AI-powered marketing module gave me a portfolio of real campaigns before I graduated.' },
]

/* technologies by domain live in data/tech-domains.ts */

/* ---------------------------------------------------------------- faq -- */

export const FAQS = [
  { q: 'Can I join from outside Punjab?', a: 'Yes. Every flagship course runs in live online batches with the same mentors, projects, and placement support as our classroom batches.' },
  { q: 'How long are the courses?', a: 'Programs run from 45 days (industrial training) to 6 months (career tracks). Certificate programs are 1–3 months.' },
  { q: 'Do I get a certificate?', a: 'You receive an industry certificate on completion, plus an internship letter when you finish the live-project phase.' },
  { q: 'Is placement support included?', a: 'Yes — resume reviews, mock interviews and placement drives with 500+ hiring partners are included in every career track.' },
  { q: 'Is there a registration fee?', a: 'No. Career counselling and the demo class are free, and there is no registration fee.' },
]

/* --------------------------------------------------------------- blog -- */

export const POSTS = [
  { slug: 'top-full-stack-institutes-india', title: 'How to Choose a Full-Stack Development Institute in India', date: '2026-09-27', tag: 'Careers' },
  { slug: 'confused-beginner-to-full-stack', title: 'From Confused Beginner to Full-Stack Developer', date: '2026-09-27', tag: 'Stories' },
  { slug: 'python-for-data-analytics', title: 'Python for Data Analytics: Where to Start', date: '2026-09-26', tag: 'Data' },
  { slug: 'agentic-ai-explained', title: 'Agentic AI, Explained for Engineers', date: '2026-09-25', tag: 'AI' },
]

/* ------------------------------------------------------------- footer -- */

export const FOOTER_LINKS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Courses',
    links: [
      { label: 'Programming', href: '/courses?category=full-stack' },
      { label: 'AI & Data', href: '/courses?category=ai' },
      { label: 'Marketing & Design', href: '/courses?category=marketing' },
      { label: 'Cyber & Cloud', href: '/courses?category=cyber' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Internship', href: '/certificate-programs' },
      { label: 'After 12th', href: '/after-12th' },
      { label: 'Industrial Training', href: '/certificate-programs' },
      { label: '6 Months', href: '/courses' },
      { label: '45 Days', href: '/courses' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Branches', href: '/branches' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ],
  },
]
