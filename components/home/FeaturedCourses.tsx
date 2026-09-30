'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'
import { FEATURED_COURSES } from '@/data/site'

/* ==========================================================================
   Featured courses — a fanned arc of portrait course cards (as on
   techcaddchandigarh.com).

   Cards hang on a wide circle: each is placed by its offset from the current
   position (`pos`, in cards) — swung along the arc, tilted to follow it,
   shrunk and pushed back the further out it is, and faded beyond `reach`.
   A white frame rings the centre card. As the section scrolls into view the
   cards gather from a loose, tilted pile into the arc (`spread` 0 → 1).
   It advances one card every 3.6s; drag (with momentum), the arrow keys or a
   click on a side card move it.

   One GSAP ticker writes the inline transforms, so React only re-renders
   when the centre card changes (for the counter and the active overlay).
   ========================================================================== */

const CARD = { w: 300, h: 400 } // design size, scaled by `unit`

/* card scale, circle radius (px), degrees per card, and cards shown per side */
const LAYOUTS = [
  { query: '(min-width: 1536px)', unit: 1, radius: 900, arc: 12, reach: 3 },
  { query: '(min-width: 1280px)', unit: 0.92, radius: 840, arc: 12.5, reach: 3 },
  { query: '(min-width: 1024px)', unit: 0.84, radius: 760, arc: 13, reach: 3 },
  { query: '(min-width: 768px)', unit: 0.72, radius: 640, arc: 14.5, reach: 3 },
  { query: '(min-width: 0px)', unit: 0.58, radius: 470, arc: 17, reach: 2 },
]
const layout = () => LAYOUTS.find((l) => window.matchMedia(l.query).matches)!

const AUTO_MS = 3600 // idle time before it steps to the next card
const START = Math.floor(FEATURED_COURSES.length / 2)

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
/** signed shortest offset of `d` on a ring of `n` (range −n/2 … n/2) */
const wrap = (d: number, n: number) => ((((d + n / 2) % n) + n) % n) - n / 2

