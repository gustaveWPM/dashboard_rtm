import type { PagesConfigType } from '@/lib/pages/configBuilder';
import type { Index } from '@rtm/shared-types/Numbers';
import type { Page } from 'contentlayer/generated';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';
import PagesConfig from '@/config/pages';

import { getPageByLanguageAndPathStrict } from '../api';

vi.mock('@/config/pages', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/pages')>();

  return {
    default: {
      ...mod.default,
      SKIP_AUTOMOUNT: { prefixes: [], paths: [] },
      ENABLE_DRAFTS_IN_PROD: true
    } satisfies PagesConfigType<typeof mod.default.TESTING_ROOT, ReturnType<typeof mod.default.allPages>[Index]>
  };
});

describe('getPageByLanguageAndPathStrict', () => {
  it('should return a valid page', () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-page-00` as const;
    const language = DEFAULT_LANGUAGE;
    const page = getPageByLanguageAndPathStrict({ path: targettedPath, lang: language }) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });

  it('should return a valid page when picking a draft page in an authorized drafts CTX', () => {
    const root = PagesConfig.TESTING_ROOT;
    const targettedPath = `${root}/fake-draft-00` as const;
    const language = DEFAULT_LANGUAGE;
    const page = getPageByLanguageAndPathStrict({ path: targettedPath, lang: language }) as Page;

    expect(page.path).toBe(targettedPath);
    expect(page.root).toBe(root);
    expect(page.url).toBe('/' + language + ROUTES_ROOTS.WEBSITE + targettedPath);
  });
});

vi.doUnmock('@/config/pages');
