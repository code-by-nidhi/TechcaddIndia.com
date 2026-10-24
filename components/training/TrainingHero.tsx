'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import {
  FiArrowDown,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiPenTool,
  FiShield,
  FiTerminal,
  FiTrendingUp,
} from 'react-icons/fi'

import SplitHeading from '@/components/fx/SplitHeading'
import DemoLink from '@/components/ui/DemoLink'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Training hero — copy on the left; on the right an indigo stage with a CSS
   3D scene: a tumbling glass cube, a ring of track tiles orbiting it, two
   orbit rails and a grid floor running toward the viewer. The stage tilts
   with the pointer through --px/--py (-1…1).
   ========================================================================== */

const CUBE = [FiCpu, FiCode, FiCloud, FiShield, FiDatabase, FiTerminal]

const TILES = [
  { icon: FiCpu, label: 'AI & ML' },
  { icon: FiCode, label: 'Full-Stack' },
  { icon: FiDatabase, label: 'Data Science' },
  { icon: FiCloud, label: 'Cloud' },
  { icon: FiShield, label: 'Cybersecurity' },
  { icon: FiGitBranch, label: 'DevOps' },
  { icon: FiPenTool, label: 'UI / UX' },
  { icon: FiTrendingUp, label: 'Marketing' },
]

export default function TrainingHero({ title, lead, programs }: { title: string; lead: string; programs: number }) {
  const hero = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = hero.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    const p = { x: 0, y: 0 }
    const toX = gsap.quickTo(p, 'x', { duration: 1, ease: 'power3.out', onUpdate: () => el.style.setProperty('--px', p.x.toFixed(3)) })
    const toY = gsap.quickTo(p, 'y', { duration: 1, ease: 'power3.out', onUpdate: () => el.style.setProperty('--py', p.y.toFixed(3)) })

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      toX(((e.clientX - r.left) / r.width) * 2 - 1)
      toY(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const leave = () => {
      toX(0)
      toY(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  /* the last three words ("for every stage") get the gradient line */
  const words = title.split(' ')
  const head = words.slice(0, -3).join(' ')
  const tail = words.slice(-3).join(' ')

  return (
    <section className="th-hero" ref={hero}>
      <div className="shell th-hero__grid">
        <div className="th-hero__copy">
          <nav aria-label="Breadcrumb" className="crumbs">
            <span>
              <Link href="/">Home</Link> /{' '}
            </span>
            <span>Training</span>
          </nav>

          <span className="eyebrow th-hero__eyebrow">
            <span className="eyebrow__dot">✦</span>
            Training
          </span>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            lines
            className="th-hero__title"
            parts={[head, { text: tail, className: 'th-hero__em' }]}
          />

          <p className="th-hero__lead">{lead}</p>

          <ul className="th-hero__stats">
            <li>
              <b>{programs}</b> programs
            </li>
            <li>
              <b>Live</b> online &amp; classroom
            </li>
            <li>
              <b>100%</b> project-based
            </li>
          </ul>

          <div className="th-hero__actions">
            <a href="#programs" className="btn">
              Explore programs <FiArrowDown aria-hidden />
            </a>
            <DemoLink className="btn btn--ghost">Book a free demo</DemoLink>
          </div>
        </div>

        <div className="th-scene" aria-hidden>
          <div className="th-scene__glow" />
          <div className="th-scene__floor" />
          <div className="th-stage">
            <div className="th-orbit th-orbit--a">
              <span />
            </div>
            <div className="th-orbit th-orbit--b">
              <span />
            </div>
            <div className="th-cube">
              {CUBE.map((Icon, i) => (
                <span className="th-cube__face" key={i}>
                  <Icon />
                </span>
              ))}
            </div>
            <div className="th-ring">
              {TILES.map(({ icon: Icon, label }, i) => (
                <span className="th-tile" key={label} style={{ '--i': i } as CSSProperties}>
                  <Icon /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
