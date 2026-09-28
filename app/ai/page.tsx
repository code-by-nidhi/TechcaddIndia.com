import type { Metadata } from 'next'

import PageHero from '@/components/ui/PageHero'
import AICourses from '@/components/home/AICourses'
import Technologies from '@/components/home/Technologies'
import FAQ from '@/components/home/FAQ'
import CTA from '@/components/home/CTA'

export const metadata: Metadata = { title: 'AI Courses' }

export default function AIPage() {
  return (
    <>
      <PageHero
        eyebrow="Artificial Intelligence"
        title="Learn AI the way teams use it"
        lead="Generative AI, prompt engineering, agents and RAG — in classroom and live online batches across India."
        crumbs={[{ label: 'AI' }]}
      />
      <AICourses />
      <Technologies />
      <FAQ />
      <CTA />
    </>
  )
}
