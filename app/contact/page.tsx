import type { Metadata } from 'next'

import ContactHero from '@/components/contact/ContactHero'
import ContactDesk from '@/components/contact/ContactDesk'
import CTA from '@/components/home/CTA'
import { getSection, pageHref } from '@/data/nav-sections'

import '@/styles/contact.css'

export const metadata: Metadata = { title: 'Contact' }

const section = getSection('contact')

/* The globe-and-chat hero with the ways to reach us, then the help desk
   that routes each kind of enquiry to its page. */
export default function ContactPage() {
  const pages = section.pages.map((p) => ({ slug: p.slug, label: p.label, href: pageHref(section, p) }))
  return (
    <>
      <ContactHero lead={section.lead} />
      <ContactDesk pages={pages} />
      <CTA />
    </>
  )
}
