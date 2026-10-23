'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

/* The large About photo: a slow crossfade through the wide event shots.
   `focus` is the object-position that keeps each photo's people in frame. */

const SLIDES = [
  { src: '/images/gallery/auditorium-talk.webp', alt: 'A techcadd speaker addressing a full auditorium', focus: 'center 60%' },
  { src: '/images/gallery/placement-drive.webp', alt: 'The techcadd team at a mega placement drive', focus: 'center 40%' },
  { src: '/images/gallery/auditorium-session.webp', alt: 'A hands-on AI session for students', focus: 'center 55%' },
  { src: '/images/gallery/techcadd-meet.webp', alt: 'The techcadd team on stage', focus: 'center 60%' },
  { src: '/images/gallery/auditorium-crowd.webp', alt: 'A packed hall at a techcadd seminar', focus: 'center 75%' },
]

const STEP_MS = 4500

export default function AboutSlideshow() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), STEP_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <>
      {SLIDES.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={i === active ? s.alt : ''}
          aria-hidden={i !== active || undefined}
          fill
          priority={i === 0}
          sizes="(max-width: 900px) 100vw, 55vw"
          className={`cx-about__slide${i === active ? ' is-on' : ''}`}
          style={{ objectPosition: s.focus }}
        />
      ))}
      <span className="cx-about__dots" aria-hidden>
        {SLIDES.map((s, i) => (
          <i key={s.src} className={i === active ? 'is-on' : undefined} />
        ))}
      </span>
    </>
  )
}
