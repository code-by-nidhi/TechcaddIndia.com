'use client'

import { useEffect, useState } from 'react'
import type { IconType } from 'react-icons'
import { FiCloud, FiCode, FiCpu, FiShield } from 'react-icons/fi'

/* The Mission & Vision visual: a code editor that writes a small program, runs
   it in a terminal, and shows the result as a finished page beside it.

   The sequence plays once per cycle (14 seconds). Each cycle is a re-mount of
   the window (the `cycle` key), so every CSS animation starts together and the
   window fades out and back in between cycles — no element can drift out of
   step. With reduced motion, or before the page is interactive, the finished
   state is shown and no timer runs. The text is a decorative sample, hidden
   from assistive tech. */

type Tok = [text: string, kind: 'kw' | 'fn' | 'str' | 'pun' | 'txt' | 'var']

const CODE: Tok[][] = [
  [['import', 'kw'], [' { learn, build } ', 'txt'], ['from', 'kw'], [" '@techcadd'", 'str']],
  [],
  [['export default function', 'kw'], [' Career', 'fn'], ['() {', 'pun']],
  [['  const', 'kw'], [' skills', 'var'], [' = ', 'pun'], ['learn', 'fn'], ["(['React', 'Python', 'AI'])", 'txt']],
  [['  const', 'kw'], [' project', 'var'], [' = ', 'pun'], ['build', 'fn'], ['(skills)', 'txt']],
  [['  return', 'kw'], [' <', 'pun'], ['Launch', 'fn'], [' project', 'var'], ['={project} />', 'pun']],
  [['}', 'pun']],
]

const len = (l: Tok[]) => l.reduce((n, [t]) => n + t.length, 0)

const CHIPS: { label: string; Icon: IconType }[] = [
  { label: 'AI & Data', Icon: FiCpu },
  { label: 'Software', Icon: FiCode },
  { label: 'Cloud', Icon: FiCloud },
  { label: 'Security', Icon: FiShield },
]

const CYCLE_MS = 14000

export default function MissionVisual() {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => {
      if (!document.hidden) setCycle((c) => c + 1)
    }, CYCLE_MS)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="mvv" aria-hidden>
      <span className="mvv__aura" />

      <div className="mvv__stage">
        <div key={cycle} className="mvv__win">
          <div className="mvv__bar">
            <i />
            <i />
            <i />
            <span className="mvv__tab">Career.tsx</span>
            <span className="mvv__tab mvv__tab--dim">learn.ts</span>
          </div>

          <div className="mvv__editor">
            <ol className="mvv__nums">
              {CODE.map((_, i) => (
                <li key={i}>{i + 1}</li>
              ))}
            </ol>
            <div className="mvv__code">
              {CODE.map((line, i) => (
                <div key={i} className="mvv__row">
                  {line.length > 0 && (
                    <span
                      className="mvv__line"
                      style={{ ['--n' as string]: len(line), ['--d' as string]: `${0.5 + i * 0.75}s` }}
                    >
                      {line.map(([t, k], j) => (
                        <span key={j} className={`t-${k}`}>
                          {t}
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              ))}
              <span className="mvv__caret" />
            </div>
          </div>

          <div className="mvv__term">
            <p className="mvv__tl mvv__tl--cmd" style={{ ['--n' as string]: 13, ['--d' as string]: '6.2s' }}>
              <span className="t-pun">$</span> npm run dev
            </p>
            <p className="mvv__tl mvv__tl--ok" style={{ ['--d' as string]: '7.6s' }}>
              <span className="t-ok">✓</span> Compiled successfully
            </p>
            <p className="mvv__tl mvv__tl--ok" style={{ ['--d' as string]: '8.2s' }}>
              <span className="t-ok">✓</span> Ready on localhost:3000
            </p>
          </div>

          <div className="mvv__status">
            <span>
              <b />
              main
            </span>
            <span>TypeScript React</span>
            <span>UTF-8</span>
          </div>
        </div>

        {/* the result: a small page that builds itself once the build is ready */}
        <div key={`p${cycle}`} className="mvv__result">
          <div className="mvv__rbar">
            <i />
            <i />
            <i />
          </div>
          <div className="mvv__rbody">
            <span className="mvv__rhead">Launch ready</span>
            <span className="mvv__rsub">Your first project, live.</span>
            <span className="mvv__pills">
              <em>React</em>
              <em>Python</em>
              <em>AI</em>
            </span>
          </div>
        </div>
      </div>

      <ul className="mvv__chips">
        {CHIPS.map(({ label, Icon }) => (
          <li key={label} className="mvv__chipitem">
            <Icon />
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
