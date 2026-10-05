/* ==========================================================================
   Franchise page content — copy, numbers, team and photos as published on
   the techcadd franchise site. Photos live in /public/images/franchise.
   ========================================================================== */

const img = (name: string) => `/images/franchise/${name}.webp`

export const FRANCHISE_CONTACT = {
  phone: '+91 98881 22291',
  phoneHref: 'tel:+919888122291',
  email: 'info@techcadd.com',
  address: 'Plot number F-547 3rd floor Industrial Area, 8A, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055',
}

export const FRANCHISE_HERO = {
  eyebrow: "Build India's Next Generation of Tech Professionals",
  title: 'Own a techcadd Franchise',
  lead: [
    "Turn your passion for education into a high-impact, high-growth business with one of India's fastest emerging technology education brands.",
    "At techcadd, we don't simply teach software — we develop careers, empower entrepreneurs, and build future-ready communities through world-class technology education.",
  ],
  tagline: 'Your Investment. Our Expertise. Shared Success.',
  badges: ['Trusted Brand', 'Since 2016', 'Proven Model', 'AI-First Ecosystem'],
}

/** The four picture tiles beside the enquiry form. */
export const FRANCHISE_STATS = [
  { value: '120+', label: 'Franchise Partners', image: img('img17') },
  { value: '25,000+', label: 'Student Enrollments', image: img('img3') },
  { value: '248%', label: 'Revenue Growth', image: img('img12') },
  { value: '24/7', label: 'Partner Support', image: img('img5') },
]

/* ---------------------------------------------------------------- form -- */

export const FRANCHISE_FORM = {
  eyebrow: 'Franchise Enquiry',
  lead: "Become part of India's growing technology education network. Get a free franchise consultation, investment guide, and business plan.",
  submit: 'Book My Franchise Consultation',
  consent: 'I agree to be contacted by TechCADD regarding franchise opportunities via phone, email, WhatsApp, or SMS.',
  done: {
    title: 'Thank You for Your Interest!',
    text: 'Your enquiry has been received successfully. Our Franchise Development Team will contact you within 24 business hours to discuss:',
    topics: ['Investment & ROI', 'Business Model', 'Centre Setup', 'Territory Availability', 'Training & Support'],
    sign: 'Welcome to the techcadd family!',
  },
  professions: ['Business Owner', 'Working Professional', 'Entrepreneur', 'Educational Institute Owner', 'Teacher/Trainer', 'Student', 'Investor', 'Other'],
  qualifications: ['10+2', 'Graduate', 'Post Graduate', 'Engineering', 'MBA', 'Other'],
  timelines: ['Immediately', 'Within 1 Month', '1–3 Months', '3–6 Months'],
  budgets: ['₹5–10 Lakhs', '₹10–15 Lakhs', '₹15–25 Lakhs', '₹25 Lakhs+'],
  hasSpace: ['Yes', 'No', 'Looking for One'],
  spaces: ['Less than 1000 sq.ft.', '1000–1500 sq.ft.', '1500–2500 sq.ft.', '2500+ sq.ft.'],
  heardFrom: ['Google', 'Social Media', 'YouTube', 'Referral', 'Existing Franchise', 'Website', 'Event/Seminar', 'Other'],
}

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

/* ---------------------------------------------------------------- tabs -- */

export const FRANCHISE_WHY = {
  title: 'A Business That Creates Both Profit and Purpose',
  lead: [
    "When you partner with techcadd, you're not purchasing a franchise. You're joining an education ecosystem designed for long-term growth.",
    "With techcadd, you become part of one of India's fastest-growing sectors while contributing to nation-building through education.",
  ],
  points: [
    { title: 'Complete Business Blueprint', text: 'Everything from centre planning to launch is professionally structured.' },
    { title: 'Future-Focused Courses', text: 'AI, Data Science, Cloud, CAD, Digital Marketing, Programming, Cyber Security, UI/UX, Robotics, Automation and much more.' },
    { title: 'Proven Academic Framework', text: 'Industry-aligned curriculum updated continuously with market demand.' },
    { title: 'Marketing & Lead Generation Support', text: 'Digital campaigns, branding assets, admission strategies, and promotional guidance.' },
    { title: 'Faculty Training', text: 'Complete onboarding and academic certification for trainers.' },
    { title: 'Placement Ecosystem', text: 'Industry collaborations that help students transition into careers.' },
    { title: 'Technology Driven Operations', text: 'Modern ERP, centralized academic systems, CRM support, assessments, certifications, and operational dashboards.' },
    { title: 'Continuous Business Mentoring', text: 'Our relationship begins after your launch — not before it ends.' },
  ],
}

