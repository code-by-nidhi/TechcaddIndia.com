'use client'

import { useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiCpu, FiCode, FiBarChart2, FiShield, FiTrendingUp, FiCloud } from 'react-icons/fi'
import type { IconType } from 'react-icons'

import SectionHeading from '@/components/ui/SectionHeading'
import usePauseOffscreen from '@/components/fx/usePauseOffscreen'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { CATEGORIES } from '@/data/site'

/* ==========================================================================
   Course categories — a curved 3D carousel (as on techcaddchandigarh.com).

   Cards sit on an arc that bows away from the viewer: each is placed by its
   offset from the current position (`pos`, in cards) — rotated around Y,
   pushed back in Z and faded toward the ends, the centre card lifted and
   scaled up. The ring drifts slowly on its own; drag (with momentum), a
   horizontal wheel/trackpad swipe or the arrow keys move it, and clicking a
   side card brings it to the centre. On first scroll into view the cards fan
   out from a stack (`spread` 0 → 1).

   Everything runs off one GSAP ticker that writes inline transforms, so no
   React re-render happens per frame — only when the centre card changes.
   ========================================================================== */

/* per-category card art, a matching colour (shown until the image loads),
   and icon */
type Look = { image: string; from: string; via: string; to: string; Icon: IconType }
const LOOK: Record<string, Look> = {
  ai: { image: '/images/categories/ai.webp', from: '#8b5cf6', via: '#7c3aed', to: '#4c1d95', Icon: FiCpu },
  'full-stack': {
    image: '/images/categories/full-stack.webp',
    from: '#db2777',
    via: '#be185d',
    to: '#831843',
    Icon: FiCode,
  },
  'data-science': {
    image: '/images/categories/data-science.webp',
    from: '#6ee7b7',
    via: '#34d399',
    to: '#047857',
    Icon: FiBarChart2,
  },
  cyber: { image: '/images/categories/cyber.webp', from: '#3b82f6', via: '#1e3a8a', to: '#020617', Icon: FiShield },
  marketing: {
    image: '/images/categories/marketing.webp',
    from: '#fdba74',
    via: '#f97316',
    to: '#c2410c',
    Icon: FiTrendingUp,
  },
  cloud: { image: '/images/categories/cloud.webp', from: '#27272a', via: '#18181b', to: '#09090b', Icon: FiCloud },
}

/* arc radius (px), degrees between cards, and px of drag per card */
const LAYOUTS = [
  { query: '(min-width: 1024px)', radius: 575, step: 22, dragPx: 215 },
  { query: '(min-width: 640px)', radius: 440, step: 24, dragPx: 179 },
  { query: '(min-width: 0px)', radius: 310, step: 27, dragPx: 140 },
]
const layout = () => LAYOUTS.find((l) => window.matchMedia(l.query).matches)!

const DRIFT = 0.17 // cards per second when left alone

/** signed shortest offset of `d` on a ring of `n` (range −n/2 … n/2) */
const wrap = (d: number, n: number) => ((((d + n / 2) % n) + n) % n) - n / 2

