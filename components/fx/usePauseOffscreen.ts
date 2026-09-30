'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Sets `data-offscreen` on the element while it is scrolled out of view, so
 * CSS can pause its looping animations (see base.css) instead of running
 * them — and burning battery — for a section nobody can see.
 */
export default function usePauseOffscreen(ref: RefObject<HTMLElement | null>, margin = '100px') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => el.toggleAttribute('data-offscreen', !entry.isIntersecting), {
      rootMargin: margin,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])
}
