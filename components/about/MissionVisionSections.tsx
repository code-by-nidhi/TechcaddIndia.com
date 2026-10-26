'use client'

import { useEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  FiCheck,
  FiCompass,
  FiCloud,
  FiCode,
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

/* ------------------------------------------------------------ mission -- */

const MODULES: { label: string; Icon: IconType; x: number; y: number; depth: number; tilt: number; path: string }[] = [
  { label: 'AI & Data', Icon: FiCpu, x: 22, y: 16, depth: 0.92, tilt: 7, path: 'M42 32 C34 28 28 22 22 16' },
  { label: 'Software Development', Icon: FiCode, x: 24, y: 70, depth: 1.04, tilt: 7, path: 'M42 52 C34 56 29 64 24 70' },
  { label: 'Cloud Computing', Icon: FiCloud, x: 78, y: 16, depth: 0.92, tilt: -7, path: 'M58 32 C66 28 72 22 78 16' },
  { label: 'Cybersecurity', Icon: FiShield, x: 76, y: 70, depth: 1.04, tilt: -7, path: 'M58 52 C66 56 71 64 76 70' },
]

const PRINCIPLES: { Icon: IconType; title: string; text: string }[] = [
  { Icon: FiTool, title: 'Learn by Building', text: 'Concepts are tested on real projects, not just read.' },
  { Icon: FiTarget, title: 'Practice with Purpose', text: 'Every exercise is tied to a skill the industry uses.' },
  { Icon: FiTrendingUp, title: 'Grow with Confidence', text: 'Structured steps that turn practice into ability.' },
]

function Mission() {
  const { ref, cls } = useReveal<HTMLElement>()
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

        {/* a spatial ecosystem: layered core, two rings, four nodes at different depths */}
        <div className="mvs-m__viz rv" style={d(2)} aria-hidden>
          <span className="mvs-m__glow" />
          <div className="mve">
            <span className="mve__floor" />
            <span className="mve__light" />
            <svg className="mve__svg" viewBox="0 0 100 90" focusable="false">
              <defs>
                <linearGradient id="mve-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="90">
                  <stop offset="0" stopColor="#356dff" />
                  <stop offset="1" stopColor="#7950b5" />
                </linearGradient>
              </defs>
              <ellipse className="mve__ring" cx="50" cy="46" rx="33" ry="17" />
              <ellipse className="mve__ring mve__ring--b" cx="50" cy="46" rx="43" ry="23" />
              {MODULES.map((m, i) => (
                <g key={m.label}>
                  <path className="mve__line" style={d(i)} d={m.path} pathLength={1} />
                  <circle className="mve__dot" cx={m.x} cy={m.y} r="0.9" />
                </g>
              ))}
              <path className="mve__pulse" d={MODULES[0].path} pathLength={100} />
              <path className="mve__pulse mve__pulse--b" d={MODULES[3].path} pathLength={100} />
            </svg>

            <div className="mve__hub">
              <svg className="mve__stack" viewBox="0 0 100 70" focusable="false">
                <defs>
                  <linearGradient id="mve-top" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4a7dff" />
                    <stop offset="1" stopColor="#7950b5" />
                  </linearGradient>
                </defs>
                <ellipse className="mve__plate-shadow" cx="50" cy="62" rx="36" ry="7" />
                <polygon className="mve__plate mve__plate--1" points="50,34 90,50 50,66 10,50" />
                <polygon className="mve__plate mve__plate--2" points="50,25 90,41 50,57 10,41" />
                <polygon className="mve__plate mve__plate--3" points="50,12 90,28 50,44 10,28" />
                <g className="mve__glyph">
                  <path d="M50 28 L36 24 M50 28 L64 24 M50 28 L36 33 M50 28 L64 33" />
                  <circle cx="36" cy="24" r="1.6" />
                  <circle cx="64" cy="24" r="1.6" />
                  <circle cx="36" cy="33" r="1.6" />
                  <circle cx="64" cy="33" r="1.6" />
                  <circle cx="50" cy="28" r="3" />
                </g>
              </svg>
              <div className="mve__tag">
                <b>TECHCADD</b>
                <small>Digital Learning Ecosystem</small>
              </div>
            </div>

            {MODULES.map(({ label, Icon, x, y, depth, tilt }, i) => (
              <div
                key={label}
                className="mve__mod"
                style={{ left: `${x}%`, top: `${(y / 90) * 100}%`, ['--depth' as string]: depth, ['--tilt' as string]: `${tilt}deg`, ...d(i) }}
              >
                <span className="mve__panel">
                  <span className="mve__icon">
                    <Icon />
                  </span>
                  <span className="mve__label">{label}</span>
                </span>
              </div>
            ))}
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
