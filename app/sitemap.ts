import type { MetadataRoute } from 'next'

import { SITE } from '@/data/site'
import { ABOUT_PAGES, aboutHref } from '@/data/about-pages'
import { ALL_MENU_COURSES, COURSES_MENU, categoryHref, courseHref } from '@/data/courses-menu'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about',
    ...ABOUT_PAGES.map((p) => aboutHref(p.slug)),
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
