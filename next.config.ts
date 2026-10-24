import type { NextConfig } from 'next'

/* Course slugs that changed when the catalogue moved to title-derived slugs
   (data/courses-menu.ts). Old links and bookmarks keep working. */
const LEGACY_COURSES: Record<string, string> = {
  'ai-machine-learning': 'artificial-intelligence-ai',
  'generative-agentic-ai': 'generative-ai',
  'full-stack-development': 'full-stack-web-development',
  'data-science-analytics': 'data-science-machine-learning',
  'cybersecurity-ethical-hacking': 'cybersecurity',
  'cloud-devops': 'aws-cloud-computing',
}

/* The home page's category keys, as they appeared in /courses?category=… */
const LEGACY_CATEGORIES: Record<string, string> = {
  ai: 'ai-emerging-technologies',
  'full-stack': 'software-programming',
  'data-science': 'data-cloud',
  cloud: 'data-cloud',
  cyber: 'cybersecurity-forensics',
  marketing: 'digital-creative-skills',
}

/* Files in /public keep their names when they're replaced, so they're held
   for a day and then served stale while a fresh copy is fetched. No s-maxage:
   the image optimiser copies it into the browser max-age of /_next/image, and
   Vercel's CDN already caches static files until the next deploy. */
const PUBLIC_ASSET_CACHE = 'public, max-age=86400, stale-while-revalidate=604800'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    /* 90 for the hero photographs, which are shown large */
    qualities: [75, 90],
    /* keep optimised variants for a day instead of re-encoding every 60s */
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: PUBLIC_ASSET_CACHE }] },
      {
        source: '/:file(favicon.*|favicon-.*|icon-.*|apple-touch-icon.*|site.webmanifest)',
        headers: [{ key: 'Cache-Control', value: PUBLIC_ASSET_CACHE }],
      },
    ]
  },
  async redirects() {
    return [
      ...Object.entries(LEGACY_COURSES).map(([from, to]) => ({
        source: `/courses/${from}`,
        destination: `/courses/${to}`,
        permanent: true,
      })),
      ...Object.entries(LEGACY_CATEGORIES).map(([key, slug]) => ({
        source: '/courses',
        has: [{ type: 'query' as const, key: 'category', value: key }],
        destination: `/course-categories/${slug}`,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
