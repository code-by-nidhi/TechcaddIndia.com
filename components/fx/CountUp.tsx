'use client'

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

const fmt = new Intl.NumberFormat('en-IN')

/** Number that counts up from 0 when it scrolls into view. */
export default function CountUp({
  value,
  suffix = '',
  decimals = 0,
}: {
  value: number
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const final = (decimals ? value.toFixed(decimals) : fmt.format(value)) + suffix

  useGSAP(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const obj = { n: 0 }
    gsap.to(obj, {
      n: value,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = (decimals ? obj.n.toFixed(decimals) : fmt.format(Math.round(obj.n))) + suffix
      },
    })
  })

  // Server-render the final value so no-JS / crawlers see real numbers.
  return <span ref={ref}>{final}</span>
}
