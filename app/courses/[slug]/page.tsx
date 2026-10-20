import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/home/CTA'
import { FEATURED_COURSES } from '@/data/site'
import { ALL_MENU_COURSES, categoryHref, courseHref, findMenuCategory, findMenuCourse } from '@/data/courses-menu'

type Props = { params: Promise<{ slug: string }> }

/** Every course in the catalogue has a page; featured ones add duration and topics. */
function resolve(slug: string) {
  const course = findMenuCourse(slug)
  if (!course) return null
  const category = findMenuCategory(course.categorySlug)!
  const featured = FEATURED_COURSES.find((c) => c.slug === slug)
  return { course, category, featured }
}

export const dynamicParams = false

export function generateStaticParams() {
  return ALL_MENU_COURSES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const hit = resolve(slug)
  if (!hit) return { title: 'Course not found' }
  const title = `${hit.course.label} Course`
  const description = `Learn ${hit.course.label} at techcadd — ${hit.category.title.toLowerCase()} training with classroom and live online batches, live projects and placement support.`
  const url = courseHref(slug)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  }
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const hit = resolve(slug)
  if (!hit) notFound()
  const { course, category, featured } = hit

  return (
    <>
      <PageHero
        eyebrow={featured ? `${featured.duration} · ${featured.mode}` : category.title}
        title={course.label}
        lead={featured ? `Topics: ${featured.topics.join(', ')}.` : `Part of ${category.title}. Classroom and live online batches.`}
        crumbs={[
          { label: 'Courses', href: '/courses' },
          { label: category.title, href: categoryHref(category.slug) },
          { label: course.label },
        ]}
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
