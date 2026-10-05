import type { Metadata } from 'next'
import { FiArrowRight, FiCheck, FiPhone } from 'react-icons/fi'

import PageHero from '@/components/ui/PageHero'
import FranchiseApply from '@/components/franchise/FranchiseApply'
import FranchiseTabs from '@/components/franchise/FranchiseTabs'
import {
  FranchiseAbout,
  FranchiseContact,
  FranchiseFounder,
  FranchiseGallery,
  FranchisePartners,
  FranchiseRoadmap,
  FranchiseTeam,
} from '@/components/franchise/FranchiseSections'
import { FRANCHISE_CONTACT, FRANCHISE_HERO } from '@/data/franchise'

export const metadata: Metadata = {
  title: 'Own a techcadd Franchise',
  description: FRANCHISE_HERO.lead[0],
}

export default function FranchisesPage() {
  return (
    <>
      <PageHero eyebrow={FRANCHISE_HERO.eyebrow} title={FRANCHISE_HERO.title} lead={FRANCHISE_HERO.lead[0]} crumbs={[{ label: 'Franchises' }]}>
        <p className="fr-hero__more">{FRANCHISE_HERO.lead[1]}</p>
        <div className="fr-hero__ctas">
          <a href="#apply" className="btn btn--gold">
            Become a Franchise Partner <FiArrowRight aria-hidden />
          </a>
          <a href={FRANCHISE_CONTACT.phoneHref} className="btn btn--ghost">
            <FiPhone aria-hidden /> {FRANCHISE_CONTACT.phone}
          </a>
        </div>
        <strong className="fr-hero__tag">{FRANCHISE_HERO.tagline}</strong>
        <ul className="fr-hero__badges">
          {FRANCHISE_HERO.badges.map((b) => (
            <li key={b}>
              <FiCheck aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </PageHero>
      <FranchiseApply />
      <FranchiseTabs />
      <FranchiseAbout />
      <FranchiseRoadmap />
      <FranchisePartners />
      <FranchiseGallery />
      <FranchiseTeam />
      <FranchiseFounder />
      <FranchiseContact />
    </>
  )
}
