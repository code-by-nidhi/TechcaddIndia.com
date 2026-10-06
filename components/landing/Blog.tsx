import Link from 'next/link'
import Image from 'next/image'

import { POSTS } from '@/data/site'

/* A mosaic of white cards on the grey band: one tall lead story with a
   picture, two short ones beside it and a wide one under those. Each carries
   an indigo label, a title, its date in violet and an underlined link. */

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

/** Posts carry no artwork of their own yet, so each tag borrows a photo. */
const ART: Record<string, string> = {
  Careers: '/images/course/campus1.webp',
  Stories: '/images/course/classroom.webp',
  Data: '/images/categories/data-science.webp',
  AI: '/images/categories/ai.webp',
}

export default function Blog() {
  return (
    <section className="ix-news" id="blog">
      <div className="shell">
        <div className="ix-news__head">
          <h2>Guides, Stories &amp; Career Advice</h2>
          <p>
            Practical guides, learner stories and straight answers about building a tech career in India.
          </p>
          <Link href="/blog" className="cta-link">
            All articles
          </Link>
        </div>

        <div className="ix-news__grid">
          {POSTS.map((p, i) => {
            const pictured = i === 0 || i === POSTS.length - 1
            return (
              <article key={p.slug} className={`ix-ncard${pictured ? ' ix-ncard--pic' : ''}`}>
                {pictured && (
                  <div className="ix-ncard__img">
                    <Image src={ART[p.tag] ?? ART.Careers} alt="" fill sizes="(max-width: 900px) 100vw, 40vw" />
                  </div>
                )}
                <div className="ix-ncard__body">
                  <span className="eyebrow">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
                  <Link href={`/blog/${p.slug}`} className="cta-link">
                    Read more
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
