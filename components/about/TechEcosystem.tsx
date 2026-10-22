import type { IconType } from 'react-icons'
import { FiBarChart2, FiCloud, FiCode, FiCpu, FiShield, FiZap } from 'react-icons/fi'

/* The About hero's visual: a glass "core" with six technology nodes joined to
   it by thin lines — an ecosystem, not a gallery.

   Pure SVG + CSS, no JavaScript. The SVG is a 100 x 96 viewBox and the stage
   keeps that aspect ratio, so node positions (percentages of the stage) and
   line endpoints (viewBox units) always agree. Nothing orbits: every node has
   a fixed place and only floats a few pixels back and forth along a line.
   The scene is decorative, so it is hidden from assistive tech; the six
   discipline names are already in the page copy. */

type NodeSpec = {
  key: string
  label: string
  Icon: IconType
  /** position in viewBox units */
  x: number
  y: number
  /** perceived depth: nearer nodes are slightly larger and stronger */
  depth: 'near' | 'mid' | 'far'
  /** float: sideways / vertical travel (px), period (s), phase (s) */
  dx: number
  dy: number
  dur: number
  delay: number
  /** dropped on small screens */
  extra?: boolean
}

const CORE = { x: 47, y: 50 }
const H = 96

const NODES: NodeSpec[] = [
  { key: 'innov', label: 'Innovation', Icon: FiZap, x: 40, y: 8, depth: 'far', dx: 3, dy: 7, dur: 7, delay: -2, extra: true },
  { key: 'ai', label: 'AI', Icon: FiCpu, x: 76, y: 18, depth: 'near', dx: 4, dy: -9, dur: 6, delay: -4 },
  { key: 'data', label: 'Data', Icon: FiBarChart2, x: 90, y: 50, depth: 'mid', dx: -3, dy: 8, dur: 7.5, delay: -1, extra: true },
  { key: 'sec', label: 'Security', Icon: FiShield, x: 68, y: 86, depth: 'far', dx: -4, dy: -7, dur: 5.5, delay: -3 },
  { key: 'cloud', label: 'Cloud', Icon: FiCloud, x: 17, y: 76, depth: 'near', dx: 5, dy: 10, dur: 6.5, delay: -5 },
  { key: 'sw', label: 'Software', Icon: FiCode, x: 11, y: 30, depth: 'mid', dx: 3, dy: -8, dur: 8, delay: -2.5 },
]

/* a gentle bend on every spoke so the network doesn't read as a starburst */
const BEND: Record<string, [number, number]> = {
  innov: [41, 30],
  ai: [66, 40],
  data: [70, 56],
  sec: [60, 72],
  cloud: [30, 68],
  sw: [26, 42],
}

const spoke = (n: NodeSpec) => `M${CORE.x} ${CORE.y} Q${BEND[n.key][0]} ${BEND[n.key][1]} ${n.x} ${n.y}`

/* faint links between neighbouring nodes */
const LINKS = [
  { key: 'innov-ai', d: 'M40 8 Q58 5 76 18', extra: true },
  { key: 'ai-data', d: 'M76 18 Q91 28 90 50', extra: true },
  { key: 'sw-cloud', d: 'M11 30 Q5 54 17 76', extra: false },
]

export default function TechEcosystem() {
  return (
    <div className="te" aria-hidden>
      <span className="te__aura" />

      <svg className="te__net" viewBox={`0 0 100 ${H}`} focusable="false">
        <defs>
          <linearGradient id="te-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#356dff" />
            <stop offset="1" stopColor="#7950b5" />
          </linearGradient>
        </defs>

        {LINKS.map((l) => (
          <path key={l.key} className={`te__link${l.extra ? ' te__x' : ''}`} d={l.d} />
        ))}

        {NODES.map((n, i) => (
          <path
            key={n.key}
            className={`te__spoke${n.extra ? ' te__x' : ''}`}
            d={spoke(n)}
            pathLength={1}
            style={{ ['--i' as string]: i }}
          />
        ))}

        {/* a faint light travelling along a few of the lines, now and then */}
        <path className="te__pulse" d={spoke(NODES[1])} pathLength={100} style={{ ['--pd' as string]: '1.8s', ['--pt' as string]: '9s' }} />
        <path className="te__pulse" d={spoke(NODES[4])} pathLength={100} style={{ ['--pd' as string]: '4.6s', ['--pt' as string]: '11s' }} />
        <path className="te__pulse te__x" d={LINKS[1].d} pathLength={100} style={{ ['--pd' as string]: '7.2s', ['--pt' as string]: '10s' }} />
        <path className="te__pulse" d={spoke(NODES[5])} pathLength={100} style={{ ['--pd' as string]: '10s', ['--pt' as string]: '12s' }} />
      </svg>

      {/* the core: a glass sphere with a small isometric lattice inside */}
      <div className="te__core" style={{ left: `${CORE.x}%`, top: `${(CORE.y / H) * 100}%` }}>
        <span className="te__ring te__ring--a" />
        <span className="te__ring te__ring--b" />
        <div className="te__sphere">
          <svg viewBox="0 0 60 60" focusable="false">
            <polygon className="te__hex" points="30,8 49,19 49,41 30,52 11,41 11,19" />
            <path className="te__cube" d="M30 30 L30 8 M30 30 L49 41 M30 30 L11 41" />
            <path className="te__cube te__cube--soft" d="M11 19 L30 30 L49 19" />
            {(
              [
                [30, 8],
                [49, 19],
                [49, 41],
                [30, 52],
                [11, 41],
                [11, 19],
              ] as const
            ).map(([x, y], i) => (
              <circle key={i} className={`te__vertex te__vertex--${i % 3}`} cx={x} cy={y} r="2" />
            ))}
            <circle className="te__heart" cx="30" cy="30" r="4.2" />
          </svg>
        </div>
      </div>

      {NODES.map((n, i) => (
        <div
          key={n.key}
          className={`te__node te__node--${n.depth}${n.extra ? ' te__x' : ''}`}
          style={{
            left: `${n.x}%`,
            top: `${(n.y / H) * 100}%`,
            ['--i' as string]: i,
            ['--dx' as string]: `${n.dx}px`,
            ['--dy' as string]: `${n.dy}px`,
            ['--dur' as string]: `${n.dur}s`,
            ['--delay' as string]: `${n.delay}s`,
          }}
        >
          <div className="te__float">
            <span className="te__icon">
              <n.Icon />
            </span>
            <span className="te__label">{n.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
