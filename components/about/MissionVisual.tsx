import type { IconType } from 'react-icons'
import { FiCloud, FiCode, FiCpu, FiShield } from 'react-icons/fi'

/* The Mission & Vision hero's visual: a stack of three translucent glass plates
   (a "technology stack") with a light rising from its top, and four discipline
   nodes joined to it by thin lines. Pure SVG + CSS.

   The SVG is a 100 x 90 viewBox and the stage keeps that aspect ratio, so the
   HTML nodes (positioned in %) and the line endpoints (viewBox units) agree.
   Nothing orbits or spins: the plates breathe a few pixels up and down, the
   nodes float a few pixels along a line, and a faint light crosses two of the
   lines now and then. Decorative, so hidden from assistive tech. */

const NODES: { key: string; label: string; Icon: IconType; x: number; y: number; dx: number; dy: number; dur: number; delay: number }[] = [
  { key: 'ai', label: 'AI', Icon: FiCpu, x: 16, y: 24, dx: 3, dy: 8, dur: 6.5, delay: -2 },
  { key: 'sw', label: 'Software Development', Icon: FiCode, x: 12, y: 70, dx: 4, dy: -7, dur: 7.5, delay: -4 },
  { key: 'cloud', label: 'Cloud Computing', Icon: FiCloud, x: 84, y: 22, dx: -3, dy: -8, dur: 7, delay: -1 },
  { key: 'sec', label: 'Cybersecurity', Icon: FiShield, x: 88, y: 68, dx: -4, dy: 7, dur: 6, delay: -3.5 },
]

const H = 90

/* a diamond plate centred on (50, y) */
const plate = (y: number) => `50,${y - 9} 72,${y} 50,${y + 9} 28,${y}`

export default function MissionVisual() {
  return (
    <div className="mvv" aria-hidden>
      <span className="mvv__aura" />

      <svg className="mvv__svg" viewBox={`0 0 100 ${H}`} focusable="false">
        <defs>
          <linearGradient id="mvv-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#356dff" />
            <stop offset="1" stopColor="#b6a4ff" />
          </linearGradient>
          <linearGradient id="mvv-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="1" stopColor="#356dff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="mvv-beam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#b6a4ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#356dff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* the light rising from the top of the stack */}
        <polygon className="mvv__beam" points="50,38 40,6 60,6" fill="url(#mvv-beam)" />

        {/* lines from the stack's corners out to each node */}
        <path className="mvv__line" style={{ ['--i' as string]: 0 }} d="M28 38 Q22 36 16 24" pathLength={1} />
        <path className="mvv__line" style={{ ['--i' as string]: 1 }} d="M28 62 Q20 64 12 70" pathLength={1} />
        <path className="mvv__line" style={{ ['--i' as string]: 2 }} d="M72 38 Q78 36 84 22" pathLength={1} />
        <path className="mvv__line" style={{ ['--i' as string]: 3 }} d="M72 62 Q80 64 88 68" pathLength={1} />

        {/* an occasional light along two of them */}
        <path className="mvv__pulse" style={{ ['--pd' as string]: '3s', ['--pt' as string]: '9s' }} d="M28 38 Q22 36 16 24" pathLength={100} />
        <path className="mvv__pulse" style={{ ['--pd' as string]: '7s', ['--pt' as string]: '11s' }} d="M72 62 Q80 64 88 68" pathLength={100} />

        {/* spine joining the plates */}
        <path className="mvv__spine" d="M50 38 L50 62" />

        {/* the stack: bottom to top, each plate breathes on its own */}
        {[62, 50, 38].map((y, i) => (
          <g key={y} className={`mvv__plate mvv__plate--${i}`}>
            <polygon className="mvv__face" points={plate(y)} />
            <polyline className="mvv__edge" points={`28,${y} 50,${y + 9} 72,${y}`} />
          </g>
        ))}

        {/* the core on the top plate */}
        <circle className="mvv__ring" cx="50" cy="38" r="5" />
        <circle className="mvv__core" cx="50" cy="38" r="2.1" />
      </svg>

      {NODES.map((n, i) => (
        <div
          key={n.key}
          className="mvv__node"
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
          <div className="mvv__float">
            <span className="mvv__icon">
              <n.Icon />
            </span>
            <span className="mvv__label">{n.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
