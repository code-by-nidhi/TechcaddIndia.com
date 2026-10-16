/* ==========================================================================
   Internships & training — the /internship-training hub and its detail pages.

   Tracks, fees, syllabus stages, toolchains and starting salaries mirror the
   internship pages on techcaddjalandhar.com, rewritten for learners across
   India (classroom centres in Punjab, live online batches everywhere else).
   TODO: confirm fees and salary ranges for the PAN India rollout.
   ========================================================================== */

export const INTERNSHIP_BASE = '/internship-training'

export const internshipHref = (slug: string) => `${INTERNSHIP_BASE}/${slug}`

/** The three lengths every core track runs at. */
export type PlanLength = 3 | 6 | 9

export const PLAN_LABELS: Record<PlanLength, { name: string; tier: string }> = {
  3: { name: '3 Months', tier: 'Short-term Program' },
  6: { name: '6 Months', tier: 'Mid-term Program (Certificate)' },
  9: { name: '9 Months', tier: 'Long-term Program (Diploma)' },
}

/** One block of a track's syllabus. `title` is used when a stage has a name. */
export type Stage = { title?: string; items: string[] }

/** A course inside a grouped track (Full Stack, Basic Skills, Civil/Mechanical). */
export type SubCourse = { title: string; blurb: string; tools?: string[] }

export type Track = {
  slug: string
  /** Cover photo for cards and the career section. */
  image: string
  title: string
  /** `icon` key into the map in Navbar.tsx / InternshipIcon. */
  icon: string
  badge?: 'New' | 'Hot' | 'Trending'
  /** One line, used on cards. */
  blurb: string
  /** Hero lead on the detail page. */
  lead: string
  /** Core tracks — run at 3, 6 and 9 months. */
  fees?: Record<PlanLength, string>
  stages?: Stage[]
  tools?: string[]
  roles?: string[]
  /** Why demand for this skill is growing, nationally. */
  demand?: string
  /** Typical fresher starting salary per month. */
  salary?: string
  /** Grouped tracks — a set of shorter courses instead of three lengths. */
  courses?: SubCourse[]
}

