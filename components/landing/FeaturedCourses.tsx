'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { FEATURED_COURSES } from '@/data/site'

/* Featured courses — a WebGL row of course images that bends as it passes an
   invisible lens (React Bits' FlexCarousel). Drag, swipe or use the arrow
   keys to move it; a side card comes to the centre when clicked, and the
   centre card opens its course. The details of the centred course sit below
   with a real link, and every course is also linked in a visually hidden
   list so nothing depends on the canvas.

   The carousel is the heaviest thing on the page, so it is kept cheap: its
   code (and ogl) is a separate chunk, it only mounts once the section is
   near the viewport, and the rainbow dispersion pass is off. */

const FlexCarousel = dynamic(() => import('@/components/fx/FlexCarousel'), { ssr: false })

const ITEMS = FEATURED_COURSES.map((c) => ({ src: c.image, alt: c.title, title: c.title, subtitle: c.duration }))

export default function FeaturedCourses() {
  const router = useRouter()
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [near, setNear] = useState(false)
  const course = FEATURED_COURSES[active]

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        io.disconnect()
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section sq-fc" id="featured-courses">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured courses"
          title={['What most students', { text: 'are enrolling in', className: 'sq-hl' }]}
          lead="Every one of these runs in classroom and live-online formats, with lab hours, a live project and placement support."
        />
      </div>

      <div className="sq-fc__stage" ref={stage}>
        {near && (
          <FlexCarousel
            items={ITEMS}
            preset="liquid"
            intro="rise"
            fit="landscape"
            cardHeight={0.5}
            gap={14}
            radius={14}
            squeeze={0.2}
            dispersion={0}
            focusOnClick={false}
            captureWheel={false}
            autoplay
            interval={6}
            captions
            onChange={(i) => setActive(i)}
            onSelect={(i) => router.push(`/courses/${FEATURED_COURSES[i].slug}`)}
          />
        )}
      </div>

      <div className="shell sq-fc__foot">
        <p className="sq-fc__meta" aria-live="off">
          {course.highlight && <span className="sq-course__badge">{course.highlight}</span>}
          <span>
            {course.mode} · {course.topics.join(', ')}
          </span>
        </p>
        <div className="sq-fc__actions">
          <Link href={`/courses/${course.slug}`} className="btn">
            View {course.title} <FiArrowRight aria-hidden />
          </Link>
          <Link href="/courses" className="btn btn--ghost">
            Browse all courses
          </Link>
        </div>

        <ul className="sr-only">
          {FEATURED_COURSES.map((c) => (
            <li key={c.slug}>
              <Link href={`/courses/${c.slug}`}>
                {c.title} — {c.duration}, {c.mode}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
