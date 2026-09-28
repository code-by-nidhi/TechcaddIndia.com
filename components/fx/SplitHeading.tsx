'use client'

import { useRef, type ReactNode, type ElementType } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

type Part = string | { text: string; className?: string }

/**
 * Headline whose words rise out of a mask as it scrolls into view.
 * Pass `parts` so individual phrases can carry a class (gradient / gold)
 * while still being split word-by-word.
 */
export default function SplitHeading({
  parts,
  as: Tag = 'h2',
  className,
  immediate = false,
  delay = 0,
}: {
  parts: Part[]
  as?: ElementType
  className?: string
  /** play on mount (hero) instead of on scroll */
  immediate?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const words = ref.current?.querySelectorAll('.split-word > span')
      if (!words?.length) return
      gsap.from(words, {
        yPercent: 110,
        rotate: 4,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.06,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref }
  )

  const nodes: ReactNode[] = []
  parts.forEach((part, pi) => {
    const text = typeof part === 'string' ? part : part.text
    const cls = typeof part === 'string' ? undefined : part.className
    text
      .split(' ')
      .filter(Boolean)
      .forEach((word, wi) => {
        nodes.push(
          <span className="split-word" key={`${pi}-${wi}`}>
            <span className={cls}>{word}</span>
          </span>,
          ' '
        )
      })
  })

  return (
    <Tag ref={ref} className={className}>
      {nodes}
    </Tag>
  )
}
