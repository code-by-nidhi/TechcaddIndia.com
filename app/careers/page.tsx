import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'Career' }

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Career" title="Work at techcadd" lead="Join the team that trains India's next engineers." crumbs={[{ label: 'Career' }]} />
      <section className="section">
        <div className="shell page-grid">
          <Placeholder title="Open positions" />
          <Placeholder title="Life at techcadd" />
          <Placeholder title="How to apply" />
        </div>
      </section>
      <CTA />
    </>
  )
}
