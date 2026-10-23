import { JOURNEY } from '@/data/site'

/* The Our Story timeline: every year from the 2016 founding to 2026, newest first.

   The milestones themselves (year, heading, description) are the ones already
   published in JOURNEY (data/site.ts), which runs from the 2016 founding to
   today. This file adds a photograph per year, the founding-year wording, and
   puts the years newest first. The photographs are genuine techcadd images chosen for the TOPIC of
   each year (a lab for a lab year, a hall for a seminar year); they illustrate
   the story and are not captioned as records of those specific events. */

const PHOTOS: Record<number, { image: string; alt: string }> = {
  // no photograph from 2016 itself is in the project, so this is a neutral techcadd image
  2016: { image: '/images/campus/mentor-at-desk.webp', alt: 'A techcadd mentor working with a learner at a desk' },
  2017: { image: '/images/campus/classroom-session.webp', alt: 'Learners in a techcadd classroom session' },
  2018: { image: '/images/gallery/placement-drive.webp', alt: 'Students at a techcadd placement-focused event' },
  2019: { image: '/images/gallery/auditorium-crowd.webp', alt: 'A full auditorium at a techcadd seminar' },
  2020: { image: '/images/campus/laptop-workshop.webp', alt: 'Learners working on laptops in a techcadd workshop' },
  2021: { image: '/images/campus/study-lab.webp', alt: 'Learners at work in a techcadd study lab' },
  2022: { image: '/images/campus/coding-lab.webp', alt: 'Learners coding in a techcadd lab' },
  2023: { image: '/images/gallery/auditorium-talk.webp', alt: 'A trainer addressing students in an auditorium' },
  2024: { image: '/images/campus/ai-class.webp', alt: 'An AI class at techcadd' },
  2025: { image: '/images/gallery/techcadd-meet.webp', alt: 'The techcadd community together' },
  2026: { image: '/images/campus/large-lab.webp', alt: 'A large techcadd computer lab' },
}

export type TimelineEntry = { year: number; image: string; alt: string; heading: string; description: string }

/** Wording for the founding year, as supplied for this timeline. */
const FOUNDING_COPY = {
  heading: 'Where the Journey Began',
  description:
    'Techcadd was founded with a vision to make technology education accessible and help learners build practical skills for their future careers.',
}

export const TIMELINE: TimelineEntry[] = JOURNEY.filter((m) => m.year >= 2016 && m.year <= 2026)
  .map((m) => ({
    year: m.year,
    heading: m.year === 2016 ? FOUNDING_COPY.heading : m.title,
    description: m.year === 2016 ? FOUNDING_COPY.description : m.text,
    ...PHOTOS[m.year],
  }))
  .sort((a, b) => b.year - a.year)

/** The founding milestone, also named in the section label. */
export const FOUNDING = JOURNEY.find((m) => m.year === 2016)
