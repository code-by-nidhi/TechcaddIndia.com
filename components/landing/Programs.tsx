import Link from 'next/link'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'

import { CATEGORIES } from '@/data/site'

/* A corporate "what we do" index: the heading and introduction split across
   the top, then the campus photograph beside a numbered two-column directory
   of every track and program. Each row fills with ink from the left on
   hover. */

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
    <section className="section cx-programs" id="categories">
      <div className="shell">
        <div className="cx-head cx-head--split">
          <h2 className="cx-title" data-aos="fade-up">
            Courses and Programs
          </h2>
          <p data-aos="fade-up" data-aos-delay="100">
            Six tracks and thirty-plus programs, from a 45-day industrial training to a six-month career course. Pick a
            direction first, then a duration — counselling is free if you want help choosing.
          </p>
        </div>

        <div className="cx-programs__grid">
          <div className="cx-programs__img" data-aos="fade-right">
            <Image src="/images/course/campus1.webp" alt="Students at work in a techcadd classroom" fill sizes="(max-width: 900px) 100vw, 34vw" />
          </div>

          <ul className="cx-dir">
            {LINKS.map((l, i) => (
              <li key={l.label} data-aos="fade-up" data-aos-delay={(i % 6) * 50}>
                <Link href={l.href}>
                  <span className="cx-dir__no" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="cx-dir__label">{l.label}</span>
                  <span className="cx-dir__go" aria-hidden>
                    <FiArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
