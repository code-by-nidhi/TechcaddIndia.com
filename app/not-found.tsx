import Link from 'next/link'

import PageHero from '@/components/ui/PageHero'

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page took a different career path" lead="The page you are looking for does not exist.">
      <Link href="/" className="btn btn--gold" style={{ marginTop: '1.5rem' }}>
        Back to home
      </Link>
    </PageHero>
  )
}
