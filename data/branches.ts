/* ==========================================================================
   Branches — the cards in the "Our Branches" section.

   Edit this list to add, remove or reorder branches; the section renders
   whatever is here, in this order. Every value marked TODO is a placeholder.

   Photos: drop them in /public/branches/ and set `image` to the path from
   the site root, e.g. '/branches/jalandhar.webp'. Leave `image` out and the
   card falls back to a dark gradient with a map-pin icon. Portrait photos
   work best (cards are tall and narrow when collapsed).
   ========================================================================== */

export type Branch = {
  id: string
  city: string
  type: 'Head Office' | 'Branch'
  /** path under /public, e.g. '/branches/jalandhar.webp' */
  image?: string
  address: string
  /** shown as written */
  phone: string
  /** digits only, with country code — used for the wa.me link */
  whatsapp: string
  timings: string
  courses: string[]
  studentsTrained: number
  yearsRunning: number
  mapsUrl: string
}

const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const BRANCHES: Branch[] = [
  {
    id: 'jalandhar',
    city: 'Jalandhar',
    type: 'Head Office',
    // image: '/branches/jalandhar.webp', // TODO: add photo
    address: 'TODO: street address, Jalandhar, Punjab', // TODO
    phone: '+91 98881 22254', // TODO: confirm branch number
    whatsapp: '919888122254', // TODO: confirm WhatsApp number
    timings: 'Mon–Sat, 9 AM – 6 PM', // TODO: confirm timings
    courses: ['AI & ML', 'Full-Stack', 'Data Science', 'Digital Marketing'], // TODO: courses taught here
    studentsTrained: 10000, // TODO
    yearsRunning: 20, // TODO
    mapsUrl: maps('techcadd Jalandhar'), // TODO: replace with the exact Google Maps link
  },
  {
    id: 'chandigarh',
    city: 'Chandigarh',
    type: 'Branch',
    address: 'TODO: street address, Chandigarh', // TODO
    phone: '+91 98881 22254', // TODO: branch number
    whatsapp: '919888122254', // TODO
    timings: 'Mon–Sat, 9 AM – 6 PM', // TODO
    courses: ['Full-Stack', 'Data Science', 'Cloud'], // TODO
    studentsTrained: 3000, // TODO
    yearsRunning: 8, // TODO
    mapsUrl: maps('techcadd Chandigarh'), // TODO
  },
  {
    id: 'mohali',
    city: 'Mohali',
    type: 'Branch',
    address: 'TODO: street address, Mohali, Punjab', // TODO
    phone: '+91 98881 22254', // TODO: branch number
    whatsapp: '919888122254', // TODO
    timings: 'Mon–Sat, 9 AM – 6 PM', // TODO
    courses: ['AI & ML', 'Full-Stack', 'Cybersecurity'], // TODO
    studentsTrained: 2500, // TODO
    yearsRunning: 6, // TODO
    mapsUrl: maps('techcadd Mohali'), // TODO
  },
  {
    id: 'ludhiana',
    city: 'Ludhiana',
    type: 'Branch',
    address: 'TODO: street address, Ludhiana, Punjab', // TODO
    phone: '+91 98881 22254', // TODO: branch number
    whatsapp: '919888122254', // TODO
    timings: 'Mon–Sat, 9 AM – 6 PM', // TODO
    courses: ['Full-Stack', 'Digital Marketing', 'Data Science'], // TODO
    studentsTrained: 3500, // TODO
    yearsRunning: 10, // TODO
    mapsUrl: maps('techcadd Ludhiana'), // TODO
  },
  {
    id: 'phagwara',
    city: 'Phagwara',
    type: 'Branch',
    address: 'TODO: street address, Phagwara, Punjab', // TODO
    phone: '+91 98881 22254', // TODO: branch number
    whatsapp: '919888122254', // TODO
    timings: 'Mon–Sat, 9 AM – 6 PM', // TODO
    courses: ['AI & ML', 'Full-Stack', 'Cloud'], // TODO
    studentsTrained: 2000, // TODO
    yearsRunning: 7, // TODO
    mapsUrl: maps('techcadd Phagwara'), // TODO
  },
  {
    id: 'amritsar',
    city: 'Amritsar',
    type: 'Branch',
    address: 'TODO: street address, Amritsar, Punjab', // TODO
    phone: '+91 98881 22254', // TODO: branch number
    whatsapp: '919888122254', // TODO
    timings: 'Mon–Sat, 9 AM – 6 PM', // TODO
    courses: ['Full-Stack', 'Data Science', 'Digital Marketing'], // TODO
    studentsTrained: 2500, // TODO
    yearsRunning: 8, // TODO
    mapsUrl: maps('techcadd Amritsar'), // TODO
  },
  {
    id: 'hoshiarpur',
    city: 'Hoshiarpur',
    type: 'Branch',
    address: 'TODO: street address, Hoshiarpur, Punjab', // TODO
    phone: '+91 98881 22254', // TODO: branch number
    whatsapp: '919888122254', // TODO
    timings: 'Mon–Sat, 9 AM – 6 PM', // TODO
    courses: ['AI & ML', 'Full-Stack', 'Cybersecurity'], // TODO
    studentsTrained: 1500, // TODO
    yearsRunning: 5, // TODO
    mapsUrl: maps('techcadd Hoshiarpur'), // TODO
  },
]
