import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import DurationTabs from '@/components/internship/DurationTabs'
import {
  FormatGrid,
  HeroExtras,
  LearningModes,
  StatTiles,
  TrackCard,
  WhyInternship,
} from '@/components/internship/InternshipSections'
import InternshipFAQ from '@/components/internship/InternshipFAQ'
import CTA from '@/components/home/CTA'
import { INTERNSHIP_FAQS, TRACKS } from '@/data/internships'

export const metadata: Metadata = {
  title: 'Internship & Industrial Training in India',
  description:
    'Internship programs, industrial training and 45-day, 6-week, 4-month and 6-month training with live projects in AI, MERN, Data Science, Cloud, Cyber Security and more — online across India and in Punjab classrooms.',
}

export default function InternshipTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Internship & Training"
        title="Internships & industrial training with live project work"
        lead="Choose a 45-day, 6-week, 4-month or 6-month program built around real project delivery, practical tool stacks and interview outcomes — from anywhere in India, online or in class."
        crumbs={[{ label: 'Internship & Training' }]}
      >
        <HeroExtras />
      </PageHero>

      <StatTiles />

      <section className="section" id="tracks">
        <div className="shell">
          <SectionHeading
            center
            eyebrow="Internship program"
            title={['12 tracks. ', { text: 'One standard.', className: 'gradient-text' }]}
            lead="Every track ends in live client work, an industry certificate and a documented internship letter."
          />
          <div className="in-tracks">
            {TRACKS.map((t, i) => (
              <TrackCard track={t} key={t.slug} delay={(i % 3) * 70} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="programs">
        <div className="shell">
          <SectionHeading
            center
            eyebrow="Programs by length"
            title={['Short, mid or ', { text: 'long-term', className: 'gradient-text' }]}
            lead="Core tracks run at 3, 6 and 9 months. Each length continues where the last ended, so you can extend later without repeating a module."
          />
          <DurationTabs />
        </div>
      </section>

      <FormatGrid />
      <WhyInternship />
      <LearningModes />
      <InternshipFAQ items={INTERNSHIP_FAQS} />
      <CTA />
    </>
  )
}
