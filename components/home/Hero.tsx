'use client'

import { useRef, type CSSProperties } from 'react'
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
} from 'react-icons/si'

import SplitHeading from '@/components/fx/SplitHeading'
import Magnetic from '@/components/fx/Magnetic'
import usePauseOffscreen from '@/components/fx/usePauseOffscreen'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

/* ==========================================================================
   Hero — an orbit scene over centred copy.

   The techcadd "t." glows at the core; three rings of technology logos turn
   slowly around it (alternate rings in opposite directions), each ring
   glowing softly. The heading, lead and CTAs sit centred
   below, with the lower rings fading out behind them.

   Each logo sits on its ring at a fixed angle; the ring's inner layer spins
   and the logo counter-spins at the same rate, so logos travel the circle but
   stay upright. The ring itself stays unspun, so GSAP can scale it in.
   ========================================================================== */

type Logo = { Icon: IconType; color: string; name: string }

/* radius (×--u), seconds per turn, chip size, and the logos spaced evenly */
const RINGS: { r: number; dur: number; size: number; logos: Logo[] }[] = [
  {
    r: 150,
    dur: 50,
    size: 40,
    logos: [
      { Icon: SiPython, color: '#3776AB', name: 'Python' },
      { Icon: SiReact, color: '#1FB8DB', name: 'React' },
      { Icon: SiOpenjdk, color: '#E76F00', name: 'Java' },
      { Icon: SiJavascript, color: '#E8B600', name: 'JavaScript' },
    ],
  },
  {
    r: 270,
    dur: 80,
    size: 36,
    logos: [
      { Icon: SiTensorflow, color: '#FF6F00', name: 'TensorFlow' },
      { Icon: SiNodedotjs, color: '#5FA04E', name: 'Node.js' },
      { Icon: SiDocker, color: '#2496ED', name: 'Docker' },
      { Icon: SiTypescript, color: '#3178C6', name: 'TypeScript' },
      { Icon: SiFigma, color: '#F24E1E', name: 'Figma' },
      { Icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
    ],
  },
  {
    r: 400,
    dur: 120,
    size: 32,
    logos: [
      { Icon: SiGit, color: '#F05032', name: 'Git' },
      { Icon: SiKubernetes, color: '#326CE5', name: 'Kubernetes' },
      { Icon: SiPytorch, color: '#EE4C2C', name: 'PyTorch' },
      { Icon: SiCplusplus, color: '#00599C', name: 'C++' },
      { Icon: SiGooglecloud, color: '#4285F4', name: 'Google Cloud' },
      { Icon: SiMysql, color: '#4479A1', name: 'MySQL' },
      { Icon: SiDjango, color: '#0C8A5B', name: 'Django' },
      { Icon: SiFlutter, color: '#02569B', name: 'Flutter' },
    ],
  },
]

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  usePauseOffscreen(root)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1 } })
      tl.from('.orbit__core', { scale: 0.4, opacity: 0, duration: 1.2, ease: 'back.out(1.7)' }, 0.1)
        .from('.orbit__ring', { scale: 0.6, opacity: 0, stagger: 0.12, duration: 1.4 }, 0.2)
        .from('.hero__lead', { y: 20, opacity: 0 }, 0.6)
        .from('.hero__ctas > *', { y: 20, opacity: 0, stagger: 0.1 }, 0.7)
    },
    { scope: root }
  )

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden />

      <div className="orbit" aria-hidden>

        <div className="orbit__center">
          {RINGS.map((ring, ri) => (
            <div
              key={ri}
              className={`orbit__ring${ri % 2 ? ' orbit__ring--rev' : ''}`}
              style={{ '--r': ring.r, '--dur': `${ring.dur}s`, '--size': `${ring.size}px` } as CSSProperties}
            >
              <div className="orbit__spin">
                {ring.logos.map((logo, li) => (
                  <span
                    key={logo.name}
                    className="orbit__slot"
                    style={{ '--deg': `${(360 / ring.logos.length) * li + ri * 25}deg` } as CSSProperties}
                  >
                    <span className="orbit__chip" title={logo.name}>
                      <logo.Icon style={{ color: logo.color }} />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="orbit__core">
            <span className="orbit__logo" />
          </div>
        </div>
      </div>

      <div className="shell hero__copy">
        <SplitHeading
          as="h1"
          immediate
          delay={0.3}
          lines
          className="hero__title"
          parts={['Learn the tech', { text: 'India runs on.', className: 'gold-text' }]}
        />

        <p className="hero__lead">
          AI, cloud and full-stack courses built around the tools businesses actually use — in a techcadd centre or
          a live online batch from anywhere in India.
        </p>

        <div className="hero__ctas">
          <Magnetic strength={0.2}>
            <Link href="/courses" className="hero__cta">
              Explore courses <FiArrowRight aria-hidden />
            </Link>
          </Magnetic>
          {/* wrapped too, so GSAP animates the wrapper rather than the .btn,
              whose own transform transition would fight the entrance tween */}
          <Magnetic strength={0.2}>
            <Link href="/contact#demo" className="btn btn--ghost">
              <FiPlayCircle aria-hidden /> Book a free demo
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
