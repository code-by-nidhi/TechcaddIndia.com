import Hero from '@/components/home/Hero'
import AICourses from '@/components/home/AICourses'
import About from '@/components/home/About'
import HowItWorks from '@/components/home/HowItWorks'
import Branches from '@/components/home/Branches'
import Categories from '@/components/home/Categories'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import WhyTechcadd from '@/components/home/WhyTechcadd'
import Testimonials from '@/components/home/Testimonials'
import Technologies from '@/components/home/Technologies'
import FAQ from '@/components/home/FAQ'
import Blog from '@/components/home/Blog'
import CTA from '@/components/home/CTA'

/* Who we are → what we teach → why us → how it works → proof → where to find
   us → questions → next step. Backgrounds alternate navy / white down the
   page; Categories and Branches sit on their own light bands outside that
   rhythm. */
export default function HomePage() {
  return (
    <>
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
    </>
  )
}
