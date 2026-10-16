import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Image from 'next/image'
import { FiCheck } from 'react-icons/fi'

import PageHero from '@/components/ui/PageHero'
import SectionHeading from '@/components/ui/SectionHeading'
import {
  Audiences,
  Careers,
  Certification,
  Comparison,
  FormatGrid,
  HeroExtras,
  LearningModes,
  PlanCards,
  SubCourses,
  Syllabus,
  StatTiles,
  Toolchain,
  WhyInternship,
} from '@/components/internship/InternshipSections'
import InternshipFAQ from '@/components/internship/InternshipFAQ'
import CTA from '@/components/home/CTA'
import { FORMATS, INTERNSHIP_BASE, INTERNSHIP_FAQS, TRACKS, trackFaqs, type Format, type Track } from '@/data/internships'

type Props = { params: Promise<{ slug: string }> }

/* One route serves both kinds of page: a subject track (MERN, Data Science…)
   and a training format (45 days, industrial training…). */
const find = (slug: string) => {
  const track = TRACKS.find((t) => t.slug === slug)
  if (track) return { kind: 'track' as const, track }
  const format = FORMATS.find((f) => f.slug === slug)
  if (format) return { kind: 'format' as const, format }
  return null
}

export function generateStaticParams() {
  return [...TRACKS, ...FORMATS].map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = find((await params).slug)
  if (!page) return { title: 'Internship' }
  if (page.kind === 'track') {
    return { title: `${page.track.title} Internship & Training in India`, description: page.track.lead }
  }
  return { title: `${page.format.title} in India`, description: page.format.blurb }
}

const crumbs = (label: string) => [{ label: 'Internship & Training', href: INTERNSHIP_BASE }, { label }]

function TrackPage({ track }: { track: Track }) {
  return (
    <>
      <PageHero
        eyebrow={track.courses ? 'Internship track' : 'AI-Powered Curriculum'}
        title={`${track.title} Internship & Training`}
        lead={track.lead}
        crumbs={crumbs(track.title)}
      >
        <HeroExtras />
      </PageHero>
      <StatTiles />
      <PlanCards track={track} />
      <SubCourses track={track} />
      {track.stages && (
        <Syllabus
          title={track.title}
          image={track.image}
          stages={track.stages}
          lead="Broken down by the stretch of the program you actually spend on it. Early time goes on fundamentals, the middle stretch on applied work, and the final stretch is live client work, a documented internship letter and placement preparation."
        />
      )}
      {track.tools && <Toolchain title={track.title} tools={track.tools} />}
      <Careers track={track} />
      <Audiences title={`The ${track.title} course`} />
      <Certification title={track.title} />
      <WhyInternship />
      <Comparison title={track.title} />
      <LearningModes />
      <InternshipFAQ items={trackFaqs(track)} title={track.title} />
      <CTA />
    </>
  )
}

function FormatPage({ format }: { format: Format }) {
  return (
    <>
      <PageHero eyebrow={`${format.duration} · Certificate + internship letter`} title={`${format.title} in India`} lead={format.blurb} crumbs={crumbs(format.title)}>
        <HeroExtras />
      </PageHero>
      <StatTiles />
      <section className="section">
        <div className="shell fr-split">
          <div className="fr-photo" data-aos="fade-right">
            <Image src={format.image} alt="Students at work in a techcadd lab" fill sizes="(max-width: 960px) 100vw, 620px" />
          </div>
          <div>
            <SectionHeading eyebrow="Overview" title={[`${format.title}, `, { text: 'done properly', className: 'gradient-text' }]} />
            <div className="fr-prose">
              <p>{format.overview}</p>
              <p>
                <strong>Best for:</strong> {format.bestFor}
              </p>
            </div>
            <ul className="fr-checks fr-checks--2 in-gap-sm">
              {['Any of our 12 tracks', 'Online or classroom', 'Live client brief', 'Internship letter'].map((c) => (
                <li key={c}>
                  <FiCheck aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Syllabus
        title={format.title}
        image={format.image}
        stages={format.phases}
        lead="You pick a track at the start. Fundamentals and toolchain first, then a supervised live client brief, then testing, a capstone and interview preparation."
      />
      <Audiences title={`The ${format.title} program`} />
      <Certification title={format.title} />
      <WhyInternship />
      <LearningModes />
      <FormatGrid exclude={format.slug} />
      <InternshipFAQ items={INTERNSHIP_FAQS} title={format.title} />
      <CTA />
    </>
  )
}

export default async function InternshipDetailPage({ params }: Props) {
  const page = find((await params).slug)
  if (!page) notFound()
  return page.kind === 'track' ? <TrackPage track={page.track} /> : <FormatPage format={page.format} />
}
