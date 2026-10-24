import { sectionHub } from '@/components/ui/SectionPages'
import ResourcesHub from '@/components/resources/ResourcesHub'
import CTA from '@/components/home/CTA'
import { getSection, pageHref } from '@/data/nav-sections'

import '@/styles/resources.css'

const hub = sectionHub('resources')
const section = getSection('resources')

export const metadata = hub.metadata

/* Resources has its own landing page: the open-book hero and the searchable
   library shelf, instead of the plain link grid the other section hubs use. */
export default function ResourcesPage() {
  const pages = section.pages.map((p) => ({ slug: p.slug, label: p.label, href: pageHref(section, p) }))
  return (
    <>
      <ResourcesHub lead={section.lead} pages={pages} />
      <CTA />
    </>
  )
}