export const TRACKS: Track[] = [
  {
    slug: 'cloud-computing',
    image: '/images/categories/cloud.webp',
    title: 'Cloud Computing',
    icon: 'cloud',
    blurb: 'AWS, Azure, Docker and CI/CD on real infrastructure.',
    lead: 'Learn to deploy and run infrastructure on AWS and Azure instead of a server in the office — taught on live client work, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹18,500 – ₹25,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['Cloud models, regions and pricing', 'AWS core services: EC2, S3, VPC, IAM', 'Azure fundamentals and equivalents'] },
      { items: ['Linux administration for cloud', 'Docker containers and images', 'Kubernetes basics and orchestration'] },
      { items: ['CI/CD pipelines and automation', 'Infrastructure as code with Terraform', 'Monitoring, logging and cost control'] },
    ],
    tools: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Linux', 'Git'],
    roles: ['Cloud Engineer', 'DevOps Engineer', 'System Administrator', 'Cloud Support Associate'],
    demand: 'Cloud and DevOps skills are the clearest salary jump available to a working IT professional, and every company moving off on-premise servers needs people who can run what replaces them.',
    salary: '₹22,000 – ₹40,000',
  },
  {
    slug: 'flutter',
    image: '/images/categories/full-stack.webp',
    title: 'Flutter App Development',
    icon: 'mobile',
    blurb: 'One Dart codebase, native Android and iOS apps.',
    lead: 'Learn to ship one Dart codebase as native Android and iOS apps — taught on live client work, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹15,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['Dart syntax, null safety and async', 'Widgets, layout and Material design', 'Navigation, routing and forms'] },
      { items: ['State management with Provider and Riverpod', 'REST APIs, JSON and local storage', 'Firebase auth, Firestore and notifications'] },
      { items: ['Testing, debugging and performance', 'Store release for Play Store and App Store'] },
    ],
    tools: ['Flutter', 'Dart', 'Android Studio', 'VS Code', 'Firebase', 'Git', 'Postman'],
    roles: ['Flutter Developer', 'Mobile App Developer', 'Android Developer', 'Freelance App Developer'],
    demand: 'App work has steady freelance demand alongside agency jobs in every Indian city, and cross-platform development halves what a business pays to be on both stores.',
    salary: '₹18,000 – ₹32,000',
  },
  {
    slug: 'mern-stack',
    image: '/images/course/full-stack-development-category.png',
    title: 'MERN Stack',
    icon: 'code',
    badge: 'Hot',
    blurb: 'MongoDB, Express, React and Node — the startup stack.',
    lead: 'Learn the MongoDB, Express, React and Node stack most Indian startups build on — taught on live client work, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹15,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['JavaScript ES6+ and async patterns', 'React components, hooks and routing', 'State management and context'] },
      { items: ['Node.js and Express API design', 'MongoDB schemas with Mongoose', 'JWT authentication and authorisation'] },
      { items: ['File uploads, payments and third-party APIs', 'Deployment, environment config and CI'] },
    ],
    tools: ['MongoDB', 'Express', 'React', 'Node.js', 'Mongoose', 'JWT', 'Git', 'Vercel'],
    roles: ['MERN Developer', 'Full-Stack Developer', 'React Developer', 'Node.js Developer'],
    demand: 'MERN is among the most requested stacks in job listings from Bengaluru, Pune, Hyderabad and Gurugram startups — and in remote roles that do not care where you live.',
    salary: '₹20,000 – ₹35,000',
  },
  {
    slug: 'agentic-ai',
    image: '/images/categories/ai.webp',
    title: 'Agentic AI',
    icon: 'zap',
    badge: 'New',
    blurb: 'AI agents that plan, use tools and finish multi-step work.',
    lead: 'Learn to build AI systems that plan, use tools and complete multi-step work on their own — taught on live client work, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹18,500 – ₹25,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      {
        title: 'Stage 1 — Agentic AI Practitioner (3 Months)',
        items: [
          'Python, Git, HTTP and SQL from absolute zero — no programming background required',
          'Prompting and structured output, tool calling and your own MCP server',
          'RAG with clause-level citations, agent memory, and LangGraph with an approval gate',
          'Ends in a deployed agent with an eval report and a cost-per-conversation figure',
        ],
      },
      {
        title: 'Stage 2 — Agentic AI Engineer (6 Months)',
        items: [
          'Async pipelines, model routing and self-hosted serving; DSPy prompt optimisation',
          'Production MCP gateways, GraphRAG, durable execution and multi-agent systems',
        ],
      },
      {
        title: 'Stage 3 — Agentic AI Architect (9 Months)',
        items: [
          'Change-data-capture ingestion with access-control propagation and retrieval at scale',
          'A2A interoperability, a shared evaluation service and an enterprise-grade security package',
        ],
      },
    ],
    tools: ['Python', 'LangChain', 'LangGraph', 'Claude', 'GPT', 'OpenAI API', 'Vector DBs', 'FastAPI'],
    roles: ['AI Engineer', 'Agent Developer', 'Automation Architect', 'AI Consultant'],
    demand: 'Agentic systems are where AI budgets are moving, and practitioners who can ship one to production are still rare across India.',
    salary: '₹25,000 – ₹50,000',
  },
  {
    slug: 'digital-marketing',
    image: '/images/categories/marketing.webp',
    title: 'Digital Marketing',
    icon: 'trending',
    blurb: 'SEO, Google & Meta Ads, analytics and AI tools.',
    lead: 'Learn the full paid, organic and analytics stack that brings a business its customers online — taught on live client campaigns, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹18,500 – ₹25,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['Marketing funnels, audiences and positioning', 'Website basics, landing pages and WordPress', 'SEO: keywords, on-page and technical'] },
      { items: ['Google Ads: search, display and shopping', 'Meta Ads: campaign structure and creative', 'Social media and content strategy'] },
      { items: ['Email, WhatsApp and retention marketing', 'Analytics, attribution and reporting'] },
    ],
    tools: ['Google Ads', 'Meta Ads', 'Google Analytics', 'Search Console', 'SEMrush', 'WordPress', 'Canva', 'Mailchimp'],
    roles: ['Digital Marketing Executive', 'Performance Marketer', 'SEO Executive', 'Social Media Manager'],
    demand: 'Every shop, clinic, college and D2C brand in India is buying ads now — and most of them are buying them badly. People who can prove ROI get hired fast.',
    salary: '₹15,000 – ₹28,000',
  },
  {
    slug: 'data-analytics',
    image: '/images/course/data-science-category.png',
    title: 'Data Analytics',
    icon: 'chart',
    blurb: 'Excel, SQL and Power BI dashboards for business.',
    lead: 'Learn to turn business data into dashboards and answers, without a heavy coding load — taught on live client data, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹18,500 – ₹25,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['Advanced Excel and pivot analysis', 'SQL queries, joins and aggregation', 'Data cleaning and preparation'] },
      { items: ['Descriptive statistics for business', 'Power BI data modelling and DAX', 'Tableau and Looker Studio dashboards'] },
      { items: ['KPI design and reporting cadence', 'Presenting findings to management'] },
    ],
    tools: ['Excel', 'SQL', 'Power BI', 'Tableau', 'Python', 'Google Sheets', 'Looker Studio'],
    roles: ['Data Analyst', 'Business Analyst', 'MIS Executive', 'Reporting Analyst'],
    demand: 'Analytics is the most common non-developer entry into IT, and Excel-to-Power BI skills hire quickly in every Indian city — from GCCs to manufacturers.',
    salary: '₹16,000 – ₹30,000',
  },
  {
    slug: 'data-science',
    image: '/images/categories/data-science.webp',
    title: 'Data Science',
    icon: 'database',
    blurb: 'Python, statistics and machine learning end to end.',
    lead: 'Learn the full pipeline from raw data to a decision a business will actually act on — taught on live client data, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹18,500 – ₹25,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['Python and SQL for data work', 'Data cleaning and wrangling with Pandas', 'Exploratory analysis and visualisation'] },
      { items: ['Statistics, sampling and hypothesis testing', 'Machine learning models end to end'] },
      { items: ['Dashboards with Power BI and Tableau', 'Storytelling and stakeholder reporting'] },
    ],
    tools: ['Python', 'SQL', 'Pandas', 'scikit-learn', 'Power BI', 'Tableau', 'Jupyter', 'Excel'],
    roles: ['Data Scientist', 'Data Analyst', 'Business Analyst', 'Analytics Engineer'],
    demand: 'Every mid-size company in India now sits on data it cannot read, which is exactly the gap a data scientist fills.',
    salary: '₹20,000 – ₹38,000',
  },
  {
    slug: 'cybersecurity',
    image: '/images/categories/cyber.webp',
    title: 'Cyber Security',
    icon: 'shield',
    blurb: 'Ethical hacking, network security and SOC skills.',
    lead: 'Learn to defend networks, applications and data against real attack techniques — taught in hands-on labs, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹15,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['Networking and protocols for security', 'Linux fundamentals and hardening', 'Threats, vulnerabilities and risk'] },
      { items: ['Vulnerability assessment and scanning', 'Web application security and OWASP Top 10', 'Ethical hacking and penetration testing'] },
      { items: ['Incident response and forensics basics', 'Security tooling and reporting'] },
    ],
    tools: ['Kali Linux', 'Wireshark', 'Nmap', 'Burp Suite', 'Metasploit', 'OWASP ZAP', 'Linux'],
    roles: ['Security Analyst', 'SOC Analyst', 'Penetration Tester', 'IT Security Executive'],
    demand: 'Security roles are growing faster than India’s supply of trained people, which keeps salaries above average from the first job.',
    salary: '₹20,000 – ₹35,000',
  },
  {
    slug: 'artificial-intelligence',
    image: '/images/course/ai-category.png',
    title: 'Artificial Intelligence',
    icon: 'cpu',
    blurb: 'Machine learning, deep learning, vision and LLMs.',
    lead: 'Learn applied artificial intelligence — building systems that classify, predict, generate and decide — taught on live client work, in a Punjab classroom or a live online batch from anywhere in India.',
    fees: { 3: '₹18,500 – ₹25,500', 6: '₹45,500 – ₹55,500', 9: '₹65,500 – ₹75,500' },
    stages: [
      { items: ['Python for AI and scientific computing', 'Mathematics for machine learning', 'Supervised and unsupervised learning'] },
      { items: ['Neural networks and deep learning', 'Computer vision with OpenCV', 'Natural language processing'] },
      { items: ['Large language models and prompting', 'Model deployment and monitoring'] },
    ],
    tools: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'Hugging Face', 'Jupyter', 'Streamlit'],
    roles: ['AI Engineer', 'ML Engineer', 'Data Scientist', 'AI Product Analyst'],
    demand: 'AI skills now appear in job listings well beyond tech companies — from analytics teams to marketing and operations, in every Indian metro.',
    salary: '₹22,000 – ₹40,000',
  },
  {
    slug: 'full-stack-development',
    image: '/images/franchise/benefits.webp',
    title: 'Full Stack Development',
    icon: 'layers',
    blurb: 'PHP/Laravel or Python/Django, browser to deployment.',
    lead: 'Two stacks, one discipline. Both take you from the browser to the database and out to a live deployment — the difference is which language and framework you build on, and which jobs that opens.',
    courses: [
      { title: 'PHP Full Stack', blurb: 'PHP and Laravel development — still the backbone of most small-business websites across India.', tools: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'] },
      { title: 'Python + Django Full Stack', blurb: 'Python and Django from first script to a deployed web app with an admin, APIs and authentication.', tools: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'React'] },
    ],
    roles: ['Full-Stack Developer', 'Web Developer', 'Backend Developer', 'PHP / Python Developer'],
    salary: '₹18,000 – ₹35,000',
  },
  {
    slug: 'basic-skill-programs',
    image: '/images/course/classroom.webp',
    title: 'Basic Skill and Programs',
    icon: 'book',
    blurb: 'Computer basics, MS Office, Tally, DTP and typing.',
    lead: 'The short courses that get you employable first: computer fundamentals, Office, Tally, DTP and typing — taught to the standard employers and government recruitment tests actually check.',
    courses: [
      { title: 'Basic Computer', blurb: 'The computer literacy every office job in India now assumes you already have.' },
      { title: 'MS Office', blurb: 'Word, Excel and PowerPoint at the level an employer means when they ask for MS Office.' },
      { title: 'Tally', blurb: 'Computerised bookkeeping and GST filing on the software India’s traders and accountants actually run.' },
      { title: 'Desktop Publishing (DTP)', blurb: 'Page layout and print-ready design for cards, brochures, banners and books.' },
      { title: 'Typing', blurb: 'Accurate touch typing in English and Hindi/Punjabi at the speed government tests set.' },
    ],
    roles: ['Office Executive', 'Data Entry Operator', 'Accounts Assistant', 'DTP Operator'],
  },
  {
    slug: 'civil-mechanical',
    image: '/images/course/lab.webp',
    title: 'Civil/Mechanical',
    icon: 'tool',
    blurb: 'AutoCAD, SolidWorks, 3ds Max and Revit.',
    lead: 'Drafting, modelling and visualisation for the engineering streams — taught on the software India’s manufacturers, builders and architectural practices actually run.',
    courses: [
      { title: 'AutoCAD', blurb: '2D drafting and 3D modelling for civil, mechanical and architectural work.' },
      { title: 'SolidWorks', blurb: 'Parametric 3D modelling and assemblies for mechanical product design.' },
      { title: '3ds Max', blurb: '3D modelling, lighting and photoreal rendering for architecture and product visuals.' },
      { title: 'Revit', blurb: 'Building information modelling for architecture, structure and MEP coordination.' },
    ],
    roles: ['CAD Draughtsman', 'Design Engineer', '3D Visualiser', 'BIM Modeller'],
  },
]