export default function FeaturedCourses() {
  const stage = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const goTo = useRef<((i: number) => void) | null>(null)
  const dragged = useRef(false)
  const n = FEATURED_COURSES.length
  const [active, setActive] = useState(START)

  useGSAP(
    () => {
      const el = stage.current
      const ring = frame.current
      if (!el || !ring) return
      const items = cards.current.slice(0, n).filter(Boolean) as HTMLDivElement[]
      const reduce = prefersReducedMotion()
      const state = { pos: START }
      const drag = { active: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, velocity: 0 }
      let cfg = layout()
      let spread = reduce ? 1 : 0 // 0 = loose pile, 1 = on the arc
      let visible = true
      let idle = 0
      let shown = START

      const size = () => {
        const w = Math.round(CARD.w * cfg.unit)
        const h = Math.round(CARD.h * cfg.unit)
        items.forEach((c) => {
          c.style.width = `${w}px`
          c.style.height = `${h}px`
        })
        const pad = Math.round(16 * cfg.unit)
        ring.style.width = `${w + pad * 2}px`
        ring.style.height = `${h + pad * 2}px`
      }

      const render = () => {
        const { radius, arc, unit } = cfg
        // show the same number of cards on each side: with an even count the
        // card directly opposite the centre would land on one side only
        const reach = Math.min(cfg.reach, Math.floor((n - 1) / 2))
        const pos = state.pos
        // lift the whole arc so the outermost visible cards aren't cut off
        const lift = (1 - Math.cos((reach * arc * Math.PI) / 180)) * radius * 0.5
        const gather = clamp01(spread / 0.45) // the pile tidies first…
        const onArc = clamp01((spread - 0.45) / 0.55) // …then fans out
        items.forEach((card, i) => {
          const off = wrap(i - pos, n)
          const dist = Math.abs(off)
          if (onArc > 0.98 && dist > reach + 1) {
            card.style.opacity = '0'
            card.style.pointerEvents = 'none'
            return
          }
          // a deterministic, slightly messy pile position per card
          const pile = { rot: ((37 * i) % 19) - 9, x: ((53 * i) % 27) - 13, y: ((29 * i) % 21) - 10 }
          const loose = 1 - gather
          const deg = off * arc
          const rad = (deg * Math.PI) / 180
          const x = Math.sin(rad) * radius * unit * onArc + pile.x * loose
          const y = ((1 - Math.cos(rad)) * radius - lift) * unit * onArc + pile.y * loose
          const rot = deg * onArc + pile.rot * loose
          const z = (-26 * dist * onArc - 7 * i * (1 - onArc)) * unit
          const scale = 1 + (Math.max(0.68, 1 - 0.075 * dist) - 1) * onArc
          const alpha = 1 - (1 - clamp01(reach + 1 - dist)) * onArc
          card.style.transform =
            `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), ${z.toFixed(2)}px) ` +
            `rotateZ(${rot.toFixed(2)}deg) scale(${scale.toFixed(4)})`
          card.style.opacity = alpha.toFixed(3)
          card.style.zIndex = String(onArc > 0.5 ? 100 - Math.round(dist * 10) : 100 - i)
          card.style.pointerEvents = alpha > 0.35 && onArc > 0.9 ? 'auto' : 'none'
        })
        // the frame shows when a card is settled in the centre, fading mid-move
        const settled = clamp01(1 - 2 * Math.abs(pos - Math.round(pos)))
        ring.style.transform =
          `translate(-50%, -50%) translateY(${(-lift * unit).toFixed(2)}px) ` + `scale(${(0.97 + 0.03 * gather).toFixed(4)})`
        ring.style.opacity = ((0.25 + 0.75 * settled) * onArc).toFixed(3)

        const centre = ((Math.round(pos) % n) + n) % n
        if (centre !== shown) {
          shown = centre
          setActive(centre)
        }
      }

      const moveTo = (to: number) => {
        const dist = Math.abs(to - state.pos)
        gsap.killTweensOf(state)
        gsap.to(state, {
          pos: to,
          duration: reduce ? 0 : 0.52 + 0.09 * Math.min(dist, 4),
          ease: 'power2.out',
        })
      }
      const target = () => (gsap.isTweening(state) ? (gsap.getTweensOf(state)[0].vars.pos as number) : Math.round(state.pos))

      // auto-advance once fanned out and left alone; then draw
      const tick = (_t: number, dt: number) => {
        if (!visible) return
        if (reduce || spread < 1 || drag.active || gsap.isTweening(state)) {
          idle = 0
        } else if ((idle += Math.min(dt, 64)) >= AUTO_MS) {
          idle = 0
          moveTo(Math.round(state.pos) + 1)
        }
        render()
      }

      const onMove = (e: PointerEvent) => {
        if (!drag.active) return
        const dx = e.clientX - drag.startX
        if (Math.abs(dx) > 5) dragged.current = true
        state.pos = drag.startPos - dx / (220 * cfg.unit)
        const now = performance.now()
        const dt = now - drag.lastT
        if (dt > 0) {
          const v = (-(e.clientX - drag.lastX) / (220 * cfg.unit) / dt) * 1000
          drag.velocity = 0.7 * drag.velocity + 0.3 * v
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
        // settle on a card, carried a little further by the fling
        moveTo(Math.round(state.pos + Math.max(-3, Math.min(3, 0.34 * drag.velocity))))
      }
      const onDown = (e: PointerEvent) => {
        idle = 0
        if (e.pointerType === 'mouse' && e.button !== 0) return
        gsap.killTweensOf(state)
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
      const onKey = (e: KeyboardEvent) => {
        idle = 0
        const at = target()
        if (e.key === 'ArrowLeft') moveTo(at - 1)
        else if (e.key === 'ArrowRight') moveTo(at + 1)
        else if (e.key === 'Home') moveTo(at + wrap(0 - at, n))
        else if (e.key === 'End') moveTo(at + wrap(n - 1 - at, n))
        else return
        e.preventDefault()
      }
      const onResize = () => {
        cfg = layout()
        size()
        render()
      }

      goTo.current = (i) => {
        idle = 0
        moveTo(target() + wrap(i - target(), n))
      }

      el.addEventListener('pointerdown', onDown)
      el.addEventListener('keydown', onKey)
      window.addEventListener('resize', onResize)
      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: '200px' })
      io.observe(el)
      // scrolling the section in gathers the pile into the arc
      const st = reduce
        ? null
        : ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            end: 'top 32%',
            scrub: true,
            onUpdate: (self) => {
              spread = self.progress
              render()
            },
            onRefresh: (self) => {
              spread = self.progress
              render()
            },
          })

      size()
      render()
      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
        gsap.killTweensOf(state)
        st?.kill()
        io.disconnect()
        window.removeEventListener('resize', onResize)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        el.removeEventListener('pointerdown', onDown)
        el.removeEventListener('keydown', onKey)
        goTo.current = null
      }
    },
    { scope: stage }
  )

  return (
    <section className="section fc" id="featured-courses">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Featured courses"
          title={['What most students', { text: 'are enrolling in', className: 'gradient-text' }]}
          lead="Every one of these runs in classroom and live-online formats, with lab hours, a live project and placement support."
        />
      </div>

      <div className="fc__show">
        <p className="fc__count" aria-hidden>
          <span className="fc__count-dim">&lt;.</span>
          <span className="fc__count-now">{String(active + 1).padStart(2, '0')}</span>
          <span>/ {String(n).padStart(2, '0')}</span>
          <span className="fc__count-dim">.&gt;</span>
        </p>

        <div
          ref={stage}
          className="fc__stage"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured courses"
        >
          {FEATURED_COURSES.map((c, i) => {
            const isActive = i === active
            return (
              <div
                key={c.slug}
                ref={(node) => {
                  cards.current[i] = node
                }}
                className="fc__slot"
                style={{ opacity: 0 }}
              >
                <Link
                  href={`/courses/${c.slug}`}
                  draggable={false}
                  className={`fshow${isActive ? ' is-active' : ''}`}
                  aria-label={`${c.title} — ${c.duration}, ${c.mode}`}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => {
                    // a drag, or a side card, doesn't navigate — side cards come to the centre
                    if (dragged.current || !isActive) {
                      e.preventDefault()
                      if (!dragged.current) goTo.current?.(i)
                    }
                  }}
                >
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1536px) 300px, (min-width: 1024px) 276px, (min-width: 768px) 216px, 174px"
                    draggable={false}
                    className="fshow__img"
                  />
                  {c.highlight && <span className="fshow__badge">{c.highlight}</span>}
                  <span className="fshow__info" aria-hidden>
                    <span className="fshow__text">
                      <span className="fshow__title">{c.title}</span>
                      <span className="fshow__meta">{c.duration}</span>
                    </span>
                    <span className="fshow__go">
                      <FiArrowRight />
                    </span>
                  </span>
                </Link>
              </div>
            )
          })}
          <div ref={frame} className="fc__frame" aria-hidden />
        </div>
      </div>

      <div className="shell fc__foot">
        <Link href="/courses" className="btn">
          Browse all courses <FiArrowRight aria-hidden />
        </Link>
      </div>
    </section>
  )
}
