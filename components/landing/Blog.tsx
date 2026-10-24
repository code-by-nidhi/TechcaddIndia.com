import Link from 'next/link'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'

import { POSTS } from '@/data/site'

/* A newsroom: the latest post as a large picture story on the left, and the
   rest as a ruled list of rows — thumbnail, label and date, title — on the
   right. */

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

/** Posts carry no artwork of their own yet, so each tag borrows a photo. */
const ART: Record<string, string> = {
  Careers: '/images/gallery/placement-drive.webp',
  Stories: '/images/gallery/techcadd-meet.webp',
  Data: '/images/categories/data-science.webp',
  AI: '/images/categories/ai.webp',
}

export default function Blog() {
  const [lead, ...rest] = POSTS

  return (
    <section className="section cx-news" id="blog">
      <div className="shell">
        <div className="cx-head">
          <div className="cx-head__text">
            <h2 className="cx-title" data-fx="words">
              Guides, Stories &amp; Career Advice
            </h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Practical guides, learner stories and straight answers about building a tech career in India.
            </p>
          </div>
          <Link href="/blog" className="cta-link">
            All articles
          </Link>
        </div>

        <div className="cx-news__grid">
          <article className="cx-lead">
            <div className="cx-lead__img" data-fx="img parallax">
              <Image src={ART[lead.tag] ?? ART.Careers} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" />
            </div>
            <div className="cx-lead__body" data-fx="reveal" data-fx-delay="0.3">
              <span className="eyebrow">{lead.tag}</span>
              <h3>
                <Link href={`/blog/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <time dateTime={lead.date}>{fmt.format(new Date(lead.date))}</time>
              <span className="cta-link" aria-hidden>
                Read more
              </span>
            </div>
          </article>

          <ul className="cx-news__list" data-fx="stagger" data-fx-delay="0.2">
            {rest.map((p) => (
              <li key={p.slug}>
                <article className="cx-row">
                  <div className="cx-row__img">
                    <Image src={ART[p.tag] ?? ART.Careers} alt="" fill sizes="140px" />
                  </div>
                  <div className="cx-row__body">
                    <p className="cx-row__meta">
                      <span className="eyebrow">{p.tag}</span>
                      <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
                    </p>
                    <h3>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <span className="cta-link" aria-hidden>
                      Read more
                    </span>
                  </div>
                  <FiArrowUpRight className="cx-row__go" aria-hidden />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