/** Tracks with 3/6/9-month plans (the hub's duration tabs list these). */
export const CORE_TRACKS = TRACKS.filter((t) => t.fees)

/* -------------------------------------------------------------- formats -- */

export type Format = {
  slug: string
  image: string
  title: string
  /** Two-letter tile mark, as on the source hub. */
  mark: string
  duration: string
  badge?: 'Trending'
  blurb: string
  overview: string
  phases: { label: string; items: string[] }[]
  /** Who this format is usually for. */
  bestFor: string
}

const SIX_WEEK_PHASES = [
  { label: 'Weeks 1 – 2', items: ['Foundations and core concepts', 'Hands-on tools and environment setup', 'Practical techniques and workflows'] },
  { label: 'Weeks 3 – 4', items: ['Working with real data and files', 'Industry standards and best practice', 'Live project build'] },
  { label: 'Weeks 5 – 6', items: ['Testing, review and iteration', 'Portfolio, CV and interview preparation', 'Live project work and placement preparation'] },
]

export const FORMATS: Format[] = [
  {
    slug: 'internship-programme',
    image: '/images/how/project.webp',
    title: 'Internship Program',
    mark: 'IP',
    duration: 'Flexible length',
    blurb: 'Join the delivery team on genuine client tasks with weekly review.',
    overview:
      'The techcadd Internship Program places students and recent graduates inside the team that delivers client work, for a period agreed with the team you join rather than a fixed course length. Phase 1 covers foundations and the toolchain fast enough that you are useful rather than shadowing. Phase 2 is genuine client tasks with real deadlines and weekly trainer review, held to the same standards as paying work. Phase 3 is evaluation and handover — documentation, a demonstration and a written assessment of what you completed, which becomes your internship letter rather than a participation certificate. Interns join at a Punjab centre or remotely from anywhere in India.',
    phases: [
      { label: 'Phase 1', items: ['Foundations and the toolchain', 'Team workflow, Git and code review', 'First supervised task'] },
      { label: 'Phase 2', items: ['Genuine client tasks with real deadlines', 'Weekly trainer review and rework', 'Working to delivery-team standards'] },
      { label: 'Phase 3', items: ['Documentation and handover', 'Demonstration and written assessment', 'CV and interview preparation'] },
    ],
    bestFor: 'Final-year students and recent graduates who want real delivery experience on their CV.',
  },
  {
    slug: 'industrial-training',
    image: '/images/course/lab.webp',
    title: 'Industrial Training',
    mark: 'IT',
    duration: '6 weeks',
    badge: 'Trending',
    blurb: 'The university-required training, run as supervised project work.',
    overview:
      'techcadd Industrial Training is the six-week placement most engineering, BCA/MCA and diploma students across India complete as a degree requirement — run as supervised project work rather than a classroom module. Weeks 1 – 2 cover your chosen track’s fundamentals and tools, then you move onto a genuine client brief through Weeks 3 – 4. Weeks 5 – 6 cover testing, review and a self-directed capstone, plus the report structure and viva questions your department will ask. You leave with an internship letter that records the work you actually did, not a stamped attendance sheet.',
    phases: SIX_WEEK_PHASES,
    bestFor: 'B.Tech, BCA, MCA and diploma students whose university asks for an industrial training record.',
  },
  {
    slug: '45-days',
    image: '/images/course/classroom.webp',
    title: '45 Days Training',
    mark: '4D',
    duration: '45 days',
    badge: 'Trending',
    blurb: 'Short summer or winter training with a live project and letter.',
    overview:
      'The 45 Days Certificate Programme is the short industrial training many students complete over a semester break, run as practical, project-based training rather than lectures. You pick a track at the start, spend Weeks 1 – 2 on its fundamentals and toolchain, then move into a live client brief that a trainer supervises through Weeks 3 – 4. Weeks 5 – 6 add testing, review and a capstone project, before CV and interview preparation and a project demonstration. Available in classroom batches in Punjab and live online batches for students in every state.',
    phases: SIX_WEEK_PHASES,
    bestFor: 'Students using a summer or winter break to finish their training requirement.',
  },
  {
    slug: '6-weeks',
    image: '/images/franchise/benefits.webp',
    title: '6 Weeks Training',
    mark: '6W',
    duration: '6 weeks',
    blurb: 'A fast, supervised introduction to a technical field.',
    overview:
      'The 6 Weeks Certificate Programme suits students whose university asks for a six-week training record, and anyone who wants a fast, supervised introduction to a technical field before committing to a longer course. Weeks 1 – 2 cover fundamentals and tooling, Weeks 3 – 4 put you on a live project under trainer supervision, and Weeks 5 – 6 cover testing, a capstone, viva and presentation preparation. Work is reviewed session by session, so a mistake made early gets corrected early rather than surfacing in your final report. Timings are set around college hours, online and in class.',
    phases: SIX_WEEK_PHASES,
    bestFor: 'College students who need a six-week record, or want to try a field before a longer track.',
  },
  {
    slug: '4-months',
    image: '/images/course/campus1.webp',
    title: '4 Months Training',
    mark: '4M',
    duration: '4 months',
    blurb: 'One substantial project, not a folder of demos.',
    overview:
      'The 4 Months Certificate Programme is built for final-year students and recent graduates who want more than a summer-length certificate. Month one covers the fundamentals and toolchain of your track, month two moves into applied practice, and from month three you work on live client briefs with a trainer reviewing your output weekly and sending it back until it holds up. The final month is spent finishing the project properly: testing, documentation, deployment and a demonstration you can defend.',
    phases: [
      { label: 'Month 1', items: ['Fundamentals and toolchain', 'Building from day one'] },
      { label: 'Month 2', items: ['Applied practice on core techniques', 'Working with real data and files'] },
      { label: 'Month 3', items: ['Live client briefs', 'Weekly review and rework'] },
      { label: 'Month 4', items: ['Testing, documentation and deployment', 'Demonstration, CV and interview practice'] },
    ],
    bestFor: 'Final-year students and graduates who want one project substantial enough to carry an interview.',
  },
  {
    slug: '6-months',
    image: '/images/how/placement.webp',
    title: '6 Months Training',
    mark: '6M',
    duration: '6 months',
    blurb: 'The longest format — delivery experience before you interview.',
    overview:
      'The 6 Months Certificate Programme is the longest internship-training format, built for students who want real delivery experience behind them by the time they interview. Months 1 – 2 build your track’s fundamentals thoroughly, since the live client work that follows depends on it. From the midpoint you sit alongside the delivery team on live briefs, with weekly trainer review. Months 5 – 6 cover testing, a self-directed capstone and structured CV, portfolio and interview preparation. Weekday, evening and weekend batches run in parallel — in class or live online.',
    phases: [
      { label: 'Months 1 – 2', items: ['Foundations and core concepts', 'Hands-on tools and environment setup', 'Practical techniques and workflows'] },
      { label: 'Months 3 – 4', items: ['Working with real data and files', 'Industry standards and best practice', 'Live client briefs with the delivery team'] },
      { label: 'Months 5 – 6', items: ['Testing, review and iteration', 'Self-directed capstone project', 'Portfolio, CV and interview preparation'] },
    ],
    bestFor: 'Graduates and career switchers who want several finished pieces of client work, not one.',
  },
]

