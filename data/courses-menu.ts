/* ==========================================================================
   Course catalogue — the one source for the Courses mega menu, the
   /courses/[slug] pages and the /course-categories/[slug] pages.

   Every course and category gets a stable slug, derived once from its title
   (lib/slug.ts) at module load. Never change a published slug: add the old
   one to the redirects in next.config.ts instead. `SLUG_OVERRIDES` is for the
   few titles whose derived slug would be wrong.
   ========================================================================== */

import { slugify, uniqueSlug } from '@/lib/slug'

export type CourseMenuCategory = {
  /** Equal to `slug`; kept as the React key / aria id. */
  id: string
  slug: string
  title: string
  /** key into the icon map in components/layout/CoursesMenu.tsx */
  icon: 'ai' | 'code' | 'cloud' | 'shield' | 'design' | 'engineering'
  courses: MenuCourse[]
}

export type MenuCourse = { label: string; slug: string; href: string; categorySlug: string }

const SLUG_OVERRIDES: Record<string, string> = {
  'C & C++ Programming': 'c-cpp-programming',
}

const RAW: { title: string; icon: CourseMenuCategory['icon']; courses: string[] }[] = [
  {
    title: 'AI & Emerging Technologies',
    icon: 'ai',
    courses: ['Artificial Intelligence (AI)', 'Generative AI', 'Agentic AI', 'AI Tools & Applications', 'AI Automation & Workflows'],
  },
  {
    title: 'Software & Programming',
    icon: 'code',
    courses: [
      'Python Programming',
      'Java Programming',
      'C & C++ Programming',
      'Full Stack Web Development',
      'MERN Stack Development',
      'Django & Backend Development',
      'App Development',
    ],
  },
  {
    title: 'Data & Cloud',
    icon: 'cloud',
    courses: ['Data Analytics', 'Data Science & Machine Learning', 'AWS & Cloud Computing', 'DevOps', 'Database Management'],
  },
  {
    title: 'Cybersecurity & Forensics',
    icon: 'shield',
    courses: [
      'Cybersecurity',
      'Ethical Hacking',
      'Digital Forensics',
      'Computer Forensics',
      'Cybercrime Investigation Fundamentals',
      'Network Security',
    ],
  },
  {
    title: 'Digital & Creative Skills',
    icon: 'design',
    courses: ['Digital Marketing', 'SEO & AI Search Optimization', 'Social Media Marketing', 'Graphic Design', 'Video Editing', 'UI/UX Design'],
  },
  {
    title: 'Engineering & Professional Skills',
    icon: 'engineering',
    courses: ['AutoCAD', 'Civil CAD', 'SolidWorks', 'Mechanical CAD', 'Basic Computer Courses', 'Accounting Software'],
  },
]

const taken = new Set<string>()

export const COURSES_MENU: CourseMenuCategory[] = RAW.map((cat) => {
  const slug = slugify(cat.title)
  return {
    id: slug,
    slug,
    title: cat.title,
    icon: cat.icon,
    courses: cat.courses.map((label) => {
      const courseSlug = uniqueSlug(SLUG_OVERRIDES[label] ?? slugify(label), taken)
      return { label, slug: courseSlug, href: courseHref(courseSlug), categorySlug: slug }
    }),
  }
})

/* ---------------------------------------------------------------- urls -- */

export function courseHref(slug: string) {
  return `/courses/${slug}`
}
export function categoryHref(slug: string) {
  return `/course-categories/${slug}`
}

export const ALL_MENU_COURSES: MenuCourse[] = COURSES_MENU.flatMap((c) => c.courses)

export const findMenuCourse = (slug: string) => ALL_MENU_COURSES.find((c) => c.slug === slug)
export const findMenuCategory = (slug: string) => COURSES_MENU.find((c) => c.slug === slug)

/**
 * The home page's own six category keys (CATEGORIES in data/site.ts) mapped to
 * the canonical category pages. Used for internal links and, mirrored in
 * next.config.ts, for the redirects from the old /courses?category= URLs.
 */
export const LEGACY_CATEGORY_TO_SLUG: Record<string, string> = {
  ai: 'ai-emerging-technologies',
  'full-stack': 'software-programming',
  'data-science': 'data-cloud',
  cloud: 'data-cloud',
  cyber: 'cybersecurity-forensics',
  marketing: 'digital-creative-skills',
}

export const legacyCategoryHref = (key: string) => {
  const slug = LEGACY_CATEGORY_TO_SLUG[key]
  return slug ? categoryHref(slug) : '/courses'
}

/** Footer actions of the mega menu. */
export const COURSES_MENU_FOOTER = [
  { label: 'View All Courses', href: '/courses' },
  { label: 'Course Categories', href: '/course-categories' },
  { label: 'Find a Course', href: '/courses#course-list' },
]
