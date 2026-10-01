'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { FiX, FiCpu, FiRefreshCw, FiArrowRight, FiCheckCircle, FiChevronDown, FiStar } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { MdVerified } from 'react-icons/md'

import { DEMO_EVENT } from '@/components/ui/DemoLink'
import { NAV, SITE } from '@/data/site'

/* Same list the Courses menu shows, so the two cannot drift apart. */
const COURSES = [
  ...new Set((NAV.find((n) => n.columns)?.columns ?? []).flatMap((c) => c.items.map((i) => i.label))),
  'Not sure yet',
]

const newSum = () => ({ a: 1 + Math.floor(Math.random() * 9), b: 1 + Math.floor(Math.random() * 9) })

type Errors = Partial<Record<'course' | 'name' | 'phone' | 'answer', string>>

/** The Book Demo form. Mounted once in the root layout; any DemoLink opens it. */
export default function DemoModal() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  /* Fixed on the server render, randomised on open, so hydration matches. */
  const [sum, setSum] = useState({ a: 6, b: 4 })
  const closeBtn = useRef<HTMLButtonElement>(null)
  const opener = useRef<Element | null>(null)

  useEffect(() => {
    const onOpen = () => {
      opener.current = document.activeElement
      setSum(newSum())
      setErrors({})
      setSent(false)
      setOpen(true)
    }
    window.addEventListener(DEMO_EVENT, onOpen)
    return () => window.removeEventListener(DEMO_EVENT, onOpen)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (opener.current instanceof HTMLElement) opener.current.focus()
    }
  }, [open])

  // TODO: wire to the enquiry API / CRM. Currently only confirms client-side.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}
    if (!data.get('course')) next.course = 'Please choose a course.'
    if (String(data.get('name') ?? '').trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[6-9]\d{9}$/.test(String(data.get('phone') ?? '').trim())) next.phone = 'Enter a valid 10-digit mobile number.'
    if (Number(data.get('answer')) !== sum.a + sum.b || !data.get('answer')) next.answer = 'That answer is not right.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSent(true)
  }

  const field = (name: keyof Errors) => ({
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `demo-${name}-err` : undefined,
  })
  const error = (name: keyof Errors) =>
    errors[name] && (
      <p className="demo__err" id={`demo-${name}-err`}>
        {errors[name]}
      </p>
    )

  if (!open) return null

  return (
    <div className="demo" data-lenis-prevent onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="demo__dialog" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button ref={closeBtn} type="button" className="demo__close" aria-label="Close" onClick={() => setOpen(false)}>
          <FiX />
        </button>

        <div className="demo__info">
          <h2 id="demo-title">
            <span aria-hidden>👋</span> Still exploring? Let us help
          </h2>
          <p className="demo__lead">
            Talk to a counsellor and we&apos;ll map the shortest route from where you are to the job you want.
          </p>

          <figure className="demo__quote">
            <blockquote>“AI is the new electricity for modern computing.”</blockquote>
            <figcaption>
              <span className="demo__quote-icon" aria-hidden>
                <FiCpu />
              </span>
              <span>
                <strong>Jensen Huang</strong>
                CEO, NVIDIA Corporation
              </span>
            </figcaption>
          </figure>

          <div className="demo__google">
            <FcGoogle aria-hidden />
            <strong>Google Verified</strong>
            <MdVerified aria-hidden className="demo__tick" />
            <span className="demo__stars" role="img" aria-label={`Rated ${SITE.rating.score} out of 5`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <FiStar key={i} aria-hidden />
              ))}
            </span>
          </div>

          <p className="demo__support">
            You can also share your requirements at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, and our team will
            get back to you right away.
          </p>
        </div>

        {sent ? (
          <div className="demo__form demo__form--done" role="status">
            <FiCheckCircle aria-hidden />
            <h3>Thanks! We&apos;ll call you shortly.</h3>
            <p>A counsellor will reach out on the number you shared.</p>
            <button type="button" className="demo__submit" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <form className="demo__form" onSubmit={onSubmit} noValidate>
            <h3>Tell us your goal. We&apos;ll code it into reality.</h3>

            <div className="demo__field demo__field--select">
              <label htmlFor="demo-course" className="sr-only">
                Course of interest
              </label>
              <select id="demo-course" defaultValue="" required {...field('course')}>
                <option value="" disabled>
                  Select Your Course of Interest*
                </option>
                {COURSES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <FiChevronDown aria-hidden />
              {error('course')}
            </div>

            <div className="demo__field">
              <label htmlFor="demo-name" className="sr-only">
                Full name
              </label>
              <input id="demo-name" type="text" placeholder="Full Name*" autoComplete="name" required {...field('name')} />
              {error('name')}
            </div>

            <div className="demo__field">
              <label htmlFor="demo-phone" className="sr-only">
                Contact number
              </label>
              <input
                id="demo-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Contact Number (10 Digits)*"
                autoComplete="tel-national"
                required
                {...field('phone')}
              />
              {error('phone')}
            </div>

            <div className="demo__field">
              <div className="demo__verify">
                <label htmlFor="demo-answer">Security verification</label>
                <span className="demo__sum">
                  {sum.a} + {sum.b} = ?
                </span>
                <button type="button" className="demo__refresh" aria-label="New question" onClick={() => setSum(newSum())}>
                  <FiRefreshCw />
                </button>
              </div>
              <input id="demo-answer" type="text" inputMode="numeric" placeholder="Answer" autoComplete="off" required {...field('answer')} />
              {error('answer')}
            </div>

            <p className="demo__promise">
              <FiCheckCircle aria-hidden /> Expert response within 5 minutes.
            </p>

            <button type="submit" className="demo__submit">
              Submit <FiArrowRight aria-hidden />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
