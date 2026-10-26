import Link from 'next/link'
import { FiArrowRight, FiBriefcase, FiCode, FiTool } from 'react-icons/fi'

import MissionVisual from '@/components/about/MissionVisual'

/* Mission & Vision hero: a light panel with the statement and three value lines
   on the left and a technology diagram on the right. The buttons jump to the
   #mission and #vision blocks further down this page (ids set in
   app/about/[slug]/page.tsx). The panel sits below the navbar (not under it). */

const VALUES = [
  { Icon: FiTool, title: 'Practical Learning', text: 'Learn through hands-on exercises, real-world projects, and practical experience.' },
  { Icon: FiCode, title: 'Industry-Relevant Skills', text: 'Develop skills aligned with modern technologies and evolving industry requirements.' },
  { Icon: FiBriefcase, title: 'Career-Focused Growth', text: 'Build technical confidence and prepare for opportunities in the digital economy.' },
]

export default function MissionVisionHero() {
  return (
    <section className="mvh" aria-labelledby="mvh-title">
      <div className="shell mvh__grid">
        <div className="mvh__copy">
          <p className="mvh__eyebrow mvh__in" style={{ ['--i' as string]: 0 }}>
            Mission &amp; Vision
          </p>
          <h1 id="mvh-title" className="mvh__title">
            <span className="mvh__in" style={{ ['--i' as string]: 1 }}>
              Engineering Tomorrow.
            </span>
            <span className="mvh__hl mvh__in" style={{ ['--i' as string]: 2 }}>
              Empowering Innovation.
            </span>
          </h1>
          <p className="mvh__lead mvh__in" style={{ ['--i' as string]: 3 }}>
            Our mission is to empower learners with industry-relevant technology skills, practical experience, and the
            confidence to build meaningful digital solutions. Our vision is to shape a future where technology, creativity, and
            innovation create new opportunities for everyone.
          </p>

          <ul className="mvh__values mvh__in" style={{ ['--i' as string]: 4 }}>
            {VALUES.map(({ Icon, title, text }) => (
              <li key={title}>
                <span className="mvh__vicon" aria-hidden>
                  <Icon />
                </span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mvh__actions mvh__in" style={{ ['--i' as string]: 5 }}>
            <Link href="#mission" className="mvh__btn mvh__btn--primary">
              Explore Our Mission <FiArrowRight aria-hidden />
            </Link>
            <Link href="#vision" className="mvh__btn mvh__btn--ghost">
              Discover Our Vision
            </Link>
          </div>
        </div>

        <div className="mvh__visual mvh__in" style={{ ['--i' as string]: 3 }}>
          <MissionVisual />
        </div>
      </div>
    </section>
  )
}
