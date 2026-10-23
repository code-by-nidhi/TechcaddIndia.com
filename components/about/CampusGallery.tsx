import Image from 'next/image'

import { CAMPUS_PHOTOS } from '@/data/gallery'

/** The labs and classrooms as a masonry wall of captioned photos. */
export default function CampusGallery() {
  return (
    <section className="section">
      <div className="shell">
        <ul className="campus-wall">
          {CAMPUS_PHOTOS.map((p, i) => (
            <li key={p.src} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
              <figure>
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 33vw" />
                <figcaption>{p.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
