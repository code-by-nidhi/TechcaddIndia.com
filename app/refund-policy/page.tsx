import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'

export const metadata: Metadata = { title: 'Refund Policy' }

export default function Page() {
  return <LegalPage title="Refund Policy" />
}
