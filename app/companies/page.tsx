import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import CTA from '@/components/home/CTA'
import { COMPANIES } from '@/data/site'

export const metadata: Metadata = { title: 'Companies' }

export default function CompaniesPage() {
  return (
    <>
      <PageHero
        eyebrow="Companies"
        title="The companies in the techcadd group"
        lead="The businesses that sit alongside techcadd."
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Companies' }]}
      />
      <section className="section">
        <div className="shell page-grid">
          {COMPANIES.map((name, i) => (
            <article className="company-card glass" key={name} data-aos="fade-up" data-aos-delay={i * 70}>
              <span aria-hidden>{name[0]}</span>
              <h2>{name}</h2>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
