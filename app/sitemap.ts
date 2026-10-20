import type { MetadataRoute } from 'next'

import { SITE } from '@/data/site'
import { ALL_MENU_COURSES, COURSES_MENU, categoryHref, courseHref } from '@/data/courses-menu'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about',
    '/courses',
    '/course-categories',
    ...COURSES_MENU.map((c) => categoryHref(c.slug)),
    ...ALL_MENU_COURSES.map((c) => courseHref(c.slug)),
    '/internship-training',
    '/services',
    '/projects',
    '/franchises',
    '/branches',
    '/blog',
    '/contact',
  ]
  return paths.map((p) => ({ url: `${SITE.url}${p}` }))
}
