'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { FiArrowLeft, FiArrowRight, FiMaximize2, FiX } from 'react-icons/fi'

import { EVENT_PHOTOS, SEMINAR_POSTERS, type GalleryPhoto } from '@/data/gallery'

/* ==========================================================================
   Gallery — seminars and events only. A bento grid of the strongest event
   photos, then a rail of the branded seminar posters, one per partner
   campus. Any photo opens a lightbox that steps through the whole set.
   ========================================================================== */

const GRID = EVENT_PHOTOS.slice(0, 8)
const ALL = [...GRID, ...SEMINAR_POSTERS]

export default function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open === null) d.open && d.close()
    else if (!d.open) d.showModal()
  }, [open])

  const step = (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + ALL.length) % ALL.length))

  const tile = (p: GalleryPhoto, i: number, className: string, sizes: string) => (
    <button type="button" className={className} onClick={() => setOpen(i)} aria-label={`View photo: ${p.alt}`}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} />
      <span className="cx-gal__cap">{p.caption}</span>
      <span className="cx-gal__zoom" aria-hidden>
        <FiMaximize2 />
      </span>
    </button>
  )

  const shown = open === null ? null : ALL[open]

  return (
    <section className="section cx-gal" id="gallery">
      <div className="shell">
        <div className="cx-head cx-head--split">
          <div className="cx-head__text">
            <span className="eyebrow" data-aos="fade-up">
              Seminars &amp; events
            </span>
            <h2 className="cx-title" data-aos="fade-up" data-aos-delay="80">
              Where techcadd <span className="cx-hl">shows up</span>
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="160">
            Keynotes, robotics showcases, placement drives and campus seminars — the events that put the techcadd name in
            front of thousands of students every year.
          </p>
        </div>

        <ul className="cx-gal__grid">
          {GRID.map((p, i) => (
            <li key={p.src} data-aos="fade-up" data-aos-delay={(i % 4) * 60}>
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
          <figure>
            <div className="cx-lightbox__img" style={{ aspectRatio: `${shown.w} / ${shown.h}` }}>
              <Image src={shown.src} alt={shown.alt} fill sizes="90vw" />
            </div>
            <figcaption>
              {shown.alt}
              <span>
                {open! + 1} / {ALL.length}
              </span>
            </figcaption>
          </figure>
        )}
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
