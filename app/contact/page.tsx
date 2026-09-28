import type { Metadata } from 'next'
import { FiPhone, FiMail, FiClock } from 'react-icons/fi'

import PageHero from '@/components/ui/PageHero'
import CTA from '@/components/home/CTA'
import { SITE } from '@/data/site'

export const metadata: Metadata = { title: 'Contact' }

const CARDS = [
  { icon: FiPhone, title: 'Call us', value: SITE.phone, href: SITE.phoneHref },
  { icon: FiMail, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: FiClock, title: 'Hours', value: SITE.hours },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a counsellor"
        lead="Free career counselling — visit a centre, or book a call from anywhere in India."
        crumbs={[{ label: 'Contact' }]}
      />
      <section className="section">
        <div className="shell page-grid">
          {CARDS.map(({ icon: Icon, title, value, href }, i) => (
            <div className="branch-card glass" key={title} data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="ai__icon">
                <Icon />
              </span>
              <h3>{title}</h3>
              {href ? <a href={href}>{value}</a> : <span>{value}</span>}
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}
