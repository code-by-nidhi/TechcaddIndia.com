import Image from 'next/image'
import { FiArrowRight, FiCheck, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import SplitHeading from '@/components/fx/SplitHeading'
import {
  FRANCHISE_ABOUT,
  FRANCHISE_CITY,
  FRANCHISE_CONTACT,
  FRANCHISE_FOUNDER,
  FRANCHISE_GALLERY,
  FRANCHISE_PARTNERS,
  FRANCHISE_STEPS,
  FRANCHISE_TEAM,
} from '@/data/franchise'

/* The static sections of the franchise page, in page order. Each is one
   top-level <section>, so the navy / white bands alternate by position. */

const num = (i: number) => String(i + 1).padStart(2, '0')

/** About techcadd: the story, mission and vision, the values, and what students get. */
export function FranchiseAbout() {
  const { advantage } = FRANCHISE_ABOUT
  return (
    <section className="section fr-about" id="about">
      <div className="shell">
        <div className="fr-split">
          <div>
            <SectionHeading eyebrow="About techcadd" title={['More Than an Institute.', { text: 'A Movement Towards Digital Excellence.', className: 'gradient-text' }]} />
            <div className="fr-prose">
              {FRANCHISE_ABOUT.lead.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                Every program is designed around one objective: <strong>{FRANCHISE_ABOUT.objective}</strong>
              </p>
              <p>{FRANCHISE_ABOUT.close}</p>
            </div>
          </div>
          <ul className="fr-purpose">
            {FRANCHISE_ABOUT.purpose.map((p, i) => (
              <li className="section--navy" key={p.title} data-aos="fade-left" data-aos-delay={i * 90}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="fr-sub">Our Values</h3>
        <ul className="fr-cards fr-cards--3">
          {FRANCHISE_ABOUT.values.map((v, i) => (
            <li className="glass" key={v.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
              <span className="fr-cards__num">{num(i)}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>

        <div className="fr-split fr-advantage">
          <div className="fr-photo" data-aos="fade-right">
            <Image src={advantage.image} alt="A trainer helping students in a techcadd computer lab" fill sizes="(max-width: 960px) 100vw, 620px" />
          </div>
          <div>
            <SectionHeading eyebrow="The techcadd Advantage" title={['Why Students Choose', { text: 'techcadd', className: 'gradient-text' }]} lead={advantage.lead} />
            <ul className="fr-checks fr-checks--2">
              {advantage.items.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/** The ten steps from enquiry to a running centre. */
export function FranchiseRoadmap() {
  return (
    <section className="section fr-roadmap" id="journey">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Franchise Journey"
          title={['Your Roadmap to', { text: 'Success', className: 'gold-text' }]}
          lead="A simple, transparent 10-step journey — guided by our team at every step."
        />
        <ol className="fr-steps">
          {FRANCHISE_STEPS.map((s, i) => (
            <li className="glass" key={s.title} data-aos="fade-up" data-aos-delay={(i % 5) * 60}>
              <span className="fr-steps__num">Step {num(i)}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="fr-center">
          <a href="#apply" className="btn btn--gold">
            Start Your Application <FiArrowRight aria-hidden />
          </a>
        </p>
      </div>
    </section>
  )
}

/** Who a franchise suits. */
export function FranchisePartners() {
  return (
    <section className="section fr-partners" id="partners">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Who Can Partner With Us?"
          title={["You Don't Need Previous Experience. You Need", { text: 'Passion.', className: 'gradient-text' }]}
          lead={FRANCHISE_PARTNERS.lead}
        />
        <ul className="fr-cards fr-cards--3">
          {FRANCHISE_PARTNERS.who.map((w, i) => (
            <li className="glass" key={w.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
              <span className="fr-cards__num">{num(i)}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
        <p className="fr-center">
          <a href="#apply" className="btn">
            Apply Now <FiArrowRight aria-hidden />
          </a>
        </p>
      </div>
    </section>
  )
}

/** Seminar and workshop photos on two rails running in opposite directions. */
export function FranchiseGallery() {
  const { images } = FRANCHISE_GALLERY
  const rails = [images.slice(0, 9), images.slice(9)]
  return (
    <section className="section fr-gallery" id="events">
      <div className="shell">
        <SectionHeading center eyebrow="Seminars & Workshops" title={['Empowering Through', { text: 'Events & Training', className: 'gold-text' }]} lead={FRANCHISE_GALLERY.lead} />
      </div>
      {/* the photos are doubled for a seamless loop; the copies are decorative */}
      {rails.map((rail, r) => (
        <div className={`fr-gallery__rail${r ? ' fr-gallery__rail--rev' : ''}`} key={r}>
          <ul>
            {[...rail, ...rail].map((src, i) => (
              <li key={i} aria-hidden={i >= rail.length || undefined}>
                <Image src={src} alt={i < rail.length ? `techcadd seminar ${r * 9 + i + 1}` : ''} fill sizes="(max-width: 700px) 70vw, 380px" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

/** The leadership team. */
export function FranchiseTeam() {
  return (
    <section className="section fr-team" id="team">
      <div className="shell">
        <SectionHeading center eyebrow="Executive Leadership" title={['The People Behind', { text: 'techcadd', className: 'gradient-text' }]} lead={FRANCHISE_TEAM.lead} />
        <ul className="fr-team__grid">
          {FRANCHISE_TEAM.people.map((p, i) => (
            <li key={p.name} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
              <div className="fr-team__photo">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 700px) 50vw, 300px" />
              </div>
              <h3>{p.name}</h3>
              <p>{p.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** The founder's message, and the impact a centre has. */
export function FranchiseFounder() {
  const { impact } = FRANCHISE_FOUNDER
  return (
    <section className="section fr-founder">
      <div className="shell">
        <figure className="fr-founder__quote">
          <div className="fr-founder__photo" data-aos="zoom-in">
            <Image src={FRANCHISE_FOUNDER.image} alt="" fill sizes="220px" />
          </div>
          <div>
            <span className="eyebrow">
              <span className="eyebrow__dot">✦</span>
              Founder&apos;s Message
            </span>
            <SplitHeading parts={[FRANCHISE_FOUNDER.title[0], { text: FRANCHISE_FOUNDER.title[1], className: 'gold-text' }]} className="fr-founder__title" />
            <blockquote>
              {FRANCHISE_FOUNDER.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </blockquote>
            <figcaption>— {FRANCHISE_FOUNDER.sign}</figcaption>
          </div>
        </figure>

        <div className="fr-impact">
          <h3>
            The Impact We Create: every techcadd centre becomes a <span className="gold-text">hub for transformation</span>
          </h3>
          <ul className="fr-chips">
            {impact.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{impact.lead}</p>
        </div>
      </div>
    </section>
  )
}

/** Closing band: the call to bring a centre to your city, and how to reach the team. */
export function FranchiseContact() {
  return (
    <section className="section fr-contact">
      <div className="shell fr-split">
        <div className="fr-photo fr-photo--plain" data-aos="fade-right">
          <Image src={FRANCHISE_CITY.image} alt="Illustration of a techcadd franchise centre" fill sizes="(max-width: 960px) 100vw, 620px" />
        </div>
        <div>
          <SectionHeading eyebrow="Let's Build the Future Together" title={['Is Your City', { text: 'Ready?', className: 'gradient-text' }]} />
          <div className="fr-prose">
            {FRANCHISE_CITY.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{FRANCHISE_CITY.closing}</p>
          </div>
          <ul className="fr-contact__ways">
            <li>
              <a href={FRANCHISE_CONTACT.phoneHref}>
                <FiPhone aria-hidden />
                {FRANCHISE_CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${FRANCHISE_CONTACT.email}`}>
                <FiMail aria-hidden />
                {FRANCHISE_CONTACT.email}
              </a>
            </li>
            <li>
              <span>
                <FiMapPin aria-hidden />
                {FRANCHISE_CONTACT.address}
              </span>
            </li>
          </ul>
          <a href="#apply" className="btn btn--gold">
            Bring techcadd to Your City <FiArrowRight aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
