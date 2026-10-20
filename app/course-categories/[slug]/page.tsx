import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'

import PageHero from '@/components/ui/PageHero'
import CTA from '@/components/home/CTA'
import { COURSES_MENU, categoryHref, findMenuCategory } from '@/data/courses-menu'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return COURSES_MENU.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = findMenuCategory(slug)
  if (!category) return { title: 'Category not found' }
  const title = `${category.title} Courses`
  const description = `${category.courses.length} ${category.title.toLowerCase()} courses at techcadd: ${category.courses.map((c) => c.label).join(', ')}.`
  const url = categoryHref(slug)
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: 'website' } }
}

export default async function CourseCategoryPage({ params }: Props) {
  const { slug } = await params
  const category = findMenuCategory(slug)
  if (!category) notFound()

  return (
    <>
      <PageHero
        eyebrow="Course category"
        title={category.title}
        lead={`${category.courses.length} courses — classroom or live online.`}
        crumbs={[{ label: 'Courses', href: '/courses' }, { label: 'Categories', href: '/course-categories' }, { label: category.title }]}
      />
      <section className="section">
        <div className="shell">
          <nav className="filter-row" aria-label="Course categories">
            {COURSES_MENU.map((c) => (
              <Link key={c.slug} href={categoryHref(c.slug)} className={c.slug === slug ? 'is-active' : undefined}>
                {c.title}
              </Link>
            ))}
          </nav>
          <ul className="page-grid">
            {category.courses.map((c) => (
              <li key={c.slug}>
                <Link href={c.href} className="glass ccard">
                  <span>{c.label}</span>
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
