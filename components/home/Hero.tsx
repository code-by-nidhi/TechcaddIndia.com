'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiOpenjdk,
  SiCplusplus,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiTensorflow,
  SiPytorch,
  SiGit,
  SiGooglecloud,
  SiFigma,
  SiDjango,
  SiFlutter,
  SiKotlin,
} from 'react-icons/si'

import SplitHeading from '@/components/fx/SplitHeading'
import Magnetic from '@/components/fx/Magnetic'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { FEATURED_COURSES } from '@/data/site'

/* ==========================================================================
   Hero — centred copy, with a horizontal "conveyor" below it.

   Technologies (Python, JavaScript, …) ride two lanes in from the left and
   funnel into the navy techcadd box; technology-driven courses come out of
   its right side. The scene is drawn at a fixed design size around the box
   and scaled to fit. Each card is a CSS keyframe loop; on every loop an input
   card draws a new random technology and an output card moves to the next
   course.
   ========================================================================== */

const SPEED = 60 // px per second along the belt

type Tech = { name: string; Icon: IconType; color: string }

const TECHS: Tech[] = [
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#E8B600' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'React', Icon: SiReact, color: '#1FB8DB' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Java', Icon: SiOpenjdk, color: '#E76F00' },
  { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
  { name: 'TensorFlow', Icon: SiTensorflow, color: '#FF6F00' },
  { name: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'Google Cloud', Icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { name: 'Django', Icon: SiDjango, color: '#0C8A5B' },
  { name: 'Flutter', Icon: SiFlutter, color: '#02569B' },
  { name: 'Kotlin', Icon: SiKotlin, color: '#7F52FF' },
]

/* course-card accent: gold takes navy ink, the others white */
const COURSE_EDGE = ['#22C55E', '#FFC81C', '#3B82F6']

/** A random technology index different from `current`. */
const randomTech = (current: number) => {
  const next = Math.floor(Math.random() * (TECHS.length - 1))
  return next >= current ? next + 1 : next
}

type Slot = { key: string; kind: 'in' | 'out'; seed: number; style: CSSProperties }

/* Lays `count` cards evenly along one lane; negative delays mean the belt is
   already full on first paint instead of filling up from empty. */
function buildSlots(): Slot[] {
  const slots: Slot[] = []
  let n = 0
  const lane = (kind: Slot['kind'], x0: number, x1: number, y: number, count: number, spacing: number, offset: number) => {
    const dur = (x1 - x0) / SPEED
    for (let k = 0; k < count; k++) {
      slots.push({
        key: `${kind}-${n}`,
        kind,
        seed: n,
        style: {
          '--x0': `${x0}px`,
          '--x1': `${x1}px`,
          '--y': `${y}px`,
          '--dur': `${dur}s`,
          animationDuration: `${dur}s`,
          animationDelay: `-${(k * spacing + offset) / SPEED}s`,
        } as CSSProperties,
      })
      n++
    }
  }
  // x/y are design px from the box centre. Inputs start 58px above/below the
  // centre line and converge onto it as they reach the box (x1 = -40, behind it);
  // outputs emerge from behind the box and run off to the right.
  lane('in', -700, -40, -58, 5, 132, 0)
  lane('in', -700, -40, 58, 5, 132, 66)
  lane('out', 40, 700, 0, 3, 220, 0)
  return slots
}

const SLOTS = buildSlots()

/* Input: a technology. Starts deterministic (so server and client agree),
   then re-rolls at random every time the card loops back to the start. */
function TechCard({ seed, style }: { seed: number; style: CSSProperties }) {
  const [i, setI] = useState((seed * 7) % TECHS.length)
  const { Icon, name, color } = TECHS[i]
  return (
    <div
      className="hc hc--in"
      style={{ ...style, '--edge': color } as CSSProperties}
      onAnimationIteration={() => setI(randomTech)}
    >
      <Icon className="hc__icon" style={{ color }} />
      <span className="hc__name">{name}</span>
    </div>
  )
}

/* Output: a course. The three output cards step through all six courses. */
function CourseCard({ seed, style }: { seed: number; style: CSSProperties }) {
  const [i, setI] = useState(seed % FEATURED_COURSES.length)
  const course = FEATURED_COURSES[i]
  const edge = COURSE_EDGE[i % COURSE_EDGE.length]
  return (
    <div
      className="hc hc--out"
      style={
        {
          ...style,
          '--edge': edge,
          '--pill-ink': edge === '#FFC81C' ? '#04124a' : '#ffffff',
          '--progress': `${55 + ((i * 17) % 40)}%`,
        } as CSSProperties
      }
      onAnimationIteration={() => setI((v) => (v + 3) % FEATURED_COURSES.length)}
    >
      <span className="hc__pill">Course</span>
      <strong className="hc__title">{course.title}</strong>
      <span className="hc__meta">
        {course.duration} · {course.mode}
      </span>
      <span className="hc__chips">
        {course.topics.slice(0, 3).map((t) => (
          <em key={t}>{t}</em>
        ))}
      </span>
      <span className="hc__bar" />
    </div>
  )
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const rig = useRef<HTMLDivElement>(null)

  // Scale the fixed-size scene (≈1300 × 300 design px) to the width it has.
  // Below ~650px it stops shrinking and lets the belt ends crop off-screen,
  // so the box and cards stay legible on phones.
  useEffect(() => {
    const s = scene.current
    const r = rig.current
    if (!s || !r) return
    const fit = () => {
      const w = s.clientWidth
      const k = Math.min(Math.max(w / 1300, 0.5), 1.15)
      r.style.transform = `scale(${k.toFixed(3)})`
      s.style.height = `${Math.round(300 * k)}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(s)
    return () => ro.disconnect()
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1 } })
      tl.from('.hero__badge', { y: 16, opacity: 0 })
        .from('.hero__lead', { y: 20, opacity: 0 }, 0.45)
        .from('.hero__ctas > *', { y: 20, opacity: 0, stagger: 0.1 }, 0.55)
        .from('.hero__scene', { opacity: 0, y: 40, duration: 1.4 }, 0.5)
        .from('.hero__box', { scale: 0.6, opacity: 0, duration: 1.1, ease: 'back.out(1.7)' }, 0.7)
        // the "t." drops into the centre of the box and settles
        .from('.hero__box-logo', { yPercent: -140, opacity: 0, duration: 1.2, ease: 'bounce.out' }, 1)

      gsap.to('.hero__scene', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden />

      <div className="shell hero__inner">
        <div className="hero__copy">
          <span className="hero__badge">
            <i aria-hidden />
            India&apos;s AI &amp; Software Engineering Institute
          </span>

          <SplitHeading
            as="h1"
            immediate
            delay={0.15}
            className="hero__title"
            parts={['Build the skills that make you a', { text: 'job-ready engineer', className: 'gold-text' }]}
          />

          <p className="hero__lead">
            Learn the AI, cloud and full-stack systems businesses actually run on — in a techcadd centre or a live
            online batch from anywhere in India.
          </p>

          <div className="hero__ctas">
            <Magnetic strength={0.2}>
              <Link href="/courses" className="hero__cta">
                Explore Courses <FiArrowRight aria-hidden />
              </Link>
            </Magnetic>
            <Link href="/contact#demo" className="btn btn--ghost">
              <FiPlayCircle aria-hidden /> Book a free demo
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scene}
        className="hero__scene"
        role="img"
        aria-label="Technologies like Python and JavaScript flow into the techcadd box and come out as technology-driven courses"
      >
        <div ref={rig} className="hero__rig">
          {SLOTS.map((s) =>
            s.kind === 'in' ? (
              <TechCard key={s.key} seed={s.seed} style={s.style} />
            ) : (
              <CourseCard key={s.key} seed={s.seed} style={s.style} />
            )
          )}
          {/* painted after the cards so they pass behind it */}
          <div className="hero__box">
            <div className="hero__box-logo" />
          </div>
        </div>
      </div>
    </section>
  )
}
