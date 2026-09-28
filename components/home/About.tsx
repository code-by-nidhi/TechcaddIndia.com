'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiCheck, FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import CountUp from '@/components/fx/CountUp'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

const POINTS = [
  'Small batches with daily practical labs',
  'Mentors who have shipped production software',
  'Same curriculum in every centre and every online batch',
]

export default function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // Collage layers move at different speeds for depth
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        gsap.to(el, {
          yPercent: -Number(el.dataset.speed) * 30,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      gsap.from('.about__img', {
        clipPath: 'inset(100% 0 0 0 round 26px)',
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.about__collage', start: 'top 75%' },
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="section about" id="about">
      <div className="shell about__inner">
        <div className="about__collage">
          <div className="about__img about__img--a" data-speed="0.4">
            <Image src="/images/course/classroom.webp" alt="Students in a techcadd classroom" fill sizes="(max-width: 900px) 70vw, 30vw" />
          </div>
          <div className="about__img about__img--b" data-speed="1">
            <Image src="/images/course/lab.webp" alt="Hands-on lab session" fill sizes="(max-width: 900px) 50vw, 20vw" />
          </div>
          <div className="about__img about__img--c" data-speed="0.7">
            <Image src="/images/course/campus1.webp" alt="techcadd campus" fill sizes="(max-width: 900px) 50vw, 20vw" />
          </div>
          <div className="about__badge" data-speed="1.4">
            <strong>
              <CountUp value={25000} suffix="+" />
            </strong>
            <span>engineers trained</span>
          </div>
        </div>

        <div className="about__copy">
          <SectionHeading
            eyebrow="About techcadd"
            title={['Two decades of turning', { text: 'students into engineers', className: 'gradient-text' }]}
            lead="What started as a single classroom in Punjab is now a national training network. The method hasn't changed: learn by building, get mentored by practitioners, and leave with work you can show."
          />
          <ul className="about__points">
            {POINTS.map((p, i) => (
              <li key={p} data-aos="fade-left" data-aos-delay={i * 100}>
                <FiCheck aria-hidden /> {p}
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn btn--gold" data-aos="fade-up">
            Our story <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
