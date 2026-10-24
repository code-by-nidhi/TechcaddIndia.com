import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight, FiStar } from 'react-icons/fi'

import { SITE } from '@/data/site'
import { FRANCHISE_STATS, FRANCHISE_TEAM } from '@/data/franchise'

/* ==========================================================================
   Hero — an editorial banner. A two-line headline (one heavy word, the rest
   light) with long rules running off each line, a hairline under it, then a
   board of three rounded photo tiles: a wide one with the team and a short
   intro beneath, a tall one in the middle, and a short one over a card
   inviting franchise applications. Each photo carries a strip of tape whose label
   scrolls along it.

   Entrance motion is CSS: the headline lines rise in, the rules draw
   outwards, the tiles fade up in turn and the tape labels loop. Scroll
   motion is ScrollFx (data-fx): the photos parallax, and as the hero leaves
   the headline lifts and fades while the columns drift at different speeds.
   All of it stops under prefers-reduced-motion.
   ========================================================================== */

const TEAM_SHOWN = 5

/** The partner count and the support line from the franchise page. */
const FRANCHISE_FACTS = FRANCHISE_STATS.filter((s) => /partner/i.test(s.label))

type Tile = { src: string; tape: string; className: string; sizes: string }

const TILES: Record<'wide' | 'tall' | 'short', Tile> = {
  wide: {
    src: '/images/hero/auditorium-session.webp',
    tape: 'Campus connect',
    className: 'cx-hero__tile--wide',
    sizes: '(max-width: 560px) 92vw, (max-width: 960px) 92vw, 34vw',
  },
  tall: {
    src: '/images/hero/robot-dog.webp',
    tape: 'Innovation hub',
    className: 'cx-hero__tile--tall',
    sizes: '(max-width: 560px) 92vw, (max-width: 960px) 46vw, 28vw',
  },
  short: {
    src: '/images/hero/team-stage.webp',
    tape: 'One network',
    className: 'cx-hero__tile--short',
    sizes: '(max-width: 560px) 92vw, (max-width: 960px) 46vw, 28vw',
  },
}

/** A photo tile with a diagonal strip of tape across it. */
function PhotoTile({
  tile,
  priority = false,
  fx = 'parallax',
  driftY,
}: {
  tile: Tile
  priority?: boolean
  /** ScrollFx effects for the frame (see components/fx/ScrollFx.tsx) */
  fx?: string
  driftY?: number
}) {
  /* the label twice over, so sliding the track by half loops seamlessly */
  const labels = Array.from({ length: 8 }, (_, i) => (
    <span key={i}>
      <i aria-hidden /> {tile.tape}
    </span>
  ))
  return (
    <div className={`cx-hero__tile ${tile.className}`} data-fx={fx} data-fx-y={driftY}>
      <Image src={tile.src} alt="" fill priority={priority} quality={90} sizes={tile.sizes} />
      <span className="cx-hero__tape" aria-hidden>
        <span>{labels}</span>
      </span>
    </div>
  )
}

export default function Hero() {
  const team = FRANCHISE_TEAM.people
  const more = team.length - TEAM_SHOWN

  return (
    <section className="cx-hero">
      <div className="cx-hero__bgshapes" aria-hidden>
        <span className="cx-hero__glow" />
        <span className="cx-hero__orbit" />
        <span className="cx-hero__dots" />
      </div>

      <div className="shell">
        <h1 className="cx-hero__title" data-fx="drift" data-fx-y="-160" data-fx-fade>
          <span className="cx-hero__line">
            <span>
              <strong>Building</strong> India&rsquo;s
            </span>
            <span className="cx-hero__rule" aria-hidden />
          </span>
          <span className="cx-hero__line cx-hero__line--2">
            <span className="cx-hero__rule" aria-hidden />
            <span>tech network</span>
          </span>
        </h1>

        {/* the columns drift up at different speeds as the hero scrolls away */}
        <div className="cx-hero__board">
          <div className="cx-hero__col" data-fx="drift" data-fx-y="-40">
            <PhotoTile tile={TILES.wide} priority />
            <div className="cx-hero__team">
              <h2>Our team</h2>
              <ul>
                {team.slice(0, TEAM_SHOWN).map((p) => (
                  <li key={p.name}>
                    <Image src={p.image} alt={p.name} width={44} height={44} />
                  </li>
                ))}
                {more > 0 && (
                  <li className="cx-hero__more-team" aria-label={`and ${more} more`}>
                    +{more}
                  </li>
                )}
              </ul>
            </div>
            <p className="cx-hero__intro">
              We train engineers across India — in our centres and in live online batches — on the AI, cloud and
              full-stack skills companies are hiring for now.
            </p>
            <p className="cx-hero__rating">
              <FiStar aria-hidden /> <strong>{SITE.rating.score}</strong> rated by {SITE.rating.reviews} learners
            </p>
          </div>

          <PhotoTile tile={TILES.tall} priority fx="parallax drift" driftY={-120} />

          <div className="cx-hero__col" data-fx="drift" data-fx-y="-75">
            <PhotoTile tile={TILES.short} />
            <Link href="/franchises#apply" className="cx-hero__franchise">
              <span className="cx-hero__franchise-tag">
                <i aria-hidden /> Franchise opportunity
              </span>
              <span className="cx-hero__franchise-title">
                Own a <b>techcadd</b> franchise
              </span>
              <span className="cx-hero__franchise-stats">
                {FRANCHISE_FACTS.map((s) => (
                  <span key={s.label}>
                    <b>{s.value}</b> {s.label}
                  </span>
                ))}
              </span>
              <span className="cx-hero__franchise-go">
                Apply for franchise
                <span className="cx-hero__franchise-arrow">
                  <FiArrowUpRight aria-hidden />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
