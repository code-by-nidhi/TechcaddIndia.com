'use client'

import { useEffect, useState } from 'react'

const STATIC_LINE = 'Building the future with'

const WORDS = ['Technology', 'Innovation', 'Artificial Intelligence', 'Digital Solutions', 'Software Development', 'Future Careers']

const INTERVAL_MS = 2000

/* The About hero's h1: a fixed first line and a highlighted phrase that swaps
   every 2 seconds. All the phrases share one grid cell, so the heading is
   always as tall as the tallest phrase (two lines on a phone) and nothing
   below it moves while they cross-fade. Only the active phrase is exposed to
   assistive tech. With reduced motion the first phrase simply stays. */
export default function RotatingHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      if (document.hidden) return // don't queue changes in a background tab
      setIndex((i) => (i + 1) % WORDS.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <h1 id="about-hero-title" className="ahero__title">
      <span className="ahero__line ahero__in" style={{ ['--i' as string]: 1 }}>
        {STATIC_LINE}
      </span>
      <span className="ahero__words ahero__in" style={{ ['--i' as string]: 2 }}>
        {WORDS.map((word, i) => (
          <span key={word} className={`ahero__word ahero__hl${i === index ? ' is-active' : ''}`} aria-hidden={i !== index}>
            {word}
          </span>
        ))}
      </span>
    </h1>
  )
}
