import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

import AboutSlideshow from '@/components/landing/AboutSlideshow'
import { WHY } from '@/data/site'

/* ==========================================================================
   About — the corporate "who we are" block. A statement headline beside the
   story and its link; a bento of three photographs, the large one a slideshow (the numbers live in
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
            <AboutSlideshow />
          </div>

          <div className="cx-about__photo" data-aos="fade-up" data-aos-delay="150">
            <Image src="/images/gallery/keynote-stage.webp" alt="A techcadd keynote with the robot dog on stage" fill sizes="(max-width: 900px) 50vw, 28vw" />
          </div>
          <div className="cx-about__photo" data-aos="fade-up" data-aos-delay="200">
            <Image src="/images/gallery/robotics-stage-demo.webp" alt="A live robotics demo at a techcadd event" fill sizes="(max-width: 900px) 50vw, 28vw" />
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
