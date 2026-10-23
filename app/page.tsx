import Hero from '@/components/landing/Hero'
import Results from '@/components/landing/Results'
import About from '@/components/landing/About'
import PartnerFlow from '@/components/landing/PartnerFlow'
import Method from '@/components/landing/Method'
import Stories from '@/components/landing/Stories'
import Gallery from '@/components/landing/Gallery'
import Blog from '@/components/landing/Blog'
import Branches from '@/components/landing/Branches'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'

import '@/styles/landing.css'

/* The homepage reads like a corporate site (Infosys, TCS, Tech Mahindra) in
   its own sections: a centred banner with the company tagline → a results band of
   metric cards and counters → who we are,
   with the figures and the reasons to choose us → the franchise partner
   flow → the techcadd journey on a scroll-driven timeline → student stories as a
   spotlight on ink → the seminars and events gallery → a newsroom → the branch
   picker, questions and the dark closing band. Each section picks its own
   band colour. */
export default function HomePage() {
  return (
    <div className="sq">
      <Hero />
      <Results />
      <About />
      <PartnerFlow />
      <Method />
      <Stories />
      <Gallery />
      <Blog />
      <Branches />
      <FAQ />
      <CTA />
    </div>
  )
}
