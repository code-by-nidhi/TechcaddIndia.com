import Image from 'next/image'
import Link from 'next/link'
import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiFileText,
  FiFolder,
  FiMonitor,
  FiPhone,
  FiUser,
  FiUsers,
  FiX,
} from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import DemoLink from '@/components/ui/DemoLink'
import { trackIcon } from '@/components/ui/trackIcons'
import {
  AUDIENCES,
  COMPARISON,
  FORMATS,
  INTERNSHIP_BADGES,
  INTERNSHIP_STATS,
  LEARNING_MODES,
  PLAN_LABELS,
  WHY_INTERNSHIP,
  internshipHref,
  type PlanLength,
  type Track,
} from '@/data/internships'
import { SITE } from '@/data/site'

/* Shared sections of the /internship-training hub and its detail pages. They
   reuse the franchise page's building blocks (pages.css `fr-*`) and the home
   page's why cards, so every inner page reads as one system. Each is one
   top-level <section>, so the white / tinted bands alternate by position. */

const num = (i: number) => String(i + 1).padStart(2, '0')

/** Hero buttons and badge pills, passed into PageHero. */
export function HeroExtras() {
  return (
    <>
      <div className="fr-hero__ctas">
        <DemoLink className="btn btn--gold">
          Book a free demo class <FiArrowRight aria-hidden />
        </DemoLink>
        <a href={SITE.phoneHref} className="btn btn--ghost">
          <FiPhone aria-hidden /> {SITE.phone}
        </a>
      </div>
      <strong className="fr-hero__tag">Learn from anywhere in India. Build real work. Get hired.</strong>
      <ul className="fr-hero__badges">
        {INTERNSHIP_BADGES.map((b) => (
          <li key={b}>
            <FiCheck aria-hidden />
            {b}
          </li>
        ))}
      </ul>
    </>
  )
}

