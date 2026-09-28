import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { POSTS } from '@/data/site'

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Blog() {
  return (
    <section className="section blog" id="blog">
      <div className="shell">
        <div className="blog__head">
          <SectionHeading eyebrow="From the blog" title={['Guides for', { text: 'your next move', className: 'gradient-text' }]} />
          <Link href="/blog" className="btn btn--ghost" data-aos="fade-left">
            All articles <FiArrowUpRight />
          </Link>
        </div>

        <div className="blog__grid">
          {POSTS.map((p, i) => (
            <Link href={`/blog/${p.slug}`} className="post glass" key={p.slug} data-aos="fade-up" data-aos-delay={i * 90}>
              <div className="post__art" aria-hidden>
                <span>{p.tag}</span>
              </div>
              <div className="post__body">
                <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
                <h3>{p.title}</h3>
                <span className="post__more">
                  Read article <FiArrowUpRight aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
