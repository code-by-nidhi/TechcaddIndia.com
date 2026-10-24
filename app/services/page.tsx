import { sectionHub } from '@/components/ui/SectionPages'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesBento from '@/components/services/ServicesBento'
import CTA from '@/components/home/CTA'
import { getSection, pageHref } from '@/data/nav-sections'

import '@/styles/services.css'

const hub = sectionHub('services')
const section = getSection('services')

export const metadata = hub.metadata

/* IT Services has its own landing page: the layered-stack hero and the
   bento grid, instead of the plain link grid the other section hubs use. */
export default function ServicesPage() {
  const services = section.pages.map((p) => ({ slug: p.slug, label: p.label, href: pageHref(section, p) }))
  return (
    <>
      <ServicesHero lead={section.lead} services={services.length} />
      <ServicesBento services={services} />
      <CTA />
    </>
  )
}
