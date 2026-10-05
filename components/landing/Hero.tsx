import type { CSSProperties } from 'react'
import Link from 'next/link'
import { Instrument_Serif } from 'next/font/google'
import type { IconType } from 'react-icons'
import { FiArrowRight, FiCloud, FiCode, FiCpu, FiPlay, FiPlus, FiStar, FiTrendingUp } from 'react-icons/fi'
import {
  SiDocker,
  SiFigma,
  SiGit,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiPytorch,
  SiReact,
  SiTensorflow,
} from 'react-icons/si'

import DemoLink from '@/components/ui/DemoLink'
import SplitHeading from '@/components/fx/SplitHeading'
import { CENTRES, SITE, STATS, TESTIMONIALS } from '@/data/site'

/* ==========================================================================
   Hero — an editorial opener on the navy band: a serif headline (second line
   in gold italics) over centred copy and two pill CTAs, then glass course
   chips over two rings of technology logos that turn slowly around a glowing
   core on the bottom edge. Two tilted cards float at the sides on flowing
   arcs, a ring of text turns in the top corner, sparks twinkle behind it all,
   and a ticker of the same technologies closes the band.

   Each logo sits on its ring at a fixed angle; the ring spins and the logo
   counter-spins at the same rate, so logos travel the circle but stay upright.

   Everything around the copy is decorative — the same courses, numbers and
   centres are spelled out further down the page — so it is hidden from
   assistive tech.
   ========================================================================== */

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' })

const CHIPS: { key: string; Icon: IconType; title: string; text: string }[] = [
  { key: 'ai', Icon: FiCpu, title: 'AI', text: 'Models that ship.' },
  { key: 'stack', Icon: FiCode, title: 'Full-Stack', text: 'Frontend to deployment.' },
  { key: 'cloud', Icon: FiCloud, title: 'Cloud', text: 'Build, deploy, scale.' },
]

type Logo = { Icon: IconType; color: string; name: string }