export const FRANCHISE_SUPPORT = {
  title: 'We Grow When You Grow',
  lead: "From business setup to academic delivery, marketing to operations — we've got you covered at every step.",
  phases: [
    { title: 'Before Launch', items: ['Location Consultation', 'Business Planning', 'Infrastructure Guidance', 'Branding Support', 'Recruitment Assistance', 'Marketing Launch Strategy'] },
    { title: 'During Launch', items: ['Team Training', 'ERP Setup', 'Course Activation', 'Admission Support', 'Digital Marketing', 'Centre Branding'] },
    { title: 'After Launch', items: ['Academic Updates', 'Continuous Marketing', 'Business Reviews', 'Faculty Upskilling', 'New Course Rollouts', 'Franchise Success Coaching'] },
  ],
}

export const FRANCHISE_FAQS = [
  { q: 'What is techcadd?', a: "Founded in 2016, techcadd is one of North India's fastest-growing IT training companies, committed to bridging the gap between education and industry through practical learning, live projects, and industry-focused programs." },
  { q: 'Why should I invest in IT education?', a: "Technology evolves every day, and so does the demand for skilled professionals. Students, graduates, and working professionals continuously seek practical training to stay competitive, making IT education one of India's most promising business opportunities." },
  { q: 'Do I need a technical background to become a franchise partner?', a: "No. Whether you're an entrepreneur, educationist, business owner, working professional, or investor — techcadd provides complete guidance to help you establish and grow your centre." },
  { q: 'What kind of support do I get as a franchise partner?', a: 'You get complete support including business setup guidance, branded curriculum, faculty training, digital marketing, social media creatives, admission campaigns, student management tools, and ongoing business consultation.' },
  { q: 'How does the franchise journey work?', a: "It's a simple 7-step process: Franchise Enquiry, Business Consultation, Location & Infrastructure Planning, Faculty & Staff Training, Marketing & Launch Support, Grand Opening, and Continuous Business Growth." },
  { q: 'What makes techcadd different from other IT institutes?', a: 'techcadd follows a technology-first, AI-first, and career-first approach. Our programs focus on future technologies, live projects, job readiness, career upgrades, and freelancing & entrepreneurship — creating year-round demand.' },
]

export const FRANCHISE_SCOPE = {
  title: 'Designed for Sustainable Growth',
  lead: [
    'Our franchise model is built around scalability. Multiple income streams help create a resilient education business rather than dependence on a single course category.',
    'Technology education is no longer optional. Every industry now requires digital skills. As governments, businesses, and educational institutions accelerate digital transformation, demand for quality skill development continues to rise.',
  ],
  streamsTitle: 'Income streams',
  streams: [
    'Professional Courses',
    'Engineering Design Programs',
    'AI & Emerging Technologies',
    'Corporate Training',
    'School & College Partnerships',
    'Government Skill Projects',
    'Certification Programs',
    'Workshops & Bootcamps',
    'Internship Programs',
    'Placement Services',
  ],
  reasons: ['Trusted Brand', 'Proven Business Model', 'AI-Focused Education', 'Strong Marketing Support', 'Complete Academic & Operational Assistance', 'Continuous Business Growth'],
}

/* --------------------------------------------------------------- about -- */

export const FRANCHISE_ABOUT = {
  lead: [
    'Technology is changing faster than ever. Industries demand skilled professionals, while millions of students seek practical education that leads to real careers.',
    'techcadd bridges this gap.',
    'Founded with the vision of transforming technical education, techcadd delivers industry-driven training across Engineering Design, Artificial Intelligence, Data Science, Software Development, Digital Marketing, Cyber Security, Cloud Computing, Business Technologies, and emerging digital domains.',
  ],
  objective: 'Make learners employable, entrepreneurial, and future-ready.',
  close: 'We believe education should create opportunities — not just certificates.',
  purpose: [
    { title: 'Our Mission', text: 'To make industry-relevant technology education accessible across India through practical learning, innovation, and entrepreneurship — while enabling students to build successful careers and franchise partners to build sustainable education businesses.' },
    { title: 'Our Vision', text: "To become India's most trusted technology education network by developing future-ready professionals, empowering local entrepreneurs, and creating learning centres that transform communities through digital skills." },
  ],
  values: [
    { title: 'Innovation', text: 'Continuously evolving with technology.' },
    { title: 'Integrity', text: 'Building trust through transparency.' },
    { title: 'Excellence', text: 'Delivering quality without compromise.' },
    { title: 'Student Success', text: 'Every decision begins with learner outcomes.' },
    { title: 'Entrepreneurship', text: 'Creating successful business owners alongside successful students.' },
    { title: 'Lifelong Learning', text: 'Preparing individuals for tomorrow — not yesterday.' },
  ],
  advantage: {
    image: img('benefits'),
    lead: 'Students trust techcadd because they receive world-class training, modern infrastructure, and real career outcomes.',
    items: [
      'Practical Learning',
      'Industry Projects',
      'Career-Oriented Curriculum',
      'Placement Assistance',
      'Expert Trainers',
      'Modern Labs',
      'Certifications',
      'Internship Opportunities',
      'Soft Skills Development',
      'Interview Preparation',
      'Portfolio Building',
      'Career Mentorship',
    ],
  },
}