export default function Categories() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  usePauseOffscreen(section)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const api = useRef<{ goTo: (i: number) => void } | null>(null)
  const dragged = useRef(false)
  const n = CATEGORIES.length
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const el = stage.current
      if (!el) return
      const items = cards.current.filter(Boolean) as HTMLDivElement[]
      const reduce = prefersReducedMotion()
      const state = { pos: 0, spread: reduce ? 1 : 0 }
      const drag = {
        active: false,
        startX: 0,
        startPos: 0,
        lastX: 0,
        lastT: 0,
        velocity: 0,
      }
      let cfg = layout()
      let visible = true
      let tweening = false
      let speed = DRIFT
      let shown = 0

      const render = () => {
        const { pos, spread } = state
        items.forEach((card, i) => {
          const off = wrap(i - pos, n)
          const ang = off * cfg.step * spread
          const rad = (ang * Math.PI) / 180
          const x = Math.sin(rad) * cfg.radius
          const z = (Math.cos(rad) - 1) * cfg.radius - (1 - spread) * 280
          const near = Math.max(0, 1 - Math.abs(off)) // 1 at the centre
          const alpha = Math.min(1, Math.max(0, (n / 2 - Math.abs(off)) / 0.9)) * spread
          card.style.transform =
            `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${(-14 * near).toFixed(2)}px), ${z.toFixed(2)}px) ` +
            `rotateY(${ang.toFixed(3)}deg) scale(${(1 + 0.16 * near).toFixed(4)})`
          card.style.opacity = alpha.toFixed(3)
          card.style.zIndex = String(Math.round(500 - 100 * Math.abs(off)))
          card.style.pointerEvents = alpha > 0.4 ? 'auto' : 'none'
        })
        const centre = ((Math.round(pos) % n) + n) % n
        if (centre !== shown) {
          shown = centre
          setActive(centre)
        }
      }

      // drift (easing back to DRIFT after a fling), then draw
      const tick = (_t: number, dt: number) => {
        if (!visible) return
        if (!reduce && !drag.active && !tweening) {
          const s = Math.min(dt, 64) / 1000
          speed += (DRIFT - speed) * (1 - Math.exp(-s / 0.9))
          state.pos += speed * s
        }
        render()
      }

      const tweenTo = (to: number, duration = 0.8) => {
        gsap.killTweensOf(state, 'pos')
        tweening = true
        gsap.to(state, {
          pos: to,
          duration: reduce ? 0 : duration,
          ease: 'power3.out',
          onComplete: () => {
            tweening = false
            speed = DRIFT
          },
        })
      }
      const stepBy = (d: number) => tweenTo(Math.round(state.pos) + d, 0.6)

      const onMove = (e: PointerEvent) => {
        if (!drag.active) return
        const dx = e.clientX - drag.startX
        if (Math.abs(dx) > 6) dragged.current = true
        state.pos = drag.startPos - dx / cfg.dragPx
        const now = performance.now()
        const dt = now - drag.lastT
        if (dt > 0) {
          const v = (-(e.clientX - drag.lastX) / cfg.dragPx / dt) * 1000
          drag.velocity = 0.75 * drag.velocity + 0.25 * v
          drag.lastX = e.clientX
          drag.lastT = now
        }
      }
      const onUp = () => {
        if (!drag.active) return
        drag.active = false
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        // the fling becomes the drift speed, which then eases back to DRIFT
        speed = Math.max(-3.5, Math.min(3.5, drag.velocity))
      }
      const onDown = (e: PointerEvent) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        gsap.killTweensOf(state, 'pos')
        tweening = false
        dragged.current = false
        Object.assign(drag, {
          active: true,
          startX: e.clientX,
          startPos: state.pos,
          lastX: e.clientX,
          lastT: performance.now(),
          velocity: 0,
        })
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointercancel', onUp)
      }
      // horizontal trackpad swipes only; vertical scrolling passes through
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
        e.preventDefault()
        gsap.killTweensOf(state, 'pos')
        tweening = false
        state.pos += e.deltaX / cfg.dragPx
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          stepBy(-1)
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          stepBy(1)
        }
      }
      const onResize = () => {
        cfg = layout()
        render()
      }

      api.current = {
        goTo: (i) => {
          if (!drag.active) tweenTo(state.pos + wrap(i - state.pos, n), 0.7)
        },
      }

      el.addEventListener('pointerdown', onDown)
      el.addEventListener('wheel', onWheel, { passive: false })
      el.addEventListener('keydown', onKey)
      window.addEventListener('resize', onResize)
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: '120px' })
      io.observe(el)

      render()
      gsap.ticker.add(tick)
      // fan out from a stack the first time it scrolls into view
      if (!reduce) {
        gsap.to(state, {
          spread: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      }

      return () => {
        gsap.ticker.remove(tick)
        gsap.killTweensOf(state)
        io.disconnect()
        window.removeEventListener('resize', onResize)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        el.removeEventListener('pointerdown', onDown)
        el.removeEventListener('wheel', onWheel)
        el.removeEventListener('keydown', onKey)
        api.current = null
      }
    },
    { scope: stage }
  )

  return (
    // wrapped so it sits outside the navy/white band alternation, on a light ground
    <div className="cats-band">
      <section ref={section} className="section cats" id="categories">
        <div className="cats__glow" aria-hidden />
        <div className="shell">
          <div className="cats__head">
            <SectionHeading
              eyebrow="Course categories"
              title={['Six tracks,', { text: 'thirty-plus programs', className: 'gradient-text' }]}
              lead="Pick a direction first, then a duration. Counselling is free if you want help choosing."
            />
            <Link href="/courses" className="btn btn--ghost cats__all">
              All courses <FiArrowRight aria-hidden />
            </Link>
          </div>

          <div className="cats__wrap">
            <div className="cats__floor" aria-hidden />
            <div
              ref={stage}
              className="cats__stage"
              tabIndex={0}
              role="group"
              aria-roledescription="carousel"
              aria-label="Course categories"
            >
              <div className="cats__persp">
                {CATEGORIES.map((c, i) => {
                  const look = LOOK[c.slug] ?? LOOK.ai
                  const isActive = i === active
                  return (
                    <div
                      key={c.slug}
                      ref={(node) => {
                        cards.current[i] = node
                      }}
                      className="cats__slot"
                      style={{ opacity: 0 }}
                    >
                      <Link
                        href={`/courses?category=${c.slug}`}
                        draggable={false}
                        className={`ccard${isActive ? ' is-active' : ''}`}
                        style={
                          {
                            '--from': look.from,
                            '--via': look.via,
                            '--to': look.to,
                          } as CSSProperties
                        }
                        onClick={(e) => {
                          // a drag, or a side card, doesn't navigate — side cards come to the centre
                          if (dragged.current || !isActive) {
                            e.preventDefault()
                            if (!dragged.current) api.current?.goTo(i)
                          }
                        }}
                        onFocus={() => api.current?.goTo(i)}
                      >
                        <Image
                          src={look.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 290px, (min-width: 640px) 240px, 196px"
                          draggable={false}
                          className="ccard__img"
                        />
                        <span className="ccard__shine" aria-hidden />
                        <span className="ccard__shade" aria-hidden />
                        <span className="ccard__top">
                          <span className="ccard__num">{String(i + 1).padStart(2, '0')}</span>
                          <span className="ccard__icon">
                            <look.Icon aria-hidden />
                          </span>
                        </span>
                        <span className="ccard__body">
                          <span className="ccard__title">{c.title}</span>
                          <span className="ccard__blurb">{c.blurb}</span>
                          <span className="ccard__foot">
                            {c.count} program{c.count === 1 ? '' : 's'}
                            <FiArrowRight aria-hidden />
                          </span>
                        </span>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
