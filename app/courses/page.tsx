import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FiClock, FiMonitor, FiArrowRight } from 'react-icons/fi'

import PageHero from '@/components/ui/PageHero'
import CTA from '@/components/home/CTA'
import { FEATURED_COURSES } from '@/data/site'
import { COURSES_MENU, categoryHref } from '@/data/courses-menu'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Career tracks, certificate programs and industrial training in AI, software, data, cybersecurity, design and engineering — classroom or live online.',
  alternates: { canonical: '/courses' },
}

export default function CoursesPage() {
  const courses = FEATURED_COURSES

  return (
    <>
      <PageHero
        eyebrow="All courses"
        title="Find the course that fits your career"
        lead="Career tracks, certificate programs and industrial training — classroom or live online."
        crumbs={[{ label: 'Courses' }]}
      />
      <section className="section">
        <div className="shell">
          <nav className="filter-row" id="categories" aria-label="Filter by category">
            <Link href="/courses" className="is-active">
              All
            </Link>
            {COURSES_MENU.map((c) => (
              <Link key={c.slug} href={categoryHref(c.slug)}>
                {c.title}
              </Link>
            ))}
          </nav>

          <div className="page-grid" id="course-list">
            {courses.map((c, i) => (
              <article className="fcard glass" style={{ width: 'auto' }} key={c.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <div className="fcard__img">
                  <Image src={c.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
                  {c.highlight && <span className="fcard__badge">{c.highlight}</span>}
                </div>
                <div className="fcard__body">
                  <h3>{c.title}</h3>
                  <ul className="fcard__meta">
                    <li>
                      <FiClock aria-hidden /> {c.duration}
                    </li>
                    <li>
                      <FiMonitor aria-hidden /> {c.mode}
                    </li>
                  </ul>
                  <Link href={`/courses/${c.slug}`} className="fcard__link">
                    View course <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
