import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import About from '@/components/home/About'
import HowItWorks from '@/components/home/HowItWorks'
import WhyTechcadd from '@/components/home/WhyTechcadd'
import StatsStrip from '@/components/home/StatsStrip'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About techcadd"
        title="Two decades of turning students into engineers"
        lead="From one classroom in Punjab to a national training network — the story, the people and the method."
        crumbs={[{ label: 'About' }]}
      />
      <StatsStrip />
      <About />
      <HowItWorks />
      <WhyTechcadd />
      <CTA />
    </>
  )
}
