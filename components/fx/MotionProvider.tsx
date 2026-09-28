'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * Site-wide motion:
 *  - Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis
 *    read the same scroll position on the same frame (no jitter on pins).
 *  - AOS for the simple fade/slide reveals on cards and grids.
 *  - GSAP ScrollTrigger (in the section components) for anything scrubbed,
 *    pinned or sequenced.
 * Reduced-motion users get native scroll and no AOS offsets.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const reduced = prefersReducedMotion()

    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: reduced,
    })

    if (reduced) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  // New route → new DOM: recompute AOS positions and ScrollTrigger offsets.
  useEffect(() => {
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => {
      AOS.refreshHard()
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return <>{children}</>
}