/* ------------------------------------------------------ shared content -- */

/** Pills under every internship hero. */
export const INTERNSHIP_BADGES = ['Live client projects', 'Online across India', 'Certificate + internship letter', 'Placement support']

/** Photo tiles of headline numbers. */
export const INTERNSHIP_STATS = [
  { value: '25,000+', label: 'Students trained since 2016', image: '/images/course/classroom.webp' },
  { value: '4.9★', label: 'Google rating, 556+ reviews', image: '/images/how/counselling.webp' },
  { value: '500+', label: 'Hiring partners nationwide', image: '/images/how/placement.webp' },
  { value: '100%', label: 'Practical, live client work', image: '/images/how/project.webp' },
]

export const AUDIENCES = [
  { title: 'Students after 12th', text: 'Join from any stream. You start from fundamentals with no assumed knowledge, and most students run the course alongside college using a weekday, weekend or online batch.' },
  { title: 'Graduates and final-year students', text: 'Finishing a BA, BBA, B.Com, BCA, MCA or B.Tech? This is the shortest route from degree to salary — enter placement season with project work in hand instead of a blank CV.' },
  { title: 'Working professionals', text: 'Weekend and evening batches exist for people already earning. Career switchers typically become interview-ready within five to six months without leaving their job.' },
  { title: 'Business owners and freelancers', text: 'Owners join to stop outsourcing work they cannot judge. Freelancers join to bill clients across India and abroad — location does not limit remote work in these fields.' },
  { title: 'Career restarters', text: 'A gap on the CV counts for less than work you can point at. You start at zero and finish with a portfolio and a documented internship letter.' },
  { title: 'Self-taught learners', text: 'If free videos left you with notes but nothing built, what changes here is a trainer who reviews what you produced this week and a deadline on every module.' },
]

