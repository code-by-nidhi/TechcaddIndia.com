import { FiUsers, FiBriefcase, FiCpu, FiAward } from 'react-icons/fi'

import CountUp from '@/components/fx/CountUp'
import SectionHeading from '@/components/ui/SectionHeading'
import { STATS } from '@/data/site'

/* ==========================================================================
   Stats — four pill cards in a 2×2 around a shield carrying the techcadd
   logo. Left cards keep their icon on the outer (left) edge, right cards on
   the outer (right) edge, and the shield overlaps the inner ends of all four.
   ========================================================================== */

const ICONS = [FiUsers, FiBriefcase, FiCpu, FiAward]

export default function StatsStrip() {
  return (
    <section className="section stats" aria-labelledby="stats-title">
      <div className="shell">
        <SectionHeading
          center
          title={['Two decades of', { text: 'building engineers', className: 'gold-text' }]}
        />

        <div className="stats__grid">
          {STATS.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <div
                className={`stats__card${i % 2 ? ' stats__card--right' : ''}`}
                key={s.label}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <span className="stats__icon" aria-hidden>
                  <Icon />
                </span>
                <div className="stats__text">
                  <strong>
                    <CountUp value={s.value} suffix={s.suffix} />
                  </strong>
                  <span>{s.label}</span>
                </div>
              </div>
            )
          })}

          <div className="stats__shield" aria-hidden data-aos="zoom-in">
            <svg viewBox="0 0 200 236" className="stats__shield-svg">
              <defs>
                <linearGradient id="shield-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#93c5fd" />
                  <stop offset="0.45" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#1f4fd1" />
                </linearGradient>
                <linearGradient id="shield-rim" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#c9d8f5" />
                </linearGradient>
              </defs>
              {/* white rim, then the blue face inset inside it */}
              <path
                d="M100 4 C 130 22, 160 28, 194 28 C 194 120, 176 190, 100 232 C 24 190, 6 120, 6 28 C 40 28, 70 22, 100 4 Z"
                fill="url(#shield-rim)"
              />
              <path
                d="M100 18 C 127 33, 154 39, 182 40 C 180 120, 164 180, 100 218 C 36 180, 20 120, 18 40 C 46 39, 73 33, 100 18 Z"
                fill="url(#shield-fill)"
              />
              {/* a soft gloss on the left half */}
              <path d="M100 18 C 73 33, 46 39, 18 40 C 20 120, 36 180, 100 218 Z" fill="#fff" opacity="0.12" />
            </svg>
            <span className="stats__logo" />
          </div>
        </div>
      </div>
    </section>
  )
}
