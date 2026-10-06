import Link from 'next/link'
import Image from 'next/image'

import { CATEGORIES } from '@/data/site'

/* A picture and a short introduction over a plain grid of large underlined
   links, each of which grows a blue arrow on hover. */

const MORE = [
  { label: 'AI Programs', href: '/ai' },
  { label: 'After 12th', href: '/after-12th' },
  { label: 'Certificate Programs', href: '/certificate-programs' },
  { label: 'Live Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Franchises', href: '/franchises' },
]

const LINKS = [...CATEGORIES.map((c) => ({ label: c.title, href: `/courses?category=${c.slug}` })), ...MORE]

export default function Programs() {
  return (
    <section className="ix-programs" id="categories">
      <div className="shell ix-programs__inner">
        <div className="ix-programs__img">
          <Image src="/images/course/campus1.webp" alt="Students at work in a techcadd classroom" fill sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <div>
          <h2>Courses and Programs</h2>
          <p>
            Six tracks and thirty-plus programs, from a 45-day industrial training to a six-month career course. Pick a
            direction first, then a duration — counselling is free if you want help choosing.
          </p>
          <ul className="ix-programs__links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
