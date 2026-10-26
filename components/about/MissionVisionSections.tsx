'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import type { IconType } from 'react-icons'
import {
  FiCheck,
  FiCompass,
  FiCpu,
  FiHeart,
  FiRefreshCw,
  FiShield,
  FiTarget,
  FiTool,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi'

/* Our Mission (dark), Our Vision (white) and Our Values (dark), so the bands
   alternate after the white hero (and before the white call to action): the
   three blocks the Mission & Vision hero buttons jump to (#mission, #vision,
   #values). Wrapped in a plain <div> so base.css's white / tint banding of
   <main> sections does not apply to them.

   Each block reveals once as it scrolls into view. Before the component mounts,
   and with reduced motion, everything is simply shown. The two illustrations
   are SVG + CSS and decorative; the words they carry are repeated in the copy. */

/** Adds `is-armed` once mounted (motion allowed) and `is-in` the first time the block is seen. */
function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [armed, setArmed] = useState(false)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    setArmed(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, cls: `${armed ? ' is-armed' : ''}${seen ? ' is-in' : ''}` }
}

const d = (i: number) => ({ ['--i' as string]: i })

/* overlay geometry, in the artwork's own pixels (1536 x 1024) */
const ORBIT_A = 'M368 500 a400 330 0 1 0 800 0 a400 330 0 1 0 -800 0'
const ORBIT_B = 'M438 500 a330 255 0 1 0 660 0 a330 255 0 1 0 -660 0'
const ORBIT_C = 'M468 520 a300 130 0 1 0 600 0 a300 130 0 1 0 -600 0'

/** short connector stubs between each icon and the sphere */
const LINKS = ['M520 290 L612 368', 'M1016 290 L924 368', 'M520 722 L612 640', 'M1016 722 L924 640']

/** the four glass panels in the artwork: x, y, width, height */
const CARDS: [number, number, number, number][] = [
  [88, 180, 372, 156],
  [1070, 182, 380, 154],
  [90, 724, 380, 164],
  [1070, 726, 380, 162],
]

/** moving light on the orbits: speeds differ, the 'extra' ones are dropped on phones */
const PARTICLES: { path: string; tone: 'blue' | 'cyan' | 'violet'; r: number; t: number; d: number; extra?: boolean }[] = [
  { path: ORBIT_A, tone: 'blue', r: 9, t: 30, d: 0 },
  { path: ORBIT_A, tone: 'violet', r: 8, t: 36, d: -14, extra: true },
  { path: ORBIT_B, tone: 'cyan', r: 7, t: 24, d: -6 },
  { path: ORBIT_B, tone: 'violet', r: 6, t: 28, d: -19, extra: true },
  { path: ORBIT_C, tone: 'cyan', r: 6, t: 20, d: -3 },
]

/* ------------------------------------------------------------ mission -- */

const PRINCIPLES: { Icon: IconType; title: string; text: string }[] = [
  { Icon: FiTool, title: 'Learn by Building', text: 'Concepts are tested on real projects, not just read.' },
  { Icon: FiTarget, title: 'Practice with Purpose', text: 'Every exercise is tied to a skill the industry uses.' },
  { Icon: FiTrendingUp, title: 'Grow with Confidence', text: 'Structured steps that turn practice into ability.' },
]

