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
  lines = false,
}: {
  parts: Part[]
  /** render each part as its own unbroken line */
  lines?: boolean
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
    const words: ReactNode[] = []
    text
      .split(' ')
      .filter(Boolean)
      .forEach((word, wi) => {
        words.push(
          <span className="split-word" key={`${pi}-${wi}`}>
            <span className={cls}>{word}</span>
          </span>,
          ' '
        )
      })
    if (lines) {
      nodes.push(
        <span className="split-line" key={pi}>
          {words}
        </span>
      )
    } else {
      nodes.push(...words)
    }
  })

  return (
    <Tag ref={ref} className={className}>
      {nodes}
    </Tag>
  )
}
