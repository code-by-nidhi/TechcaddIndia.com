import { FiLayers, FiAward, FiBriefcase, FiClock, FiPhone } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import SectionHeading from '@/components/ui/SectionHeading'
import { SITE, WHY } from '@/data/site'

const ICONS = [FiLayers, FiAward, FiBriefcase, FiClock]

export default function WhyTechcadd() {
  return (
    <section className="section sq-why" id="why-techcadd">
      <div className="shell">
        <div className="sq-head">
          <SectionHeading
            eyebrow="Why techcadd?"
            title={['The techcadd', { text: 'Difference', className: 'sq-hl' }]}
            lead="For two decades the format has not changed: small batches, trainers who still work in the industry, projects with a real brief behind them, and a placement desk that keeps calling companies long after the last class."
          />
          <div className="sq-why__actions" data-aos="fade-up">
            <a href={SITE.phoneHref} className="btn">
              <FiPhone aria-hidden /> Call Now
            </a>
            <DemoLink className="btn btn--ghost">Book a Free Demo</DemoLink>
          </div>
        </div>

        <div className="sq-why__grid">
          {WHY.map((w, i) => {
            const Icon = ICONS[i]
            return (
              <article className="sq-why__item" key={w.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <Icon aria-hidden />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
