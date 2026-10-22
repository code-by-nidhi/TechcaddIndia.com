import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import RotatingHeadline from '@/components/about/RotatingHeadline'
import TechEcosystem from '@/components/about/TechEcosystem'
import { aboutHref } from '@/data/about-pages'

/* Company-profile hero: copy and two actions on the left, a technology ecosystem
   (a glass core joined to six discipline nodes) on the right, and a strip of the four things
   the training is built on. Values, not claims — no figures live here.
   The panel itself (rounded, inset, lilac wash, grid) is `.ahero` in pages.css. */
const VALUES = ['Practical Learning', 'Industry-Oriented Training', 'Hands-On Projects', 'Career Development']

export default function AboutHero() {
  return (
    <section className="ahero" aria-labelledby="about-hero-title">
      <div className="shell ahero__grid">
        <div className="ahero__copy">
          <p className="ahero__eyebrow ahero__in" style={{ ['--i' as string]: 0 }}>
            About techcadd
          </p>
          <RotatingHeadline />
          <p className="ahero__lead ahero__in" style={{ ['--i' as string]: 4 }}>
            Discover Techcadd&rsquo;s journey in technology education, our commitment to practical learning, and our approach to
            developing industry-ready professionals through hands-on training and emerging technologies.
          </p>
          <div className="ahero__actions ahero__in" style={{ ['--i' as string]: 5 }}>
            <Link href={aboutHref('our-story')} className="btn btn--gold">
              Explore Our Story <FiArrowRight aria-hidden />
            </Link>
            <Link href={aboutHref('our-training-approach')} className="btn btn--ghost">
              Discover Our Approach
            </Link>
          </div>
        </div>

        <div className="ahero__visual">
          <TechEcosystem />
        </div>
      </div>

      <ul className="shell ahero__values ahero__in" style={{ ['--i' as string]: 6 }}>
        {VALUES.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </section>
  )
}
