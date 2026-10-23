'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

/* Our Story closing call to action: a white section with one soft card,
   a blue-lavender glow behind it, and two actions that go to routes that
   already exist: /contact and /courses. The reveal runs once as the section
   scrolls into view; before the component mounts, and with reduced motion,
   everything is simply shown. */

export default function OurStoryCTA() {
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
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="ocs-wrap">
      <section ref={ref} className={`ocs${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}`} aria-labelledby="ocs-title">
        <div className="shell">
          <div className="ocs__card">
            <p className="ocs__eyebrow ocs__in" style={{ ['--i' as string]: 0 }}>
              Our next chapter
            </p>
            <h2 id="ocs-title" className="ocs__title ocs__in" style={{ ['--i' as string]: 1 }}>
              Ready to <em>Build Your Future</em> with Techcadd?
            </h2>
            <p className="ocs__lead ocs__in" style={{ ['--i' as string]: 2 }}>
              Whether you&rsquo;re looking to develop in-demand technology skills, explore new career opportunities, or discuss a
              technology solution, Techcadd is here to help you take the next step.
            </p>
            <div className="ocs__actions ocs__in" style={{ ['--i' as string]: 3 }}>
              <Link href="/contact" className="ocs__btn ocs__btn--primary">
                Let&rsquo;s Connect <FiArrowRight aria-hidden />
              </Link>
              <Link href="/courses" className="ocs__btn ocs__btn--ghost">
                Explore Our Programs <FiArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
