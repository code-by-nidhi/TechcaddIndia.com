/* ==========================================================================
   Nav sections — the Training, Careers, IT Services, Resources and Contact
   menus and the pages behind them.

   A page with `href` already exists elsewhere and is only linked. Every other
   page is a placeholder under `${section.base}/[slug]`, rendered by
   components/ui/SectionSubPage.tsx.
   TODO: replace the placeholder blocks with approved copy before launch.
   ========================================================================== */

import { internshipHref } from '@/data/internships'

export type SectionPage = {
  slug: string
  label: string
  /** An existing page to link to instead of a placeholder. */
  href?: string
  lead?: string
  blocks?: { title: string; items?: string[] }[]
}

export type NavSection = {
  key: 'training' | 'careers' | 'services' | 'resources' | 'contact'
  label: string
  base: string
  eyebrow: string
  title: string
  lead: string
  pages: SectionPage[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    key: 'training',
    label: 'Training',
    base: '/training',
    eyebrow: 'Training',
    title: 'Training programs for every stage',
    lead: 'Professional, industrial, seasonal and corporate training — in a classroom or online.',
    pages: [
      { slug: 'professional-it-training', label: 'Professional IT Training' },
      { slug: 'industrial-training', label: 'Industrial Training', href: internshipHref('industrial-training') },
      { slug: 'summer-training', label: 'Summer Training' },
      { slug: 'winter-training', label: 'Winter Training' },
      { slug: 'short-term-certificate-courses', label: 'Short-Term Certificate Courses' },
      { slug: 'advanced-training-programs', label: 'Advanced Training Programs' },
      { slug: 'project-based-training', label: 'Practical Project-Based Training' },
      { slug: 'corporate-training', label: 'Corporate Training' },
      { slug: 'college-university-training', label: 'College & University Training' },
      { slug: 'customized-training-programs', label: 'Customized Training Programs' },
      { slug: 'ai-automation-workshops', label: 'AI & Automation Workshops' },
      { slug: 'online-training', label: 'Online Training' },
      { slug: 'classroom-training', label: 'Classroom Training' },
    ],
  },
  {
    key: 'careers',
    label: 'Careers',
    base: '/careers',
    eyebrow: 'Careers',
    title: 'From training to your first job',
    lead: 'Internships, live projects and placement support that carry you into the industry.',
    pages: [
      { slug: 'training-for-freshers', label: 'Training for Freshers' },
      { slug: 'internship-programs', label: 'Internship Programs', href: internshipHref('internship-programme') },
      { slug: 'industrial-projects', label: 'Industrial Projects' },
      { slug: 'live-projects', label: 'Live Projects' },
      { slug: 'job-ready-skill-programs', label: 'Job-Ready Skill Programs' },
      { slug: 'resume-portfolio-building', label: 'Resume & Portfolio Building' },
      { slug: 'interview-preparation', label: 'Interview Preparation' },
      { slug: 'career-guidance', label: 'Career Guidance' },
      { slug: 'placement-assistance', label: 'Placement Assistance' },
      {
        slug: 'career-opportunities',
        label: 'Career Opportunities',
        lead: "Join the team that trains India's next engineers.",
        blocks: [{ title: 'Open positions' }, { title: 'Life at techcadd' }, { title: 'How to apply' }],
      },
    ],
  },
  {
    key: 'services',
    label: 'IT Services',
    base: '/services',
    eyebrow: 'IT Services',
    title: 'Technology services, built by the people who teach it',
    lead: 'Websites, software, AI and marketing for businesses and institutions.',
    pages: [
      { slug: 'website-development', label: 'Website Development' },
      { slug: 'custom-software-development', label: 'Custom Software Development' },
      { slug: 'saas-application-development', label: 'SaaS Application Development' },
      { slug: 'shopify-ecommerce-development', label: 'Shopify & E-commerce Development' },
      { slug: 'ai-solutions-automation', label: 'AI Solutions & Automation' },
      { slug: 'chatbots-ai-agents', label: 'Chatbots & AI Agents' },
      { slug: 'digital-marketing-services', label: 'Digital Marketing Services' },
      { slug: 'seo-services', label: 'SEO Services' },
      { slug: 'geo-aeo-ai-search-optimization', label: 'GEO, AEO & AI Search Optimization' },
      { slug: 'social-media-marketing', label: 'Social Media Marketing' },
      { slug: 'cloud-devops-solutions', label: 'Cloud & DevOps Solutions' },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    base: '/resources',
    eyebrow: 'Resources',
    title: 'Guides, insights and student resources',
    lead: 'Articles, tutorials and answers to help you learn and choose the right course.',
    pages: [
      { slug: 'technology-ai-blogs', label: 'Technology & AI Blogs', href: '/blog' },
      { slug: 'programming-tutorials', label: 'Programming Tutorials' },
      { slug: 'digital-marketing-guides', label: 'Digital Marketing Guides' },
      { slug: 'cybersecurity-forensics-insights', label: 'Cybersecurity & Forensics Insights' },
      { slug: 'career-guidance-articles', label: 'Career Guidance Articles' },
      { slug: 'student-resources', label: 'Student Resources' },
      { slug: 'course-faqs', label: 'Course FAQs' },
      { slug: 'projects-case-studies', label: 'Projects & Case Studies', href: '/projects' },
      { slug: 'news-events-seminars', label: 'News, Events & Seminars' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact',
    base: '/contact',
    eyebrow: 'Contact',
    title: 'Talk to a counsellor',
    lead: 'Free career counselling — visit a centre, or book a call from anywhere in India.',
    pages: [
      { slug: 'contact-us', label: 'Contact Us', href: '/contact' },
      { slug: 'course-enquiry', label: 'Course Enquiry' },
      { slug: 'corporate-enquiry', label: 'Corporate Enquiry' },
      { slug: 'training-partnership-enquiry', label: 'Training Partnership Enquiry' },
      { slug: 'request-a-callback', label: 'Request a Callback' },
      { slug: 'all-branch-locations', label: 'All Branch Locations', href: '/branches' },
      { slug: 'feedback-support', label: 'Feedback & Support' },
    ],
  },
]

export const getSection = (key: NavSection['key']) => NAV_SECTIONS.find((s) => s.key === key)!

export const pageHref = (section: NavSection, page: SectionPage) => page.href ?? `${section.base}/${page.slug}`

/** The pages of a section that are placeholders under its own base. */
export const placeholderPages = (section: NavSection) => section.pages.filter((p) => !p.href)

export const findSectionPage = (section: NavSection, slug: string) => placeholderPages(section).find((p) => p.slug === slug)

export const sectionMenuLinks = (section: NavSection) => section.pages.map((p) => ({ label: p.label, href: pageHref(section, p) }))
