'use client'

import { useRef } from 'react'
import { FiMessageCircle, FiMonitor, FiBriefcase, FiAward } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { STEPS } from '@/data/site'

const ICONS = [FiMessageCircle, FiMonitor, FiBriefcase, FiAward]

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const steps = gsap.utils.toArray<HTMLElement>('.how__step')

      // The connector fills as you scroll (horizontal on desktop, vertical on
      // mobile); each step lights up as the fill reaches it.
      const mm = gsap.matchMedia()
      mm.add({ wide: '(min-width: 861px)', narrow: '(max-width: 860px)' }, (ctx) => {
        const axis = ctx.conditions?.wide ? 'scaleX' : 'scaleY'
        gsap.fromTo(
          '.how__line-fill',
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.how__steps',
              start: 'top 70%',
              end: 'bottom 55%',
              scrub: 0.6,
              onUpdate: (self) => {
                steps.forEach((s, i) => s.classList.toggle('is-on', self.progress >= i / steps.length))
              },
            },
          }
        )
      })

      gsap.from(steps, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.how__steps', start: 'top 80%' },
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="section how" id="how-it-works">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="How it works"
          title={['From first call to', { text: 'first offer', className: 'gradient-text' }]}
          lead="The same four-step path in every city — whether you walk into a centre or log in from home."
        />

        <ol className="how__steps">
          <span className="how__line" aria-hidden>
            <span className="how__line-fill" />
          </span>
          {STEPS.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <li className="how__step" key={s.title}>
                <span className="how__num">
                  <Icon aria-hidden />
                  <i>{String(i + 1).padStart(2, '0')}</i>
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