/* ------------------------------------------------------------- roadmap -- */

export const FRANCHISE_STEPS = [
  { title: 'Submit Your Franchise Enquiry', text: 'Fill out the enquiry form to get started.' },
  { title: 'Business Consultation', text: '1:1 call with the techcadd franchise team to align on goals.' },
  { title: 'Location Evaluation', text: 'Select the right location and evaluate its potential.' },
  { title: 'Commercial Discussion', text: 'Understand the investment, revenue model, and terms.' },
  { title: 'Franchise Agreement', text: 'Sign the partnership agreement and formalize the journey.' },
  { title: 'Centre Setup & Branding', text: 'Set up your centre with full techcadd branding and infrastructure.' },
  { title: 'Faculty & Team Training', text: 'Complete onboarding and training for your team.' },
  { title: 'Marketing Launch', text: 'Pre-launch marketing campaigns and admission strategies.' },
  { title: 'Admissions Begin', text: 'Your techcadd centre goes live and enrollments start.' },
  { title: 'Continuous Growth with techcadd', text: 'Ongoing support, curriculum updates, and business expansion.' },
]

/* ------------------------------------------------------------ partners -- */

export const FRANCHISE_PARTNERS = {
  lead: "You don't need previous education industry experience. You need passion, commitment, and the willingness to build something meaningful.",
  who: [
    { title: 'Entrepreneurs', text: 'Start a future-driven education business with complete guidance.' },
    { title: 'Working Professionals', text: 'Build a side business or transition into full-time education entrepreneurship.' },
    { title: 'Business Owners', text: 'Diversify into the booming IT education sector.' },
    { title: 'Educational Institutions', text: 'Expand your existing education setup with industry-leading IT programs.' },
    { title: 'Coaching Centres', text: 'Add techcadd programs to your existing coaching centre for added value.' },
    { title: 'Engineers', text: 'Leverage your technical background to build a thriving education business.' },
    { title: 'Corporate Professionals', text: 'Use your corporate experience to lead a high-impact education centre.' },
    { title: 'Investors', text: 'Invest in a high-growth, recession-resistant education model.' },
    { title: 'Existing Training Institutes', text: 'Partner with techcadd to enhance your existing training institute with industry-relevant programs.' },
  ],
}

/* ------------------------------------------------------ gallery / team -- */

export const FRANCHISE_GALLERY = {
  lead: 'A glimpse into our seminars, workshops, and campus drives that create real impact across communities.',
  images: Array.from({ length: 18 }, (_, i) => img(`img${i + 1}`)),
}

export const FRANCHISE_TEAM = {
  lead: 'A passionate team committed to empowering students and franchise partners across India.',
  people: [
    { name: 'Gourav Gupta', role: 'Founder', image: img('gourav') },
    { name: 'Asmita Sehgal', role: 'Senior Franchise Head', image: img('asmita') },
    { name: 'Harrachneet Kaur', role: 'Relationship Manager', image: img('richi') },
    { name: 'Daljeet Singh', role: 'Operations', image: img('daljeet') },
    { name: 'Amit Kumar', role: 'Head - Technology & Digital Transformation', image: img('amit') },
    { name: 'Shiv', role: 'Sr. Project Leader', image: img('shiv') },
    { name: 'Eakumpreet Singh', role: 'Creative Head', image: img('ekam') },
    { name: 'Vikas', role: 'Marketing Head', image: img('vikas') },
  ],
}

/* ------------------------------------------------------------- closing -- */

export const FRANCHISE_FOUNDER = {
  title: ['Education Creates Careers.', 'Entrepreneurship Creates Impact.'],
  text: [
    'At techcadd, our goal has always been bigger than building classrooms. We are building opportunities.',
    'Every franchise partner who joins us becomes part of a larger mission — to empower students with practical skills, create employment, strengthen local economies, and prepare India for the future of technology.',
    "Together, we don't just open institutes. We build careers. We build entrepreneurs. We build futures.",
  ],
  sign: 'Gourav Gupta, Founder',
  image: img('gourav'),
  impact: {
    lead: "Because every student we train contributes to India's digital future.",
    items: ['Career Development', 'Digital Literacy', 'Technical Excellence', 'Innovation', 'Employment Generation', 'Entrepreneurship', 'Community Development'],
  },
}

export const FRANCHISE_CITY = {
  image: img('hero'),
  text: ['Every city has ambitious students. Every company needs skilled professionals. Bring techcadd to your city and create a destination where careers begin.', "The future won't wait. Neither should your city."],
  closing: 'Establish a future-ready education business backed by innovation, academic excellence, and continuous support.',
}
