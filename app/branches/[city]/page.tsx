import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import CTA from '@/components/home/CTA'
import { CENTRES } from '@/data/site'

type Props = { params: Promise<{ city: string }> }

export function generateStaticParams() {
  return CENTRES.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const c = CENTRES.find((x) => x.slug === city)
  return { title: c ? `IT Training Institute in ${c.name}` : 'Branch' }
}

export default async function BranchPage({ params }: Props) {
  const { city } = await params
  const centre = CENTRES.find((c) => c.slug === city)
  if (!centre) notFound()

  return (
    <>
      <PageHero
        eyebrow={`${centre.name}, ${centre.state}`}
        title={`techcadd ${centre.name}`}
        lead={`AI, Full-Stack, Data Science and more — classroom training in ${centre.name}.`}
        crumbs={[{ label: 'Branches', href: '/branches' }, { label: centre.name }]}
      />
      <section className="section">
        <div className="shell page-grid">
          <Placeholder title="Address & directions" items={['Full address', 'Embedded map', 'Timings']} />
          <Placeholder title="Centre gallery" />
          <Placeholder title="Local placements & reviews" />
        </div>
      </section>
      <FeaturedCourses />
      <CTA />
    </>
  )
}
