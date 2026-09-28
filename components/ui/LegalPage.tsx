import PageHero from '@/components/ui/PageHero'
import Placeholder from '@/components/ui/Placeholder'

export default function LegalPage({ title }: { title: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ label: title }]} />
      <section className="section">
        <div className="shell">
          <Placeholder title={`${title} content`} items={['To be supplied by the legal team']} />
        </div>
      </section>
    </>
  )
}