export const LEARNING_MODES = [
  { title: 'Classroom Training', text: 'Learn in techcadd’s labs across Punjab with licensed software and a trainer who sees your screen daily. Weekday batches, 2 hours per session.' },
  { title: 'Online Live Classes', text: 'Live, instructor-led sessions from anywhere in India — screen sharing, real-time doubt clearing and the same assignments as the classroom, with recordings for 7 days.' },
  { title: 'Weekend Batches', text: 'Saturday and Sunday batches for working professionals and college students. Same syllabus, same projects, same placement support.' },
  { title: '1-on-1 Personal Training', text: 'Set your own schedule with a dedicated trainer — ideal for shifting rosters or anyone who wants to move faster than a batch allows.' },
]

export const WHY_INTERNSHIP = [
  { title: 'Trainers who still do the work', text: 'Your trainer delivers client projects for techcadd’s services arm, so examples in class are from this year, not a case study from five years ago.' },
  { title: 'Live projects, real consequences', text: 'You work on genuine client requirements under supervision. That is where a portfolio comes from, and it is the first thing an interviewer asks to see.' },
  { title: 'Small batches, open doubt sessions', text: 'Batches stay small enough that a trainer sees your screen daily, online or in class. Doubt sessions continue until the concept lands.' },
  { title: 'Internship letter and certificate', text: 'Every student finishes with an industry-recognised certificate and a documented internship on real work, accepted for industrial-training requirements at most universities.' },
  { title: 'A placement cell that persists', text: 'Mock interviews, CV reviews and drives with 500+ hiring partners nationwide — repeated after a rejection, not abandoned.' },
  { title: '25,000+ students since 2016', text: 'A decade of hiring relationships is why a call from our placement cell gets answered, and why employers know what our certificate means.' },
]

