/* ==========================================================================
   Gallery — seminar and event photos, shared by the homepage gallery and the
   franchise page. Lab and classroom photos do not belong here. Files live in
   /public/images/gallery.
   ========================================================================== */

export type GalleryPhoto = { src: string; alt: string; caption: string; w: number; h: number }

const photo = (name: string, caption: string, w: number, h: number, alt = caption): GalleryPhoto => ({
  src: `/images/gallery/${name}.webp`,
  alt,
  caption,
  w,
  h,
})

/** Event photographs, strongest first. */
export const EVENT_PHOTOS: GalleryPhoto[] = [
  photo('keynote-stage', 'Keynote with the techcadd robot dog', 1600, 1600),
  photo('techcadd-meet', 'The techcadd team on stage', 1600, 1600),
  photo('auditorium-talk', 'Addressing a full auditorium', 1536, 1024),
  photo('ai-robotics-show', 'AI Unleashed — the robotics show', 1600, 1600),
  photo('placement-drive', 'Mega placement drive, Universal Group of Institutions', 1600, 900),
  photo('robotics-stage-demo', 'Live robotics demo on stage', 1600, 1600),
  photo('cgc-landran', 'Department partnership event at CGC Landran', 1600, 1600),
  photo('award-ceremony', 'Recognised at an award ceremony', 1600, 1600),
  photo('auditorium-session', 'Hands-on AI session for students', 1536, 1024),
  photo('keynote-talk', 'Speaking at a techcadd event', 1600, 1600),
  photo('universal-award', 'Honoured at Universal Group of Institutions', 1086, 1448),
  photo('robot-closeup', 'The techcadd robot dog', 1536, 1024),
  photo('award-recognition', 'Award presented to techcadd', 1600, 1600),
  photo('auditorium-crowd', 'A packed seminar hall', 1436, 1096),
  photo('guest-welcome', 'Welcomed by the host institution', 1600, 1600),
  photo('robotics-team', 'The team with the robotics showcase', 1600, 1600),
  photo('universal-felicitation', 'Student felicitation ceremony', 1448, 1086),
  photo('campus-talk', 'Career talk at a partner campus', 1086, 1448),
  photo('award-felicitation', 'Felicitation at a robotics event', 1600, 1600),
  photo('robotics-campus-demo', 'Robotics demo on campus', 1600, 1600),
  photo('robot-outdoors', 'The robot dog out on campus', 1024, 1536),
  photo('google-visit', 'Visit to the Google office', 1086, 1448),
]

/** Branded seminar posters, one per partner campus. */
export const SEMINAR_POSTERS: GalleryPhoto[] = [
  ['seminar-gndec', 'GNDEC'],
  ['seminar-ikg-ptu', 'IKG PTU'],
  ['seminar-daviet', 'DAVIET'],
  ['seminar-graphic-era', 'Graphic Era Hill University'],
  ['seminar-shoolini', 'Shoolini University'],
  ['seminar-ct-university', 'CT University'],
  ['seminar-acem', 'ACEM College'],
  ['seminar-kmv', 'KMV College'],
  ['seminar-lyallpur-khalsa', 'Lyallpur Khalsa'],
  ['seminar-shimt', 'SHIMT'],
].map(([name, campus]) => photo(name, campus, 900, 1200, `Seminar at ${campus}`))

/** Labs and classrooms — for the Infrastructure & Labs page, never the homepage. */
export const CAMPUS_PHOTOS: GalleryPhoto[] = (
  [
    ['computer-lab-hall', 'Computer lab hall', 1400, 1400],
    ['lab-passion-wall', 'Laptop lab — passion, innovation, expertise', 705, 1400],
    ['lab-learning-wall', 'Lab with the course wall', 1400, 1400],
    ['mentor-at-desk', 'A trainer guiding students at their desks', 1400, 1400],
    ['cabin-lab', 'The cabin-themed coding lab', 1254, 1254],
    ['next-level-lab', '“Welcome to the next level” lab', 706, 1400],
    ['laptop-workshop', 'Small-group laptop workshop', 1400, 1400],
    ['ai-class', 'AI class on the smart screen', 1400, 1050],
    ['robotics-lab', 'Robotics in the lab', 710, 1400],
    ['classroom-session', 'Classroom session', 1400, 1400],
    ['design-lab', 'Design lab with a trainer', 1400, 1052],
    ['meeting-room-lab', 'Project room — success is a decision', 705, 1400],
    ['large-lab', 'Large computer lab', 1400, 1400],
    ['coding-lab', 'Coding lab', 1400, 1400],
    ['screen-review', 'Reviewing work on the big screen', 694, 1400],
    ['lab-trainer-walkthrough', 'Trainer walkthrough in the lab', 1400, 1400],
    ['study-lab', 'Study lab', 1400, 1400],
    ['pair-coding', 'Pair coding', 704, 1400],
    ['lab-open-floor', 'Open-floor lab', 1400, 1400],
    ['coding-row', 'A row of coders', 708, 1400],
    ['electronics-lab', 'Electronics practical', 1400, 1400],
    ['college-workshop', 'Training workshop at a partner college', 1050, 1400],
  ] as const
).map(([name, caption, w, h]) => ({ src: `/images/campus/${name}.webp`, alt: caption, caption, w, h }))
