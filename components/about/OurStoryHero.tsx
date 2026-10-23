import Link from 'next/link'
import type { IconType } from 'react-icons'
import { FiArrowRight, FiCloud, FiCpu, FiShield } from 'react-icons/fi'
import { SiJavascript, SiPython, SiReact } from 'react-icons/si'

import { aboutHref } from '@/data/about-pages'

/* Our Story hero: a centred statement on a deep-navy panel with four small
   glass labels around the headline, a quiet network drawn behind it, two
   actions and a strip of the technologies techcadd teaches. The labels are the
   four themes of the story, not clients; the strip lists subjects taught, not
   partners. No dates, figures or achievements appear here.
   The panel starts below the navbar because the logo is navy. */

const LABELS = ['Practical Learning', 'Emerging Technologies', 'Software Development', 'Career Growth']

const TECH: { name: string; Icon: IconType }[] = [
  { name: 'React', Icon: SiReact },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Python', Icon: SiPython },
  { name: 'Artificial Intelligence', Icon: FiCpu },
  { name: 'Cloud Computing', Icon: FiCloud },
  { name: 'Cybersecurity', Icon: FiShield },
]

export default function OurStoryHero() {
  return (
    <section className="osh" aria-labelledby="osh-title">
      {/* a quiet network behind the content: decorative */}
      <svg className="osh__net" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
        <g className="osh__lines">
          <path d="M5 14 L16 27 L9 46" />
          <path d="M16 27 L24 20" />
          <path d="M95 12 L84 25 L91 47" />
          <path d="M84 25 L76 19" />
        </g>
        {(
          [
            [5, 14],
            [16, 27],
            [9, 46],
            [24, 20],
            [95, 12],
            [84, 25],
            [91, 47],
            [76, 19],
          ] as const
        ).map(([x, y], i) => (
          <circle key={i} className={`osh__node${i % 3 === 0 ? ' osh__node--glow' : ''}`} cx={x} cy={y} r="0.7" />
        ))}
      </svg>
      <span className="osh__orb osh__orb--a" aria-hidden />
      <span className="osh__orb osh__orb--b" aria-hidden />

      <div className="shell osh__inner">
        <p className="osh__eyebrow osh__in" style={{ ['--i' as string]: 0 }}>
          Our Story · Techcadd
        </p>

        <div className="osh__titlewrap">
          <h1 id="osh-title" className="osh__title">
            <span className="osh__in" style={{ ['--i' as string]: 1 }}>
              From Learning Technology
            </span>
            <span className="osh__in" style={{ ['--i' as string]: 2 }}>
              to <em>Building the Future.</em>
            </span>
          </h1>

          <ul className="osh__labels">
            {LABELS.map((l, i) => (
              <li key={l} className={`osh__label osh__label--${i}`} style={{ ['--i' as string]: i }}>
                <span className="osh__dot" aria-hidden />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <p className="osh__lead osh__in" style={{ ['--i' as string]: 3 }}>
          Techcadd&rsquo;s journey is built around one purpose: making technology skills practical, accessible, and relevant to
          the real world. Through hands-on learning, industry-focused programs, and technology-driven solutions, we help people
          and businesses move forward with confidence.
        </p>

        <div className="osh__actions osh__in" style={{ ['--i' as string]: 4 }}>
          <Link href="#about" className="mvh__btn mvh__btn--primary">
            Explore Our Journey <FiArrowRight aria-hidden />
          </Link>
          <Link href={aboutHref('mission-vision')} className="mvh__btn mvh__btn--ghost">
            Discover Our Mission
          </Link>
        </div>

        <div className="osh__tech osh__in" style={{ ['--i' as string]: 5 }}>
          <p className="osh__tech-title">Our technology ecosystem</p>
          <ul className="osh__tech-list">
            {TECH.map(({ name, Icon }) => (
              <li key={name}>
                <Icon aria-hidden />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
