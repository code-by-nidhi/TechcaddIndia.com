import { FiStar } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/data/site'

export default function Testimonials() {
  return (
    <section className="section sq-testi" id="testimonials">
      <div className="shell">
        <SectionHeading
          eyebrow="Student stories"
          title={['Heard from', { text: 'across the country', className: 'sq-hl' }]}
          lead="From classrooms in Punjab to live batches in Bengaluru — what our learners say."
        />

        <div className="sq-quotes">
          {TESTIMONIALS.map((t, i) => (
            <figure className="sq-quote" key={t.name} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
              <div className="sq-quote__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, s) => (
                  <FiStar key={s} className="star" aria-hidden />
                ))}
              </div>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {t.role} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
