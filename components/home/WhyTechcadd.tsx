import Link from 'next/link'
import { FiLayers, FiAward, FiBriefcase, FiClock, FiPhone } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { SITE, WHY } from '@/data/site'

const ICONS = [FiLayers, FiAward, FiBriefcase, FiClock]

export default function WhyTechcadd() {
  return (
    <section className="section why" id="why-techcadd">
      <div className="shell why__layout">
        <div className="why__intro">
          <SectionHeading
            eyebrow="Why techcadd?"
            title={['The techcadd', { text: 'Difference', className: 'gold-text' }]}
            lead="For two decades the format has not changed: small batches, trainers who still work in the industry, projects with a real brief behind them, and a placement desk that keeps calling companies long after the last class."
          />
          <div className="why__actions" data-aos="fade-up" data-aos-delay="200">
            <a href={SITE.phoneHref} className="btn">
              <FiPhone aria-hidden /> Call Now
            </a>
            <Link href="/contact#demo" className="btn btn--ghost">
              Book a Free Demo
            </Link>
          </div>
        </div>

        <div className="why__grid">
          {WHY.map((w, i) => {
            const Icon = ICONS[i]
            return (
              <article className="why__card" key={w.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="why__icon">
                  <Icon aria-hidden />
                </span>
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
