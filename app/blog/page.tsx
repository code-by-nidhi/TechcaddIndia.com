import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import Blog from '@/components/home/Blog'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'Blog' }

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Guides, stories and career advice"
        lead="Practical reads on AI, development, data and landing your first tech job."
        crumbs={[{ label: 'Blog' }]}
      />
      <Blog />
      <CTA />
    </>
  )
}