/** Four photo tiles of headline numbers. */
export function StatTiles() {
  return (
    <section className="section in-stats">
      <div className="shell">
        <ul className="in-stats__tiles">
          {INTERNSHIP_STATS.map((s, i) => (
            <li className="fr-tile" key={s.label} data-aos="fade-up" data-aos-delay={i * 70}>
              <Image src={s.image} alt="" fill sizes="(max-width: 760px) 50vw, 320px" />
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Photo card linking to one track page. */
export function TrackCard({ track, delay = 0 }: { track: Track; delay?: number }) {
  const Icon = trackIcon(track.icon)
  return (
    <Link href={internshipHref(track.slug)} className="in-track" data-aos="fade-up" data-aos-delay={delay}>
      <div className="in-track__media">
        <Image src={track.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 420px" />
        <span className="in-track__icon">
          <Icon aria-hidden />
        </span>
        {track.badge && <em className="in-track__badge">{track.badge}</em>}
      </div>
      <div className="in-track__body">
        <h3>{track.title}</h3>
        <p>{track.blurb}</p>
        <span className="in-track__more">
          {track.fees ? `From ${track.fees[3].split(' ')[0]}` : `${track.courses?.length} courses`} · Explore track <FiArrowRight aria-hidden />
        </span>
      </div>
    </Link>
  )
}

/** The six training formats. `exclude` drops the current page's format. */
export function FormatGrid({ exclude }: { exclude?: string }) {
  const list = FORMATS.filter((f) => f.slug !== exclude)
  return (
    <section className="section" id="formats">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Training formats"
          title={[exclude ? 'Other training ' : 'Pick the format your ', { text: exclude ? 'formats' : 'college asks for', className: 'gradient-text' }]}
          lead="Every format runs on any of our 12 tracks — in a Punjab classroom or a live online batch from anywhere in India."
        />
        <ul className="fr-cards fr-cards--3 in-gap">
          {list.map((f, i) => (
            <li className="glass in-link-card" key={f.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
              <span className="fr-cards__num">
                {f.duration}
                {f.badge && <em className="in-pill">{f.badge}</em>}
              </span>
              <h3>
                <Link href={internshipHref(f.slug)}>{f.title}</Link>
              </h3>
              <p>{f.blurb}</p>
              <span className="in-arrow">
                View program <FiArrowRight aria-hidden />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** The 3 / 6 / 9 month plan cards on a track page. */
export function PlanCards({ track }: { track: Track }) {
  if (!track.fees) return null
  const fees = track.fees
  return (
    <section className="section" id="plans">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Choose your track"
          title={[`${track.title}, `, { text: 'three lengths', className: 'gradient-text' }]}
          lead="Each length continues where the last ended, so a shorter track costs you scope rather than depth — and you can extend later without repeating a module."
        />
        <div className="in-plans">
          {([3, 6, 9] as PlanLength[]).map((len, i) => (
            <div className={`in-plan${len === 6 ? ' is-featured' : ''}`} key={len} id={`plan-${len}`} data-aos="fade-up" data-aos-delay={i * 80}>
              {len === 6 && <em className="in-plan__flag">Most chosen</em>}
              <span className="fr-cards__num">{PLAN_LABELS[len].tier}</span>
              <h3>{PLAN_LABELS[len].name}</h3>
              <strong>{fees[len]}</strong>
              <span className="in-plan__note">Course fee · EMI available</span>
              <ul className="fr-checks">
                <li>
                  <FiCheck aria-hidden /> Live client project
                </li>
                <li>
                  <FiCheck aria-hidden /> Certificate + internship letter
                </li>
                <li>
                  <FiCheck aria-hidden /> {len === 3 ? 'Interview preparation' : len === 6 ? 'Placement drives' : 'Placement drives + capstone'}
                </li>
              </ul>
              <DemoLink className={`btn ${len === 6 ? 'btn--gold' : 'btn--ghost'}`}>
                Enquire now <FiArrowRight aria-hidden />
              </DemoLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Syllabus stages as navy photo cards, like the home page's How It Works. */
export function Syllabus({
  stages,
  title,
  lead,
  image,
}: {
  stages: { label?: string; title?: string; items: string[] }[]
  title: string
  lead: string
  image: string
}) {
  return (
    <section className="section" id="syllabus">
      <div className="shell">
        <SectionHeading center eyebrow="Syllabus" title={['What you will ', { text: 'actually build', className: 'gradient-text' }]} lead={lead} />
        <ol className={`in-stages in-stages--${Math.min(stages.length, 4)}`} aria-label={`${title} syllabus`}>
          {stages.map((s, i) => (
            <li key={i} data-aos="fade-up" data-aos-delay={i * 90}>
              <Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 440px" className="in-stages__bg" />
              <span className="in-stages__tag">{s.label ?? `Stage ${num(i)}`}</span>
              {s.title && <h3>{s.title}</h3>}
              <ul>
                {s.items.map((item) => (
                  <li key={item}>
                    <FiCheck aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="in-stages__big" aria-hidden>
                {i + 1}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** Tool chips. */
export function Toolchain({ title, tools }: { title: string; tools: string[] }) {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="The toolchain"
          title={['One course. ', { text: 'Real tools.', className: 'gradient-text' }]}
          lead={`Everything below is used on live ${title} client work — installed in our labs and set up on your machine for online batches.`}
        />
        <ul className="fr-chips in-chips" data-aos="fade-up">
          {tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Roles, salary and remote work beside the track's photo. */
export function Careers({ track }: { track: Track }) {
  if (!track.roles) return null
  return (
    <section className="section">
      <div className="shell fr-split">
        <div className="fr-photo" data-aos="fade-right">
          <Image src={track.image} alt="" fill sizes="(max-width: 960px) 100vw, 620px" />
        </div>
        <div>
          <SectionHeading
            eyebrow="Future scope"
            title={['Where this course ', { text: 'takes you', className: 'gradient-text' }]}
            lead={track.demand ?? 'Employers across India consistently ask for demonstrable project work over certificates alone.'}
          />
          <ul className="fr-checks fr-checks--2">
            {track.roles.map((r) => (
              <li key={r}>
                <FiCheck aria-hidden />
                {r}
              </li>
            ))}
          </ul>
          {track.salary && (
            <div className="in-salary" data-aos="fade-up">
              <strong>{track.salary}</strong>
              <span>
                a month for a fresher with a working portfolio — higher in metros like Bengaluru, Pune, Hyderabad and Gurugram.
              </span>
            </div>
          )}
          <p className="in-note">
            Your city costs you nothing on a remote brief. The course covers client handling, proposals and reporting so you
            can price your work for clients across India and abroad.
          </p>
        </div>
      </div>
    </section>
  )
}

/** Sub-courses of a grouped track (Full Stack, Basic Skills, Civil/Mechanical). */
export function SubCourses({ track }: { track: Track }) {
  if (!track.courses) return null
  return (
    <section className="section" id="courses">
      <div className="shell">
        <SectionHeading
          center
          eyebrow={`${track.courses.length} courses in this track`}
          title={['Choose your ', { text: 'course', className: 'gradient-text' }]}
          lead="Every course runs online across India and in our Punjab classrooms, with a certificate and live practical work."
        />
        <ul className={`fr-cards ${track.courses.length % 3 === 0 || track.courses.length > 4 ? 'fr-cards--3' : 'fr-cards--2'} in-gap`}>
          {track.courses.map((c, i) => (
            <li className="glass" key={c.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
              <span className="fr-cards__num">Course {num(i)}</span>
              <h3>{c.title}</h3>
              <p>{c.blurb}</p>
              {c.tools && (
                <ul className="fr-chips in-chips--sm">
                  {c.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              <DemoLink className="btn btn--ghost btn--sm in-card-btn">
                Enquire <FiArrowRight aria-hidden />
              </DemoLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Who can join. */
export function Audiences({ title }: { title: string }) {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Eligibility"
          title={['You don’t need a tech background. ', { text: 'You need to show up.', className: 'gradient-text' }]}
          lead={`${title} is built for people at six different starting points, from every state. What matters far more than your background is finishing what each module asks you to build.`}
        />
        <ul className="fr-cards fr-cards--3 in-gap">
          {AUDIENCES.map((a, i) => (
            <li className="glass" key={a.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
              <span className="fr-cards__num">{num(i)}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
        <div className="fr-center">
          <DemoLink className="btn btn--gold">
            Book a free demo class <FiArrowRight aria-hidden />
          </DemoLink>
        </div>
      </div>
    </section>
  )
}

/** What you leave with, beside a sample certificate. */
export function Certification({ title }: { title: string }) {
  const items = [
    { title: 'Industry Certificate', text: 'Recognised by employers across India', Icon: FiAward },
    { title: 'Internship Letter', text: 'Based on real client work, not a simulation', Icon: FiFileText },
    { title: 'Portfolio of Projects', text: 'Live work you can show in any interview', Icon: FiFolder },
    { title: 'Placement Support', text: 'CV review, mock interviews and hiring drives', Icon: FiBriefcase },
  ]
  return (
    <section className="section">
      <div className="shell fr-split">
        <div>
          <SectionHeading
            eyebrow="Certification"
            title={['Get certified in ', { text: title, className: 'gradient-text' }]}
            lead="Two certificates on completion — the course certificate and a separate capstone project certificate — plus a documented internship letter."
          />
          <ul className="in-certs">
            {items.map(({ title: t, text, Icon }, i) => (
              <li key={t} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="why__icon">
                  <Icon aria-hidden />
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <figure className="in-cert" data-aos="fade-left" aria-label="Sample techcadd course certificate">
          <div className="in-cert__paper">
            <Image src="/images/techcadd-logo-navy.png" alt="techcadd" width={150} height={40} className="in-cert__logo" />
            <span className="in-cert__kind">Certificate of Course Completion</span>
            <p>This is to certify that</p>
            <strong className="in-cert__name">Student Name</strong>
            <p>
              has successfully completed the professional training programme in <b>{title}</b>, including a live client project
              reviewed under industry mentorship.
            </p>
            <div className="in-cert__sign">
              <span>Course Director</span>
              <span>Centre Head</span>
            </div>
          </div>
          <figcaption>Sample certificate — yours carries a unique verification number.</figcaption>
        </figure>
      </div>
    </section>
  )
}

const WHY_ICONS = [FiUser, FiFolder, FiUsers, FiFileText, FiBriefcase]

/** Why techcadd — a bento grid led by a navy photo card with the headline number. */
export function WhyInternship() {
  /* the last reason ("25,000+ students since 2016") becomes the feature card */
  const feature = WHY_INTERNSHIP[WHY_INTERNSHIP.length - 1]
  const reasons = WHY_INTERNSHIP.slice(0, -1)
  const wide = reasons[reasons.length - 1]
  const WideIcon = WHY_ICONS[reasons.length - 1]

  return (
    <section className="section iwhy">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Why techcadd?"
          title={['The techcadd ', { text: 'difference', className: 'gradient-text' }]}
          lead="The brochure syllabus looks similar everywhere. What differs is who teaches, whether you ever touch real work, and whether anyone picks up the phone after you have paid."
        />

        <div className="iwhy__grid">
          <article className="iwhy__feature" data-aos="fade-up">
            <Image src="/images/course/classroom.webp" alt="" fill sizes="(max-width: 960px) 100vw, 640px" />
            <span className="iwhy__tag">Since 2016</span>
            <div className="iwhy__feature-body">
              <strong className="iwhy__big">25,000+</strong>
              <h3>Students trained, in class and online</h3>
              <p>{feature.text}</p>
              <ul className="iwhy__facts">
                <li>
                  <b>4.9★</b> Google rating
                </li>
                <li>
                  <b>500+</b> hiring partners
                </li>
                <li>
                  <b>12</b> tracks
                </li>
              </ul>
            </div>
          </article>

          {reasons.slice(0, -1).map((w, i) => {
            const Icon = WHY_ICONS[i]
            return (
              <article className="iwhy__card" key={w.title} data-aos="fade-up" data-aos-delay={(i % 2) * 90 + 60}>
                <div className="iwhy__card-top">
                  <span className="why__icon">
                    <Icon aria-hidden />
                  </span>
                  <span className="iwhy__num">{num(i)}</span>
                </div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            )
          })}

          <article className="iwhy__card iwhy__card--wide" data-aos="fade-up">
            <div className="iwhy__card-top">
              <span className="why__icon">
                <WideIcon aria-hidden />
              </span>
              <span className="iwhy__num">{num(reasons.length - 1)}</span>
            </div>
            <h3>{wide.title}</h3>
            <p>{wide.text}</p>
            <ul className="fr-chips iwhy__chips">
              {['Mock interviews', 'CV reviews', 'Portfolio prep', 'Hiring drives'].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>

          <article className="iwhy__cta" data-aos="fade-up" data-aos-delay="90">
            <h3>See the difference before you pay a rupee.</h3>
            <p>Sit in on a free demo class — online from anywhere in India, or at a Punjab centre.</p>
            <div className="iwhy__cta-actions">
              <DemoLink className="btn iwhy__btn-light">
                Book a free demo <FiArrowRight aria-hidden />
              </DemoLink>
              <a href={SITE.phoneHref} className="btn btn--ghost iwhy__btn-ghost">
                <FiPhone aria-hidden /> Call now
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/** techcadd vs other institutes. */
export function Comparison({ title }: { title: string }) {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Compare"
          title={['How techcadd ', { text: 'compares', className: 'gradient-text' }]}
          lead={`See how the ${title} program stacks up against what most institutes offer.`}
        />
        <div className="in-compare" data-aos="fade-up">
          <table>
            <caption className="sr-only">{title} at techcadd compared with what institutes commonly offer</caption>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col" className="is-us">
                  techcadd
                </th>
                <th scope="col">Other institutes</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((r) => (
                <tr key={r.feature}>
                  <th scope="row">{r.feature}</th>
                  <td className="is-us">
                    <FiCheck aria-hidden className="in-yes" />
                    {r.us}
                  </td>
                  <td>
                    <FiX aria-hidden className="in-no" />
                    {r.them}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

const MODE_ICONS = [FiUsers, FiMonitor, FiCalendar, FiUser]

/** Classroom / online / weekend / 1-on-1. */
export function LearningModes() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Learning modes"
          title={['Learn from ', { text: 'anywhere in India', className: 'gradient-text' }]}
          lead="Every mode covers the same syllabus, projects and placement support. Pick the schedule that fits your life."
        />
        <ul className="fr-cards fr-cards--4 in-gap">
          {LEARNING_MODES.map((m, i) => {
            const Icon = MODE_ICONS[i]
            return (
              <li className="glass" key={m.title} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="why__icon in-icon-sm">
                  <Icon aria-hidden />
                </span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </li>
            )
          })}
        </ul>
        <div className="fr-center in-ctas-center">
          <DemoLink className="btn btn--gold">
            Book a free demo class <FiArrowRight aria-hidden />
          </DemoLink>
          <Link href="/contact" className="btn btn--ghost">
            Talk to a counsellor
          </Link>
        </div>
      </div>
    </section>
  )
}
