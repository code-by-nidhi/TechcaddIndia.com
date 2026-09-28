import type { ReactNode } from 'react'
import SplitHeading from '@/components/fx/SplitHeading'

type Part = string | { text: string; className?: string }

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  icon = '✦',
}: {
  eyebrow: string
  title: Part[]
  lead?: ReactNode
  center?: boolean
  icon?: ReactNode
}) {
  return (
    <div className={`sh${center ? ' sh--center' : ''}`}>
      <span className="eyebrow" data-aos="fade-up">
        <span className="eyebrow__dot">{icon}</span>
        {eyebrow}
      </span>
      <SplitHeading parts={title} className="sh__title" />
      {lead && (
        <p className="sh__lead" data-aos="fade-up" data-aos-delay="150">
          {lead}
        </p>
      )}
    </div>
  )
}