const LOGOS: Logo[] = [
  { Icon: SiPython, color: '#3776AB', name: 'Python' },
  { Icon: SiReact, color: '#1FB8DB', name: 'React' },
  { Icon: SiTensorflow, color: '#FF6F00', name: 'TensorFlow' },
  { Icon: SiNodedotjs, color: '#5FA04E', name: 'Node.js' },
  { Icon: SiDocker, color: '#2496ED', name: 'Docker' },
  { Icon: SiJavascript, color: '#E8B600', name: 'JavaScript' },
  { Icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
  { Icon: SiKubernetes, color: '#326CE5', name: 'Kubernetes' },
  { Icon: SiPytorch, color: '#EE4C2C', name: 'PyTorch' },
  { Icon: SiGit, color: '#F05032', name: 'Git' },
  { Icon: SiMysql, color: '#4479A1', name: 'MySQL' },
  { Icon: SiFigma, color: '#F24E1E', name: 'Figma' },
]

/* radius (% of the stage width), seconds per turn, and the logos spaced evenly */
const ORBITS = [
  { r: 30, dur: 70, logos: LOGOS.slice(0, 5) },
  { r: 50, dur: 110, logos: LOGOS.slice(5) },
]

/* twinkling sparks: left %, top %, size px, delay s */
const STARS = [
  [7, 16, 10, 0],
  [21, 68, 7, 1.4],
  [31, 22, 6, 2.6],
  [69, 14, 8, 0.8],
  [79, 58, 6, 2],
  [93, 34, 9, 3.2],
  [58, 6, 5, 1.1],
  [14, 44, 5, 3.6],
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')

const trained = STATS[0]

function Faces({ from, count }: { from: number; count: number }) {
  return (
    <span className="sq-hero__faces">
      {TESTIMONIALS.slice(from, from + count).map((t) => (
        <span key={t.name}>{initials(t.name)}</span>
      ))}
      <span className="sq-hero__faces-more">
        <FiPlus />
      </span>
    </span>
  )
}

/* four-point star: the twinkles, the centre of the turning badge and the sign-off mark */
function Spark({ style }: { style?: CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c.9 7.2 4.8 11.1 12 12-7.2.9-11.1 4.800-12 12-.9-7.200-4.800-11.100-12-12 7.200-.9 11.100-4.800 12-12z" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className={`sq-hero section--navy ${serif.variable}`}>
      <div className="sq-hero__stars" aria-hidden>
        {STARS.map(([x, y, size, delay], i) => (
          <Spark key={i} style={{ left: `${x}%`, top: `${y}%`, width: size, animationDelay: `${delay}s` }} />
        ))}
      </div>

      <div className="shell sq-hero__inner">
        <div className="sq-hero__copy">
          <p className="sq-hero__eyebrow">
            <FiStar aria-hidden />
            <strong>{SITE.rating.score}</strong> rated by {SITE.rating.reviews} learners
          </p>

          <SplitHeading
            as="h1"
            immediate
            delay={0.1}
            lines
            className="sq-hero__title"
            parts={['Learn the tech', { text: 'India runs on.', className: 'sq-hero__em gold-text' }]}
          />

          <p className="sq-hero__lead">
            AI, cloud and full-stack courses built around the tools businesses actually use — in a techcadd centre or
            a live online batch from anywhere in India.
          </p>

          <div className="sq-hero__ctas">
            <Link href="/courses" className="btn btn--gold sq-hero__btn">
              Explore courses <FiArrowRight aria-hidden />
            </Link>
            <DemoLink className="btn btn--ghost sq-hero__btn">
              <span className="sq-hero__play" aria-hidden>
                <FiPlay />
              </span>
              Book a free demo
            </DemoLink>
          </div>
        </div>

        <div className="sq-hero__stage" aria-hidden>
          {ORBITS.map((orbit, oi) => (
            <div
              key={oi}
              className={`sq-hero__orbit${oi % 2 ? ' sq-hero__orbit--rev' : ''}`}
              style={{ '--r': orbit.r, '--dur': `${orbit.dur}s` } as CSSProperties}
            >
              {orbit.logos.map((logo, li) => (
                <span
                  key={logo.name}
                  className="sq-hero__slot"
                  style={{ '--deg': `${(360 / orbit.logos.length) * li + oi * 20}deg` } as CSSProperties}
                >
                  <span className="sq-hero__logo">
                    <logo.Icon style={{ color: logo.color }} />
                  </span>
                </span>
              ))}
            </div>
          ))}
          <span className="sq-hero__core" />

          {CHIPS.map(({ key, Icon, title, text }, i) => (
            <div className={`sq-hero__chip sq-hero__chip--${key}`} style={{ '--i': i } as CSSProperties} key={key}>
              <span className="sq-hero__chip-icon">
                <Icon />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{text}</small>
              </span>
            </div>
          ))}
        </div>

        <div className="sq-hero__decor" aria-hidden>
          <svg className="sq-hero__arcs" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M8 52 C 8 70, 22 76, 35 68" />
            <path d="M92 62 C 92 78, 78 82, 66 73" />
          </svg>

          <div className="sq-hero__float sq-hero__float--l">
            <span className="sq-hero__float-icon">
              <FiTrendingUp />
            </span>
            <strong>Turn skills into careers.</strong>
            <small>Learn, build and get placed.</small>
          </div>

          <div className="sq-hero__float sq-hero__float--r">
            <Faces from={3} count={3} />
            <strong>Learn anywhere, anytime.</strong>
            <small>{CENTRES.length} centres and live online batches.</small>
          </div>

          <div className="sq-hero__badge">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="sq-hero-ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text>
                <textPath href="#sq-hero-ring" textLength="232">
                  LEARN · BUILD · GET HIRED ·
                </textPath>
              </text>
            </svg>
            <Spark />
          </div>

          <p className="sq-hero__tag">
            <Spark />
            <span>
              Less theory.
              <br />
              More building.
            </span>
          </p>
        </div>

        <div className="sq-hero__trust">
          <p>
            {trained.value.toLocaleString('en-IN')}
            {trained.suffix} engineers trained across India.
          </p>
          <span aria-hidden>
            <Faces from={0} count={4} />
          </span>
        </div>
      </div>

      <div className="sq-hero__ticker" aria-hidden>
        <div className="sq-hero__ticker-track">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span key={i}>
              <logo.Icon />
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