export const COMPARISON = [
  { feature: 'Training style', us: '100% practical, hands-on from day one', them: 'Mostly theory with occasional demos' },
  { feature: 'Projects', us: 'Live client work under trainer supervision', them: 'Pre-built demo projects or none' },
  { feature: 'Batch size', us: 'Small batches, trainer sees your screen daily', them: '30–50 students per batch' },
  { feature: 'Trainers', us: 'Working professionals who still deliver projects', them: 'Full-time lecturers with textbook examples' },
  { feature: 'Internship', us: 'Documented internship on real client work', them: 'Certificate only, no real work exposure' },
  { feature: 'Placement support', us: 'Dedicated cell, mock interviews, repeated drives', them: 'Job portal links or a single drive' },
  { feature: 'Learn from anywhere', us: 'Live online batches across India', them: 'Local classroom only' },
]

/** Hub-page FAQs. */
export const INTERNSHIP_FAQS = [
  { q: 'Can I do a techcadd internship from outside Punjab?', a: 'Yes. Every track runs in live online batches with the same trainers, live client projects, internship letter and placement support as our Punjab classroom batches.' },
  { q: 'How much does an internship program cost?', a: 'Most 3-month tracks are ₹15,500 (₹18,500–₹25,500 for AI, Cloud, Data and Digital Marketing), 6-month certificate tracks are ₹45,500–₹55,500 and 9-month diploma tracks are ₹65,500–₹75,500. Counsellors share the exact fee and EMI options, and the demo class is free.' },
  { q: 'Will my university accept the internship letter?', a: 'The letter documents the live project work you completed and is accepted for industrial-training requirements at most universities. Check your department’s format — we help with the report and viva preparation.' },
  { q: 'Is placement guaranteed?', a: 'No training provider can honestly guarantee a job, and you should be cautious of anyone who claims one. techcadd guarantees placement support: CV reviews, mock interviews, portfolio preparation and repeated drives with hiring partners.' },
  { q: 'Do I need a technical background?', a: 'No. Every track starts from fundamentals. A technical background helps, but turning up consistently and finishing what each module asks you to build matters far more.' },
]

