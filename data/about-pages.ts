/* ==========================================================================
   About section — the ten links of the About menu and the pages behind them.

   /about, /branches and /contact already exist and are reused. Every other
   link is a page under /about/[slug] (app/about/[slug]/page.tsx).
   TODO: replace the placeholder items with approved copy before launch.
   ========================================================================== */

export type AboutPage = {
  slug: string
  label: string
  title: string
  lead: string
  /** Existing section component to render, or the placeholder blocks below. */
  section?: 'story' | 'approach' | 'why' | 'labs'
  /** `id` is an anchor on the page, used by the Mission & Vision hero buttons */
  blocks?: { title: string; items: string[]; id?: string }[]
}

export const aboutHref = (slug: string) => `/about/${slug}`

export const ABOUT_PAGES: AboutPage[] = [
  {
    slug: 'our-story',
    label: 'Our Story',
    title: 'A decade of turning students into engineers',
    lead: 'From one classroom in Punjab to a national training network.',
    section: 'story',
  },
  {
    slug: 'mission-vision',
    label: 'Mission & Vision',
    title: 'Mission & Vision',
    lead: 'Why techcadd exists and where it is going.',
    blocks: [
      { title: 'Our mission', id: 'mission', items: ['What we set out to do for learners'] },
      { title: 'Our vision', id: 'vision', items: ['Where we want the techcadd network to be'] },
      { title: 'Our values', id: 'values', items: ['The principles behind every batch'] },
    ],
  },
  {
    slug: 'why-choose-techcadd',
    label: 'Why Choose techcadd',
    title: 'Why choose techcadd',
    lead: 'What sets our training apart.',
    section: 'why',
  },
  {
    slug: 'our-training-approach',
    label: 'Our Training Approach',
    title: 'Our training approach',
    lead: 'From counselling to placement — how a techcadd course runs.',
    section: 'approach',
  },
  {
    slug: 'infrastructure-labs',
    label: 'Infrastructure & Labs',
    title: 'Infrastructure & Labs',
    lead: 'The classrooms and labs where practical training happens.',
    section: 'labs',
  },
  {
    slug: 'industry-partnerships',
    label: 'Industry Partnerships',
    title: 'Industry Partnerships',
    lead: 'Hiring partners and industry collaborations.',
    blocks: [
      { title: 'Hiring partners', items: ['Partner logos and placement drives'] },
      { title: 'Industry collaborations', items: ['Workshops, guest sessions and live projects'] },
    ],
  },
  {
    slug: 'certifications-accreditations',
    label: 'Certifications & Accreditations',
    title: 'Certifications & Accreditations',
    lead: 'The credentials you earn and the bodies that recognise us.',
    blocks: [
      { title: 'Course certificates', items: ['Industry certificate and internship letter'] },
      { title: 'Accreditations', items: ['Affiliations and recognitions'] },
    ],
  },
]

export const findAboutPage = (slug: string) => ABOUT_PAGES.find((p) => p.slug === slug)

/** The ten About menu links, in order. */
export const ABOUT_MENU_LINKS: { label: string; href: string }[] = [
  { label: 'About techcadd', href: '/about' },
  ...ABOUT_PAGES.map((p) => ({ label: p.label, href: aboutHref(p.slug) })),
  { label: 'Our Branches', href: '/branches' },
  { label: 'Contact Information', href: '/contact' },
]
