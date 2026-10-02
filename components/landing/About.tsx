import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

import CountUp from '@/components/fx/CountUp'
import { STATS } from '@/data/site'

/* ==========================================================================
   About — an editorial block between two hairlines: a one-line headline
   run out to the edge by a long rule, then three columns of rounded
   photos. Each photo carries a moving strip of "tape" naming what it shows. The
   left column adds the numbers and the story, the right one ends in a large
   call-to-action tile in the brand gradient.
   ========================================================================== */

const PHOTOS = {
  classroom: { src: '/images/course/classroom.webp', alt: 'A full hall at a techcadd seminar', tape: 'Seminars & workshops' },
  campus: { src: '/images/course/campus1.webp', alt: 'Students at work in a techcadd classroom', tape: 'Our classrooms' },
  lab: { src: '/images/course/lab.webp', alt: 'Hands-on lab session', tape: 'Hands-on labs' },
}

function Photo({ photo, className, sizes }: { photo: (typeof PHOTOS)[keyof typeof PHOTOS]; className: string; sizes: string }) {
  return (
    <div className={`sq-about__photo ${className}`} data-aos="fade-up">
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} />
      {/* decorative: the label runs along a strip of tape; the list is
          doubled so the marquee loops seamlessly */}
      <span className="sq-about__tape" aria-hidden>
        <span className="sq-about__tape-track">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i}>{photo.tape}</span>
          ))}
        </span>
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section className="section sq-tint sq-about" id="about">
      <div className="shell">
        <h2 className="sq-about__title">
          <span className="sq-about__line">
            <span>
              <strong>About</strong> techcadd
            </span>
            <i aria-hidden />
          </span>
        </h2>

        <div className="sq-about__cols">
          <div className="sq-about__col">
            <Photo photo={PHOTOS.classroom} className="sq-about__photo--wide" sizes="(max-width: 900px) 100vw, 34vw" />
            <div className="sq-about__info">
              <p className="sq-about__label">We teach, build, place, repeat</p>
              <ul className="sq-about__stats">
                {STATS.map((s) => (
                  <li key={s.label}>
                    <strong>
                      <CountUp value={s.value} suffix={s.suffix} />
                    </strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
              <p className="sq-about__text">
                What started as a single classroom in Punjab is now a national training network. The method
                hasn&apos;t changed: learn by building, get mentored by practitioners, and leave with work you can
                show.
              </p>
            </div>
          </div>

          <Photo photo={PHOTOS.campus} className="sq-about__photo--tall" sizes="(max-width: 900px) 100vw, 30vw" />

          <div className="sq-about__col">
            <Photo photo={PHOTOS.lab} className="sq-about__photo--wide" sizes="(max-width: 900px) 100vw, 30vw" />
            <Link href="/about" className="sq-about__cta" data-aos="fade-up" data-aos-delay="100">
              <FiArrowUpRight aria-hidden />
              <span>
                <strong>Our</strong> story
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
