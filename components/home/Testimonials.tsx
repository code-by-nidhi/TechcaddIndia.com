import { FiStar } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/data/site'

type T = (typeof TESTIMONIALS)[number]

function Card({ t }: { t: T }) {
  const initials = t.name
    .split(' ')
    .map((p) => p[0])
    .join('')
  return (
    <figure className="tcard glass">
      <div className="tcard__stars" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, i) => (
          <FiStar key={i} className="star" aria-hidden />
        ))}
      </div>
      <blockquote>“{t.quote}”</blockquote>
      <figcaption>
        <span className="tcard__avatar" aria-hidden>
          {initials}
        </span>
        <span>
          <strong>{t.name}</strong>
          <small>
            {t.role} · {t.city}
          </small>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2)
  const rows = [TESTIMONIALS.slice(0, half), TESTIMONIALS.slice(half)]

  return (
    <section className="section testi" id="testimonials">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Student stories"
          title={['Heard from', { text: 'across the country', className: 'gradient-text' }]}
          lead="From classrooms in Punjab to live batches in Bengaluru — what our learners say."
        />
      </div>

      <div className="testi__rows">
        {rows.map((row, r) => (
          <div className={`marquee${r % 2 ? ' marquee--reverse' : ''}`} key={r}>
            <div className="marquee__track">
              {/* duplicated so the loop is seamless; the copy is hidden from AT */}
              {[...row, ...row, ...row, ...row].map((t, i) => (
                <div key={i} aria-hidden={i >= row.length}>
                  <Card t={t} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
