import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import IndiaPresence from '@/components/home/IndiaPresence'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'Franchises' }

export default function FranchisesPage() {
  return (
    <>
      <PageHero
        eyebrow="Franchises"
        title="Open a techcadd centre in your city"
        lead="Partner with us to bring AI and software engineering training to your region."
        crumbs={[{ label: 'Franchises' }]}
      />
      <section className="section">
        <div className="shell page-grid">
          <Placeholder title="Why partner with techcadd" />
          <Placeholder title="What you get" />
          <Placeholder title="How to apply" />
        </div>
      </section>
      <IndiaPresence />
      <CTA />
    </>
  )
}
