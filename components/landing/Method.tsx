'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import DemoLink from '@/components/ui/DemoLink'
import { STEPS } from '@/data/site'

/* Heading and one action on the left; on the right a row of picture cards
   where the one under the pointer widens and reveals its link. */

const PHOTOS = ['/images/how/counselling.webp', '/images/course/lab.webp', '/images/how/project.webp', '/images/how/placement.webp']

export default function Method() {
  const [active, setActive] = useState(0)

  return (
    <section className="section ix-method" id="how-it-works">
      <div className="shell ix-method__inner">
        <div className="ix-method__copy">
          <h2>
            From first call to <span>first offer</span>
          </h2>
          <p>
            Starting after 12th, switching careers or adding AI to the skills you already have — the path is the same
            four steps, in a techcadd centre or a live online batch.
          </p>
          <DemoLink className="btn">Book a free demo</DemoLink>
        </div>

        <ul className="ix-method__cards">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className={`ix-mcard${i === active ? ' is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <div className="ix-mcard__img">
                <Image src={PHOTOS[i]} alt="" fill sizes="(max-width: 900px) 90vw, 320px" />
              </div>
              <div className="ix-mcard__body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <Link href="/about" className="cta-link">
                  Learn more
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
