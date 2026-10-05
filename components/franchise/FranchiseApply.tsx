'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import Image from 'next/image'
import { FiArrowRight, FiCheck, FiCheckCircle, FiChevronDown } from 'react-icons/fi'

import SectionHeading from '@/components/ui/SectionHeading'
import { FRANCHISE_FORM, FRANCHISE_STATS, INDIAN_STATES } from '@/data/franchise'

type Field =
  | 'name'
  | 'phone'
  | 'email'
  | 'city'
  | 'state'
  | 'preferredLocation'
  | 'currentProfession'
  | 'highestQualification'
  | 'hasBusinessExperience'
  | 'expectedTimeline'
  | 'investmentBudget'
  | 'hasCommercialSpace'
  | 'availableSpace'
  | 'heardFrom'
  | 'consent'
type Errors = Partial<Record<Field, string>>

const REQUIRED: [Field, string][] = [
  ['state', 'Select a state'],
  ['currentProfession', 'Select your profession'],
  ['highestQualification', 'Select your qualification'],
  ['hasBusinessExperience', 'Select an option'],
  ['expectedTimeline', 'Select expected timeline'],
  ['investmentBudget', 'Select investment budget'],
  ['hasCommercialSpace', 'Select an option'],
  ['availableSpace', 'Select available space'],
  ['heardFrom', 'Select how you heard about us'],
  ['consent', 'You must agree to be contacted'],
]

/** Four picture tiles of headline numbers beside the franchise enquiry form. */
export default function FranchiseApply() {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [experienced, setExperienced] = useState(false)

  // TODO: wire to the enquiry API / CRM. Currently only confirms client-side.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const text = (name: string) => String(data.get(name) ?? '').trim()
    const next: Errors = {}
    if (text('name').length < 2) next.name = 'Full name is required'
    if (!/^[6-9]\d{9}$/.test(text('phone'))) next.phone = 'Valid phone required'
    if (!/^\S+@\S+\.\S+$/.test(text('email'))) next.email = 'Invalid email address'
    if (text('city').length < 2) next.city = 'City is required'
    if (text('preferredLocation').length < 2) next.preferredLocation = 'Preferred franchise location is required'
    for (const [name, message] of REQUIRED) if (!data.get(name)) next[name] = message
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setSent(true)
  }

  const field = (name: Field) => ({
    name,
    id: `fr-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `fr-${name}-err` : undefined,
  })
  const error = (name: Field) =>
    errors[name] && (
      <p className="fr-form__err" id={`fr-${name}-err`}>
        {errors[name]}
      </p>
    )

  const input = (name: Field, label: string, props: Record<string, unknown> = {}) => (
    <div className="fr-form__field">
      <label htmlFor={`fr-${name}`}>{label}</label>
      <input type="text" {...props} {...field(name)} />
      {error(name)}
    </div>
  )
  const select = (name: Field, label: string, options: string[], placeholder = 'Select', onChange?: (v: string) => void): ReactNode => (
    <div className="fr-form__field fr-form__field--select">
      <label htmlFor={`fr-${name}`}>{label}</label>
      <select defaultValue="" onChange={onChange && ((e) => onChange(e.target.value))} {...field(name)}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <FiChevronDown aria-hidden />
      {error(name)}
    </div>
  )

  return (
    <section className="section fr-apply" id="apply">
      <div className="shell fr-apply__inner">
        <div className="fr-apply__aside">
          <SectionHeading
            eyebrow={FRANCHISE_FORM.eyebrow}
            title={['Start Your', { text: 'techcadd Franchise Journey', className: 'gradient-text' }]}
            lead={FRANCHISE_FORM.lead}
          />
          <ul className="fr-apply__tiles">
            {FRANCHISE_STATS.map((s, i) => (
              <li className="fr-tile" key={s.label} data-aos="fade-up" data-aos-delay={i * 70}>
                <Image src={s.image} alt="" fill sizes="(max-width: 960px) 50vw, 300px" />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fr-form section--navy">
          {sent ? (
            <div className="fr-form__done" role="status">
              <FiCheckCircle aria-hidden />
              <h2>{FRANCHISE_FORM.done.title}</h2>
              <p>{FRANCHISE_FORM.done.text}</p>
              <ul>
                {FRANCHISE_FORM.done.topics.map((t) => (
                  <li key={t}>
                    <FiCheck aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <p>
                <strong>{FRANCHISE_FORM.done.sign}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <h2>{FRANCHISE_FORM.submit}</h2>

              <fieldset>
                <legend>Personal Information</legend>
                {input('name', 'Full Name', { autoComplete: 'name' })}
                <div className="fr-form__row">
                  {input('phone', 'Mobile Number', { type: 'tel', inputMode: 'numeric', maxLength: 10, autoComplete: 'tel-national' })}
                  {input('email', 'Email Address', { type: 'email', autoComplete: 'email' })}
                </div>
              </fieldset>

              <fieldset>
                <legend>Location Details</legend>
                <div className="fr-form__row">
                  {input('city', 'City', { autoComplete: 'address-level2' })}
                  {select('state', 'State', INDIAN_STATES, 'Select state')}
                </div>
                {input('preferredLocation', 'Preferred Franchise Location (City/Area)')}
              </fieldset>

              <fieldset>
                <legend>Professional Background</legend>
                <div className="fr-form__row">
                  {select('currentProfession', 'Current Profession', FRANCHISE_FORM.professions, 'Select profession')}
                  {select('highestQualification', 'Highest Qualification', FRANCHISE_FORM.qualifications, 'Select qualification')}
                </div>
                {select('hasBusinessExperience', 'Do you have prior business experience?', ['Yes', 'No'], 'Select', (v) => setExperienced(v === 'Yes'))}
                {experienced && (
                  <div className="fr-form__field">
                    <label htmlFor="fr-businessDetails">Please specify your business/industry</label>
                    <input id="fr-businessDetails" name="businessDetails" type="text" />
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend>Franchise Interest</legend>
                <div className="fr-form__field">
                  <label htmlFor="fr-whyPartner">Why do you want to partner with techcadd?</label>
                  <textarea id="fr-whyPartner" name="whyPartner" rows={3} placeholder="Share your motivation and goals..." />
                </div>
                {select('expectedTimeline', 'Expected Timeline to Start', FRANCHISE_FORM.timelines, 'Select timeline')}
              </fieldset>

              <fieldset>
                <legend>Investment &amp; Infrastructure</legend>
                {select('investmentBudget', 'Estimated Investment Budget', FRANCHISE_FORM.budgets, 'Select budget')}
                <div className="fr-form__row">
                  {select('hasCommercialSpace', 'Do you already have a commercial space?', FRANCHISE_FORM.hasSpace)}
                  {select('availableSpace', 'Approximate Available Space', FRANCHISE_FORM.spaces, 'Select space')}
                </div>
              </fieldset>

              <fieldset>
                <legend>Additional Information</legend>
                {select('heardFrom', 'How did you hear about techcadd?', FRANCHISE_FORM.heardFrom)}
                <div className="fr-form__field">
                  <label htmlFor="fr-message">Any Questions or Comments? (Optional)</label>
                  <textarea id="fr-message" name="message" rows={3} placeholder="Share any questions or additional information..." />
                </div>
              </fieldset>

              <div className="fr-form__consent">
                <label>
                  <input type="checkbox" value="yes" {...field('consent')} />
                  <span>{FRANCHISE_FORM.consent}</span>
                </label>
                {error('consent')}
              </div>

              <button type="submit" className="btn btn--gold">
                {FRANCHISE_FORM.submit} <FiArrowRight aria-hidden />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
