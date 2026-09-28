import type { Metadata } from 'next'
import LegalPage from '@/components/ui/LegalPage'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function Page() {
  return <LegalPage title="Terms & Conditions" />
}
