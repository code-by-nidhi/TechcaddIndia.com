import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'
import CTA from '@/components/home/CTA'
import { POSTS } from '@/data/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return { title: POSTS.find((p) => p.slug === slug)?.title ?? 'Blog' }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <>
      <PageHero eyebrow={post.tag} title={post.title} crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.tag }]} />
      <section className="section">
        <div className="shell">
          <Placeholder title="Article body" items={['Rendered from CMS', 'Table of contents', 'Related courses']} />
        </div>
      </section>
      <CTA />
    </>
  )
}
