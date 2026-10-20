'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import { FiArrowRight, FiChevronDown, FiCloud, FiCode, FiCpu, FiPenTool, FiShield, FiTool } from 'react-icons/fi'

import { COURSES_MENU, COURSES_MENU_FOOTER, type CourseMenuCategory } from '@/data/courses-menu'

const ICONS: Record<CourseMenuCategory['icon'], IconType> = {
  ai: FiCpu,
  code: FiCode,
  cloud: FiCloud,
  shield: FiShield,
  design: FiPenTool,
  engineering: FiTool,
}

export const COURSES_PANEL_ID = 'courses-mega'

/** Desktop panel. Open state, hover and outside-click live in Navbar. */
export function CoursesPanel({
  open,
  onHold,
  onNavigate,
}: {
  open: boolean
  onHold: (hold: boolean) => void
  onNavigate: () => void
}) {
  return (
    <div
      id={COURSES_PANEL_ID}
      role="region"
      aria-label="Courses"
      className={`mega cmega${open ? ' is-open' : ''}`}
      onMouseEnter={() => onHold(true)}
      onMouseLeave={() => onHold(false)}
    >
      {/* data-lenis-prevent: Lenis smooth scroll otherwise swallows the wheel and scrolls the page */}
      <div className="cmega__grid" data-lenis-prevent>
        {COURSES_MENU.map((cat) => {
          const Icon = ICONS[cat.icon]
          return (
            <section className="cmega__cat" key={cat.id} aria-labelledby={`cmega-${cat.id}`}>
              <h3 className="cmega__title" id={`cmega-${cat.id}`}>
                <Icon aria-hidden />
                {cat.title}
              </h3>
              <ul>
                {cat.courses.map((c) => (
                  <li key={c.label}>
                    <Link className="cmega__link" href={c.href} onClick={onNavigate}>
                      <span>{c.label}</span>
                      <FiArrowRight aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
      <div className="cmega__foot">
        {COURSES_MENU_FOOTER.map((f) => (
          <Link key={f.label} href={f.href} onClick={onNavigate}>
            {f.label} <FiArrowRight aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  )
}

/** Mobile drawer: Courses accordion, each category an accordion inside it. */
export function CoursesDrawer({
  open,
  drawerOpen,
  style,
  onToggle,
  onNavigate,
}: {
  open: boolean
  drawerOpen: boolean
  style: React.CSSProperties
  onToggle: () => void
  onNavigate: () => void
}) {
  const [cat, setCat] = useState<string | null>(null)
  const tab = drawerOpen ? 0 : -1

  return (
    <div>
      <button
        type="button"
        className={`drawer__link${open ? ' is-open' : ''}`}
        style={style}
        tabIndex={tab}
        aria-expanded={open}
        aria-controls="courses-drawer"
        onClick={onToggle}
      >
        Courses <FiChevronDown aria-hidden />
      </button>
      {open && (
        <div className="drawer__sub dcourses" id="courses-drawer">
          {COURSES_MENU.map((c) => {
            const Icon = ICONS[c.icon]
            const isOpen = cat === c.id
            return (
              <div key={c.id}>
                <button
                  type="button"
                  className={`dcourses__head${isOpen ? ' is-open' : ''}`}
                  aria-expanded={isOpen}
                  aria-controls={`dcourses-${c.id}`}
                  onClick={() => setCat(isOpen ? null : c.id)}
                >
                  <Icon aria-hidden />
                  <span>{c.title}</span>
                  <FiChevronDown aria-hidden />
                </button>
                {isOpen && (
                  <div className="dcourses__list" id={`dcourses-${c.id}`}>
                    {c.courses.map((l) => (
                      <Link key={l.label} href={l.href} onClick={onNavigate}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {COURSES_MENU_FOOTER.map((f, i) => (
            <Link key={f.label} href={f.href} className={i === 0 ? 'drawer__sub-all' : 'dcourses__more'} onClick={onNavigate}>
              {f.label} <FiArrowRight aria-hidden />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
