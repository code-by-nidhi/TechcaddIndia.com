import { sectionHub } from '@/components/ui/SectionPages'
import CareersHero from '@/components/careers/CareersHero'
import CareerJourney from '@/components/careers/CareerJourney'
import CTA from '@/components/home/CTA'
import { getSection, pageHref } from '@/data/nav-sections'

import '@/styles/careers.css'

const hub = sectionHub('careers')
const section = getSection('careers')

export const metadata = hub.metadata

/* Careers has its own landing page: the staircase hero and the three-stage
   journey, instead of the plain link grid the other section hubs use. */
export default function CareersPage() {
  const pages = section.pages.map((p) => ({ slug: p.slug, label: p.label, href: pageHref(section, p), lead: p.lead }))
  return (
    <>
      <CareersHero title={section.title} lead={section.lead} services={pages.length} />
      <CareerJourney pages={pages} />
      <CTA />
    </>
  )
}
