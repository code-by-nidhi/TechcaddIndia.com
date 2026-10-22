'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiCheck, FiMapPin } from 'react-icons/fi'

import { aboutHref } from '@/data/about-pages'

/* About techcadd — an editorial company profile. Photographs on the left in an
   asymmetric composition (one large frame, two smaller, a glass fact badge);
   the story on the right. Only facts already in the project are used: the
   company was founded in 2016 (data/franchise.ts) and is headquartered in
   Jalandhar, Punjab (CITIES in data/site.ts). The old "two decades" headline
   is not supported by a 2016 founding, so it is not used here.

   The entrance runs once when the section scrolls into view; before the
   component mounts, and with reduced motion, everything is simply shown. */

const STRENGTHS = [
  'Practical learning through hands-on projects.',
  'Industry-relevant technology training.',
  'Career-focused skill development.',
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const [armed, setArmed] = useState(false)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    setArmed(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className={`abt${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}`} id="about" aria-labelledby="abt-title">
      <div className="shell abt__grid">
        <div className="abt__stage">
          <div className="abt__layer abt__layer--main abt__in" style={{ ['--i' as string]: 1 }}>
            <div className="abt__frame">
              <Image
                src="/images/course/campus1.webp"
                alt="Learners at work in a techcadd training hall"
                fill
                sizes="(max-width: 900px) 72vw, 32vw"
              />
            </div>
          </div>
          <div className="abt__layer abt__layer--lab abt__in" style={{ ['--i' as string]: 2 }}>
            <div className="abt__frame">
              <Image src="/images/course/lab.webp" alt="A hands-on lab session" fill sizes="(max-width: 900px) 36vw, 16vw" />
            </div>
          </div>
          <div className="abt__layer abt__layer--room abt__in" style={{ ['--i' as string]: 3 }}>
            <div className="abt__frame">
              <Image src="/images/course/classroom.webp" alt="A full hall at a techcadd seminar" fill sizes="(max-width: 900px) 44vw, 20vw" />
            </div>
          </div>

          <div className="abt__badge abt__in" style={{ ['--i' as string]: 4 }}>
            <span className="abt__badge-label">Founded</span>
            <strong>2016</strong>
            <span className="abt__badge-place">
              <FiMapPin aria-hidden /> Jalandhar, Punjab
            </span>
          </div>
        </div>

        <div className="abt__copy">
          <p className="abt__eyebrow abt__in" style={{ ['--i' as string]: 0 }}>
            About techcadd
          </p>
          <h2 id="abt-title" className="abt__title abt__in" style={{ ['--i' as string]: 1 }}>
            <span>Driven by Technology.</span>
            <span className="abt__hl">Defined by Innovation.</span>
          </h2>
          <p className="abt__lead abt__in" style={{ ['--i' as string]: 2 }}>
            Techcadd bridges the gap between education and industry through practical technology training, hands-on projects,
            and career-focused learning experiences.
          </p>
          <p className="abt__body abt__in" style={{ ['--i' as string]: 3 }}>
            From software development and artificial intelligence to cloud computing, cybersecurity, and digital design, our
            programs help learners build relevant technical skills for an evolving digital world.
          </p>

          <ul className="abt__points abt__in" style={{ ['--i' as string]: 4 }}>
            {STRENGTHS.map((s) => (
              <li key={s}>
                <FiCheck aria-hidden /> {s}
              </li>
            ))}
          </ul>

          <div className="abt__actions abt__in" style={{ ['--i' as string]: 5 }}>
            <Link href={aboutHref('our-story')} className="btn btn--gold">
              Discover Our Story <FiArrowRight aria-hidden />
            </Link>
            <Link href={aboutHref('our-training-approach')} className="btn btn--ghost">
              Explore Our Approach
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
