import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

import CountUp from '@/components/fx/CountUp'
import { CATEGORIES, CENTRES, STATS } from '@/data/site'

/* ==========================================================================
   Results — the proof band under the hero. A row of metric cards, one per
   track, each led by a big figure; then a full-width counter row with the
   headline numbers, ruled into five columns.
   ========================================================================== */

const COUNTERS = [...STATS, { value: CENTRES.length, suffix: '', label: 'Training centres' }]

export default function Results() {
  return (
    <section className="section cx-results sq-tint" id="results">
      <div className="shell">
        <div className="cx-head cx-head--split">
          <div className="cx-head__text">
            <span className="eyebrow" data-aos="fade-up">
              Results that speak
            </span>
            <h2 className="cx-title" data-aos="fade-up" data-aos-delay="80">
              Trusted by learners, <span className="cx-hl">backed by numbers</span>
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="160">
            Six career tracks, each built around live projects and mentors who work in the field. Pick a track and see
            where it leads.
          </p>
        </div>

        <ul className="cx-results__cards">
          {CATEGORIES.map((c, i) => (
            <li key={c.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
              <Link href={`/courses?category=${c.slug}`} className="cx-result">
                <span className="cx-result__tag">{c.title}</span>
                <strong className="cx-result__num">
                  <CountUp value={c.count} />
                  <small>programs</small>
                </strong>
                <p>{c.blurb}</p>
                <span className="cx-result__go" aria-hidden>
                  <FiArrowUpRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <dl className="cx-results__counters" data-aos="fade-up">
          {COUNTERS.map((s) => (
            <div key={s.label}>
              {/* label first for valid <dl>; CSS shows the number on top */}
              <dt>{s.label}</dt>
              <dd>
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
