'use client'

import { useRef, type CSSProperties, type PointerEvent } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  FiActivity,
  FiArrowUpRight,
  FiBriefcase,
  FiCompass,
  FiFileText,
  FiMic,
  FiStar,
  FiTarget,
  FiTool,
  FiUserPlus,
  FiZap,
} from 'react-icons/fi'

import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Career journey — the career pages as three stages along a vertical rail.
   The rail fills as the section scrolls past; each stage's node lights up
   and its cards slide in when the stage reaches the viewport. On hover a
   card's corners lock on like a sight, and a spotlight follows the pointer
   round its border (--x/--y).

   Cards stay visible without JS: the hidden start state only applies once
   the section is `is-armed`.
   ========================================================================== */

export type CareerPage = { slug: string; label: string; href: string; lead?: string }

/* TODO: replace the one-line blurbs with approved copy */
const META: Record<string, { icon: IconType; blurb: string }> = {
  'training-for-freshers': {
    icon: FiUserPlus,
    blurb: 'A guided first step for graduates: fundamentals, tools and a first real project.',
  },
  'job-ready-skill-programs': {
    icon: FiZap,
    blurb: 'Skills employers are hiring for now, taught the way teams actually use them.',
  },
  'career-guidance': {
    icon: FiCompass,
    blurb: 'One-on-one sessions to choose a direction that fits your strengths and goals.',
  },
  'internship-programs': {
    icon: FiBriefcase,
    blurb: 'Work alongside our teams on real deliverables and earn an internship certificate.',
  },
  'industrial-projects': {
    icon: FiTool,
    blurb: 'Industry-grade projects with real requirements, code reviews and deadlines.',
  },
  'live-projects': {
    icon: FiActivity,
    blurb: 'Build and ship live applications that real users rely on.',
  },
  'resume-portfolio-building': {
    icon: FiFileText,
    blurb: 'Turn your work into a resume and portfolio that gets you shortlisted.',
  },
  'interview-preparation': {
    icon: FiMic,
    blurb: 'Mock interviews, aptitude practice and honest feedback until you are confident.',
  },
  'placement-assistance': {
    icon: FiTarget,
    blurb: 'Referrals and interview drives with our network of hiring partners.',
  },
  /* its own lead in nav-sections is used when present */
  'career-opportunities': {
    icon: FiStar,
    blurb: 'Open roles at techcadd itself.',
  },
}

const STAGES = [
  {
    key: 'learn',
    name: 'Learn',
    line: 'Build the foundation',
    slugs: ['training-for-freshers', 'job-ready-skill-programs', 'career-guidance'],
  },
  {
    key: 'build',
    name: 'Build',
    line: 'Prove it with real work',
    slugs: ['internship-programs', 'industrial-projects', 'live-projects', 'resume-portfolio-building'],
  },
  {
    key: 'hired',
    name: 'Get hired',
    line: 'Land the role',
    slugs: ['interview-preparation', 'placement-assistance', 'career-opportunities'],
  },
]

/** pointer position on the card, for the border spotlight */
function spot(e: PointerEvent<HTMLAnchorElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export default function CareerJourney({ pages }: { pages: CareerPage[] }) {
  const root = useRef<HTMLElement>(null)
  const bySlug = new Map(pages.map((p) => [p.slug, p]))
  /* any page not placed in a stage joins the last one */
  const placed = new Set(STAGES.flatMap((s) => s.slugs))
  const stages = STAGES.map((s, i) => ({
    ...s,
    pages: [
      ...s.slugs.flatMap((slug) => bySlug.get(slug) ?? []),
      ...(i === STAGES.length - 1 ? pages.filter((p) => !placed.has(p.slug)) : []),
    ],
  }))

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const stageEls = gsap.utils.toArray<HTMLElement>('.cj-stage', el)
      if (prefersReducedMotion()) {
        stageEls.forEach((s) => s.classList.add('is-on'))
        return
      }
      el.classList.add('is-armed')

      gsap.fromTo(
        '.cj__fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.cj__track', start: 'top 65%', end: 'bottom 65%', scrub: 0.5 },
        },
      )
      stageEls.forEach((s) =>
        ScrollTrigger.create({ trigger: s, start: 'top 72%', once: true, onEnter: () => s.classList.add('is-on') }),
      )
    },
    { scope: root },
  )

  return (
    <section className="section cj" id="journey" ref={root}>
      <div className="cj__bg" aria-hidden />
      <div className="shell">
        <div className="cj__head">
          <span className="eyebrow">
            <span className="eyebrow__dot">✦</span>
            Your path
          </span>
          <h2 className="cj__title">
            Three stages from classroom <span className="cj__hl">to career</span>
          </h2>
          <p>Every service below is one step on the same path. Start wherever you are today.</p>
        </div>

        <div className="cj__track">
          <span className="cj__rail" aria-hidden>
            <span className="cj__fill" />
          </span>

          {stages.map((stage, si) => (
            <div className={`cj-stage cj-stage--${stage.key}`} key={stage.key}>
              <div className="cj-stage__mark">
                <span className="cj-stage__node" aria-hidden>
                  {String(si + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{stage.name}</h3>
                  <p>{stage.line}</p>
                </div>
              </div>

              <ul className="cj-stage__cards">
                {stage.pages.map((p, i) => {
                  const meta = META[p.slug]
                  const Icon = meta?.icon ?? FiStar
                  const blurb = p.lead ?? meta?.blurb ?? 'Find out more.'
                  return (
                    <li key={p.slug} style={{ '--i': i } as CSSProperties}>
                      <Link href={p.href} className="cj-card" onPointerMove={spot}>
                        <span className="cj-card__lock" aria-hidden>
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                        <span className="cj-card__icon" aria-hidden>
                          <Icon />
                        </span>
                        <h4>{p.label}</h4>
                        <p>{blurb}</p>
                        <span className="cj-card__go">
                          Explore <FiArrowUpRight aria-hidden />
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
