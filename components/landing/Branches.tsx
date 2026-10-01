import { FiMapPin, FiClock, FiPhone, FiBookOpen, FiArrowUpRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

import SectionHeading from '@/components/ui/SectionHeading'
import { BRANCHES } from '@/data/branches'

const fmt = new Intl.NumberFormat('en-IN')

/* Our Branches — a plain grid of cards, every branch's details in view. */
export default function Branches() {
  return (
    <section className="section sq-tint sq-br" id="our-branches">
      <div className="shell">
        <SectionHeading
          eyebrow="Our Branches"
          title={['Find a techcadd centre', { text: 'near you', className: 'sq-hl' }]}
          lead="Walk into any branch for a free counselling session — same mentors, same labs, same placement support."
        />

        <ul className="sq-branches">
          {BRANCHES.map((b, i) => {
            const hq = b.type === 'Head Office'
            return (
              <li className="sq-branch" key={b.id} data-aos="fade-up" data-aos-delay={(i % 4) * 80}>
                <span className={`sq-branch__tag${hq ? ' sq-branch__tag--hq' : ''}`}>{b.type}</span>
                <h3>{b.city}</h3>
                <p className="sq-branch__line">
                  <FiMapPin aria-hidden /> {b.address}
                </p>
                <p className="sq-branch__line">
                  <FiClock aria-hidden /> {b.timings}
                </p>
                <p className="sq-branch__line">
                  <FiPhone aria-hidden /> {b.phone}
                </p>
                <p className="sq-branch__line">
                  <FiBookOpen aria-hidden /> {b.courses.join(', ')}
                </p>
                <dl className="sq-branch__stats">
                  {/* label first for valid <dl>; CSS shows the number on top */}
                  <div>
                    <dt>Students trained</dt>
                    <dd>{fmt.format(b.studentsTrained)}+</dd>
                  </div>
                  <div>
                    <dt>Years running</dt>
                    <dd>{b.yearsRunning}</dd>
                  </div>
                </dl>
                <div className="sq-branch__links">
                  <a href={`tel:${b.phone.replace(/\s/g, '')}`} aria-label={`Call the ${b.city} branch`}>
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${b.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp the ${b.city} branch`}
                  >
                    <FaWhatsapp aria-hidden /> WhatsApp
                  </a>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to the ${b.city} branch`}
                  >
                    Directions <FiArrowUpRight aria-hidden />
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
