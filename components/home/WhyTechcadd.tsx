import { FiBookOpen, FiAward, FiBriefcase, FiCalendar, FiCheckCircle, FiStar } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import CountUp from '@/components/fx/CountUp'
import { MODULES, WHY } from '@/data/site'

const ICONS = [FiBookOpen, FiAward, FiBriefcase, FiCalendar]

export default function WhyTechcadd() {
  return (
    <section className="section why" id="why-techcadd">
      <div className="shell">
        <div className="why__head">
          <SectionHeading
            eyebrow="Why techcadd"
            title={['Built around', { text: 'outcomes,', className: 'gradient-text' }, 'not hours']}
          />
          <div className="why__ratings" data-aos="fade-left">
            <div>
              <strong>
                <CountUp value={4.9} decimals={1} suffix="/5" />
              </strong>
              <span>
                <FiStar className="star" aria-hidden /> Rating
              </span>
            </div>
            <div>
              <strong>
                <CountUp value={750} suffix="+" />
              </strong>
              <span>Reviews</span>
            </div>
            <div>
              <strong>
                <CountUp value={15} suffix="K+" />
              </strong>
              <span>Alumni network</span>
            </div>
          </div>
        </div>

        <div className="why__grid">
          {WHY.map((w, i) => {
            const Icon = ICONS[i]
            return (
              <article className="why__card glass" key={w.title} data-aos="flip-up" data-aos-delay={i * 100}>
                <span className="why__icon">
                  <Icon />
                </span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            )
          })}
        </div>

        <div className="why__modules" data-aos="fade-up">
          <h3>Included with every career track</h3>
          <ul>
            {MODULES.map((m) => (
              <li key={m}>
                <FiCheckCircle aria-hidden /> {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
