import Hero from '@/components/landing/Hero'
import About from '@/components/landing/About'
import Categories from '@/components/landing/Categories'
import FeaturedCourses from '@/components/landing/FeaturedCourses'
import AICourses from '@/components/landing/AICourses'
import WhyTechcadd from '@/components/landing/WhyTechcadd'
import HowItWorks from '@/components/landing/HowItWorks'
import Technologies from '@/components/landing/Technologies'
import Testimonials from '@/components/landing/Testimonials'
import Branches from '@/components/landing/Branches'
import FAQ from '@/components/landing/FAQ'
import Blog from '@/components/landing/Blog'
import CTA from '@/components/landing/CTA'

import '@/styles/landing.css'

/* Who we are → what we teach → why us → how it works → proof → where to find
   us → questions → next step. The homepage has its own section components
   (components/landing) and stylesheet; the ones in components/home are still
   what the inner pages use. Each section picks its own band: navy, white or
   the tinted page ground. */
export default function HomePage() {
  return (
    <div className="sq">
      <Hero />
      <About />
      <Categories />
      <FeaturedCourses />
      <AICourses />
      <WhyTechcadd />
      <HowItWorks />
      <Technologies />
      <Testimonials />
      <Branches />
      <FAQ />
      <Blog />
      <CTA />
    </div>
  )
}
