import Hero from '@/components/landing/Hero'
import Marquee from '@/components/landing/Marquee'
import Results from '@/components/landing/Results'
import Credentials from '@/components/landing/Credentials'
import About from '@/components/landing/About'
import PartnerFlow from '@/components/landing/PartnerFlow'
import Method from '@/components/landing/Method'
import Stories from '@/components/landing/Stories'
import Gallery from '@/components/landing/Gallery'
import Blog from '@/components/landing/Blog'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'

import '@/styles/landing.css'

/* The homepage reads like a corporate site (Infosys, TCS, Tech Mahindra) in
   its own sections: a centred banner with the company tagline → a band of oversized company statements scrolling both
   ways → a results band of
   metric cards and counters → the certifications as a deck of certificates →
   who we are,
   with the figures and the reasons to choose us → the franchise partner
   flow → the techcadd journey on a scroll-driven timeline → student stories as an
   automatic slider on ink → the seminars and events gallery → a newsroom → questions and
   the dark closing band. Each section picks its own
   band colour. */
export default function HomePage() {
  return (
    <div className="sq">
      <Hero />
      <Marquee />
      <Results />
      <Credentials />
      <About />
      <PartnerFlow />
      <Method />
      <Stories />
      <Gallery />
      <Blog />
      <FAQ />
      <CTA />
    </div>
  )
}
