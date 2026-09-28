import Link from 'next/link'
import type { ReactNode } from 'react'

import SplitHeading from '@/components/fx/SplitHeading'

/** Navy banner used at the top of every inner page. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs = [],
  children,
}: {
  eyebrow: string
  title: string
  lead?: string
  crumbs?: { label: string; href?: string }[]
  children?: ReactNode
}) {
  const trail = [{ label: 'Home', href: '/' }, ...crumbs]
  return (
    <section className="page-hero">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="crumbs">
          {trail.map((c, i) => (
            <span key={c.label}>
              {c.href && i < trail.length - 1 ? <Link href={c.href}>{c.label}</Link> : c.label}
              {i < trail.length - 1 && ' / '}
            </span>
          ))}
        </nav>
        <span className="eyebrow" style={{ marginTop: '1.4rem' }}>
          <span className="eyebrow__dot">✦</span>
          {eyebrow}
        </span>
        <SplitHeading as="h1" immediate parts={[title]} />
        {lead && <p>{lead}</p>}
        {children}
      </div>
    </section>
  )
}
