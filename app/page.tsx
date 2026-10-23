import Hero from '@/components/landing/Hero'
import Results from '@/components/landing/Results'
import About from '@/components/landing/About'
import TopCourses from '@/components/landing/TopCourses'
import Method from '@/components/landing/Method'
import Stories from '@/components/landing/Stories'
import Blog from '@/components/landing/Blog'
import Branches from '@/components/landing/Branches'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'

import '@/styles/landing.css'

/* The homepage reads like a corporate site (Infosys, TCS, Tech Mahindra) in
   its own sections: a split banner with the course finder → a results band of
   metric cards and counters → who we are,
   with the figures and the reasons to choose us → an edge-to-edge course
   rail → the four steps on a scroll-driven timeline → student stories as a
   spotlight on ink → a newsroom → the branch
   picker, questions and the dark closing band. Each section picks its own
   band colour. */
export default function HomePage() {
  return (
    <div className="sq">
      <Hero />
      <Results />
      <About />
      <TopCourses />
      <Method />
      <Stories />
      <Blog />
      <Branches />
      <FAQ />
      <CTA />
    </div>
  )
}
