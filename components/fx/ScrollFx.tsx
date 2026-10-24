'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   ScrollFx — declarative GSAP scroll effects. Markup opts in with a data-fx
   attribute (several effects can share one, space-separated); this
   component finds them after every route change and wires up ScrollTrigger.

     words     a heading whose words rise out of a mask, staggered
     reveal    one block fading up
     stagger   each child of the element fading up in turn
     img       a photo frame that wipes open from the bottom while its
               picture settles from a zoom
     parallax  the picture inside a frame drifting against the scroll
     drift     scrubbed as its section scrolls away: moves by data-fx-y px
               and, with data-fx-fade, fades out
     band      a full-width section that grows from an inset rounded card
               to full bleed as it scrolls in

   Optional tuning: data-fx-delay (s), data-fx-stagger (s), data-fx-y (px).

   Pictures and drifting blocks move through CSS variables (--fx-y, --fx-s,
   --fx-dy) read by the `translate` and `scale` properties in fx.css, so they
   compose with hover zooms and CSS keyframes that use `transform`.

   Nothing runs under prefers-reduced-motion: the content just shows.
   ========================================================================== */

const num = (el: HTMLElement, key: string, fallback: number) => {
  const v = parseFloat(el.dataset[key] ?? '')
  return Number.isFinite(v) ? v : fallback
}

const all = (token: string) => Array.from(document.querySelectorAll<HTMLElement>(`[data-fx~="${token}"]`))

/** Wraps every word in a mask. Words inside inline elements (a gradient
    phrase, say) get a shallow copy of each element around them, so per-word
    styling survives. Returns the moving spans and an undo. */
function splitWords(el: HTMLElement) {
  const original = Array.from(el.childNodes)
  const label = el.getAttribute('aria-label')
  const inners: HTMLElement[] = []
  const frag = document.createDocumentFragment()

  const mask = (content: Node) => {
    const outer = document.createElement('span')
    const inner = document.createElement('span')
    outer.className = 'fx-word'
    outer.setAttribute('aria-hidden', 'true')
    inner.className = 'fx-word__in'
    inner.append(content)
    outer.append(inner)
    inners.push(inner)
    return outer
  }

  const walk = (node: Node, chain: Element[]) => {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const part of (node.textContent ?? '').split(/(\s+)/)) {
        if (!part) continue
        if (/^\s+$/.test(part)) {
          frag.append(' ')
          continue
        }
        let content: Node = document.createTextNode(part)
        for (let i = chain.length - 1; i >= 0; i--) {
          const shell = chain[i].cloneNode(false)
          shell.appendChild(content)
          content = shell
        }
        frag.append(mask(content))
      }
    } else if (node instanceof HTMLBRElement) {
      frag.append(node.cloneNode())
    } else if (node instanceof Element) {
      node.childNodes.forEach((child) => walk(child, [...chain, node]))
    }
  }

  original.forEach((node) => walk(node, []))
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '')
  el.replaceChildren(frag)

  return {
    inners,
    undo: () => {
      el.replaceChildren(...original)
      if (label === null) el.removeAttribute('aria-label')
      else el.setAttribute('aria-label', label)
    },
  }
}

function build() {
  const undos: (() => void)[] = []
  const enter = (el: Element, start = 'top 86%') => ({ trigger: el, start, once: true })

  for (const el of all('words')) {
    const { inners, undo } = splitWords(el)
    undos.push(undo)
    gsap.from(inners, {
      yPercent: 115,
      rotate: 3,
      duration: 1.05,
      ease: 'expo.out',
      stagger: num(el, 'fxStagger', 0.05),
      delay: num(el, 'fxDelay', 0),
      scrollTrigger: enter(el),
    })
  }

  for (const el of all('reveal')) {
    gsap.from(el, {
      autoAlpha: 0,
      y: 36,
      duration: 0.9,
      ease: 'power3.out',
      delay: num(el, 'fxDelay', 0),
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: enter(el),
    })
  }

  for (const el of all('stagger')) {
    gsap.from(el.children, {
      autoAlpha: 0,
      y: 40,
      duration: 0.85,
      ease: 'power3.out',
      stagger: num(el, 'fxStagger', 0.09),
      delay: num(el, 'fxDelay', 0),
      clearProps: 'transform,opacity,visibility',
      scrollTrigger: enter(el, 'top 88%'),
    })
  }

  for (const el of all('img')) {
    gsap.fromTo(
      el,
      { clipPath: 'inset(100% 0% 0% 0%)', '--fx-s': 1.3 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        '--fx-s': 1,
        duration: 1.4,
        ease: 'expo.inOut',
        delay: num(el, 'fxDelay', 0),
        clearProps: 'clipPath',
        scrollTrigger: enter(el, 'top 90%'),
      }
    )
  }

  for (const el of all('parallax')) {
    gsap.fromTo(
      el,
      { '--fx-y': '-6%' },
      { '--fx-y': '6%', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
    )
  }

  for (const el of all('drift')) {
    gsap.to(el, {
      '--fx-dy': `${num(el, 'fxY', -80)}px`,
      ...('fxFade' in el.dataset ? { opacity: 0 } : {}),
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top top', end: 'bottom top', scrub: true },
    })
  }

  for (const el of all('band')) {
    gsap.fromTo(
      el,
      { scale: 0.93, borderRadius: 36 },
      { scale: 1, borderRadius: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 20%', scrub: true } }
    )
  }

  return () => undos.forEach((undo) => undo())
}

export default function ScrollFx() {
  const pathname = usePathname()

  useEffect(() => {
    if (prefersReducedMotion()) return
    let undo = () => {}
    const ctx = gsap.context(() => {})
    /* after the new page has painted, so every element is measurable */
    const id = window.setTimeout(() => {
      ctx.add(() => {
        undo = build()
      })
      ScrollTrigger.refresh()
    }, 80)

    return () => {
      window.clearTimeout(id)
      ctx.revert()
      undo()
    }
  }, [pathname])

  return null
}
