import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiArrowUpRight, FiCpu, FiLayers } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { AI_TRACKS } from '@/data/site'

const ICONS = [FiCpu, FiLayers]

export default function AICourses() {
  return (
    <section className="section section--navy sq-ai" id="ai">
      <div className="shell">
        <SectionHeading
          eyebrow="Learn AI Skills"
          title={['The AI skills', { text: 'every team', className: 'gold-text' }, 'is hiring for']}
          lead="From your first prompt to production agents — two tracks that take you from AI user to AI builder."
        />

        <div className="sq-ai__grid">
          <article className="sq-ai__feature" data-aos="fade-up">
            <Image src="/images/course/ai-category.png" alt="" fill sizes="(max-width: 960px) 100vw, 40vw" />
            <div className="sq-ai__body">
              <span className="sq-ai__tag">Featured</span>
              <h3>Artificial Intelligence Training</h3>
              <p>Classroom in Punjab · Live online across India</p>
              <Link href="/ai" className="btn btn--gold btn--sm">
                View program <FiArrowRight aria-hidden />
              </Link>
            </div>
          </article>

          {AI_TRACKS.map((track, i) => {
            const Icon = ICONS[i]
            return (
              <article className="sq-ai__track" key={track.title} data-aos="fade-up" data-aos-delay={(i + 1) * 120}>
                <h3>
                  <Icon aria-hidden /> {track.title}
                </h3>
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
        </div>
      </div>
    </section>
  )
}