function Mission() {
  const { ref, cls } = useReveal<HTMLElement>()
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.removeAttribute('data-paused')
      else el.setAttribute('data-paused', '')
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return (
    <section ref={ref} id="mission" className={`mvs-m mvs-dark about-block${cls}`} aria-labelledby="mvs-m-title">
      <div className="shell mvs__grid">
        <div className="mvs__copy">
          <p className="mvs__eyebrow rv" style={d(0)}>
            Our Mission
          </p>
          <h2 id="mvs-m-title" className="mvs__title rv" style={d(1)}>
            Making Technology Skills <em>Practical and Accessible</em>
          </h2>
          <p className="mvs__lead rv" style={d(2)}>
            Our mission is to empower learners with industry-relevant technology skills through hands-on training, practical
            projects, and structured learning experiences that prepare them for the evolving digital industry.
          </p>
          <ul className="mvs-m__list">
            {PRINCIPLES.map(({ Icon, title, text }, i) => (
              <li key={title} className="rv" style={d(3 + i)}>
                <span className="mvs-m__icon" aria-hidden>
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mvs-m__viz rv" style={d(2)}>
          <span className="mvs-m__glow" aria-hidden />
          <div className="mve-img">
            <div className="mve-stage">
              <Image
                src="/images/about/digital-learning-ecosystem.png"
                alt="TechCadd Digital Learning Ecosystem: AI & Data, Cloud Computing, Software Development and Cybersecurity around a central TechCadd sphere"
                fill
                sizes="(max-width: 900px) 92vw, 600px"
              />
              {/* motion laid over the artwork, in the artwork's own pixel space (cover crop) */}
              <svg className="mvo" viewBox="0 54.85 1536 914.3" preserveAspectRatio="none" aria-hidden focusable="false">
                <defs>
                  <linearGradient id="mvo-grad" gradientUnits="userSpaceOnUse" x1="400" y1="200" x2="1100" y2="800">
                    <stop offset="0" stopColor="#7ea6ff" />
                    <stop offset="1" stopColor="#b48cff" />
                  </linearGradient>
                  <radialGradient id="mvo-sphere" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0.55" stopColor="#7a8cff" stopOpacity="0" />
                    <stop offset="1" stopColor="#8f7bff" stopOpacity="0.38" />
                  </radialGradient>
                  <linearGradient id="mvo-band" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.16" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="mvo-clip">
                    <circle cx="768" cy="500" r="212" />
                  </clipPath>
                </defs>

                <g className="mvo__rings">
                  <path className="mvo__ring mvo__ring--a" d="M368 500 a400 330 0 1 0 800 0 a400 330 0 1 0 -800 0" />
                  <path className="mvo__ring mvo__ring--b" d="M438 500 a330 255 0 1 0 660 0 a330 255 0 1 0 -660 0" />
                  <path className="mvo__ring mvo__ring--c" d="M468 520 a300 130 0 1 0 600 0 a300 130 0 1 0 -600 0" />
                </g>

                <g className="mvo__fx">
                  <circle className="mvo__glow" cx="768" cy="500" r="214" fill="url(#mvo-sphere)" />
                  <g clipPath="url(#mvo-clip)">
                    <rect className="mvo__sweep" x="568" y="280" width="240" height="440" fill="url(#mvo-band)" transform="skewX(-12)" />
                  </g>

                  {LINKS.map((l, i) => (
                    <path key={l} className="mvo__link" d={l} pathLength={100} style={{ ['--d' as string]: `${i * 1.4}s` }} />
                  ))}

                  <circle className="mvo__halo mvo__halo--ai" cx="461" cy="235" r="66" />
                  <circle className="mvo__halo mvo__halo--cloud" cx="1075" cy="235" r="66" />
                  <circle className="mvo__halo mvo__halo--code" cx="458" cy="778" r="66" />
                  <circle className="mvo__halo mvo__halo--shield" cx="1078" cy="778" r="66" />

                  {PARTICLES.map((p, i) => (
                    <g key={i}>
                      <circle
                        className={`mvo__trail mvo__trail--${p.tone}${p.extra ? ' mvo__trail--extra' : ''}`}
                        r={p.r * 0.7}
                        style={{ offsetPath: `path("${p.path}")`, ['--t' as string]: `${p.t}s`, ['--d' as string]: `${p.d - 0.35}s` } as CSSProperties}
                        fill="currentColor"
                      />
                      <circle
                        className={`mvo__p mvo__p--${p.tone}${p.extra ? ' mvo__p--extra' : ''}`}
                        r={p.r}
                        style={{ offsetPath: `path("${p.path}")`, ['--t' as string]: `${p.t}s`, ['--d' as string]: `${p.d}s`, filter: 'drop-shadow(0 0 6px currentColor)' } as CSSProperties}
                      />
                    </g>
                  ))}

                  {CARDS.map((c, i) => (
                    <rect key={i} className="mvo__card" x={c[0]} y={c[1]} width={c[2]} height={c[3]} rx="44" />
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- vision -- */

const POINTS: { Icon: IconType; title: string }[] = [
  { Icon: FiCompass, title: 'Future-Ready Skills' },
  { Icon: FiRefreshCw, title: 'Continuous Innovation' },
  { Icon: FiZap, title: 'Opportunities Through Technology' },
]

function Vision() {
  const { ref, cls } = useReveal<HTMLElement>()
  return (
    <section ref={ref} id="vision" className={`mvs-v mvs-light about-block${cls}`} aria-labelledby="mvs-v-title">
      <div className="shell mvs__grid mvs__grid--flip">
        <div className="mvs-v__viz rv" style={d(2)} aria-hidden>
          <svg className="mvs-v__svg" viewBox="0 0 100 86" focusable="false">
            <defs>
              <linearGradient id="mvs-v-line" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#4f7dff" />
                <stop offset="1" stopColor="#9b70f5" />
              </linearGradient>
            </defs>
            <path className="mvs-v__grid" d="M0 20 H100 M0 44 H100 M0 68 H100 M20 0 V86 M50 0 V86 M80 0 V86" />
            <path className="mvs-v__line" style={d(0)} d="M50 58 C50 46 18 46 18 33" pathLength={1} />
            <path className="mvs-v__line" style={d(1)} d="M50 58 V33" pathLength={1} />
            <path className="mvs-v__line" style={d(2)} d="M50 58 C50 46 82 46 82 33" pathLength={1} />
            <path className="mvs-v__pulse" d="M50 58 C50 46 18 46 18 33" pathLength={100} />
            <path className="mvs-v__pulse mvs-v__pulse--b" d="M50 58 C50 46 82 46 82 33" pathLength={100} />
          </svg>
          {POINTS.map(({ Icon, title }, i) => (
            <div key={title} className={`mvs-v__node mvs-v__node--${i}`} style={d(i)}>
              <span className="mvs-v__nicon">
                <Icon />
              </span>
              <span>{title}</span>
            </div>
          ))}
          <div className="mvs-v__core">
            <span className="mvs-v__cicon">
              <FiCpu />
            </span>
            <b>Learning ecosystem</b>
            <small>Technology · Practice · Innovation</small>
          </div>
        </div>

        <div className="mvs__copy">
          <p className="mvs__eyebrow rv" style={d(0)}>
            Our Vision
          </p>
          <h2 id="mvs-v-title" className="mvs__title rv" style={d(1)}>
            Shaping the <em>Future</em> of Technology Education
          </h2>
          <p className="mvs__lead rv" style={d(2)}>
            Our vision is to create a learning ecosystem where emerging technologies, practical experience, and continuous
            innovation open new opportunities for learners and help businesses adapt to a rapidly changing digital world.
          </p>
          <ul className="mvs-v__list">
            {POINTS.map(({ Icon, title }, i) => (
              <li key={title} className="rv" style={d(3 + i)}>
                <Icon aria-hidden />
                {title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- values -- */

const VALUES: { Icon: IconType; title: string; text: string }[] = [
  {
    Icon: FiTool,
    title: 'Practical Learning',
    text: 'We believe meaningful skills are developed through hands-on experience and real-world application.',
  },
  {
    Icon: FiRefreshCw,
    title: 'Continuous Innovation',
    text: 'We embrace evolving technologies and encourage continuous learning and improvement.',
  },
  {
    Icon: FiShield,
    title: 'Integrity & Trust',
    text: 'We value transparency, responsibility, and meaningful relationships with learners and partners.',
  },
  {
    Icon: FiUsers,
    title: 'Growth for Everyone',
    text: 'We aim to create an environment that encourages learning, confidence, and professional development.',
  },
]

function Values() {
  const { ref, cls } = useReveal<HTMLElement>(0.12)
  return (
    <section ref={ref} id="values" className={`mvs-val mvs-dark about-block${cls}`} aria-labelledby="mvs-val-title">
      <div className="shell mvs-val__grid">
        <div className="mvs-val__head">
          <p className="mvs__eyebrow rv" style={d(0)}>
            Our Values
          </p>
          <h2 id="mvs-val-title" className="mvs__title rv" style={d(1)}>
            The Principles Behind <em>Everything We Build</em>
          </h2>
          <p className="mvs__lead rv" style={d(2)}>
            Our values guide how we teach, collaborate, innovate, and support learners as they develop the skills needed to
            succeed in technology.
          </p>
          <span className="mvs-val__mark rv" style={d(3)} aria-hidden>
            <FiHeart />
          </span>
        </div>

        <ul className="mvs-val__items">
          {VALUES.map(({ Icon, title, text }, i) => (
            <li key={title} className="mvs-val__item rv" style={d(2 + i)}>
              <span className="mvs-val__no" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mvs-val__icon" aria-hidden>
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function MissionVisionSections() {
  return (
    <div className="mvs">
      <Mission />
      <Vision />
      <Values />
    </div>
  )
}
