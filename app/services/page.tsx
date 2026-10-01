import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'Services' }

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Technology services, built by the people who teach it"
        lead="Software, training and consulting for businesses and institutions."
        crumbs={[{ label: 'Services' }]}
      />
      <section className="section">
        <div className="shell page-grid">
          <Placeholder title="Software development" />
          <Placeholder title="Corporate training" />
          <Placeholder title="Consulting" />
        </div>
      </section>
      <CTA />
    </>
  )
}
