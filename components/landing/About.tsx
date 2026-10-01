import Image from 'next/image'
import Link from 'next/link'
import { FiCheck, FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import CountUp from '@/components/fx/CountUp'
import { STATS } from '@/data/site'

const POINTS = [
  'Small batches with daily practical labs',
  'Mentors who have shipped production software',
  'Same curriculum in every centre and every online batch',
]

const PHOTOS = [
  { src: '/images/course/classroom.webp', alt: 'Students in a techcadd classroom' },
  { src: '/images/course/lab.webp', alt: 'Hands-on lab session' },
  { src: '/images/course/campus1.webp', alt: 'techcadd campus' },
]

export default function About() {
  return (
    <section className="section sq-about" id="about">
      <div className="shell">
        <ul className="sq-stats">
          {STATS.map((s) => (
            <li key={s.label}>
              <strong>
                <CountUp value={s.value} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="sq-about__grid">
          <SectionHeading
            eyebrow="About techcadd"
            title={['Two decades of turning', { text: 'students into engineers', className: 'sq-hl' }]}
          />
          <div className="sq-about__copy">
            <p data-aos="fade-up">
              What started as a single classroom in Punjab is now a national training network. The method hasn&apos;t
              changed: learn by building, get mentored by practitioners, and leave with work you can show.
            </p>
            <ul className="sq-about__points">
              {POINTS.map((p) => (
                <li key={p}>
                  <FiCheck aria-hidden /> {p}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn">
              Our story <FiArrowRight aria-hidden />
            </Link>
          </div>
        </div>

        <div className="sq-about__media">
          {PHOTOS.map((p, i) => (
            <div key={p.src} data-aos="fade-up" data-aos-delay={i * 100}>
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 100vw, 40vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
