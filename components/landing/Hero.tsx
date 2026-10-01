import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import DemoLink from '@/components/ui/DemoLink'
import SplitHeading from '@/components/fx/SplitHeading'
import { FEATURED_COURSES } from '@/data/site'

/* ==========================================================================
   Hero — a full-bleed campus photo under a navy veil, one very large centred
   headline, and a slow rail of course cards running off the bottom edge.
   The rail is decorative (the same courses are linked further down), so it
   is hidden from assistive tech and its list is doubled for a seamless loop.
   ========================================================================== */

export default function Hero() {
  return (
    <section className="sq-hero section--navy">
      <Image src="/images/course/campus1.webp" alt="" fill priority sizes="100vw" className="sq-hero__img" />
      <div className="sq-hero__veil" aria-hidden />

      <div className="shell sq-hero__copy">
        <SplitHeading
          as="h1"
          immediate
          delay={0.1}
          lines
          className="sq-hero__title"
          parts={['Learn the tech', { text: 'India runs on.', className: 'gold-text' }]}
        />

        <p className="sq-hero__lead">
          AI, cloud and full-stack courses built around the tools businesses actually use — in a techcadd centre or
          a live online batch from anywhere in India.
        </p>

        <div className="sq-hero__ctas">
          <Link href="/courses" className="btn btn--gold">
            Explore courses <FiArrowRight aria-hidden />
          </Link>
          <DemoLink className="btn btn--ghost">Book a free demo</DemoLink>
        </div>
        <p className="sq-hero__note">Free career counselling. No registration fee.</p>
      </div>

      <div className="sq-hero__rail" aria-hidden>
        <div className="sq-hero__track">
          {[...FEATURED_COURSES, ...FEATURED_COURSES].map((c, i) => (
            <div className="sq-shot" key={i}>
              <Image src={c.image} alt="" fill sizes="(max-width: 700px) 60vw, 380px" />
              <span>{c.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
