import CountUp from '@/components/fx/CountUp'
import { CENTRES, STATS } from '@/data/site'

/* ==========================================================================
   Results — the proof band under the hero: a full-width counter row with
   the headline numbers, ruled into five columns.
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
            <h2 className="cx-title" data-fx="words">
              Trusted by learners, <span className="cx-hl">backed by numbers</span>
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="160">
            A decade of training, a nationwide network of centres and hundreds of hiring partners — the track record
            every techcadd franchise is built on.
          </p>
        </div>

        <dl className="cx-results__counters" data-fx="stagger">
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
