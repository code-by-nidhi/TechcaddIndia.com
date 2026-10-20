import type { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import PageHero from '@/components/ui/PageHero'
import CTA from '@/components/home/CTA'
import { COURSES_MENU, categoryHref } from '@/data/courses-menu'

export const metadata: Metadata = {
  title: 'Course Categories',
  description: 'Browse techcadd courses by category: AI, software, data & cloud, cybersecurity, digital & creative skills, and engineering.',
  alternates: { canonical: '/course-categories' },
}

export default function CourseCategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Course categories"
        title="Browse courses by category"
        lead="Six tracks, from AI and software to design and engineering."
        crumbs={[{ label: 'Courses', href: '/courses' }, { label: 'Categories' }]}
      />
      <section className="section">
        <div className="shell">
          <ul className="page-grid">
            {COURSES_MENU.map((c) => (
              <li key={c.slug}>
                <Link href={categoryHref(c.slug)} className="glass ccard ccard--cat">
                  <strong>{c.title}</strong>
                  <small>{c.courses.length} courses</small>
                  <FiArrowRight aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  )
}
