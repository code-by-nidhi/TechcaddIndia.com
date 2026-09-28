import type { Metadata } from 'next'
import Link from 'next/link'

import PageHero from '@/components/ui/PageHero'
import IndiaPresence from '@/components/home/IndiaPresence'
import CTA from '@/components/home/CTA'
import { CENTRES } from '@/data/site'

export const metadata: Metadata = { title: 'Branches' }

export default function BranchesPage() {
  return (
    <>
      <PageHero
        eyebrow="Branches"
        title="Find a techcadd centre — or join online"
        lead="Seven classroom centres, plus live online batches for learners anywhere in India."
        crumbs={[{ label: 'Branches' }]}
      />
      <section className="section">
        <div className="shell page-grid">
          {CENTRES.map((c, i) => (
            <Link href={`/branches/${c.slug}`} className="branch-card glass" key={c.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
              {c.hq && <em>HQ</em>}
              <h3>{c.name}</h3>
              <span>{c.state}</span>
            </Link>
          ))}
        </div>
      </section>
      <IndiaPresence />
      <CTA />
    </>
  )
}
