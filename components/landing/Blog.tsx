import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { POSTS } from '@/data/site'

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Blog() {
  return (
    <section className="section sq-tint sq-blog" id="blog">
      <div className="shell">
        <div className="sq-head">
          <SectionHeading
            eyebrow="From the blog"
            title={['Guides for', { text: 'your next move', className: 'sq-hl' }]}
          />
          <Link href="/blog" className="sq-link">
            All articles <FiArrowRight aria-hidden />
          </Link>
        </div>

        <div className="sq-posts">
          {POSTS.map((p, i) => (
            <Link href={`/blog/${p.slug}`} className="sq-post" key={p.slug} data-aos="fade-up" data-aos-delay={i * 90}>
              <div className="sq-post__art" aria-hidden>
                <span>{p.tag}</span>
              </div>
              <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
              <h3>{p.title}</h3>
              <span className="sq-post__more">
                Read article <FiArrowRight aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
