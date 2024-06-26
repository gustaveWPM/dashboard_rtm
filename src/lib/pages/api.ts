import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { UnknownPagePath, LangAndPathPair } from '@/types/Page';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type { Page } from 'contentlayer/generated';

import PagesConfig from '@/config/pages';

import ComputedPagesCtx from './ctx';

export const getAllPages = () => PagesConfig.allPages();

export function getPageByLanguageAndPathUnstrict(language: LanguageFlag, path: UnknownPagePath): MaybeNull<Page> {
  const allPages = getAllPages();
  const matchingPage =
    allPages.find(({ language: currentLanguage, path: currentPath }) => currentPath === path && currentLanguage === language) ?? null;

  // Stryker Workaround 1. Mutant will be killed with `&& false` as expected, but `&& true` mutant is pointless.
  // Stryker disable next-line ConditionalExpression
  if (!ComputedPagesCtx.TESTING && matchingPage?.root === PagesConfig.TESTING_ROOT) return null;
  if (matchingPage && !ComputedPagesCtx.ALLOWED_DRAFTS && matchingPage.draft) return null;
  return matchingPage;
}

// Stryker Workaround 2. Pointless static mutant.
// Stryker disable all

export const getPageByLanguageAndPathStrict = ({ lang, path }: LangAndPathPair): MaybeNull<Page> =>
  getPageByLanguageAndPathUnstrict(lang as any, path as any);

// Stryker restore all
