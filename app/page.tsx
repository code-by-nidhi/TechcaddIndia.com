import Hero from '@/components/home/Hero'
import StatsStrip from '@/components/home/StatsStrip'
import AICourses from '@/components/home/AICourses'
import About from '@/components/home/About'
import HowItWorks from '@/components/home/HowItWorks'
import IndiaPresence from '@/components/home/IndiaPresence'
import Categories from '@/components/home/Categories'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import WhyTechcadd from '@/components/home/WhyTechcadd'
import Testimonials from '@/components/home/Testimonials'
import Technologies from '@/components/home/Technologies'
import FAQ from '@/components/home/FAQ'
import Blog from '@/components/home/Blog'
import CTA from '@/components/home/CTA'

/* Section order follows techcaddjalandhar.com, with "Across India" added for
   the national site. Backgrounds alternate light / navy down the page. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <AICourses />
      <About />
      <HowItWorks />
      <IndiaPresence />
      <Categories />
      <FeaturedCourses />
      <WhyTechcadd />
      <Testimonials />
      <Technologies />
      <FAQ />
      <Blog />
      <CTA />
    </>
  )
}
