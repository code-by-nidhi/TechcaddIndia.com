import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_COURSES } from '@/data/site'

export default function FeaturedCourses() {
  return (
    <section className="section sq-fc" id="featured-courses">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured courses"
          title={['What most students', { text: 'are enrolling in', className: 'sq-hl' }]}
          lead="Every one of these runs in classroom and live-online formats, with lab hours, a live project and placement support."
        />

        <div className="sq-courses">
          {FEATURED_COURSES.map((c, i) => (
            <Link
              href={`/courses/${c.slug}`}
              className="sq-course"
              key={c.slug}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 80}
            >
              <div className="sq-course__img">
                <Image src={c.image} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" />
                {c.highlight && <span className="sq-course__badge">{c.highlight}</span>}
              </div>
              <h3>
                {c.title}
                <span className="sq-course__go" aria-hidden>
                  <FiArrowRight />
                </span>
              </h3>
              <span className="sq-course__meta">
                {c.duration} · {c.mode}
              </span>
              <span className="sq-course__topics">{c.topics.join(', ')}</span>
            </Link>
          ))}
        </div>

        <div className="sq-courses__foot">
          <Link href="/courses" className="btn">
            Browse all courses <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
