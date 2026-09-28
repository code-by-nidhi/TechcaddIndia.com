import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'Certificate Programs' }

export default function CertificateProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificate programs"
        title="Short programs, industry certificates"
        lead="45-day industrial training, internships and 1–3 month certificate courses."
        crumbs={[{ label: 'Certificate Programs' }]}
      />
      <section className="section">
        <div className="shell page-grid">
          <Placeholder title="45-Day Industrial Training" />
          <Placeholder title="6-Month Internship" />
          <Placeholder title="Certificate Courses" />
        </div>
      </section>
      <CTA />
    </>
  )
}
