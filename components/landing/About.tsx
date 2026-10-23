import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

import { WHY } from '@/data/site'

/* ==========================================================================
   About — the corporate "who we are" block. A statement headline beside the
   story and its link; a bento of three photographs (the numbers live in
   Results); then the four reasons to choose us as a ruled row of
   numbered columns.
   ========================================================================== */

export default function About() {
  return (
    <section className="section cx-about" id="about">
      <div className="shell">
        <div className="cx-about__top">
          <div className="cx-about__lead">
            <span className="eyebrow" data-aos="fade-up">
              About techcadd
            </span>
            <h2 className="cx-title" data-aos="fade-up" data-aos-delay="80">
              We teach, build, <span className="cx-hl">place, repeat</span>
            </h2>
          </div>
          <div className="cx-about__story" data-aos="fade-up" data-aos-delay="160">
            <p>
              What started as a single classroom in Punjab is now a national training network. The method hasn&apos;t
              changed: learn by building, get mentored by practitioners, and leave with work you can show.
            </p>
            <Link href="/about" className="btn">
              Our story <FiArrowUpRight aria-hidden />
            </Link>
          </div>
        </div>

        <div className="cx-about__bento">
          <div className="cx-about__photo cx-about__photo--main" data-aos="fade-up">
            <Image src="/images/course/classroom.webp" alt="A full hall at a techcadd seminar" fill sizes="(max-width: 900px) 100vw, 45vw" />
          </div>

          <div className="cx-about__photo" data-aos="fade-up" data-aos-delay="150">
            <Image src="/images/course/campus1.webp" alt="Students at work in a techcadd classroom" fill sizes="(max-width: 900px) 50vw, 25vw" />
          </div>
          <div className="cx-about__photo" data-aos="fade-up" data-aos-delay="200">
            <Image src="/images/course/lab.webp" alt="Hands-on lab session" fill sizes="(max-width: 900px) 50vw, 25vw" />
          </div>
        </div>

        <ul className="cx-about__why">
          {WHY.map((w, i) => (
            <li key={w.title} data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="cx-about__no" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
