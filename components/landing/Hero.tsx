import Link from 'next/link'
import { FiArrowRight, FiAward } from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import { STATS } from '@/data/site'
import { FRANCHISE_STATS } from '@/data/franchise'

/* ==========================================================================
   Hero — a centred company banner. The tagline, a short profile and the
   franchise call to action, then a strip of company figures.
   ========================================================================== */

const FIGURES = [
  { value: FRANCHISE_STATS[0].value, label: FRANCHISE_STATS[0].label },
  ...[STATS[0], STATS[1], STATS[3]].map((s) => ({ value: `${s.value.toLocaleString('en-IN')}${s.suffix}`, label: s.label })),
]

export default function Hero() {
  return (
    <section className="cx-hero">
      <div className="cx-hero__bg" aria-hidden />

      <div className="shell cx-hero__copy">
        <p className="cx-hero__kicker">
          <span className="cx-hero__dot" aria-hidden />
          <FiAward aria-hidden />
          Trusted by <strong>{FRANCHISE_STATS[0].value}</strong> {FRANCHISE_STATS[0].label.toLowerCase()} across India
        </p>

        <SplitHeading
          as="h1"
          immediate
          delay={0.1}
          lines
          className="cx-hero__title"
          parts={["Building India's", { text: 'technology education network', className: 'cx-hero__em' }]}
        />

        <p className="cx-hero__lead" data-aos="fade-up" data-aos-delay="250">
          For 20 years techcadd has turned learning into livelihoods. Today we are taking that legacy to every city — and
          inviting entrepreneurs to grow it with us.
        </p>

        <div className="cx-hero__ctas" data-aos="fade-up" data-aos-delay="320">
          <Link href="/about" className="btn btn--ghost">
            Discover techcadd
          </Link>
          <Link href="/franchises#apply" className="btn btn--gold cx-hero__go">
            Become a Franchise Partner
            <span aria-hidden>
              <FiArrowRight />
            </span>
          </Link>
        </div>

        <ul className="cx-hero__figures" data-aos="fade-up" data-aos-delay="400">
          {FIGURES.map((f) => (
            <li key={f.label}>
              <b>{f.value}</b> {f.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
