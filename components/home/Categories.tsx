import Link from 'next/link'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { CATEGORIES } from '@/data/site'

export default function Categories() {
  return (
    <section className="section cats" id="categories">
      <div className="shell">
        <SectionHeading
          eyebrow="Course categories"
          title={['Pick a track.', { text: 'Build a career.', className: 'gradient-text' }]}
          lead="Six career tracks, each with beginner-to-job-ready programs, certificate courses and industrial training."
        />

        <div className="cats__grid">
          {CATEGORIES.map((c, i) => (
            <Link
              href={`/courses?category=${c.slug}`}
              className="cat glass"
              key={c.slug}
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 100}
            >
              <div className="cat__img">
                <Image src={c.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              </div>
              <div className="cat__body">
                <span className="cat__count">{c.count} programs</span>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
              </div>
              <span className="cat__arrow" aria-hidden>
                <FiArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
