import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import Categories from '@/components/home/Categories'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'Courses After 12th' }

export default function After12thPage() {
  return (
    <>
      <PageHero
        eyebrow="After 12th"
        title="Start your tech career straight after school"
        lead="Beginner-friendly diplomas that take you from zero to job-ready."
        crumbs={[{ label: 'After 12th' }]}
      />
      <section className="section">
        <div className="shell page-grid">
          <Placeholder title="Diploma programs" />
          <Placeholder title="Stream-wise guidance" items={['Science', 'Commerce', 'Arts']} />
          <Placeholder title="Career outcomes" />
        </div>
      </section>
      <Categories />
      <CTA />
    </>
  )
}
