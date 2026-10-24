/* ==========================================================================
   Certifications and registrations shown on the homepage (Credentials.tsx).

   The certificate faces drawn on the page are illustrative previews, not
   scans: they carry demo ids, placeholder logo boxes and a SAMPLE
   watermark, and no real registration numbers or emblems. TODO: when
   the scanned originals are available, add them under
   /public/images/credentials and show them in place of the drawn faces.
   ========================================================================== */

export type CredentialIcon = 'iso' | 'msme' | 'startup'

export type Credential = {
  id: string
  icon: CredentialIcon
  title: string
  /** the short name on the seal and the ticker */
  short: string
  since: number
  issuer: string
  text: string
  points: string[]
  /** what the drawn certificate face says. The ids are demo values, and
      the face carries a SAMPLE watermark. */
  cert: {
    kind: string
    line: string
    basis: { label: string; value: string }
    scope: string
    id: string
    issued: string
  }
}

export const CREDENTIALS: Credential[] = [
  {
    id: 'iso',
    icon: 'iso',
    title: 'ISO 9001:2015 Certified',
    short: 'ISO 9001:2015',
    since: 2022,
    issuer: 'International Organization for Standardization',
    text: 'techcadd is ISO 9001:2015 certified — the internationally recognised standard for Quality Management Systems. Its curriculum, faculty training, student support processes and infrastructure are audited against that benchmark every year.',
    points: [
      'Annual external audit of teaching quality',
      'Documented processes for admissions, training and placement',
      'Student feedback integrated into curriculum updates',
      'Continuous improvement mandated by the standard',
    ],
    cert: {
      kind: 'Quality management',
      line: 'operates a Quality Management System that conforms to the requirements of ISO 9001:2015 for the design and delivery of technology training, internships and placement support.',
      basis: { label: 'Standard', value: 'ISO 9001:2015' },
      scope: 'Training & placement',
      id: 'CERT-DEMO-ISO-2022',
      issued: '2022',
    },
  },
  {
    id: 'msme',
    icon: 'msme',
    title: 'MSME Registered',
    short: 'MSME · Udyam',
    since: 2019,
    issuer: 'Ministry of Micro, Small & Medium Enterprises, Government of India',
    text: 'techcadd is registered under the MSME Act of the Government of India. The registration establishes its legal standing as an education enterprise and is what makes its certificates recognisable to government departments, PSUs and public-sector recruiters.',
    points: [
      'Government-recognised institution',
      'Certificates accepted by public-sector employers',
      'Eligible for government skill-development partnerships',
      'Verified on the Udyam Registration Portal',
    ],
    cert: {
      kind: 'Government registration',
      line: 'is registered as a Micro, Small & Medium Enterprise under the MSMED Act, 2006, for education and technology training services.',
      basis: { label: 'Registered under', value: 'MSMED Act, 2006' },
      scope: 'Education services',
      id: 'CERT-DEMO-MSME-2019',
      issued: '2019',
    },
  },
  {
    id: 'startup',
    icon: 'startup',
    title: 'Startup India Recognised',
    short: 'Startup India',
    since: 2020,
    issuer: 'Department for Promotion of Industry and Internal Trade (DPIIT), Government of India',
    text: "techcadd is recognised under the Startup India initiative by DPIIT — a recognition awarded to companies contributing to India's economy and knowledge ecosystem, marking techcadd as a technology-forward institution driving employability in Punjab.",
    points: [
      'Recognised by DPIIT for innovation in education',
      "Part of India's flagship startup ecosystem",
      'Eligible for government schemes and collaborations',
      'Tax benefits under Section 80-IAC',
    ],
    cert: {
      kind: 'Startup recognition',
      line: 'is recognised as a startup by the Department for Promotion of Industry and Internal Trade, Government of India, for innovation in technology education and employability.',
      basis: { label: 'Recognised by', value: 'DPIIT, Govt. of India' },
      scope: 'EdTech & employability',
      id: 'CERT-DEMO-SI-2020',
      issued: '2020',
    },
  },
]

/** Extra chips for the scrolling ticker under the section. */
export const CREDENTIAL_TICKER = [
  'ISO 9001:2015 Certified',
  'MSME Registered',
  'Startup India Recognised',
  'DPIIT Recognised',
  'Verified on Udyam',
  'Annually audited',
  'Since 2016',
]
