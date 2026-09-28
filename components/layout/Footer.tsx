import Link from 'next/link'
import Image from 'next/image'
import { FiInstagram, FiYoutube, FiLinkedin, FiPhone, FiMail, FiClock, FiMapPin } from 'react-icons/fi'

import { CENTRES, FOOTER_LINKS, SITE } from '@/data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer section--navy">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <Image src="/images/techcadd-logo-white.png" alt="techcadd" width={170} height={46} />
            <p>
              Two decades of turning students into engineers. Now training learners across India — in our centres and
              in live online batches.
            </p>
            <ul className="footer__contact">
              <li>
                <FiPhone aria-hidden /> <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <FiMail aria-hidden /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <FiClock aria-hidden /> {SITE.hours}
              </li>
            </ul>
            <div className="footer__social">
              <a href={SITE.socials.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                <FiInstagram />
              </a>
              <a href={SITE.socials.youtube} aria-label="YouTube" target="_blank" rel="noreferrer">
                <FiYoutube />
              </a>
              <a href={SITE.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <FiLinkedin />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="footer__col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__branches">
          <h4>
            <FiMapPin aria-hidden /> Our centres
          </h4>
          <ul>
            {CENTRES.map((c) => (
              <li key={c.slug}>
                <Link href={`/branches/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/courses">Live Online — Pan India</Link>
            </li>
          </ul>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            <span className="gold-text">★</span> {SITE.rating.score} on Google ({SITE.rating.reviews}+ reviews)
          </p>
        </div>
      </div>
    </footer>
  )
}