/** FAQs for a single track page. */
export const trackFaqs = (t: Track) => [
  {
    q: `Can I learn ${t.title} online from anywhere in India?`,
    a: `Yes. ${t.title} runs in live online batches alongside our classroom batches in Punjab — same syllabus, same live client projects, same internship letter and placement support.`,
  },
  ...(t.fees
    ? [
        {
          q: `What is the fee for the ${t.title} program?`,
          a: `The 3-month program is ${t.fees[3]}, the 6-month certificate program is ${t.fees[6]} and the 9-month diploma program is ${t.fees[9]}. EMI options are available on request and the demo class is free.`,
        },
      ]
    : []),
  ...(t.roles
    ? [
        {
          q: `What jobs can I get after ${t.title}?`,
          a: `Graduates typically move into roles such as ${t.roles.join(', ')}.${t.salary ? ` Freshers with a working portfolio usually start around ${t.salary} a month, higher in metros like Bengaluru, Pune, Hyderabad and Gurugram.` : ''}`,
        },
      ]
    : []),
  {
    q: 'Will I get a certificate and internship letter?',
    a: 'Yes. Every student receives an industry-recognised certificate on completion plus a documented internship letter based on live client work.',
  },
  {
    q: 'Are weekend and evening batches available?',
    a: 'Yes. Weekday, evening and weekend batches run in parallel — online and in class — and 1-on-1 training is available for a fully personal schedule. Every class runs for 2 hours.',
  },
]
