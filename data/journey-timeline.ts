import { JOURNEY } from '@/data/site'

/* The Our Story timeline: the ten most recent years of the company's journey.

   The milestones themselves (year, heading, description) are the ones already
   published in JOURNEY (data/site.ts), which runs from the 2016 founding to
   today. This file only adds a photograph per year and puts the years newest
   first. The photographs are genuine techcadd images chosen for the TOPIC of
   each year (a lab for a lab year, a hall for a seminar year); they illustrate
   the story and are not captioned as records of those specific events. */

const PHOTOS: Record<number, { image: string; alt: string }> = {
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

export const TIMELINE: TimelineEntry[] = JOURNEY.filter((m) => m.year >= 2017 && m.year <= 2026)
  .map((m) => ({ year: m.year, heading: m.title, description: m.text, ...PHOTOS[m.year] }))
  .sort((a, b) => b.year - a.year)

/** The founding milestone, shown beside the section label rather than as a tab. */
export const FOUNDING = JOURNEY.find((m) => m.year === 2016)
