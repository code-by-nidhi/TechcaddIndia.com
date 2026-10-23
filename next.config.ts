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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    /* 90 for the hero photographs, which are shown large */
    qualities: [75, 90],
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
