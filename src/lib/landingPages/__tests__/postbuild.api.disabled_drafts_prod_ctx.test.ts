import type { LandingPage } from 'contentlayer/generated';
import type { Index } from '@rtm/shared-types/Numbers';

import LandingPagesConfig from '@/config/landingPages';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';

import type { LandingPagesConfigType } from '../configBuilder';

import { getLandingPageByLanguageAndSlugStrict } from '../api';

vi.mock('@/config/landingPages', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/landingPages')>();

  return {
    default: {
      ...mod.default,
      ENABLE_DRAFTS_IN_PROD: false
    } satisfies LandingPagesConfigType<typeof mod.default.TESTING_CATEGORY, ReturnType<typeof mod.default.allLandingPages>[Index]>
  };
});

describe('getLandingPageByLanguageAndSlugStrict (happy paths)', () => {
  it('should return a valid lp', () => {
    const category = LandingPagesConfig.TESTING_CATEGORY;
    const targettedSlug = `${category}-fake-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict({ slug: targettedSlug, lang: language }) as LandingPage;

    expect(lp.category).toBe(category);
    expect(lp.slug).toBe(targettedSlug);
    expect(lp.language).toBe(language);
    expect(lp.url).toBe('/' + language + ROUTES_ROOTS.LANDING_PAGES + targettedSlug);
  });
});

describe('getLandingPageByLanguageAndSlugStrict (unhappy paths)', () => {
  it('should return NULL when picking a draft lp in an unauthorized drafts CTX', () => {
    const targettedSlug = `${LandingPagesConfig.TESTING_CATEGORY}-fake-draft-lp-00` as const;
    const language = DEFAULT_LANGUAGE;
    const lp = getLandingPageByLanguageAndSlugStrict({ slug: targettedSlug, lang: language });

    expect(lp).toBe(null);
  });
});

vi.doUnmock('@/config/landingPages');
