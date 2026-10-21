import type { Metadata } from 'next'

import AboutHero from '@/components/about/AboutHero'
import OurServices from '@/components/about/OurServices'
import About from '@/components/home/About'
import HowItWorks from '@/components/home/HowItWorks'
import WhyZoom from '@/components/about/WhyZoom'
import StatsStrip from '@/components/home/StatsStrip'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = {
  title: 'About',
  description: 'techcadd bridges education and industry through practical training, emerging technologies and career-focused learning.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurServices />
      <StatsStrip />
      <About />
      <HowItWorks />
      <WhyZoom />
      <CTA />
    </>
  )
}
