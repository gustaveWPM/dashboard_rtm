import type { BlogConfigType } from '@/config/Blog/server';
import type { BlogPostType } from '@/types/Blog';

import { TESTING_BLOG_FAKE_SUBCATEGORY } from '𝕍/testingContentCategoryDatas';
import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import BlogConfig from '@/config/Blog/server';

import { blogSubcategoryShouldTriggerNotFound, getBlogPostStrict } from '../api';

vi.mock('@/config/Blog/server', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('@/config/Blog/server')>();

  return {
    default: {
      ...mod.default,
      USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: true
    } satisfies BlogConfigType
  };
});

describe('blogSubcategoryShouldTriggerNotFound', () => {
  it('should return false', async () => {
    const [category, subcategory, slug] = [BlogConfig.TESTING_CATEGORY, TESTING_BLOG_FAKE_SUBCATEGORY, 'fake-post-01' as const];
    const lang = DEFAULT_LANGUAGE;
    const post = (await getBlogPostStrict({ subcategory, category, lang, slug })) as BlogPostType;

    expect(blogSubcategoryShouldTriggerNotFound([])).toBe(false);
    expect(blogSubcategoryShouldTriggerNotFound([post])).toBe(false);
  });
});

vi.doUnmock('@/config/Blog/server');
