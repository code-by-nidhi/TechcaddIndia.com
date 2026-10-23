'use client'

import { useEffect, useRef } from 'react'

/**
 * A thin gradient bar along the top of the viewport that fills as the page
 * scrolls. Lenis scrolls the window itself, so a plain scroll listener sees
 * every frame; the write is batched into rAF.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.current?.style.setProperty('--progress', String(max > 0 ? window.scrollY / max : 0))
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
    }
  }, [])

  return <div ref={bar} className="scroll-progress" aria-hidden />
}
