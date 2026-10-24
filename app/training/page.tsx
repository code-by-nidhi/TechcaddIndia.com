import { sectionHub } from '@/components/ui/SectionPages'
import TrainingHero from '@/components/training/TrainingHero'
import TrainingPrograms from '@/components/training/TrainingPrograms'
import CTA from '@/components/home/CTA'
import { getSection, pageHref } from '@/data/nav-sections'

import '@/styles/training.css'

const hub = sectionHub('training')
const section = getSection('training')

export const metadata = hub.metadata

/* Training has its own landing page: the 3D hero and the filterable program
   cards, instead of the plain link grid the other section hubs use. */
export default function TrainingPage() {
  const programs = section.pages.map((p) => ({ slug: p.slug, label: p.label, href: pageHref(section, p) }))
  return (
    <>
      <TrainingHero title={section.title} lead={section.lead} programs={programs.length} />
      <TrainingPrograms programs={programs} />
      <CTA />
    </>
  )
}
