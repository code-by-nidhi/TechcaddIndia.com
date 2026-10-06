import Hero from '@/components/landing/Hero'
import TopCourses from '@/components/landing/TopCourses'
import Method from '@/components/landing/Method'
import Stories from '@/components/landing/Stories'
import Programs from '@/components/landing/Programs'
import Blog from '@/components/landing/Blog'
import Branches from '@/components/landing/Branches'
import FAQ from '@/components/landing/FAQ'
import CTA from '@/components/landing/CTA'

import '@/styles/landing.css'

/* The homepage follows the infosys.com page order: the framed banner with its
   prompt box → a carousel of top courses → how we train, as widening picture
   cards → student stories on black → every course and program as a link grid
   → the blog mosaic → then our own centres, questions and the dark closing
   band. Each section picks its own band colour. */
export default function HomePage() {
  return (
    <div className="sq">
      <Hero />
      <TopCourses />
      <Method />
      <Stories />
      <Programs />
      <Blog />
      <Branches />
      <FAQ />
      <CTA />
    </div>
  )
}
