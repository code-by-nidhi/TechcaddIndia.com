import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'Projects' }

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Work we have delivered" lead="Software and training projects built by the techcadd team." crumbs={[{ label: 'Projects' }]} />
      <section className="section">
        <div className="shell page-grid">
          <Placeholder title="Client projects" />
          <Placeholder title="Student projects" />
          <Placeholder title="Case studies" />
        </div>
      </section>
      <CTA />
    </>
  )
}
