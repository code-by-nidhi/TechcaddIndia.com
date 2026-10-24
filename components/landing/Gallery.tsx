'use client'

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import Image from 'next/image'
import { FiArrowLeft, FiArrowRight, FiMaximize2, FiX, FiZoomIn } from 'react-icons/fi'

import { EVENT_PHOTOS, SEMINAR_POSTERS, type GalleryPhoto } from '@/data/gallery'

/* ==========================================================================
   Gallery — seminars and events only. A bento grid of the strongest event
   photos, then a rail of the branded seminar posters, one per partner
   campus. Any photo opens a lightbox that steps through the whole set.
   Stepping waits for the next photo to load before the photo, caption and
   count change together (a spinner shows meanwhile), and the photos either
   side of the one in view load in the background so most steps are instant.

   A little tooltip ("Click to get a wider view") trails the mouse over any
   photo that opens; keyboard users get it pinned above the focused photo.
   It is one element for the whole section, fixed to the viewport, so the
   tiles' rounded clipping never cuts it off. Touch screens skip it.
   ========================================================================== */

/** the photos that open the lightbox (the rail's looping copies don't) */
const OPENS = 'button.cx-gal__tile, button.cx-gal__poster'

const GRID = EVENT_PHOTOS.slice(0, 8)
const ALL = [...GRID, ...SEMINAR_POSTERS]

export default function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null)
  /** the photo asked for, and the photo on screen: they differ while the asked-for one loads */
  const [open, setOpen] = useState<number | null>(null)
  const [view, setView] = useState<number | null>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open === null) d.open && d.close()
    else if (!d.open) d.showModal()
    /* opening shows the picked photo straight away; only steps wait for loading */
    setView((v) => (open === null ? null : v === null ? open : v))
  }, [open])

  const step = (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + ALL.length) % ALL.length))

  const tip = useRef<HTMLSpanElement>(null)
  const showTip = (x: number, y: number) => {
    const el = tip.current
    if (!el) return
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
    if (el.classList.contains('is-on')) return
    /* appearing: jump to the pointer first, so the glide only applies while it follows */
    void el.offsetWidth
    el.classList.add('is-on')
  }
  const hideTip = () => tip.current?.classList.remove('is-on')
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    if ((e.target as Element).closest(OPENS)) showTip(e.clientX, e.clientY)
    else hideTip()
  }
  const onFocus = (e: FocusEvent) => {
    const el = e.target as HTMLElement
    if (!el.matches(OPENS) || !el.matches(':focus-visible')) return
    const r = el.getBoundingClientRect()
    showTip(r.left + r.width / 2, r.top + 16)
  }

  const tile = (p: GalleryPhoto, i: number, className: string, sizes: string) => (
    <button type="button" className={className} onClick={() => setOpen(i)} aria-label={`View photo: ${p.alt}`}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} />
      <span className="cx-gal__cap">{p.caption}</span>
      <span className="cx-gal__zoom" aria-hidden>
        <FiMaximize2 />
      </span>
    </button>
  )

  const shown = view === null ? null : ALL[view]
  const loading = open !== null && view !== null && open !== view
  const wrap = (i: number) => (i + ALL.length) % ALL.length
  /* load ahead: the photo asked for (if it isn't on screen yet) and both neighbours */
  const ahead =
    view === null ? [] : [...new Set([open ?? view, wrap(view + 1), wrap(view - 1)])].filter((i) => i !== view)

  return (
    <section
      className="section cx-gal"
      id="gallery"
      onPointerMove={onPointerMove}
      onPointerLeave={hideTip}
      onPointerDown={hideTip}
      onFocus={onFocus}
      onBlur={hideTip}
    >
      <span className="cx-gal__tip" ref={tip} aria-hidden>
        <span className="cx-gal__tip-icon">
          <FiZoomIn />
        </span>
        Click to get a wider view
        <span className="cx-gal__tip-spark">✦</span>
      </span>

      <div className="shell">
        <div className="cx-head cx-head--split">
          <div className="cx-head__text">
            <span className="eyebrow" data-aos="fade-up">
              Seminars &amp; events
            </span>
            <h2 className="cx-title" data-fx="words">
              Where techcadd <span className="cx-hl">shows up</span>
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="160">
            Keynotes, robotics showcases, placement drives and campus seminars — the events that put the techcadd name in
            front of thousands of students every year.
          </p>
        </div>

        <ul className="cx-gal__grid" data-fx="stagger" data-fx-stagger="0.07">
          {GRID.map((p, i) => (
            <li key={p.src}>
              {tile(p, i, 'cx-gal__tile', i === 0 ? '(max-width: 760px) 100vw, 50vw' : '(max-width: 760px) 50vw, 25vw')}
            </li>
          ))}
        </ul>

        <h3 className="cx-gal__sub" data-aos="fade-up">
          Seminars at partner campuses
        </h3>
      </div>

      <div className="cx-gal__rail" data-aos="fade-up">
        <ul>
          {/* doubled for a seamless loop; the copies are hidden from assistive tech */}
          {[...SEMINAR_POSTERS, ...SEMINAR_POSTERS].map((p, i) => {
            const copy = i >= SEMINAR_POSTERS.length
            return (
              <li key={i} aria-hidden={copy || undefined}>
                {copy ? (
                  <span className="cx-gal__poster">
                    <Image src={p.src} alt="" fill sizes="240px" />
                  </span>
                ) : (
                  tile(p, GRID.length + i, 'cx-gal__poster', '240px')
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <dialog
        ref={dialog}
        className="cx-lightbox"
        aria-label="Photo viewer"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        {shown && (
          <figure className={loading ? 'is-loading' : undefined} aria-busy={loading}>
            <div className="cx-lightbox__img" style={{ aspectRatio: `${shown.w} / ${shown.h}` }}>
              <Image key={shown.src} src={shown.src} alt={shown.alt} fill sizes="90vw" loading="eager" />
              <span className="cx-lightbox__spinner" aria-hidden />
            </div>
            <figcaption>
              {shown.alt}
              <span>
                {view! + 1} / {ALL.length}
              </span>
            </figcaption>
          </figure>
        )}
        {/* off-screen copies at the same size, so the browser fetches exactly what the viewer will show */}
        <div className="cx-lightbox__ahead" aria-hidden>
          {ahead.map((i) => (
            <Image
              key={ALL[i].src}
              src={ALL[i].src}
              alt=""
              fill
              sizes="90vw"
              loading="eager"
              onLoad={i === open ? () => setView(i) : undefined}
            />
          ))}
        </div>
        <button type="button" className="cx-lightbox__btn cx-lightbox__close" aria-label="Close" onClick={() => setOpen(null)}>
          <FiX />
        </button>
        <button type="button" className="cx-lightbox__btn cx-lightbox__prev" aria-label="Previous photo" onClick={() => step(-1)}>
          <FiArrowLeft />
        </button>
        <button type="button" className="cx-lightbox__btn cx-lightbox__next" aria-label="Next photo" onClick={() => step(1)}>
          <FiArrowRight />
        </button>
      </dialog>
    </section>
  )
}
