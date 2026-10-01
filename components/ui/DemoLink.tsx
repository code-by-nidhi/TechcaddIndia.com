'use client'

import type { MouseEvent, ReactNode } from 'react'

/** Fired on `window` to open the Book Demo modal (see layout/DemoModal.tsx). */
export const DEMO_EVENT = 'techcadd:demo'

export const openDemo = () => window.dispatchEvent(new Event(DEMO_EVENT))

/**
 * A "Book Demo" button. Opens the demo modal; the href is the no-JS fallback
 * and what a new-tab click lands on.
 */
export default function DemoLink({
  children,
  className,
  tabIndex,
  onClick,
}: {
  children: ReactNode
  className?: string
  tabIndex?: number
  onClick?: () => void
}) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onClick?.()
    openDemo()
  }

  return (
    <a href="/contact#demo" className={className} tabIndex={tabIndex} onClick={handle}>
      {children}
    </a>
  )
}
