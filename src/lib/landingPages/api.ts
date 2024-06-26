import type LpLanguageAndSlugPair from '@/types/adapters/LpLanguageAndSlugPair';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { UnknownLandingPageSlug } from '@/types/LandingPage';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type { LandingPage } from 'contentlayer/generated';

import LandingPagesConfig from '@/config/landingPages';

import ComputedLandingPagesCtx from './ctx';

export const getAllLandingPages = () => LandingPagesConfig.allLandingPages();

export function getLandingPageByLanguageAndSlugUnstrict(language: LanguageFlag, slug: UnknownLandingPageSlug): MaybeNull<LandingPage> {
  const allLandingPages = getAllLandingPages();
  const matchingLandingPage =
    allLandingPages.find(({ language: currentLanguage, slug: currentSlug }) => currentSlug === slug && currentLanguage === language) ?? null;

  // Stryker Workaround 1. Mutant will be killed with `&& false` as expected, but `&& true` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!ComputedLandingPagesCtx.TESTING && matchingLandingPage?.category === LandingPagesConfig.TESTING_CATEGORY) return null;
  if (matchingLandingPage && !ComputedLandingPagesCtx.ALLOWED_DRAFTS && matchingLandingPage.draft) return null;
  return matchingLandingPage;
}

// Stryker Workaround 2. Pointless static mutant.
// Stryker disable all

export const getLandingPageByLanguageAndSlugStrict = ({ lang, slug }: LpLanguageAndSlugPair): MaybeNull<LandingPage> =>
  getLandingPageByLanguageAndSlugUnstrict(lang as any, slug as any);

// Stryker restore all
