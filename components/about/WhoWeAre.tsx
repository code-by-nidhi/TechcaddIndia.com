'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'

import { ALL_MENU_COURSES } from '@/data/courses-menu'

/* "Who we are" — a spatial company-profile band.

   Left: the story as an editorial column (headline, one frosted panel holding
   the two paragraphs, then the expertise grouped under hairlines, no cards).
   Right: a stage of three real photographs at three depths. On a fine pointer
   the layers drift 2–4px against each other; elsewhere the stage is static.
   Nothing here is a figure or a claim: the facts are the ones already on the
   site (a single classroom in Punjab grown into a national network, classroom
   and live online batches, headquarters in Jalandhar). */

const GROUPS: { title: string; courses: string[] }[] = [
  { title: 'AI & Data', courses: ['Artificial Intelligence (AI)', 'Generative AI', 'Data Science & Machine Learning'] },
  {
    title: 'Software Development',
    courses: ['Python Programming', 'Java Programming', 'Full Stack Web Development', 'MERN Stack Development'],
  },
  { title: 'Cloud & Security', courses: ['AWS & Cloud Computing', 'Cybersecurity'] },
  { title: 'Digital & Creative Skills', courses: ['Digital Marketing', 'UI/UX Design', 'AutoCAD'] },
]

/* resolved from the course catalogue so every pill links to its real page */
const resolved = GROUPS.map((g) => ({
  title: g.title,
  courses: g.courses.map((label) => ALL_MENU_COURSES.find((c) => c.label === label)).filter((c) => c !== undefined),
}))

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)
  const [seen, setSeen] = useState(false)

  /* one-shot reveal when the section scrolls into view */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    setArmed(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* pointer depth: mouse only, never touch, never with reduced motion. The
     handler only writes two CSS variables; the layers do the moving. */
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    )
      return

    let raf = 0
    const set = (x: number, y: number) => {
      stage.style.setProperty('--px', x.toFixed(3))
      stage.style.setProperty('--py', y.toFixed(3))
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = stage.getBoundingClientRect()
        set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2)
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      set(0, 0)
    }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="wwa-wrap">
      <section
        ref={sectionRef}
        className={`wwa${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}`}
        aria-labelledby="wwa-title"
      >
        <div className="shell wwa__grid">
          <div className="wwa__copy">
            <p className="wwa__eyebrow wwa__in" style={{ ['--i' as string]: 0 }}>
              Who we are
            </p>
            <h2 id="wwa-title" className="wwa__title wwa__in" style={{ ['--i' as string]: 1 }}>
              <span>Empowering Talent.</span>
              <span>Accelerating Innovation.</span>
              <span className="wwa__accent">Transforming Futures.</span>
            </h2>

            <div className="wwa__panel wwa__in" style={{ ['--i' as string]: 2 }}>
              <p className="wwa__lead">
                techcadd began as a single classroom in Punjab and has grown into a national training network. The method has
                stayed the same: learn by building, be mentored by working practitioners, and leave with projects you can
                show.
              </p>
              <p>
                We train across software, AI, data, cloud, cybersecurity and design — in classrooms at our centres and in live
                online batches.
              </p>
            </div>

            <div className="wwa__expertise wwa__in" style={{ ['--i' as string]: 6 }}>
              <h3 className="wwa__sub">What we teach</h3>
              <div className="wwa__groups">
                {resolved.map((g) => (
                  <section key={g.title} className="wwa__group" aria-label={g.title}>
                    <h4>{g.title}</h4>
                    <ul>
                      {g.courses.map((c) => (
                        <li key={c.slug}>
                          <Link href={c.href}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
              <p className="wwa__hq">
                <FiMapPin aria-hidden /> Headquartered in Jalandhar, Punjab
              </p>
            </div>
          </div>

          <div ref={stageRef} className="wwa__stage" style={{ ['--px' as string]: 0, ['--py' as string]: 0 }}>
            <div className="wwa__layer wwa__layer--main wwa__in" style={{ ['--i' as string]: 3 }}>
              <div className="wwa__frame" style={{ ['--d' as string]: '-2px' }}>
                <Image
                  src="/images/course/campus1.webp"
                  alt="Learners and trainers in a techcadd training hall"
                  fill
                  sizes="(max-width: 900px) 84vw, 42vw"
                />
              </div>
            </div>
            <div className="wwa__layer wwa__layer--a wwa__in" style={{ ['--i' as string]: 4 }}>
              <div className="wwa__frame" style={{ ['--d' as string]: '4px' }}>
                <Image src="/images/course/classroom.webp" alt="A full hall at a techcadd seminar" fill sizes="(max-width: 900px) 38vw, 18vw" />
              </div>
            </div>
            <div className="wwa__layer wwa__layer--b wwa__in" style={{ ['--i' as string]: 5 }}>
              <div className="wwa__frame" style={{ ['--d' as string]: '3px' }}>
                <Image src="/images/course/lab.webp" alt="A hands-on lab session at techcadd" fill sizes="(max-width: 900px) 38vw, 18vw" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
