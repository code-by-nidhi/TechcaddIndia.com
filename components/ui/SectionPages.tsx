import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import CTA from '@/components/home/CTA'
import { findSectionPage, getSection, pageHref, placeholderPages, type NavSection } from '@/data/nav-sections'

/** The link cards to every page of a section, used on its landing page. */
export function SectionLinks({ section }: { section: NavSection }) {
  return (
    <section className="section">
      <div className="shell page-grid">
        {section.pages.map((p, i) => (
          <Link className="branch-card glass" href={pageHref(section, p)} key={p.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
            <h3>{p.label}</h3>
            <span>
              Explore <FiArrowRight aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/** A whole landing page for a section that has no page of its own yet. */
export function sectionHub(key: NavSection['key']) {
  const section = getSection(key)
  const metadata: Metadata = { title: section.label, description: section.lead, alternates: { canonical: section.base } }
  function SectionHubPage() {
    return (
      <>
        <PageHero eyebrow={section.eyebrow} title={section.title} lead={section.lead} crumbs={[{ label: section.label }]} />
        <SectionLinks section={section} />
        <CTA />
      </>
    )
  }
  return { metadata, Page: SectionHubPage }
}

type Props = { params: Promise<{ slug: string }> }

/** Static params, metadata and page for a section's `[slug]` route. */
export function sectionSubRoute(key: NavSection['key']) {
  const section = getSection(key)

  const generateStaticParams = () => placeholderPages(section).map((p) => ({ slug: p.slug }))

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const page = findSectionPage(section, (await params).slug)
    if (!page) return { title: 'Page not found' }
    const url = pageHref(section, page)
    const description = page.lead ?? `${page.label} at techcadd.`
    return { title: page.label, description, alternates: { canonical: url }, openGraph: { title: page.label, description, url, type: 'website' } }
  }

  async function SectionSubPage({ params }: Props) {
    const page = findSectionPage(section, (await params).slug)
    if (!page) notFound()
    const blocks = page.blocks ?? [
      { title: 'Overview', items: ['What this covers and who it is for'] },
      { title: 'Highlights', items: ['Key benefits and outcomes'] },
      { title: 'How to get started', items: ['Enquiry, counselling and next steps'] },
    ]
    return (
      <>
        <PageHero
          eyebrow={section.eyebrow}
          title={page.label}
          lead={page.lead ?? 'This page is coming soon.'}
          crumbs={[{ label: section.label, href: section.base }, { label: page.label }]}
        />
        <section className="section">
          <div className="shell page-grid">
            {blocks.map((b) => (
              <Placeholder key={b.title} title={b.title} items={b.items} />
            ))}
          </div>
        </section>
        <CTA />
      </>
    )
  }

  return { generateStaticParams, generateMetadata, Page: SectionSubPage }
}
