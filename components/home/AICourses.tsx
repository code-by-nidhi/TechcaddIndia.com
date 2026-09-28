import Link from 'next/link'
import Image from 'next/image'
import { FiArrowUpRight, FiCpu, FiLayers } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { AI_TRACKS } from '@/data/site'

const ICONS = [FiCpu, FiLayers]

export default function AICourses() {
  return (
    <section className="section ai" id="ai">
      <div className="shell">
        <SectionHeading
          eyebrow="Learn AI Skills"
          title={['The AI skills', { text: 'every team', className: 'gradient-text' }, 'is hiring for']}
          lead="From your first prompt to production agents — two tracks that take you from AI user to AI builder."
        />

        <div className="ai__grid">
          {AI_TRACKS.map((track, i) => {
            const Icon = ICONS[i]
            return (
              <article className="ai__track glass" key={track.title} data-aos="fade-up" data-aos-delay={i * 120}>
                <span className="ai__icon">
                  <Icon />
                </span>
                <h3>{track.title}</h3>
                <ul>
                  {track.items.map((item) => (
                    <li key={item}>
                      <Link href="/ai">
                        {item} <FiArrowUpRight aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}

          <article className="ai__feature" data-aos="zoom-in-up" data-aos-delay="240">
            <Image src="/images/course/ai-category.png" alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
            <div className="ai__feature-body">
              <span className="ai__tag">Featured</span>
              <h3>Artificial Intelligence Training</h3>
              <p>Classroom in Punjab · Live online across India</p>
              <Link href="/ai" className="btn btn--gold btn--sm">
                View program <FiArrowUpRight />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
