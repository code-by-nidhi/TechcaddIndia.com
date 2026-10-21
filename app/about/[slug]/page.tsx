import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import About from '@/components/home/About'
import HowItWorks from '@/components/home/HowItWorks'
import WhyZoom from '@/components/about/WhyZoom'
import CTA from '@/components/home/CTA'
import { ABOUT_PAGES, aboutHref, findAboutPage } from '@/data/about-pages'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return ABOUT_PAGES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = findAboutPage(slug)
  if (!page) return { title: 'Page not found' }
  const url = aboutHref(slug)
  return {
    title: page.label,
    description: page.lead,
    alternates: { canonical: url },
    openGraph: { title: page.label, description: page.lead, url, type: 'website' },
  }
}

export default async function AboutSubPage({ params }: Props) {
  const { slug } = await params
  const page = findAboutPage(slug)
  if (!page) notFound()

  return (
    <>
      <PageHero
        eyebrow="About techcadd"
        title={page.title}
        lead={page.lead}
        crumbs={[{ label: 'About', href: '/about' }, { label: page.label }]}
      />
      {page.section === 'story' && <About />}
      {page.section === 'approach' && <HowItWorks />}
      {page.section === 'why' && <WhyZoom />}
      {page.blocks && (
        <section className="section">
          <div className="shell page-stack">
            {page.blocks.map((b) => (
              <Placeholder key={b.title} title={b.title} items={b.items} />
            ))}
          </div>
        </section>
      )}
      <CTA />
    </>
  )
}
