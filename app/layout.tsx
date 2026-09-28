import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MotionProvider from '@/components/fx/MotionProvider'
import { SITE } from '@/data/site'

/* Order matters: tokens → shared UI → layout chrome → sections. */
import '@/styles/base.css'
import '@/styles/ui.css'
import '@/styles/layout.css'
import '@/styles/home.css'
import '@/styles/pages.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-jakarta', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-manrope', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'techcadd — AI & Software Engineering Training Institute in India',
    template: '%s | techcadd India',
  },
  description:
    'Job-ready training in AI, Full-Stack Development, Data Science, Cybersecurity, Cloud and Digital Marketing. Classroom centres in Punjab and live online batches across India.',
  keywords: ['AI course India', 'full stack development course', 'data science training', 'techcadd', 'IT training institute India'],
  openGraph: { type: 'website', siteName: 'techcadd', locale: 'en_IN' },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#04124a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${manrope.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
