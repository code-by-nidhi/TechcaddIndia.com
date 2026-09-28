import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/home/CTA'
import { FEATURED_COURSES } from '@/data/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return FEATURED_COURSES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = FEATURED_COURSES.find((c) => c.slug === slug)
  return { title: course ? `${course.title} Course` : 'Course' }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = FEATURED_COURSES.find((c) => c.slug === slug)
  if (!course) notFound()

  return (
    <>
      <PageHero
        eyebrow={`${course.duration} · ${course.mode}`}
        title={course.title}
        lead={`Topics: ${course.topics.join(', ')}.`}
        crumbs={[{ label: 'Courses', href: '/courses' }, { label: course.title }]}
      />
      <section className="section">
        <div className="shell page-stack">
          <Placeholder title="Course overview" items={['Who it is for', 'Outcomes', 'Batch timings (classroom / online)']} />
          <Placeholder title="Syllabus" items={['Module-by-module accordion', 'Projects per module']} />
          <Placeholder title="Tools & certificates" items={['Tool logos', 'Certificate preview', 'Internship letter']} />
          <Placeholder title="Fees & enrol" items={['Fee plans / EMI', 'Book demo form']} />
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  )
}
